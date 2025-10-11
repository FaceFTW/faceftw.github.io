---
postTitle: "Javascript is the Devil in the Details"
excerpt: "The website sequel I should have expected to happen"
date: "2025-10-11"
author: Alex Westerman
slug: '0010'
postThumbnail: "./node_modules.webp"
postThumbnailAlt: "Are that many node_modules really needed?"
keywords: ",JS, JavaScript, Next.js, React, SSG, SSR, Node.JS, Web Development, webdev"
---
In the last [From the Archives](https://faceftw.dev/blog/0005) post, I talked about the revisions `ref_cycling` has undergone throughout the several years I maintained and wrote new content for it. I foolishly underestimated my OCD and thought "yea, reducing your JavaScript size by 10x is pretty good and as far as you can go." Surely, there was not a better solution for a portfolio/blog site that doesn't require shared state across pages and was mostly composed of reusable markup.

And then six months passed.

While writing one of the devlogs for the SHUT UP device, I stared at my [Next.js](https://nextjs.org) build outputs and thought, "surely I can shrink that on load JavaScript size...right?"

And just like that _a new rabbit hole opened right under my feet._

## What React doesn't want to tell you

[React](https://react.dev) as a framework is great when a website needs a lot of interactivity, and is my personal preference if I were to build a frontend (see my [Senior project for example](https://github.com/RetireSimple/RetireSimple)). But the downside of pure React is that it relies heavily on the notion of a [virtual DOM](https://en.wikipedia.org/wiki/Virtual_DOM) that is linked with view state; While this type of architecture is efficient at updating web pages that "react" to changes in data or user input, it is somewhat inefficient for websites that are effectively _static_ (i.e. does not change often). Sure, it allows creating some fancy widgets like a carousel in a much "cleaner" way and the build process does a lot for bundling the web of NPM dependencies that a project may accrue, but _is that really needed for a website that displays pre-defined content?_

```image
src="./node_modules.webp", 320x425
A classic joke. Source: <a href=https://www.reddit.com/r/ProgrammerHumor/comments/al4ptm/the_time_is_now_old_man/>r/ProgrammerHumor</a>
```

When I first rewrote the website in React, it emitted a few files after building the site: a really simple HTML file, a bit of CSS, and then around a 1MB JavaScript blob (minified of course). Even with [code splitting](https://react.dev/reference/react/lazy) via `React.lazy()` and `<Suspense>`, the overall size of the JavaScript remained the same and just altered how the browser loads the page. In a website like this where it is a single HTML file (hence, a "Single Page Application" or SPA), _everything is controlled by the JavaScript_: layout, routing, DOM rendering (effectively), all is done through the compiled JavaScript. Some would consider this type of architecture to be at odds with [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) compared to the more traditional [MVC architecture](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) given that JavaScript is effectively doing all the lifting in getting the page to render. But the real kicker for _this use case_ is that MVC isn't even useful for static websites, only web applications with dynamic content or data. React is just "melding" the model, view, and (technically) controller part of the webpage into a single compiled component. The point here is not if React violates good architecture principles, it's that **the use of React or MVC in a static site is overkill and inefficient.**

 When I migrated to Next.js and used their "static site generation", it replaced the deployment to a bizarre hybrid of a pure HTML/CSS site and a pure React SPA. At least it has the courtesy of telling me how much JavaScript is required to load the page:

```ansi
Route (app)                                 Size  First Load JS
┌ ○ /                                    29.8 kB         148 kB
├ ○ /_not-found                            136 B         101 kB
├ ○ /about                                 550 B         107 kB
├ ○ /blog                                 6.3 kB         125 kB
├ ○ /blog/0001                           1.28 kB         111 kB
├ ○ /blog/0002                           2.97 kB         118 kB
├ ○ /blog/0003                           1.79 kB         117 kB
├ ○ /blog/0004                           2.05 kB         117 kB
├ ○ /blog/0005                            2.9 kB         118 kB
├ ○ /blog/0006                            1.3 kB         117 kB
├ ○ /blog/0007                           2.13 kB         117 kB
├ ○ /blog/0008                           2.03 kB         117 kB
├ ○ /projects                            3.45 kB         119 kB
└ ○ /resume                              2.83 kB         116 kB
+ First Load JS shared by all             101 kB
  ├ chunks/4bd1b696-a29676be0b8603ec.js  53.2 kB
  ├ chunks/684-df1d870f51b8280c.js         46 kB
  └ other shared chunks (total)             2 kB

```

I mentioned in the previous iteration that this was about a 10x improvement in size and that is impressive in itself. Clearly, the Next.js migration was a good improvement over the initial SPA setup. However, I noticed about this output is that those numbers are the sizes after GZIP compression, which is a reasonable assumption given most HTTP requests and responses use some form of compression. Personally, I'd rather see the true size of the JS since it actually indicates how much code the browser is running, as the compression ratio reflects how much duplicate code or content there is. For example, I checked the actual size of `chunks/4bd1b696-a29676be0b8603ec.js`, and the real size is around 165KB, which is nearly 3x the size of the reported 53KB. This means that the size of the JS the browser is _actually_ running is closer to 335KB of JS _for every page_. Even with a bunch of stuff about caching that browsers do, I was still a bit concerned about much JavaScript was being used despite this migration. That realization made me curious what is Next.js is shoving into my website and if I can remove anything. Using the [`next-bundle-analyzer` plugin](linkhttps://www.npmjs.com/package/@next/bundle-analyzer), I ran a build and saw the following:

Looking more into the HTML generated by the build and corroborating it with the breakdown: The main takeaway from this was very interesting: 95% of the JavaScript content bundled was use by two things: React and Next.js. The reason for React being in the bundle is somewhat expected: Next.js still uses React as part of its core architecture and supplements it with various hooks. What troubled me is the fact that a whole slew of Next.js stuff was being included: React-based routing, localization, prefetching.

And this is where I realized I was being bamboozled.

When trying to do a bit more research on why Next.js is specifically adding all of its internals to the bundle, I came across [this post on the Next.js Subreddit](linkhttps://www.reddit.com/r/nextjs/comments/159d3tz/nexts_solution_for_partial_hydration_rsc_seems/) (which is 2 years old at writing but still seems to apply) which pointed out the problem:

> "In comparison however, the way Next seems to solve the partial-hydration problem feels like it almost entirely defeats the purpose of having partial hydration in the first place. Rather than doing something to tell your client-component trees exactly where they should mount, Next seems to just send the fully resolved server-render as both HTML and then also as a React formatted object inside an inline `<script />` tag at the bottom of your page response, and then React seems to hydrate the full page again but using a logicless schema rather than components, and then mounting real components where the client components are supposed to hydrate. This seems remarkably inefficient, because it's basically like the whole document is being sent in-full twice"
>
> -- u/ethansidentifiable in [this Reddit post]( https://www.reddit.com/r/nextjs/comments/159d3tz/nexts_solution_for_partial_hydration_rsc_seems/)

I wasn't crazy. ***Next.js didn't actually do true SSG. It was really just a half-assed system that technically rendered the page twice for my use case.*** The documentation tricked me into thinking it had a solved solution for my problems when in reality it was designed for _larger projects and solutions_. The SSG Next.js seems to be "masking" the work that a server would already have done, which may seem faster to the user, but is significantly less efficient due to how the hydration of the page works. In essence, it acts more as "SSR with preloading", which again, _works best with more complex projects involving asynchronous processing_. Would I use Next.js in that case? Probably not anymore, I have a bad taste in my mouth from trying to understand why I needed that much JS for a simple site, and even then I'd rather not have to pay to do server hosting for an SSR project if I don't have to. So goodbye and good riddance!


## Ditching React
Initially, I was tempted to migrate to [Astro](https://astro.build) since it supposedly solved the whole React bloat problem; However I personally did not like the "Island" architecture system after trying a small migration. I don't think it is a bad system (encapsulation is a good thing), but it felt that I was trying to work "around" the design choices than use it nicely. So I looked further into actual SSG frameworks. I was extremely tempted to use [Docusaurus](https://docusaurus.io/) despite this not being a documentation site. But then I found a better solution for this website as a whole.

[Eleventy](https://11ty.dev) is a true SSG framework that works under the notion of _templates_ and substitution. Instead of having a component tree that needs to worry about re-rendering, Eleventy works under the assumption that the DOM is practically static at runtime, but at compile time dynamic data may be involved.  This removes React out of the equation completely, but still allows the flexibility to implement client-side interactivity through vanilla JS. Plus, the notion of a template means that reusing common HTML fragments is very simple, especially for something like a general site layout. Here is an abbreviated example from this actual website:


```html-derivative
<!--Basically, setting a common style, and importing some SVG defined in a separate template-->
<!--To ensure the code is visible, spaces are added to the template specifier for clarity -->
{ %- set socialBtn="text-md shrink-0 animate-fade-in justify-center gap-2 space-x-2 rounded-md p-2 transition-all outline-none hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50" % }
<button title="Twitter" id="twitterBtn" class="{{socialBtn}}">{ % include 'icons/twitter.njk'% }</button>
<script>document.getElementById('twitterBtn').onclick = () => window.open("https://twitter.com/_FaceFTW")</script>

<!--in icons/twitter.njk. Notice how it saves a bunch of space in the main file this way-->
{ #
Taken From Lucide Icons under ISC License:
https://lucide.dev/license
# }
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewbox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-twitter inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm
        font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none
        [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring
        focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20
        dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary underline-offset-4 hover:underline
        size-9 h-6 w-6 md:h-10 md:w-10"
    data-slot="tooltip-trigger"
    data-state="closed">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8
        1.1 0 3-1.2 3-1.2z"></path>
</svg>
```

> Editor's note: This website and examples use [Nunjucks](https://mozilla.github.io/nunjucks/) which itself is based off of [jinja2](https://jinja.palletsprojects.com/en/stable/), but Eleventy supports other templating languages like [Liquid](https://shopify.github.io/liquid/), [Handlebars](https://handlebarsjs.com/), or even HTML-likes such as Markdown/[MDX](https://mdxjs.com/) (more on that in a bit!)

Another important feature is [collections](https://www.11ty.dev/docs/collections/), which is Eleventy's mechanism for using external data in substitution. I'm skipping over a lot of detail on things like the [Data cascade system](https://www.11ty.dev/docs/data-cascade/), but the result is that it allows for that dynamic data at compile time I mentioned earlier. For example, here is how I define the work experience section in my resume:

```html-derivative
    { % for experience in resume.experience % }
        <div
            data-slot="card"
            class="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col my-4">
            <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6
                    has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <div data-slot="card-title" class="leading-none font-semibold text-xl">
                    { { experience.position } } @ { {experience.name} }
                </div>
                <div data-slot="card-description" class="text-muted-foreground text-md">
                    { { experience.timeEmployed } } in { {experience.location} }
                </div>
            </div>
            <div data-slot="card-content" class="px-6">
                <ul class="list-disc px-6">
                    { % for responsibility in experience.responsibilities % }
                        <li>{{responsibility}}</li>
                    { % endfor% }
                </ul>
            </div>
        </div>
    { % endfor % }
```

There is also more neat things that really improve experience like having much "cleaner" access to the templating pipelines. For example, I'd like to still use [Shiki](https://shiki.style) for syntax highlighting on these blog posts and have some custom syntax for defining images, so I don't have to write as much HTML boilerplate. I can not only define [plugins](https://www.11ty.dev/docs/create-plugin/), but I can also override the existing "template engine behavior" to use my custom logic for certain things. Obviously, this is more involved and requires looking at the [markdown-it](https://github.com/markdown-it/markdown-it) parsing docs to know how the Markdown syntax is transformed, but I personally found this easier to implement than whatever godforsaken Vite plugins I looked at:

```js
// Abbreviated from Source
// https://github.com/FaceFTW/faceftw.github.io/blob/f8365b140a233cfa5fc1e3a9cf1b357156fd489b/eleventy.config.mjs#L104-L173
eleventyConfig.amendLibrary('md', (/** @type {MarkdownIt}*/ mdLib) => {

	const highlight = (code, lang = 'text', attrs) => {
		//Handling Code Block Highlighting with Shiki
	};

	//Override the default render rule (irrevocably)
	mdLib.renderer.rules.fence = function (tokens, idx, _options, _env, slf) {
		const token = tokens[idx];
		const info = token.info ? mdLib.utils.unescapeAll(token.info).trim() : '';
		let fenceName = '';
		let fenceAttrs = '';

		if (info) {
			const arr = info.split(/(\s+)/g);
			fenceName = arr[0];
			fenceAttrs = arr.slice(2).join('');
		}

		if (fenceName === 'image') {
			const imgDetails = /src="(.*)",\s*([0-9]+)x([0-9]+)\n(.*)\n/.exec(token.content);
			const imgSrc = imgDetails[1];
			const imgWidth = imgDetails[2];
			const imgHeight = imgDetails[3];
			const imgCaption = imgDetails[4];

			return `<figure class="flex flex-col items-center text-center mb-4">
				<img src="${imgSrc}" ${slf.renderAttrs(token)} alt="${imgCaption}" width="${imgWidth}" height="${imgHeight}">
				<figcaption>${imgCaption}</figcaption>
			</figure>`;
		}

		const highlighted = highlight(token.content, fenceName, fenceAttrs);
		if (highlighted.indexOf('<pre') === 0) {
			return `${highlighted}\n`;
		}

		return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`;
	};
});
```

On the topic of plugins and extensibility, Eleventy allows providing extra steps to run before and after different parts of the build process. I use this for compiling my [Tailwind CSS](https://tailwindcss.com) configuration and minifying it. Although I made a really brute-force custom implementation because I could not find a working "professional" CSS minifier that doesn't break the compiled Tailwind file.

<blockquote class="bluesky-embed " data-bluesky-uri="at://did:plc:v2kfxvvmy3pdc4o4yw3buoyh/app.bsky.feed.post/3lvz7wyrckc25" data-bluesky-cid="bafyreiggdxerru7zdmgdvpntxc6irkz6hajhizz4zadpasckeybedojede" data-bluesky-embed-color-mode="system"><p lang="en">15 mins after posting this, I literally made it so close to the expected savings too:

#webdev<br><br><a href="https://bsky.app/profile/did:plc:v2kfxvvmy3pdc4o4yw3buoyh/post/3lvz7wyrckc25?ref_src=embed">[image or embed]</a></p>&mdash; Alex (<a href="https://bsky.app/profile/did:plc:v2kfxvvmy3pdc4o4yw3buoyh?ref_src=embed">@faceftw.dev</a>) <a href="https://bsky.app/profile/did:plc:v2kfxvvmy3pdc4o4yw3buoyh/post/3lvz7wyrckc25?ref_src=embed">August 9, 2025 at 10:22 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>


There is so much more I could gush on about, but I promised this would be shorter. The source code and Eleventy configuration resides in [this websites' repository](https://github.com/FaceFTW/faceftw.github.io) for anyone curious. So lets wrap up with some closing thoughts.

## "One Must Imagine Sisyphus Happy"

I have a problem where even if I finish a project, there is a high probability that at some point in the future I will look at it and not like how I designed it. One might say it's me getting smarter, others might say it's my perfectionism speaking. I personally see this as my ["inverse hedonic treadmill"](https://en.wikipedia.org/wiki/Hedonic_treadmill): I get satisfied for a bit, but then I see the flaws and want to fix it. With this migration, _I have greater confidence that this website will _not_ be migrating to a new system for the next 5+ years_ and that my inner Sisyphus will no longer need to keep pushing the rock up the hill.

This has felt like a "return to form" in some ways considering the original website being pure HTML/CSS. There is a lot of control that handcrafting CSS classes and layout which is lost once React and a UI library come into play; On the other hand time gets lost during design just from debugging raw CSS and layout shifts once it reaches a critical mass of definitions and handwritten markup. Removing React has also meant reconsidering certain design choices that were heavily reliant on client-side JS for ones that are more static: The homepage used to have a rotating carousel but is replaced with (a much nicer) card grid, accordion elements used on the resume and project cards have been removed and replaced with alternative layouts, and even the theme toggle was not consistent during testing and ultimately got nixed for the new gray theme. On the other hand, removing an entire ecosystem of components has drastically reduced the proportion that markup and JS takes with web deploys, with a total size of 2MB for static non-image content and practically no external JS on HTML loads.

Was this an impulsive decision? _Perhaps._ People these days don't seem to care that the things they use are starting to get more elaborate and complicated when in reality stepping back and doing the simpler thing may be the better option. Usually when I make something, I design the program to be _clear in intention_ and _respectful of the user's time_, principles often missing in software from some of the biggest companies of today. I'm tired of having to cut through the muck of buzzwords and poorly-thought UX. So as long as I have the power to make good software, I will.

---

Thanks for reading! I plan on taking a bit of a hiatus on `ref_cycling` because I jumped too deep into learning [NixOS](https://nixos.org) as part of some 3D printer modding. I have _no idea_ when that project will be finished in a state that I consider ready to talk about, and there is a lot to discuss about reproducibility and system management by software that I would need to research and make sure I get right.

Here is a sneak peek at what that has looked like:

```image
src="./nix_experiments.webp", 803x1071
You ever need to add a swap volume on an SD card just to get Linux to compile?
```

Until next time.