# Years of experience but still dumb

**June 5, 2026**

**tl;dr**
I've been coding professionally for more than 10 years now but stuff still confuses me but its fine. I know what I don't know, and that gives me the ability to figure it out.

---
## Setting the Scene

Today I was going through the [MDN JS reference on array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and when i got to the section about [side-effectful mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) I was confused by the following code snippet and note:

```
const cart = [5, 15, 25];
let total = 0;
const withTax = cart.map((cost) => {
  total += cost;
  return cost * 1.2;
});
console.log(withTax); // [6, 18, 30]
console.log(total); // 45
```

> This is not recommended, because copying methods are best used with pure functions. In this case, we can choose to iterate the array twice.

First of all, I had no idea what a copying method was so, I looked it up. Turns out, it is just the term used for methods that don't mutate the original array. As far as I was concerned, I just called these non-mutating methods, but hey, I learned something and I always do like knowing the "official" jargon.

| Mutating Methods                                                           | Copying Methods                                                                                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Change the original array directly (e.g., push(), pop(), splice(), sort()) | Do not modify the original array. Instead, they create and return a brand-new array with the results (e.g., map(), filter(), concat(), slice()). |

Next, I had to do a deeper dive into my understanding of what a pure function was. Unfortunately the [MDN JS guide on functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) does not cover purity, so I had to look elsewhere. Luckily, [freeCodeCamp had a post by Yazeed Bzadough](https://www.freecodecamp.org/news/what-is-a-pure-function-in-javascript-acb887375dfe/) from 2019 explaining pure functions for me to read.

Basically, a function is pure if it satisfies these 2 rules:
1. **Same Input, Same Output**: Given the exact same arguments, it will always return the exact same result. It does not rely on any external state that might change.
2. **No Side Effects**: It does not modify anything outside of its own scope. It doesn't change global variables, doesn't mutate passed-in objects, and doesn't perform I/O operations (like `console.log`, network requests, or writing to a database).
## Lost in the Sauce

Now I knew what copying methods and pure functions were, I looked back at the code snippet.

**AND I WAS STILL CONFUSED**

The output logs of the code snippets show
```
console.log(withTax); // [6, 18, 30]
console.log(total); // 45
```

And I could not understand what the point was. Why was this the end of the example when withTax was an array and total was an int. What was going on here??? Do i still not understand what copying methods and pure functions are? Why does this snippet still make no sense?

With my frustration increasing I checked with Gemini and it confirmed that my understanding of the copying methods and pure functions was pretty much correct. So I read the code snippet again, very slowly, and it finally hit me.

## The point

The code snippet above the important function is the callback function that we pass to the array.map() method.

```
(cost) => {
  total += cost;
  return cost * 1.2;
}
```

By itself, the function doesn't work because total was declared outside of its scope and running the callback function causes side effects. The point of this section of the MDN docs was just to show me "Hey, using the map() method should not cause side effects.". Thats it, and the code snippet was a clear short way to show that.

I was too concerned with some big picture that the code snippet had to be for that I could not appreciate how its simplicity clearly got the point across. I have no idea how many times I've read documentation and have gotten frustrated from code snippets and examples that made no sense to me.

So what's the point? I've been coding professionally for 10 years now but stuff still confuses me, and thats fine. As long as I handle my blind spots and stay curious, I should be fine.
