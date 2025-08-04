---
postTitle: "SHUT UP Device, Part 3"
excerpt: "Oxidizing the project with embedded Rust"
date: "2025-07-31"
author: Alex Westerman
slug: '0009'
postThumbnail: "blog_thumb_009.webp"
postThumbnailAlt: "I put Rust in What?????? Includes art from Barnaby Walters (https://waterpigs.co.uk)"
keywords: ",Rust, embedded systems, arduino, project, github, c, zig, go"
---

```image
src="./blog_thumb_009.webp", 1071x794
I put Rust in what??????? Includes art from Barnaby Walters (<a href="https://waterpigs.co.uk/notes/5UrMgn/">https://
waterpigs.co.uk</a>)
```

In the final post of this miniseries, it is now time to talk about [Rust](https://rust-lang.org) and its use in embedded projects like this one. If you don't already use it, you might know someone who won't shut up about how good it is; I'd like to think I'm not as annoying but here I am writing an entire blog post about embedded Rust usage. Overall, the focus of this post is centered around thinking about embedded programming and how Rust fixes or changes common footguns that usually exist in C/C++. There will be some tangents related to AVR and the Arduino platform since there are interesting "gotchas" that have to be accounted for when working on architectures like those. Some parts of this piece will be a bit opinionated, but I will try my best to make clear when I try to make subjective claims.

## Working with Embedded Rust

I've worked with [Arduino](https://arduino.cc) and bare-metal C in the past for a high-school senior project and during my short stint studying Computer engineering in college, so it wasn't a blind dive into a completely new field of programming. In summary, my experience [`no-std` Rust](https://docs.rust-embedded.org/book/intro/no-std.html) was not that much different from the embedded C I've used previously; Working with the same basic restrictions but having the Rust safety guarantees made most of the code straightforward. Not having to worry about the microcontroller-specific code with the [`embedded-hal` crate ecosystem](https://github.com/rust-embedded/embedded-hal?tab=readme-ov-file) and [Rahix's `avr-hal`](https://github.com/Rahix/avr-hal) was also similar to the Arduino "standard library" or using any MCU [Hardware Abstraction Layer (HAL)](https://en.wikipedia.org/wiki/Hardware_abstraction) written in C, just read datasheets and documentation for what to do.

Working with Rust means that some common practices in embedded like mutating global memory is not impossible but has more safeguards (and for good reasons). The use of `no-std` Rust also means that conveniences such as dynamic memory allocation and system I/O is not provided by Rust and has to have some manual implementation. While it is definitely convenient to have `Vec`s and `String`s that grow as needed, not all systems have the "luxury" of abundant RAM. This is especially true for the [ATMEGA328p](https://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061A.pdf) used in the Arduino: it only has 2KB of SRAM, magnitudes less memory than even a cheap Chromebook. Working within these rules feels like build something from a box of scraps in a cave; a worthwhile experience that gives appreciation to all the layers of abstraction that most software relies on.

Here are a couple of areas that I think Rust handles better than C:

## Saying `unsafe` Isn't a Bad Thing

One of the big selling points with Rust is the memory safety and [undefined behavior guarantees](https://doc.rust-lang.org/reference/behavior-considered-undefined.html) it provides through the various compile-time checks and static analysis it does. However, a full in-depth static analysis of program safety would require evaluating if every low-level memory operation is "correct" in every possible way (including in hardware), which falls in similar territory of solving the [halting problem](https://en.wikipedia.org/wiki/Halting_problem). This is not to say that static analysis isn't useful, rather that there are clear limits of the benefit that static analysis provides. Plus, there will always be an inherent need to do raw writes to memory especially in extremely low-level contexts like Hardware Abstraction Layers (HALs), [(UEFI) BIOS](https://en.wikipedia.org/wiki/UEFI), or [bootloaders](https://en.wikipedia.org/wiki/Bootloader).

To allow for some level of "safety" with sensitive operations, Rust allows them and disables _some_ of these checks with the `unsafe` keyword. However, only a very limited set of operations that `unsafe` allows. Per the [Rust Book Chapter 20.1 (as of writing)](https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html#unsafe-superpowers):

> You can take five actions in unsafe Rust that you can’t in safe Rust, which we call unsafe superpowers. Those superpowers include the ability to:
>
> - Dereference a raw pointer
> - Call an unsafe function or method
> - Access or modify a mutable static variable
> - Implement an unsafe trait
> - Access fields of a union

Two of the aforementioned superpowers are focused on Rust semantics (which I will simply not acknowledge further for brevity), so there doesn't seem to be much "power" given. I thought `unsafe` would allow me to do the classic "shoot yourself in the foot and reload the gun" mistakes that C does.

```image
src="unsafe_rust.JPG", 494x494
Watch out, Ferris has a gun!!!
```

The point of `unsafe` from my perspective is not just to allow these specific operations but to serve as a universal signal to _pay attention and check the operations yourself_. _**The compiler can still guarantee the same level of safety under the assumption that the programmer checked these few operations**_. In principle, it is similar to defining a system of axioms or "trivially true assertions" like in certain fields of mathematics (such as the classic [Axiom of choice](https://en.wikipedia.org/wiki/Axiom_of_choice) in set theory) and performing proofs assuming the axioms hold true. Each `unsafe` block is like defining a new axiom that allows the Rust compiler to perform those checks based on those assertions. Admittedly, this is a double-edged sword: while it allows for proving most of the code is safe and doesn't cause [undefined behavior](https://doc.rust-lang.org/reference/behavior-considered-undefined.html), it relies on _assertions_ that may fail. There are some checks at runtime (like bounds checking) that can be or are implemented at runtime to catch when some of these assertions fail, but the fundamental issue is similar with [reasoning that relies on axiomatic though](https://philosophy.stackexchange.com/a/106865).

In my opinion, the `unsafe` system is a fairly reasonable compromise that Rust makes to allow for the greatest flexibility while maintaining strong behavioral guarantees. While it would be awesome if every operation could be guaranteed to be ["sound"](https://rust-lang.github.io/unsafe-code-guidelines/glossary.html#soundness-of-code--of-a-library). But to be useful, this analysis would need to also extend into black-box modules that may not be deterministic in behavior, but operate on explicit [behavioral "contracts"](https://en.wikipedia.org/wiki/Design_by_contract) that provide guidelines on behavior; I/O operations such as disk reads/writes and networking are very good examples of black boxes with a behavioral contract (usually provided by an OS, but even that would likely rely on its own set of contracts!). In cases like those where [control flow](https://en.wikipedia.org/wiki/Control_flow) isn't obvious to Rust for some reason (external or [Foreign Function Interface](https://en.wikipedia.org/wiki/Foreign_function_interface) (FFI) code, OS abstraction, etc.) but has a governing contract that a programmer can validate, `unsafe` shines as a useful tool to all parties.

> Editor's Note (can you tell I took some philosophy courses in college?)

> ### Are There Other Alternatives To This Approach?
>
> This is not the full point of the article, but it is worth acknowledging since there are a couple of other ideas around memory safety, one of the more recent ones that caught my attention was [Fil-C](https://github.com/pizlonator/llvm-project-deluge)
>
> As a solution, Fil-C flips the problem of memory safety in C/C++ as one that could be solved by providing extra metadata to pointers and a runtime. It is similar to what Rust does with [_raw_ pointer provenance](https://doc.rust-lang.org/std/ptr/index.html#provenance) that indicate memory access and an underlying runtime to validate those accesses. But (from my reading of the documentation), unlike Rust, Fil-C instead enforces these checks at _runtime_ whereas Rust does a mix of both (i.e. borrow checker is compile-time, bounds checking is coded for runtime). As a solution for complex and existing codebases to achieve memory safety, this is a reasonable step to take, but currently it is fairly limited.
>
> According to the Fil-C README (as of writing), the additional runtime checks make compiled programs "1.5x slower than normal C in good cases, and about 4x slower in the worst cases" ([source](https://github.com/pizlonator/llvm-project-deluge/blob/c2a43556484cd10d746d1be826f8ea02ff67b928/Manifesto.md?plain=1#L97)). It is also currently limited to x86-64 Linux only, which is a smaller area of support compared to writing it in Rust (or other languages like Java where it runs wherever the JVM does). I also have concerns with register usage since "pointers in flight [...] utilize two registers" ([source](https://github.com/pizlonator/llvm-project-deluge/blob/c2a43556484cd10d746d1be826f8ea02ff67b928/Manifesto.md?plain=1#L18-L20)), which for smaller microcontrollers is a constrained resource that is not as abundant as a modern processor.
>
> Regardless of the current criticisms I have with the project, these are areas that are being researched and improved on actively. While I am more Rust-pilled now as someone who came from a C background, I still appreciate projects like Fil-C because it gives a novel approach to memory safety that doesn't involve rewriting full projects. Another important mention in that category is [Valgrind](https://valgrind.org/), which I've used multiple times in college and projects to catch leaks and bad allocations. The more options to make safe and maintainable software, the better.

So how does `unsafe` help with embedded? Global Variables and Interrupts. [Throwback to the first post](https://faceftw.dev/blog/0007) talking about how the buzzer worked touched on the concept of [interrupts](https://en.wikipedia.org/wiki/Interrupt) which require jumping into a completely different place in code and (in some cases) modifying global state. There are several involved steps with saving registers and return pointers that if not followed can easily cause the program to produce undefined behavior. In addition, the potential issues with manipulating global memory in _any_ context is far worse overall. Consider the following example:

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
Admittedly, this is somewhat contrived but clearly demonstrates how manipulating globals is "unsound" in Rust terms. Especially when juggling pointers to [singleton—like](https://en.wikipedia.org/wiki/Singleton_pattern) resources, there are fewer safeguards compared to an OOP runtime like the JVM: there is no way to assume initialization though something like a [`static` keyword](https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.3.1.1), and accessing a null or freed pointer may not crash the program and cause havoc. To add a wrench in the gears: consider the following change to the declaration to `bad_op`:

```c
// There are docs explaining what bad_op does, but
// no full explanation of what happens under the hood!
extern "C" void bad_op(int *p);
```
Suddenly, there is no way to have a complete map of the program's control flow. Whenever `bad_op` is called, at that point the program is "letting God take the wheel" and will only operate properly if `bad_op` says what it does. This is especially true when considering functions that produce "side effects" during execution as that also affects control flow in less obvious ways. Going back to the embedded and low-level world, _interrupts are effectively black box functions that produce side effects_ by the definition of the term. A well-behaved interrupt like a black box module will have a defined behavioral contract that can be verified by humans. For the Rust compiler, it can compile the interrupt code, link it, and put it in the correct program section to have it triggered, but it can't verify that _running the interrupt won't cause undefined behavior in the program_, so it requires it to be marked as `unsafe`. In the case of the project, since this interrupt modifies a global memory region dedicated to controlling I/O pin output, all the operations interacting _directly_ with the memory is also marked as `unsafe` to indicate that control flow should be verified at this point.

```rust
//SAFETY: Only used for the buzzer, no multi-buzzer setup expected
static mut BUZZER_PIN_PORT: *mut u8 = core::ptr::null_mut(); //Set early in main
const BUZZER_PIN_MASK: u8 = 0b00000010; //Mask for pin 9a

//This defines an interrupt related to the buzzer function of the project
//Notice how it modifies global memory, this change persists across
//the interrupt context change!
#[avr_device::interrupt(atmega328p)]
fn TIMER2_COMPA() {
    unsafe {
        *BUZZER_PIN_PORT ^= BUZZER_PIN_MASK; //toggle the port
    }
}

```

One last note is that since `unsafe` can be designated to single operations or blocks of code, it allows ways to provide "safe abstractions" for inherently unsafe operations. Whether it be through error handling or propagation with `Result<T,E>`, it allows for limiting the scope of the "`unsafe` superpowers" granted to code and still lets Rust provide strong safety guarantees for the remainder of the codebase. Think of this idea of "safe abstractions" similar to the bounds checking version of `strcpy`, `strncpy`: functionally they do the same operation but `strncpy` adds safety by only copying up to the size of the destination buffer.


## APIs that Work Without `alloc`

One of the biggest abstractions that is taken for granted is a "global" [allocator](https://en.wikipedia.org/wiki/Allocator_(C%2B%2B)) for a heap memory segment. While it _is_ possible to define a custom allocator in Rust (there are crates dedicated to various implementations, even for `std` Rust), it does not make sense to implement a 1KB or smaller heap space to store things. There are no large buffers or too many small structs to manage in the program anyway, so there is no reason to do that extra work. But how does one make `String`s and `Vec`s work without a heap?

Enter the [`heapless`](https://crates.io/crate/heapless) crate, which is actually maintained by the Rust Library Team. It provides implementations of `String` and `Vec` and other useful types that would normally require a heap with the catch that _the size of the underlying arrays are defined and constant._ With only the stack being available as the program's storage, resizing `Vec` and other types is basically impossible without black magic and potentially causing undefined behavior. Using the stack of plates analogy, it would be like lifting a whole part of the plate stack just to insert a few extra plates, with the limitation that you can only _insert one plate at a time_.

The way the `heapless` crate is able to provide a common and "safe" abstraction over some buffer space is a great convenience to use the various string utilities in the Rust standard library, where compared to C it's just working with `char *` and `snprintf` for the most part. The appeal for me is not just the API being designed to cover the use-cases one would need in the context of embedded, but the peace of mind that I don't need to put as much thought into how much RAM and storage that code would use*. At least for _most_ of the code in this project.

> ### The Zig Question
>
> A known pain point of Rust is the difficulty of using [custom allocators](https://github.com/rust-lang/rfcs/blob/master/text/1398-kinds-of-allocators.md) instead of choosing between no allocator or the default used by the linked ABI. I haven't really looked too far into this area of Rust given this project did not need an allocator, but I thought it was good to look into [Zig](https://ziglang.org) since its standard library features a well-defined [allocator interface](https://zig.guide/standard-library/allocators) that is definitely much more fleshed out.
>
> Zig is not a bad language by any means and offers some things that I wish Rust had; One big feature is the [comptime](https://zig.guide/language-basics/comptime/) system in the Zig compiler is interesting from a design concept and might be useful in [shell-toy's inlining system](https://github.com/FaceFTW/shell-toy/blob/main/build.rs) instead of the build script and conditional compilation rooted throughout that part of the project. But there are several things that give me hesitance to try and pick it up for making things. As of writing this, the language is not "stable", Windows support is still a Tier 2 target (yes I daily drive Windows, sue me), and _there are still memory management footguns._ For more about Zig's memory safety, I highly recommend this [excellent post by Jamie Brandon on Zig's memory safety](https://www.scattered-thoughts.net/writing/how-safe-is-zig/), which was a great find when looking into the topic.
>
> I don't think Zig is a bad language or a bad "solution" to making a safer C replacement, but I'm not immediately sold on it. In my opinion, the Rust approach to limit the amount of dubious memory management choices made by the programmer through language conventions, compiler design, and backing mathematic proof (through the type system) is more effective at solving the problem. There are definitely issues with Rust such as a steep initial learning curve, some of the binary sizes in debug modes (which is touched on in the next section), and the complexity of `async` that remains to be solved, but these aren't ignored issues like [Go's error boiler-plating that makes it a pain to read.](https://go.dev/blog/error-syntax)
>
> TL;DR: Zig is interesting, but Rust is more "solid" for greater uses in my opinion.

## A Better System to Think about Error Handling

To start this discussion, I want to tangent on [Golang (or Go)](https://go.dev) since they claimed to solve the error handling problem, plus it is used in quite a bit of important software like Docker. I considered learning Go instead of Rust when trying to branch out from C#, but among the other issues I had with the language design ultimately I was off-put with this specific design choice that made no sense to me.

Go's design philosophy for error handing is peculiar and seems shortsighted. My understanding is that errors are a core _interface_ (not a concrete type), and are added to function returns in the form of tuples for error-handling by definition. However, there seem to be some aspects of this system that to me (from an outside view) seem like footguns: [Go interfaces being type/value combinations means `nil` errors _by value_ are not equivalent to `nil`](https://go.dev/doc/faq#nil_error), [Specific error implementations aren't statically identified and are checked via runtime type assertions](https://go.dev/doc/effective_go#errors), and the prevalent use of a "null check" for error handling code is something that I'm not as comfortable throwing around. Plus, [the Go maintainers will no longer accept recommendations to improve the boiler-plating that can cause deep `if err != nil` nesting](https://go.dev/blog/error-syntax), indicating they think it is a "solved" issue. I don't disagree that the exception system in Java/C# is not robust for error handling, but I don't think Go presents the best solution in this regard.

Rust has a very good high-level system for representing different kinds of "error conditions": `Option<T>` provides a system for indicating the potential for values to not exist without using "nulls", `Result<T,E>` and the `std::error::Error` trait are the workhorses for representing fallible operations, and the panic system via the `panic!()` macro acts as an escape hatch that will call defined `Drop` implementations (i.e. destructors) to clean up resources before aborting the program or recovering to a specific point in the stack[*](#editors-note-about-the-asterisks-related-to-unwinding). All of these are powered by the Rust version of enums, which allow for having associated data for each variant. [Rust represents each variant of an enum via discriminant value](https://doc.rust-lang.org/reference/items/enumerations.html#discriminants), which most likely acts as a tag for a [union](https://en.wikipedia.org/wiki/Union_type) sized to the largest associated data structure. From a type system perspective, this provides "safe polymorphism" at compile-time that OOP interfaces struggle with at runtime: there is a very easy check on if something is `Some` or `None` under the hood _and_ it's checked and optimized by the Rust compiler; For lack of a better description these are "strong" type definitions of value existence and operation success respectively, which removes significant footguns compared with having to null-check everything.

However, just having good types representing errors is not enough, APIs interacting with those types need to be good as well. This is another instance where the Rust standard library still knocks it out of the park with thoughtful API considerations. There are so many ways to interact with `Option` and `Result<T,E>` in code to perform different types of error handling that are useful in different contexts. Here are just a few examples:

```rust
//Some definitions for the examples
struct CustomError(String)
impl std::error::Error for CustomError{/*impl*/}

fn fallible_op_a() -> Result<u32, CustomError> {/*impl*/}
fn fallible_op_b() -> Result<u32, CustomError> {/*impl*/}
fn fallible_op_c() -> Result<bool, CustomError> {/*impl*/}


// match statements make error handling look more like
// branches instead of null checking
fn match_example(){
	match fallible_op_a(){
		Ok(val) => /* do something with val*/,
		Err(err) => println!("{err:#?}")
	}
}

// If you have multiple points an error can occur but want the caller
// to handle it, just use the ? syntax, which is just sugar that expands to
// a match or if-let statement where the Err branch returns the error
fn propogation_example() -> Result<u32, CustomError>{
	let val_1 = falliable_op_a()?; //Unwraps to a u32, or returns contained Error
	let val_2 = falliable_op_b()?; //ditto

	val_1 + val_2
}

// The Result/Option APIs include several functions that act as boolean operators
// transforming the returned value/error based on the variant returned.
//
// This case wants to always return the result of Op_B, but
// there may be cases where Op_A should be tried and fallback to Op_B on failure.
fn result_api_example() -> Result<u32, CustomError>{
	falliable_op_c().and_then(|val| match val {			//Op_C is required to know if we run Op_A at all
		true => falliable_op_a().or(falliable_op_b()),	//Try A, return A if Ok(), else return B regardless
		false => failliable_op_b(),
	})
}


// Rust by Example has a bunch of good examples with how Result<T,E>
// can be used with iterators to do error handling in loops:
// https://doc.rust-lang.org/rust-by-example/error/iter_result.html
// This example is taken from there
//
// For reference: <String>::parse<T> returns Result<T,E>
fn iter_example(){
    let strings = vec!["tofu", "93", "18"];
    let numbers: Vec<_> = strings
        .into_iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("Results: {:?}", numbers);
}

```

Aside from the "internal error handling tools" that Rust provides, the other interesting one is through the ability to [panic]. In general, the philosophy of "panicking" in a program is to indicate an unrecoverable state that requires user intervention. At the OS level, this is equivalent to the Blue Screen of Death on Windows or a Kernel Panic on all the Unixes. Rust provides a `panic!` macro in the standard library that (depending on project configuration) either aborts the program or [unwinds the stack](https://learn.microsoft.com/en-us/cpp/cpp/exceptions-and-stack-unwinding-in-cpp?view=msvc-170) to a recoverable state[*](#editors-note-about-the-asterisks-related-to-unwinding). As the lowest tier of the "Rust error handling model", it is practically the "eject button" of program execution and should be used _sparingly_ ([as per general recommendations]). While there is an ability to implement a custom panic handler (which is important for contexts like `no_std` which require batteries), the default panic handler is implemented such that it provides the point in code that panicked and a message about the panic. Instead of trying to figure out which line in a lambda expression caused the `NullPointerException` in your Java/Kotlin, you can jump straight to debugging more often.

```rust
//You can run this example on Rust Playground!:
//https://play.rust-lang.org/?version=stable&mode=debug&edition=2024&gist=d69ae9caa1f8957725a74f36b61f50c0

//Applies a function to a value
fn consume_lambda<T>(func: T, val: u32) -> u32
where
    T: Fn(u32) -> u32,
{
    func(val)
}

fn main() {
    let arr: [u32; 4] = [1, 2, 3, 4];

    arr.into_iter().reduce(|_, val| {
        consume_lambda(
            |x| match x == 3 {
                true => panic!("I can't count to three!"),
                false => x,
            },
            val,
        )
    });
}

// This is the output of this program
//
// thread 'main' panicked at src/main.rs:15:25:
// I can't count to three!
// note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

> ### Editor's Note about the Asterisks related to unwinding
>
> When doing research on panic handling in Rust, I found this section in the Rustnomicon (the spooky advanced Rust documentation) that discusses [how Rust actually handles unwinding](https://doc.rust-lang.org/nomicon/unwinding.html). Without diving too much into nuances, the short story is that Rust optimizes `panic!()`s under the assumption that the result of the unwind is to abort the program, making a partial unwind a [cold path](https://stackoverflow.com/questions/68947219/what-is-fast-path-slow-path-hot-path). It is possible to catch an unwind, but it is more expensive than just crashing the program. While it is not suitable to use panic unwinding for error handling in Rust, panicking overall is still important because of that "eject-button" like capability for catastrophic failures.

So yes, the Rust way of error-handling is excellent and not stupid like Go (Java gets some slack because it was invented before we had modern programming language theory). However, I came across an interesting drawback of Rust's panic system: it's really heavy for small microcontrollers.

### Handling Panics is Expensive
When trying to do some debugging of the microcontroller and figuring out why the display code was not working, I intentionally inserted some panics in states I knew were bad. Since I didn't want to spend an exorbitant amount of money for an AVR debugger, this was the best solution I could do, since adding serial printing in that code was more trouble than it was worth. So I wrote the following custom panic handler (originally it was just set to a handler that directly aborts the program).:

```rust
#[panic_handler]
fn panic(info: &core::panic::PanicInfo) -> ! {
    // disable interrupts - firmware has panicked so no ISRs should continue running
    avr_device::interrupt::disable();

	// get the peripherals so we can access serial and the LED.
	//
	// SAFETY: Because main() already has references to the peripherals this is an unsafe
	// operation - but because no other code can run after the panic handler was called,
	// we know it is okay.
	let dp = unsafe { arduino_hal::Peripherals::steal() };
	let pins = arduino_hal::pins!(dp);
    let mut serial = arduino_hal::default_serial!(dp, pins, 57600);

	// Print out panic location
	ufmt::uwriteln!(&mut serial, "Firmware panic!\r").unwrap_infallible();
	if let Some(loc) = info.location() {
	    ufmt::uwriteln!(
	        &mut serial,
	        "{}:{}\r",
	        loc.file(),
	        loc.line(),
	    )
	    .unwrap_infallible();
	}

	if let Some(loc) = info.location() {
	    if loc.file() == "firmware.rs" && loc.line() > 110 {
	        let mut led = pins.d4.into_output();
	        led.set_high();
	    }
	}
	loop {} //So it's infallible type ret.
}
```

So I hit compile, and a bizarre error popped up.

```ansi
error: linking with `avr-gcc` failed: exit code: 1
  |
  = note: "avr-gcc" "-mmcu=atmega328p" "-Os" "-Wl,--as-needed,--print-memory-usage" "C:\\Users\\awest\\AppData\\Local\\Temp\\rustcmNsBO9\\symbols.o" "<1 object files omitted>" "-Wl,--as-needed" "-Wl,-Bstatic" "C:\\Users\\awest\\Workspaces\\shut-up-device\\target\\avr-atmega328p\\debug\\deps/{libcompiler_builtins-8e516eea7ff4d24f.rlib}" "-Wl,-Bdynamic" "-lgcc" "-Wl,-z,noexecstack" "-o" "C:\\Users\\awest\\Workspaces\\shut-up-device\\target\\avr-atmega328p\\debug\\deps\\shut_up_device-08979d028ea0b1d2.elf" "-Wl,--gc-sections" "-no-pie" "-Wl,--strip-debug"
  = note: some arguments are omitted. use `--verbose` to show all linker arguments
  = note: C:/Users/awest/AppData/Local/Microsoft/WinGet/Packages/ZakKemble.avr-gcc_Microsoft.Winget.Source_8wekyb3d8bbwe/avr-gcc-14.1.0-x64-windows/bin/../lib/gcc/avr/14.1.0/../../../../avr/bin/ld.exe: address 0x8009ca of C:\Users\awest\Workspaces\shut-up-device\target\avr-atmega328p\debug\deps\shut_up_device-08979d028ea0b1d2.elf section `.data' is not within region `data'␍
          C:/Users/awest/AppData/Local/Microsoft/WinGet/Packages/ZakKemble.avr-gcc_Microsoft.Winget.Source_8wekyb3d8bbwe/avr-gcc-14.1.0-x64-windows/bin/../lib/gcc/avr/14.1.0/../../../../avr/bin/ld.exe: address 0x8009cb of C:\Users\awest\Workspaces\shut-up-device\target\avr-atmega328p\debug\deps\shut_up_device-08979d028ea0b1d2.elf section `.bss' is not within region `data'␍
          C:/Users/awest/AppData/Local/Microsoft/WinGet/Packages/ZakKemble.avr-gcc_Microsoft.Winget.Source_8wekyb3d8bbwe/avr-gcc-14.1.0-x64-windows/bin/../lib/gcc/avr/14.1.0/../../../../avr/bin/ld.exe: address 0x8009ca of C:\Users\awest\Workspaces\shut-up-device\target\avr-atmega328p\debug\deps\shut_up_device-08979d028ea0b1d2.elf section `.data' is not within region `data'␍
          C:/Users/awest/AppData/Local/Microsoft/WinGet/Packages/ZakKemble.avr-gcc_Microsoft.Winget.Source_8wekyb3d8bbwe/avr-gcc-14.1.0-x64-windows/bin/../lib/gcc/avr/14.1.0/../../../../avr/bin/ld.exe: address 0x8009cb of C:\Users\awest\Workspaces\shut-up-device\target\avr-atmega328p\debug\deps\shut_up_device-08979d028ea0b1d2.elf section `.bss' is not within region `data'␍
          collect2.exe: error: ld returned 1 exit status
          Memory region         Used Size  Region Size  %age Used␍
                      text:       12652 B        32 KB     38.61%␍
                      data:        2251 B         2 KB    109.91%␍
                    eeprom:           0 B         1 KB      0.00%␍
                      fuse:           0 B          3 B      0.00%␍
                      lock:           0 B         1 KB      0.00%␍
                 signature:           0 B         1 KB      0.00%␍
           user_signatures:           0 B         1 KB      0.00%␍


error: could not compile `shut-up-device` (bin "shut-up-device") due to 1 previous error
```

That seemed a bit weird that the "static" RAM section was considered full. At least that is generally what the [`.data` section](https://en.wikipedia.org/wiki/Data_segment) represents from my understanding. For reference, I disabled [debug assertions](https://doc.rust-lang.org/std/macro.debug_assert.html) in the `Cargo.toml` for dev builds to conserve size. So I ran `objdump` on the original code to check how much RAM the program was actually using:

```ansi
zsh - face❯ avr-objdump -h target/avr-atmega328p/debug/shut-up-device.elf

target/avr-atmega328p/debug/shut-up-device.elf:     file format elf32-avr

Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .data         00000348  00800100  00003576  0000362a  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  1 .text         00003576  00000000  00000000  000000b4  2**1
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  2 .bss          00000001  00800448  00800448  00003972  2**0
                  ALLOC
  3 .note.gnu.avr.deviceinfo 00000040  00000000  00000000  00003974  2**2
                  CONTENTS, READONLY
```

_NOTE: Sizes displayed above are in Hexadecimal, so `.data` is actually 840 bytes using and `.text` is actually using 13686 bytes_

That... means that the panic handler is using like 60% of the ram? On a microcontroller that with only 2KB of RAM, it is quite literally a luxury. After figuring out a different debugging method that involved flipping different LEDs on depending on the issue, I still was curious why the panic handler used so much RAM. My gut said it might have to do with the fact that the panic stores information about where in the code it panicked, which could be a sizable amount of metadata based on what is in the [`core::panic::PanicInfo`](https://doc.rust-lang.org/beta/core/panic/struct.PanicInfo.html) struct passed with each panic:

```rust
#[lang = "panic_info"]
#[stable(feature = "panic_hooks", since = "1.10.0")]
#[derive(Debug)]
pub struct PanicInfo<'a> {
    message: &'a fmt::Arguments<'a>,
    location: &'a Location<'a>,
    can_unwind: bool,
    force_no_backtrace: bool,
}
```

In order to investigate this peculiar occurrence, I removed a small sliver of code to meet the 2KB limit, then compiled two binaries, one with the `abort` panic handler (the "control") and one with the custom panic handler. Both binaries used the following build profile in Cargo:

```toml
[profile.dev]
panic = "abort"
lto = true
opt-level = 2 # Interestingly, using 's' is larger, prob. some weird optimization issue
debug = false
codegen-units = 1
debug-assertions = false # Removes certain runtime panics that trigger in debug modes. Saves RAM
# strip = "none"	# Preserve Debug Symbols. This should not affect RAM usage

```

And for reference, here are the sizes as produced by `avr-objdump`. Each image is suffixed with what type of panic handler they are using.

```ansi
 zsh - face❯ avr-objdump -h target/avr-atmega328p/debug/shut-up-device-abort.elf

target/avr-atmega328p/debug/shut-up-device-abort.elf:     file format elf32-avr

Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .data         000002c2  00800100  00002c02  00002cb6  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  1 .text         00002c02  00000000  00000000  000000b4  2**1
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  2 .bss          00000001  008003c2  008003c2  00002f78  2**0
                  ALLOC
  3 .note.gnu.avr.deviceinfo 00000040  00000000  00000000  00002f78  2**2
                  CONTENTS, READONLY
```

```ansi
 zsh - face❯ avr-objdump -h target/avr-atmega328p/debug/shut-up-device-custom-panic.elf

target/avr-atmega328p/debug/shut-up-device-custom-panic.elf:     file format elf32-avr

Sections:
Idx Name          Size      VMA       LMA       File off  Algn
  0 .data         0000079c  00800100  00003324  000033d8  2**0
                  CONTENTS, ALLOC, LOAD, READONLY, DATA
  1 .text         00003324  00000000  00000000  000000b4  2**1
                  CONTENTS, ALLOC, LOAD, READONLY, CODE
  2 .bss          00000001  0080089c  0080089c  00003b74  2**0
                  ALLOC
  3 .note.gnu.avr.deviceinfo 00000040  00000000  00000000  00003b74  2**2
                  CONTENTS, READONLY
```

For the people who don't want to do the math in their head, The binary with the abort panic handler uses 706 bytes of RAM, whereas the other binary with the custom panic handler uses a whopping 1948 bytes. For analysis, this is good since it means the extra panic-handler code should be captured. I used [ImHex](https://imhex.werwolv.net/) for opening the files since its pattern matching system allows easy identification of sections and metadata for [ELF binaries](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format). I opened separate views and containing only the data section for each binary and immediately identified the culprit. For clarity, I also highlighted for the [font table (used with the display)](https://faceftw.dev/blog/0008#addressing-semantics-and-character-maps) and for I2C error enum variant names since they are expected to be present in both binaries, making it clearer what got added with the custom handler.

```image
src="abort_data_section.png", 1262x403
The <code>.data</code> section for the binary with the abort panic handler
```

```image
src="custom_panic_data_section.png", 1258x888
The <code>.data</code> section for the binary with the custom panic handler. Do you see the problem?
```

The primary cause of the extra global RAM usage is the _strings used for printing the panic information_. In retrospect, this should make sense as it is hard to synthesize this kind of information at runtime without [reflection](https://en.wikipedia.org/wiki/Reflective_programming), which Rust currently lacks. So in order for the program to have the information presented to the user, the Rust compiler (most likely) tosses all the panic-related strings into the `.data` or equivalent section, then compiles separate panic handlers depending on the source of the panic. This inference is based on using [Cutter](https://cutter.re) to peer into the debugging symbols since it is a dedicated reverse-engineering tool.

```image
src="specific_handlers.png", 525x416
Screenshot of distinct methods identified by Cutter. This binary has debugging symbols which provide a prettier name for these methods that is usually not available in release configurations.
```

There are a couple of ways to "get around" this limitation. One is to avoid invoking the `panic!()` macro unless it is _absolutely necessary_. This would follow general recommendations as mentioned in the error handling section, and for embedded systems that need to be reliable and run for days, graceful error handling is a must. Another way is to reduce the size of the strings generated by the Rust compiler for the panic handler functions. This ranges from shrinking the messages passed to the panic handler to moving/compiling the project such that the source paths are really short. This workaround is not as useful since it strips useful information about the error causing the panic for debugging, and should probably only be done when it is absolutely needed. I don't know what kind of scenario would cause this to be honest, but it is an interesting thought exercise nonetheless.

This was an interesting hiccup that wouldn't deter me from using Rust with Arduino-like microcontrollers that are resource constrained. Rather I'll just be a bit more mindful with what I'm using with the memory I get.

## Why Yes I Like Rust How Can You Tell
Learning Rust has been a real treat and made me enjoy programming so much more, not just in hobby projects like this but also at work. Whenever I read or write Rust code, I think so much more about _what I want the program_ to do and not as much about trying to fix a memory leak or about how the JVM does certain native allocations. There are so many other things like [Rust compiler errors](https://doc.rust-lang.org/error_codes/error-index.html), the functional programming aspect, the [`Iterator` trait and those APIs](https://doc.rust-lang.org/std/iter/index.html), [Cargo as a first-class project building tool](https://doc.rust-lang.org/cargo/), and the [extensive documentation](https://doc.rust-lang.org/stable/) that I could gush about, but these three topics were the ones I thought were the most useful for embedded development, even for a hobby project. I will continue to advocate for Rust adoption in new projects personal and professional unless something better comes out.

## But wait, what about the whole point of this series
To summarize the success of the SHUT UP device, that's a different story: it kinda made the problem worse. See, I lacked the foresight that League of Legends is a game that easily produces rage moments. Each time would trigger the device, which only made my brother vent his frustrations louder (to both mine and my parent's dismay), making the problem worse. He definitely _heard_ the device, but clearly Riot Games has made virtual crack cocaine that makes external stimuli gasoline in the fires of gamer rage.

So the breadboard currently sits on the shelf with all the other microcontrollers and gizmos in the basement. I've considered soldering everything into a protoboard (with a microcontoller header mount so it's reusable) to "commemorate" this silly little project, but that is not as high of a priority in life right now. The [code is available](https://github.com/FaceFTW/shut-up-device), so if you have the components you can remake the project and lose even more sleep as a result.

```image
src="./wiring_view.webp", 1280x960
Top-down view of the project (power indicator of the nano can't be turned off). Pin A0 is used for microphone input, Pin A4/A5 are used for the I2C Display SDA/SCL connections, and Pin 9 is used for the buzzer, which is connected by wires to move it further away from the microphone. Resistor for the buzzer is pick your poison, increased resistance means quieter buzzer.
```

The next post will be about a completely different field in the world of computers: Web Design. In the middle of finishing this post, I had the brilliant idea to remove 99.9% of the JavaScript used by migrating to [Eleventy](https://11ty.dev) and true static site generation. It was an interesting enough experience and also a worthy discussion to have in a time where "bloat" in software is considered acceptable when it really shouldn't. Hopefully it doesn't take as long to write as this series did. I can't believe it's already the end of July.

Until next time.