---
postTitle: "Despite Everything, It's Still You"
excerpt: "A Retrospective on 2025 and some brief thoughts on AI"
date: "2025-12-31"
author: Alex Westerman
slug: '0011'
keywords: "retrospective, AI, ML, Artificial Intelligence, Machine Learning, LLM, ChatGPT"
---

I did a lot in 2025 both personally and professionally: I started to get more exercise and be a bit more health conscious with respect to eating, which has lead to me start losing weight and measure below 180 lbs for the first time since before I started college (as far as I remember). Also, I got promoted at my job which I like doing and working at, and I’m still not spending on stupid things like I used to. But most relevant is this blog, which has been a cathartic release for all the personal projects and skills I do offline. One of my favorites is the [SHUT UP device](https://faceftw.dev/blog/0007) series which I dive really deep into design and low-level device programming for the first time since college. Ironically most of the time was doing the research by hand to get my writing for the post as correct as possible, making the actual thing probably was only 20% of time, but I digress.

> Editor's Note: This post itself took about 6 hours total, 70% primarily for proofreading and formatting the Markdown. Writing isn't an easy thing!

Looking to 2026, one of the big things I have to consider is how I want to continue ‘ref_cycling’; I would be lying if I said there was no burnout doing the research process and writing with my ADHD. And looking at some of the things I’m doing _right now_ that I want to write about, there is a lot of uncertainty and fluff that I would spend too much time on and probably not be very useful. So, _I currently plan to write stuff less from a blog perspective for 2026_. I definitely will continue to do writing, but I probably will not post as much as 2025 (which wasn’t a lot to begin with). If you ever want to know if I'm actually doing something, my [GitHub](https://github.com/FaceFTW) (and now [Codeberg mirror](https://codeberg.org/FaceFTW)) will always show what I’m working on for sneak peeks into the madness that I might be drowning in. You can also follow me on [Twitter (aka X the "Everything App")](https://twitter.com/_FaceFTW) or [Bluesky](https://bsky.app/profile/faceftw.dev) to find out when I complain about something (in general). For now, another sneak peek:

```image
src="./more_nix_experimenting.jpeg", 714x952
More Linux. More <a href=https://nixos.org>NixOS</a>. Inject the SSH and flakes into my veins.
```

Aside from that, I plan to keep the same overall posture for 2026: keep improving my physical self and maintaining the mental through personal projects. I have no idea when the next post will be ready or how I'm going to talk about what I've been doing, but that's for future Alex to figure out, and he loves it when I do that.

> Editor's Note: I read this line and am now dreading this indecision :(

## No Gods, No Kings, No Masters

With the amount of time I spend on personal projects, hell, even research and documentation diving, some may wonder if I use generative AI at all and why not use it to speed up the process.

_**I do not. And I do not intend to for the foreseeable future. Even professionally, I strive to do things by hand unless external forces require me to (i.e. my manager will fire me if I don't use AI).**_

I have several problems with generative AI in the current state of the world. I’ve wanted to write a full post discussing it, but I have so many various angles to discuss it from that its overwhelmingly negative and not entirely constructive to the conversation at large; The issues I have with the draft outline is that either someone else has made the salient point before me or my stubbornness to do things by "hand". But for the sake of explaining the reason why I don’t use AI, here are the rough reasons:

### It Isn’t Making Me Efficient.

At work when I tried using AI to help migrate some shell scripts (almost a month ago at this point), it caused me more hassle removing some intentional optimizations and mangling certain Bash nuances, making me just redo all the migration myself and wasting several days of effort. I did try narrowing down the tasks and providing additional formatted context, but it kept tripping up on some really important nuances like [splatting](https://stackoverflow.com/questions/4824590/propagate-all-arguments-in-a-bash-shell-script) or [input redirection to be used with verbosity toggles](https://www.gnu.org/software/bash/manual/html_node/Redirections.html). It felt like I was babysitting a high schooler learning to program for the first time, not writing any code faster.

### It Isn't Efficient

All those new datacenters are being powered (at the moment) by fossil fuels or polluting energy sources, with [possible stresses on electrical grids that cause increases in local utility bills](https://www.pbs.org/newshour/show/how-ai-infrastructure-is-driving-a-sharp-rise-in-electricity-bills). Water usage of these data centers is also a relevant point of concern as cooling these data centers often require fresh water sources. Combine that with the amount of compute needed to produce a _potentially_ good result despite existing applications probably using significantly less computing power. A good example of this is asking an LLM to add two numbers: it is probably using 10 Billion CPU/GPU operations for a potentially correct answer when you can get a 100% correct answer with one line of optimized code that usually runs in 3-4 CPU cycles. [Yes this is somehow considered a use case](https://epoch.ai/frontiermath).

### Lack of Ethics and Double Standards.

Many AI bros/tech companies seem to have double standards on several fronts: [blatant disregard for copyright _they do not own_](https://www.bakerlaw.com/services/artificial-intelligence-ai/case-tracker-artificial-intelligence-copyrights-and-class-actions/), no consideration of societal impact with image editing that can easily defame or spread misinformation, and [shady business that really only seems to profit the mega rich](https://graceblakeley.substack.com/p/the-ai-circular-economy) that are now scrambling to keep the facade up. Also, remember when [Anthropic tried to have Claude run a vending machine? That didn't end well and yet some businesses are trying to replace management with this.](https://www.anthropic.com/research/project-vend-1)

### I’m Not Satisfied After Using AI.

There is no feedback loop where I learn something and then apply it. It's the reason I still play Counter-Strike despite being hard-stuck silver: I feel like I'm taking on a challenge. Plus, [studies have shown that relying on generative AI literally makes you dumber](https://www.media.mit.edu/publications/your-brain-on-chatgpt/). I already do dumb shit but at least I know its dumb or will try to fix it myself, I would like to keep it that way.

Do I think generative AI is completely useless? I’m going to channel my inner debate lord briefly and say “only for the right application”. The most promising use case for generative AI is summarizing and searching through large amounts of data... with some asterisks. Given how these models work even with [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) and all that jazz, it is important to remember that AI still isn’t really “thinking” like we do and is only predicting what is the next best word or thing to append to the output. Ignoring issues like quality of data or improper training, knowing roughly how the AI black box works makes me more skeptical of its efficacy, basically like a “don’t meet your heroes” moment. And the argument that "it's AI so it's self improving" is heavily riddled with caveats as well, it's still heavily reliant on human intervention and can easily be messed up.

I want this AI bubble to pop. This is not sustainable and there are more ways to progress society than LLM slop that melts boomer brains. But I’m not asking to kill all AI research as it would not be constructive to any progress. My plea is to _research into actual attainable use cases_. _**Stop creating solutions in need of a problem. Stop selling me god in a box that is really just snake oil. Stop trying to make me give up the little autonomy I have in this world. I’m sick and tired of it.**_ And the worst part of all of this is I _work in the tech industry_. I should be an advocate for these advancements. And yet I find myself on the other side of the fence 99% of the time.

The worst thing you can do is trust a machine blindly. Because blindly trusting a machine is blindly trusting the humans behind that machine. As one of my favorite quotes go:

“A computer can never be held accountable, therefore a computer should not be responsible for a management decision.”
    - [IBM Training Manual, 1979](https://www.ibm.com/think/insights/ai-decision-making-where-do-businesses-draw-the-line)


Cheers to a 2026 that isn't worse than this year!