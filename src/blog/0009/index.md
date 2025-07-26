
---
postTitle: "SHUT UP Device, Part 3"
excerpt: "Oxidizing the project with embedded Rust"
date: "2024-09-01"
author: Alex Westerman
slug: '0009'
---

In the final post of this miniseries, it is now time to talk about [Rust](https://rust-lang.org) and its use in embedded projects like this one. If you don't already use it, you might know someone who won't shut up about how good it is; I'd like to think I'm not as annoying but here I am writing an entire blog post about embedded Rust usage. Overall, the focus of this post is centered around thinking about embedded programming and how Rust fixes or changes common footguns that usually exist in C/C++. There will be some tangents related to AVR and the Arduino platform since there are interesting "gotchas" that have to be accounted for when working on architectures like those. Some parts of this piece will be a bit opinionated, but I will try my best to make clear when I try to make subjective claims.

## Working with Embedded Rust

I've worked with [Arduino](https://arduino.cc) and bare-metal C in the past for a high-school senior project and during my short stint studying Computer engineering in college, so it wasn't a blind dive into a completely new field of programming. In summary, my experience [`no-std` Rust](https://docs.rust-embedded.org/book/intro/no-std.html) was not that much different from the embedded C I've used previously; Working with the same basic restrictions but having the Rust safety guarantees made most of the code straightforward. Not having to worry about the microcontroller-specific code with the [`embedded-hal` crate ecosystem](https://github.com/rust-embedded/embedded-hal?tab=readme-ov-file) and [Rahix's `avr-hal`](https://github.com/Rahix/avr-hal) was also similar to the Arduino "standard library" or using any MCU [Hardware Abstraction Layer (HAL)](https://en.wikipedia.org/wiki/Hardware_abstraction) written in C, just read datasheets and documentation for what to do.
Working with Rust means that some common practices in embedded like mutating global memory is not impossible but has more safeguards (and for good reasons). The use of `no-std` Rust also means that conveniences such as dynamic memory allocation and system I/O is not provided by Rust and has to have some manual implementation. While it is definitely convenient to have `Vec`s and `String`s that grow as needed, not all systems have the "luxury" of abundant RAM. This is especially true for the [ATMEGA328p](link) used in the Arduino: it only has 2KB of SRAM, magnitudes less memory than even a cheap Chromebook. Working within these rules feels like build something from a box of scraps in a cave; a worthwhile experience that gives appreciation to all the layers of abstraction that most software relies on.

Here are a couple of areas that I think Rust handles better than C:

## Saying `unsafe` Isn't a Bad Thing
One of the big selling points with Rust is the memory safety and [undefined behavior guarantees](rustref) it provides through the various compile-time checks and static analysis it does. However, a full in-depth static analysis of program safety would require evaluating if every low-level memory operation is "correct" in every possible way (including in hardware), which falls in similar territory of solving the [halting problem](wiki). This is not to say that static analysis isn't useful, rather that there are clear limits of the benefit that static analysis provides. Plus, there will always be an inherent need to do raw writes to memory especially in extremely low-level contexts like Hardware Abstraction Layers (HALs), [(UEFI) BIOS](wiki), or [bootloaders]().

To allow for some level of "safety" with sensitive operations, Rust allows them and disables _some_ of these checks with the `unsafe` keyword. However, only a very limited set of operations that `unsafe` allows. Per the [Rust Book Chapter 20.1 (as of writing)](rustbook):
>blockquote with rust details

Two of the aforementioned superpowers are focused on Rust semantics (which I will simply not acknowledge further for brevity), so there doesn't seem to be much "power" given. I thought `unsafe` would allow me to do the classic "shoot yourself in the foot and reload the gun" mistakes that C does.
//Insert Unsafe rust meme

The point of `unsafe` from my perspective is not just to allow these specific operations but to serve as a universal signal to _pay attention and check the operations yourself_. _**The compiler can still guarantee the same level of safety under the assumption that the programmer checked these few operations**_. In principle, it is similar to defining a system of axioms or "trivially true assertions" like in certain fields of mathematics (such as the classic [Axiom of choice](wiki) in  set theory) and performing proofs assuming the axioms hold true. Each `unsafe` block is like defining a new axiom that allows the Rust compiler to perform those checks based on those assertions. Admittedly, this is a double-edged sword: while it allows for proving most of the code is safe and doesn't cause [undefined behavior](rustdoc), it relies on _assertions_ that may fail. There are some checks at runtime (like bounds checking) that can be or are implemented at runtime to catch when some of these assertions fail, but the fundamental issue is similar with [reasoning that relies on axiomatic though](stackexchange).

In my opinion, the `unsafe` system is a fairly reasonable compromise that Rust makes to allow for the greatest flexibility while maintaining strong behavioral guarantees. While it would be awesome if every operation could be guaranteed to be [sound](rustdoc), providing such a comprehensive program check would fall in similar territory to [solving the Halting Problem](wiki): instead of being an algortihm that only determines if _any_ program stops, it would need to also be able to validate the entire state of each step in _any_ program. This analysis would need to also extend into black-box modules that may not be deterministic in behavior, but operate on explicit [behavioral "contracts"](wiki) that provide guidelines on behavior; I/O operations such as disk reads/writes and networking are very good examples of black boxes with a behavioral contract (usually provided by an OS, but even that would likely rely on it's own set of contracts!). In cases like those where [control flow](wiki) isn't obvious to Rust for some reason (external or [Foreign Function Interface](wiki) (FFI) code, OS abstraction, etc.) but has a governing contract that a programmer can validate, `unsafe` shines as a useful tool to all parties.

> Editor's Note (can you tell I took some philosophy courses in college?),

> Are There Other Alternatives To This Approach?
> This is not the full point of the article, but it is worth acknowledging since there are a couple of other ideas around memory safety, one of the more recent ones that caught my attention was [Fil-C](link)
>TODO describe Fil-C and how it differs from the Rust approach of a completely different language/stdlib

So how does `unsafe` help with embedded? Global Variables and Interrupts. [Throwback to the first post](link) talking about how the buzzer worked touched on the concept of [interrupts](wiki) which require jumping into a completely different place in code and (in some cases) modifying global state. There are several involved steps with saving registers and return pointers that if not followed can easily cause the program to produce undefined behavior. In addition, the potential issues with manipulating global memory in _any_ context is far worse overall. Consider the following example:

```c
#include <stdio.h>

int x = 1234;
int *bad_ptr = &x; //Has the address of x

// Assume there is some method that accidentally clears this
void bad_op(int *p){
// Some chicanery happens before that causes this ...
    p = 0;
}

int main() {
    bad_op(bad_ptr); // Oh no! Some operation cleared the pointer
    int i = *bad_ptr; //Segfault!!!
    printf("%d\n", i);
    return 0;
}
```
Admittedly, this is somewhat contrived but clearly demonstrates how manipulating globals is "unsound" in Rust terms. Especially when juggling pointers to [singleton—like](wiki-singleton-pattern) resources, there are less safeguards compared to an OOP runtime like the JVM: there is no way to assume initialization though something like a [`static` keyword](javadoc), and accessing a null or freed pointer may not crash the program and cause havoc. To add a wrench in the gears: consider the following change to the declaration to `bad_op`:

```c
// There are docs explaining what bad_op does, but
//no full explanation of what happens under the hood!
extern "C" void bad_op(int *p);
```
Suddenly, there is no way to have a complete map of the program's control flow. Whenever `bad_op` is called, at that point the program is "letting God take the wheel" and will only operate properly if `bad_op` says what it does. This is especially true when considering functions that produce "side effects" during execution as that also affects control flow in less obvious ways. Going back to the embedded and low-level world, _interrupts are effectively black box functions that produce side effects_ by the definition of the term. A well-behaved interrupt like a black box module will have a defined behavioral contract that can be verified by humans. For the Rust compiler, it can compile the interrupt code, link it, and put it in the correct program section to have it triggered, but it can't verify that _running the interrupt won't cause undefined behavior in the program_, so it requires it to be marked as `unsafe`. In the case of the project, since this interrupt modifies a global memory region dedicated to controlling I/O pin output, all the operations interacting _directly_ with the memory is also marked as `unsafe` to indicate that control flow should be verified at this point.

//Insert Interrupt / mem Access code

One last note is that since `unsafe` can be designated to single operations or blocks of code, it allows ways to provide "safe abstractions" for inherently unsafe operations. Whether it be through error handling or propgation with `Result<T,E>`, it allows for limiting the scope of the "`unsafe` superpowers" granted to code and still lets Rust provide strong safety guarantees for the remainder of the codebase. Think of this idea of "safe abstractions" similar to the bounds checking version of `strcpy`, `strncpy`: functionally they do the same operation but `strncpy` adds safety by only copying up to the size of the destination buffer.
## APIs that Work Without `alloc`

One of the biggest abstractions that is taken for granted is a "global" [allocator]() for a heap memory segment. While it _is_ possible to define a custom allocator in Rust (there are crates dedicated to various implementations, even for `std` Rust), it does not make sense to implement a 1KB or smaller heap space to store things. There are no large buffers or too many small structs to manage in the program anyway, so there is no reason to do that extra work. But how does one make `String`s and `Vec`s work without a heap?

Enter the [`heapless`](https://crates.io/crate/heapless) crate, which is actually maintained by the Rust Library Team. It provides implementations of `String` and `Vec` and other useful types that would normally require a heap with the catch that _the size of the underlying arrays are defined and constant._ With only the stack being available as the program's storage, resizing `Vec` and other types is basically impossible without black magic and potentially causing undefined behavior. Using the stack of plates analogy, it would be like lifiing a whole part of the plate stack just to insert a few extra plates, with the limitation that you can only _insert one plate at a time_.

//Insert cute little drawing here

The way the `heapless` crate is able to provide a common and "safe" abstraction over some buffer space is a great convenience to use the various string utilities in the Rust standard library, where compared to C it's just working with `char *` and `snprintf` for the most part. The appeal for me is not just the API being designed to cover the use-cases one would need in the context of embedded, but the peace of mind that I don't need to put as much thought into how much RAM and storage that code would use*. At least for _most_ of the code in this project.> The Zig Question,
> A known pain point of Rust is the difficulty of using [custom allocators](rfc?) instead of choosing between no allocator or the default used by the linked ABI. I haven't really looked too far into this area of Rust given this project did not need an allocator, but I thought it was good to look into [Zig](https://ziglang.org) since its standard library features a well-defined [allocator interface](zig.guide/link) that is definitely much more fleshed out.
> Zig is not a bad language by any means and offers some things that I wish Rust had; The [comptime](zigdocs) system in the Zig compiler is interesting from a design concept and might be useful in [shell-toy's inlining system](github) instead of the build script and conditional compilation rooted throughout that part of the project. But there are several things that give me hesitance to try and pick it up for making things. As of writing this, the language is not "stable", Windows support is still a Tier 2 target (yes I daily drive Windows, sue me), and _there are still memory management footguns._ For more about Zig's memory safety, I highly recommend this [excellent post by Jamie Brandon on Zig's memory safety](scattered_thoughts-link), which was a great find when looking into the topic.
> I don't think Zig is a bad language or a bad "solution" to making a safer C replacement, but I'm not immediately sold on it. In my opinion, the Rust approach to limit the amount of dubious memory management choices made by the programmer through language conventions, compiler design, and backing mathematic proof (through the type system) is more effective at solving the problem. There are definitely issues with Rust such as a steep initial learning curve, some of the compile sizes in debug modes (which is discussed in the next section), and the complexity of `async` that remains to be solved, but these aren't ignored issues like [Go's error boilerplating that makes it a pain to read.](bloglink)
> TL;DR: Zig is interesting but Rust is more "solid" for greater uses in my opinion.

## A Better System to Think about Error Handling

To start this discussion, I want to tangent on [Golang (or Go)](link) since they claimed to solve the error handling problem and it is used in quite a bit of important software like Docker. I considered learning Go instead of Rust when trying to branch out from C#, but among the other issues I had with the language design ultimately I was offput with this specific design choice that made no sense to me.
Go's design philospohy for error handing is peculiar and seems shortsighted. My understanding is that errors are a core _interface_ (not a concrete type), and are added to function returns in the form of tuples for error-handling by definition. However, there seem to be some aspects of this system that to me (from an outside view) seem like footguns: [Go interfaces being type/value combinations means `nil` errors _by value_ are not equivalent to `nil`],  [Specific error implementations aren't statically identified and are checked via runtime type assertions](godoc), and the prevalent use of a "null check" for error handling code is something that I'm not as comfortable throwing around. Plus, [the Go maintainers will no longer accept recommendations to improve the boilerplating that can cause deep `if err != nil` nesting](), indicating they think it is a "solved" issue. I don't disagree that the exception system in Java/C# is not  robust for error handling, but I don't think Go presents the best solution in this regard.

Rust has a very good high-level system for representing different kinds of "error conditions": `Option<T>` provides a system for indicating the potential for values to not exist without using "nulls", `Result<T,E>` and the `std::error::Error`  trait are the workhorses for representing fallible operations, and the panic system via the `panic!()` macro acts as an escape hatch that will call defined `Drop` implementations (i.e. destructors) to cleanup resources before aborting the program or recovering to a specific point in the stack[*](section). All of these are powered by the Rust version of enums, which allow for having associated data for each variant. [Rust represents each variant of an enum via discriminant value](), which most likely acts as a tag for a [disjoint union type](wiki) sized to the largest associated data structure. From a type system perspective, this provides "safe polymorphism" at compile-time that OOP interfaces struggle with at runtime: there is a very easy check on if something is `Some` or `None` under the hood _and_ it's checked and optimized by the Rust compiler; For lack of a better description these are "strong" type definitions of value existence and operation success respectively, which removes significant footguns compared with having to null-check everything.

However, just having good types representing errors is not enough, APIs interacting with those types need to be good as well. This is another instance where the Rust standard library still knocks it out of the park with thoughtful API considerations. There are so many ways to interact with `Option` and `Result<T,E>` in code to perform different types of error handling that are useful in different contexts. Here are just a few examples:

```TODO WRITE CODE HERE
```

Aside from the "internal error handling tools" that Rust provides, the other interesting one is through the ability to [panic]. In general, the philosophy of "panicking" in a program is to indicate an unrecoverable state that requires user intervention. At the OS level, this is equivalent to the Blue Screen of Death on Windows or a Kernel Panic on all the Unixes. Rust provides a `panic!` macro in the standard library that (depdening on project configuration) either aborts the program or [unwinds the stack](wiki) to a recoverable state*. As the lowest tier of the "Rust error handling model", it is practically the "eject button" of program execution and should be used _sparingly_ ([as per general recommendations]). While there is an ability to implement a custom panic handler (which is important for contexts like `no_std` which require batteries), the default panic handler is implemented such that it provides the point in code that panicked and a message about the panic. Instead of tryingt to figure out which line in a lamda expression caused the `NullPointerException` in your Java/Kotlin, you can jump straight to debugging more often.
```rust playground panic example
```
> Editor's Note about the Asterisks related to unwinding
> When doing research on panic handling in Rust, I found this section in the Rustnomicon (the spooky advanced Rust documentation) that discusses [how Rust actually handles unwinding](nomicon). Without diving too much into nuances, the short story is that Rust optimizes `panic!()`s under the assumption that the result of the unwind is to abort the program, making a partial unwind a [cold path](). It is possible to catch an unwind, but it is more expensive than just crashing the program. While it is not suitable to use panic unwinding for error handling in Rust, panicking overall is still important because of that "eject-button" like capability for catastrophic failures.

So yes, the Rust way of error-handling is really good and not stupid like Go (Java gets some slack because it was invented before we had modern programming language theory). However, I came across an interesting drawback of Rust's panic system: it's really heavy for small microcontrollers.

### Handling Panics is Expensive
When trying to do some debugging of the microcontroller and figuring out why the display code was not working, I intentionally inserted some panics in states I knew were bad. Since I didn't want to spend an exorbanant amount of money for an AVR debugger, this was the best solution I could do, since adding serial printing in that code was more trouble than it was worth. So I wrote the following custom panic handler (originally it was just set to a handler that directly aborts the program).:

TODO INSERT PANIC HANDLER

So I hit compile, and a bizzare error popped up.

TERMINAL OUTPUT HERE

That seemed a bit weird that the RAM section was considered full. So I ran `objdump` on the original code to check how much RAM the program was actually using:

OUTPUT HERE

That... means that the panic handler is using like 50% of the RAM? Sure it's 1KB but on a microcontroller like this which only has 2KB that is quite literally a luxury. After figuring out a different debugging method that involved flipping different LEDs on depending on the issue, I still was curious why the panic handler used so much RAM. My gut said it might have to do with the fact that the panic stores information about where in the code it panicked, which could be a sizable amount of metadata based on what is in the `TODOSTRUCTNAME` struct passed with each panic

STRUCT DEF  HERE


This was an interesting hiccup that wouldn't deter me from using Rust with Arduino-like microcontrollers that are resource constrained. Rather I'll just be a bit more mindful with what I'm using with the memory I get.

## Why Yes I Like Rust How Can You Tell
Learning Rust has been a real treat and made me enjoy programming so much more, not just in hobby projects like this but also at work. Whenever I read or write Rust code, I think so much more about _what I want the program_ to do and not as much about trying to fix a memory leak or about how the JVM does certain native allocations. There are so many other things like [Rust compiler errors](meme), the functional programming aspect, the [`Iterator` trait and those APIs](), [Cargo as a first-class project building tool](), and the [extensive documentation]() that I could gush about, but these three topics were the ones I thought were the most useful for embedded development, even for a hobby project. I will continue to advocate for Rust adoption in new projects personal and professional unless something better comes out.

## But wait, what about the whole point of this series
To summarize the success of the SHUT UP device, that's a different story: it kinda made the problem worse. See, I lacked the foresight that League of Legends is a game that easily produces rage moments. Each time would trigger the device, which only made my brother vent his frustrations louder (to both mine and my parent's dismay), making the problem worse. He definitely _heard_ the device, but clearly Riot Games has made virtual crack cocaine that makes external stimuli gasoline in the fires of gamer rage.

So the breadboard currently sits on the shelf with all the other microcontrollers and gizmos in the basement. I've considered soldering everything into a protoboard (with a microntoller header mount so it's reusable) to "commemorate" this silly little project, but that is not as high of a priority in life right now. The [code is available](link), so if you have the components you can remake the project and lose even more sleep as a result.

The next post will be about a completely different field in the world of computers: Web Design. In the middle of finishing this post, I had the brilliant idea to remove 99.9% of the Javascript used by migrating to [Eleventy] and true static site generation. It was an interesting enough experience and also a worthy discussion to have in a time where "bloat" in software is considered acceptable when it really shouldn't. Hopefully it doesn't take as long to write as this series did. I can't believe it's already the end of July.

Until next time. Stay Based