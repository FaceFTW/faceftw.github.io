---
postTitle: "One Must Imagine Sisyphus Happy"
excerpt: "20 minute adventure to fix a camera driver, In-and-Out. Surely..."
date: "2026-03-16"
author: Alex Westerman
slug: "0012"
keywords: "Nix, NixOS, software development, reproducible builds, devops, CI, CD, home lab, self hosting"
---

> Editor's Preface
> Some of the solutions to problems in this article could have been solved (faster) by me asking Chat-Gippity or equivalent
> AI services. My [modus operandi](https://en.wikipedia.org/wiki/Modus_operandi) in personal projects avoids AI usage
> unless I'm absolutely stumped. As of writing, this has only happened once and in that case it was not helpful in
> solving the problem. I'll be writing a post about my thoughts on AI usage after this ~~novella~~ post is published
> which will explain this decision later.
>
> So don't ask "wHy NoT uSe ClAuDe?" if you see something stupid. Embrace the madness with me and jump into the rabbit hole.
>
> This is less of an "informative" post about something I learned and more of an insane journey with some commentary at
> the end. This is post is my equivalent of _[The Odyssey]_ with an additional mini YouTube video essay. This means I
> will embellish some points for narrative effect, but the core messages I want to convey remain intact. Enjoy this
> story almost 9 months in the making!

Over a year ago, I noticed that the webcam on my 3D printer server suddenly stopped working. I remembered doing a ad-hoc
package upgrade and thought maybe one of the libraries is broken. Naively, I checked the `apt` log (I was using Raspbian
originally) and started to rollback packages I thought were the culprit. `ustreamer`? No change. `libcamera`? Crashes
somehow, had to rollback further. Maybe it's `haproxy` (starting to grasp at straws)? No beans. Soon, I start rolling
back Raspberry Pi kernel versions. No Luck. I check `dmesg` and my `config.txt`. Nothing out of the ordinary. Maybe I
forgot to build a kernel module for the camera? It's included with the Raspberry Pi kernel, I see it get loaded. What if
it's a `udev` rule I'm missing? Doesn't seem like it (after a brief skim of udev docs). I started to consider it might
be a hardware issue, so I buy a new camera module and DSI cable. IT DOESN'T CHANGE ANYTHING. I even use a different
Raspberry Pi 4 I had on my shelf. IT STILL DOESN'T CHANGE.

At this point, I'm pissed. I spent two weeks at this point trying to rollback packages only to not fix the problem and
potentially break something else without my knowledge. _I started to forget which things I rolled back_ and at some
points it started to become a mess trying to figure out what changed with each rollback. Configuration changes to
firmware were also _very easy to forget_, probably wasting more of my time even more with false leads. Then I started
noticing _how much random bullshit_ was just in this Linux install and wondered how did it happen? Like any needle in a
haystack, finding it becomes harder the more hay that has to be dug through.

I decided to nuke the installation. But I wanted to avoid this problem of having to debug a break like this again. Just
one command, maybe a reboot, and I could instantly restore my entire system before I did an upgrade. That would be nice.

## The Journey Begins

A few months, I was browsing my timeline on Twitter when I saw mentions of [NixOS](https://nixos.org) in a debate about
good operating systems. I've lost the thread to time, but I looked into it and the concept interested me:
Deployment/Infrastructure as Code but at a whole system level. I started reading documentation about the Nix language
and package manager, and started toying around in a WSL environment to familiarize myself with the various driving
concepts behind it. It took a few weeks but I soon had a WSL environment in pure NixOS where I could mess around with
building system images. Then I started digging into how creating installer images work. Understanding the magic (and
bullshit) really started to take place at this point.

At a high-level, the building block of Nix/NixOS is the _**derivation**_, which defines how a package is built and
installed, as well as how to run the exectuables in a hermetic*sandbox. Each derivation is constructed through the
evaluation of ***Nix expressions***, which is written using the ***Nix programming language***. Evaluting a Nix
expression will build the package *from source*** and save the resulting derivation into the ***Nix Store*** along with
metadata about the hermetic* build environment the derivation contents were compiled under. The contents of the Nix Store
is _read-only_ even to root users*. Installation of derivations do not copy files to directories like `/bin` or `/share`,
rather symlinks are instead created to the derivation contents in the Nix Store. To further This paradigm is a bit tricky
to get the hang of initially (I would know I spent a month trying to nail it down), so this example should help.

> Editor's Note
>
> You might have noticed some asterisks on items in the previous section. Some clarifying notes before we move on:
>
> 1. With respect to hermetic sandboxes, I will elaborate on this in the final "Thoughts on Nix" section
> 2. Technically, the derivation could simply download a compiled binary tarball and the compilation step is copying the
>    compiled blobs into the install path, but that defeats the key point of derivations. More on this in the last section
>    as well.
> 3. Technically, writing to the Nix store is done through the Nix Daemon _**TODO VERIFY**_

Suppose for some reason I don't have [`sed`](https://www.gnu.org/software/sed/) installed on my NixOS machine. In order
to install it, I need to have a Nix expression defining how to make the derivation for `sed`. In [Nixpkgs](https://github.com/nixos/nixpkgs),
the NixOS package repository and utility library, this is what the Nix expression defining the derivation for `sed` looks
like (with some extra stuff to make it potentially a bit more clear):

```nix
# Reference: https://github.com/NixOS/nixpkgs/blob/f20fda6d42187f1c54896b1356941472cc844972/pkgs/tools/text/gnused/default.nix
{
  lib,
  stdenv,
  fetchurl,
  updateAutotoolsGnuConfigScriptsHook,
  perl,
}:

stdenv.mkDerivation rec {
  pname = "gnused";
  version = "4.10";

  # This could be changed to a different thing, provide some function returning
  # a set of files to copy into the hermetic environment as sources before building.
  # This one fetches the sed sources from the GNU mirrors.
  src = fetchurl {
    url = "mirror://gnu/sed/sed-${version}.tar.xz";
    sha256 = "sha256-uOchgrLslqNXTimYxHt6qmTMIM4ADY6awxPMB87PKMc=";
  };

  # What things this package provides.
  outputs = [
    "out"
    "info"
  ];

  nativeBuildInputs = [
    updateAutotoolsGnuConfigScriptsHook # This injects a step before configure to make the script "newer"
    perl        # we need perl available
  ];

  preConfigure = "patchShebangs ./build-aux/help2man";
  # Prevents attempts of running 'help2man' on cross-built binaries.
  env = lib.optionalAttrs (stdenv.hostPlatform != stdenv.buildPlatform) {
    PERL = "missing";
  };

  # This is implicitly specified with derivations built in the
  # Standard Environment (stdenv), but I add it here to better
  # demonstrate how a derivation (at least those in/using Nixpkgs) works.
  #
  # There will be a bunch of `runHook` calls, which are a provided
  # shell function in the effective script that is generated by Nix
  # to build the derivation. These just make sure pre/post phase steps
  # that are defined in derivations are executed.
  configurePhase = ''
   runHook preConfigure
    ./bootstrap
    ./configure
    runHook postConfigure
  '';

  buildPhase = ''
    runHook preBuild
    make
    runHook postBuild
  '';

  checkPhase = ''
    runHook preConfigure
    make check
    runHook preConfigure
  '';

  installPhase = ''
    runHook preConfigure
    make install
    runHook preConfigure
  '';

  # This is metadata in Nixpkgs similar to pkginfo.
  # Most derivations I write outside of nixpkgs don't use this
  meta = {
    homepage = "https://www.gnu.org/software/sed/";
    description = "GNU sed, a batch stream editor";

    longDescription = ''
      Sed (stream editor) isn't really a true text editor or text
      processor.  Instead, it is used to filter text, i.e., it takes
      text input and performs some operation (or set of operations) on
      it and outputs the modified text.  Sed is typically used for
      extracting part of a file using pattern matching or substituting
      multiple occurrences of a string within a file.
    '';

    license = lib.licenses.gpl3Plus;

    platforms = lib.platforms.unix;
    maintainers = with lib.maintainers; [ mic92 ];
    mainProgram = "sed";
  };
}
```

Now evaluating this Nix expression will pull the sources for `sed`, compile it with `make` and run the provided tests,
then install it in the Nix store. This can be seen with the following:

```shell
$ nix eval nixpkgs#gnused
«derivation /nix/store/8a41q43mxgkvi3a1pihlp9xiakgqvggx-gnused-4.10.drv»
```

This store path is then able to be provided in other Nix expressions (both system derivations or other package derivations)
or in temporary environments. For example, if I want a temporary environment which has `sed` available to use in the shell
`PATH`, `nix-shell` can be used like such:

```shell
# Just because sed is available in the local Nix store
# it isn't in this shell environment's path
$ sed --version
zsh: command not found: sed

$ env | grep PATH
PATH=/bin;/usr/bin;<truncated...>

# Let's add it
$ nix-shell -P gnused

# This is now run in a new shell with updated PATH env
# Commands run in this shell will be indicated with %
% sed --version
sed (GNU sed) 4.10
Copyright (C) 2026 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Jay Fenlason, Tom Lord, Ken Pizzini,
Paolo Bonzini, Jim Meyering, and Assaf Gordon.

This sed program was built without SELinux support.

GNU sed home page: <https://www.gnu.org/software/sed/>.
General help using GNU software: <https://www.gnu.org/gethelp/>.
E-mail bug reports to: <bug-sed@gnu.org>.

# Check the updated path
$ env | grep PATH
PATH=/bin;/usr/bin;<truncated...>;/nix/store/8a41q43mxgkvi3a1pihlp9xiakgqvggx-gnused-4.10/bin
```

And that's the fundamentals of Nix (with of abridging). There is a lot I intentionally excluded in this description to
focus more on my descent into homelabbing madness, but Nix solves some interesting problems related to software
distribution and packaging that other existing solutions have had trouble with. The big one is [Dependency/DLL Hell](https://en.wikipedia.org/wiki/Dependency_hell)
which was the most likely culprit behind my camera driver issues; Nix derivations being uniquely keyed in evaluation means
that I can easily have true control over which depdencies and what version is used when building drivers or systems. Once
I got the derivation for the camera streaming software working after a good chunk of debugging [Video4Linux configuration](*TODO*)
and [Device Tree Overlays](*TODO*) (since default NixOS does not come with the Raspberry Pi OS defaults), it was extremely
cathartic to see it simply _work_ after all that. But by that time, Black Friday just passed and I had a new toy shipped
in the mail.

## Network Attaching Your Mom (because she is fat)

_TODO_ probably scratch this title

I don't know what exactly compelled me to buy a NAS. Maybe it was the bajillion consumer hard drives I shucked out of
portable HDDs/SSDs and questionable runtime stress I put them under. Maybe it was because I was learning so much sysadmin
stuff at my job that I wanted a playground that wouldn't affect a million people. Either way, I got a $200 dollar discount
on a 2-Bay UGREEN NAS and acquired two 14TB WD Red HDDs that black friday. As of writing, I made a good decision and am
really happy with the purchase, but of course getting to this point was fairly rocky because I just _had_ to be quirky
and use NixOS instead of my default UGREEN NAS software. Surely it can't be that bad.

The first problem is to figure out how to get to a boot menu to even install Linux. After mashing <kbd>Ctrl</kbd> + <kbd>F12</kbd>
or some combination I get into the BIOS and select the USB drive. I boot into the NixOS live image. I start getting some
disk UUIDs so I can write my partition layout with [disko](*TODO*). But suddenly, after about 3 minutes the NAS reboots.
Just out of nowhere. Maybe the flash drive I had the installer on was bad. So I burned the live image again on a new
flash drive. It reboots after 3 minutes again. I boot in but do nothing. Reboots in 3 minutes. I start questioning if
UGREEN put some bizarre write-protection on their OS. I check the BIOS. It turns out there is a setting which acts as a
[Watchdog Timer](*TODO*) and will restart the machine if it does not get a specific "message" from the running OS. I
turn it off. I boot into the live image. I wait 3 minutes. Then I wait another 2 minutes. Then I wait another 5 minutes
because I'm paraniod. After 3 days of on-off debugging. I have only figured out how to _run the NixOS live image on the
NAS_, I haven't even installed a base system.

This somehow didn't deter me from continuing the madness.

Before I can install NixOS, I need to identify a partition scheme given this is a server-like Linux install focused on
bulk storage. With this NAS, I have a 32GB internal eMMC (which currently holds bootloaders and the UGREEN OS), two HDD
Bays which are each fileld with 14TB disks, and two M.2 NVMe slots on the inside of the left HDD bay which I inserted
two 512GB sticks I scraped from old laptops. Just considering data resiliency itself is a fun little adventure into
learning about [RAID](*TODO*) and filesystems supporting multi-disk arrays. Questions like "how fast do I need to write
data", "how much data am I willing to lose", "what is the minimum storage I want available as actual storage" start to
become relevant. I'm going to cut out a bunch of research and give highlights on my decisions for my partition setup:

- All data/system partitions use [Btrfs](*TODO*). More advanced than [`ext4`](*TODO*) and supports configurable
  compression and defragmentation: useful for maximizing density of data storage.
- The eMMC uses a fairly simple partition layout (separapte `/boot` and `/`) seen in most simple Linux installs.
- I use [`mdadm`](*TODO*) for two separate RAID 0 (Mirror) groups
    - The two 14TB HDDs are the "archival" RAID pool and intended to be read + slow write with the nature of that data.
    - The two 512GB NVMe sticks are the "fast" RAID pool used for system swap, things that need fast writes (i.e. live
      databases, caches), and more frequently updated data.

> Editor's Note
>
> Some quick things about the partition setup that I think are important to shout out:
>
> - Btrfs does support being the manager of the RAID pool, I couldn't figure out how to easily do it with disko. Plus
>   `mdadm` is easier to hook up alerts to from my experience.
> - I could get away with the "fast" drives not being in a RAID 0 pool if there are backup jobs that regularly copy stuff
>   to the archival RAID pool. But what's the fun in having only one RAID pool.

After writing the partition configuraiton and executing the steps with disko, I now have empty partitions to install Nix
into. Using disko provides the additional benefit that it becomes part of the system derivation and auto generates
[systemd mounts](*TODO*) on system rebuilds. But the first install process a bit of "provisioning work" to deal with
secrets. Why? [Because you don't want to store unencrypted secrets in the Nix store](https://nixos.wiki/wiki/Comparison_of_secret_managing_schemes).
For this, I use [sops-nix](*TODO*), which allows associating a secrets YAML with a set of SSH Host keys to decrypt against.
But those host keys _only exists after the system is installed and run for the first time_.
So I have to have a provisional configuration which has the minimum information without encrypted secrets, get the public
key, then add the encrypted secrets configuraiton and rebuild the system deivation. A small annoyance, but afterward secrets
can be declared securely for that machine easily, even across machines if configured as such. I'm not going to dive deeper
into secrets management because that is a whole additional design discussion that I want to avoid in this already long post.

So I have an empty NAS with NixOS installed and configured to be remoted into for management and remote system derivation
updates. The next step is to make a [Network File Share](*TODO*). For this I chose [Samba](*TODO*) over NFS because of
the need for Windows systems to be able to access it*. So I start looking into how to configure Samba. I follow this
[convenient NixOS wiki page for Samba](*TODO*), declare the bind mounts for the Samba shares I wanted, then wrote the
Samba configuration. Then I rebuild the NAS system config and try to connect from my Windows machine. It fails immediately.
And the worst part is that it's a simple "Something went wrong". I start fiddling with the Samba configuration. Maybe I
messed up some security settings. I get a different error this time. I revert my changes. Still "something went wrong".
I try to scrounge Event Viewer for more information. Nothing. I even try connecting with my iPhone because the Files app
supports Samba. That fails with no indication either. Great. It's Christmas day and I am trying to figure out why my Samba
configuration is broken. Then... I found it:

_**TODO INSERT BSKY OR TWITTER POST**_

That is cursed. And also really annoying. But it works. And that's what matters. Samba having to translate how users are
defined from Microsoft AD-like user system to some Linux user definition is black magic that I am relieved I do not need
to get into. I start migrating over my files, I setup the network volumes, and start downloading my _entire_ Steam library.
As of today, it currently sits at 9.5TB of my storage with level 9 [zstd compression](<>) at the Btrfs layer. All of t
his backed up in a RAID 0 mirror that is acessible by any device on my network.

> Editor's Note: Technically, [Windows does support NFS v2/v3 as of recently](https://learn.microsoft.com/en-us/windows-server/storage/nfs/nfs-overview)
> but my intial NFS attempts didn't work and I didn't have as many Linux devices to determine if it was a
> Windows issue.

But wait, I forgot to mention something that happened before I could even setup Samba. Yet another fun hiccup.

## Once you've been shopping for PC parts, you'll want to beat Sam Altman to death

_**TODO also this title probably**_

The UGREEN NAS model I purchased only came with 8GB of RAM. While you _could_ use swap space to act as extra RAM, it
doesn't always scale that way especially if you have many processes with "hot" pages. I learned this by accident by
trying to run NixOS rebuilds of _**TODO What was it again**_ on a 1GB Raspberry Pi 4 before I learned about Nix remote builders.

_**TODO INSERT BSKY OR TWITTER POST**_

Luckily, UGREEN provided the option of upgrading the RAM. But because it was DDR5, I still needed to buy a fresh stick.
I checked the specs and bought a 16GB stick of Corsair Vengance DDR5 rated for 4800 MT/s at 1.1V. The same operating
conditions as the pre-installed 8GB stick. I install it. It goes well for about 5 hours, then I get a freeze. I
eventually realize it's a hard freeze (not even a kernel panic) and did a power cycle. I think nothing of it untill 3
hours later, another freeze. I connect one of my Raspberry Pi HDMI displays and tape it to the side of the display just
to monitor the `dmesg` log when it freezes. This time it survived until sometime while I was sleeping and now I don't
have another data point to use for troubleshooting. I power cycle yet again, it freezes in 30 minutes! Each time I just
let the system run idle with the exception of `htop` on the main TTY just to get a visual indicator when it freezes. And
the freeze is abrupt and silent. No `dmesg`, systemd journal, or magic smoke* is indicative of what could be the issue.

> Editor's Note: "magic smoke" refers to the mystical gas inside your electronic components that allow it to do things
> with electricity. Letting that smoke escape will destroy the functionality of the device.

I start to panic internally. Surely it isn't something wrong with my drives right? I spent $300 per NAS drive and
returning/exchanging them would be a massive hassle. I try running without the hard drives. Still get the freeze.
I take out the SSD and run with no attached drives. Frozen after 2.5 hours. I start to take apart the NAS from it's
chassis just to inspect the motherboard; maybe some magic smoke got trapped in the chassis? After an hour of
non-destructive teardown, all the boards look as clean as a PCB should. I spend 2 hours putting it back together
in a non-destructive way without a manual and am stumped. Then I think "surely it isn't the RAM?" So I do an
experiment and use the pre-installed RAM stick. I turn on the NAS.

A full day passes. Didn't freeze yet. I gained the courage to reinsert the SSDs and HDDs and power cycle the machine.

Another full day passes. I check logs and nothing out of the ordinary like before.

A second day passes. By this point I am convinced it was the RAM stick.

When I purchased the RAM from Amazon, I spent $200 dollars USD. As of writing, the same stick is now *$400 USD*. I now
have a $200 DDR5 paper-weight sitting with my stack of DDR3s and DDR4s, and the worst part is that I think it is actually
functional. Since the BIOS of the NAS (and most BIOSes for that matter) don't provide options to change the parameters of
the RAM, it could just be a configuration issue of putting a circle into a square hole: it fits, but there is a lot of gaps.
Compared to the previous generation, DDR5 has some architectural changes such as moving power management to each DIMM which
may be impacting something subtle that I'm just not aware about. I don't have the patience (or budget) to look into this
further. So 8GB it is.

> Editor's Note: the actual length of time to produce the freezes in this section, while random, are purely made up for
> narrative effect.

So now, I can surely start adding some things to my NAS beyond file storage. Surely that isn't another significant debate?

## You ever what life was like without Docker?

If you work in tech, you probably know about [Docker](***TODO***) and/or container-based deployments. Extend that with
[Kubernetes](***TODO***), maybe some [GitOps](***TODO***) solution, and voila! Isolated, self-healing web application
deployments that power most websites and apps. But remember: Docker and containers as a concept is fairly new in the
history of computers, it was publicly released in _2013_. The original container engine, [Linux Containers](***TODO***)
that Docker was built on, didn't even exist until 2008. In the grand scheme of web applications,

## All My Homies Hate DNS

## Thoughts on Nix

- Learning Nix
  -- How do packages work (derivation, store, realization)
  -- Finagling with System Derivations
- Getting the printer functional-ish, then distracted
- Introducing the NAS
  -- Bootstrapping Nix (Making a "hermetic" install)
  -- Setting up services
- Networking Time
  -- Bootstrapping yet another system
  -- It's always DNS
- Nemesis
  -- Managing kernel patches
  -- Speeding up builds
  -- Linux Ricing
