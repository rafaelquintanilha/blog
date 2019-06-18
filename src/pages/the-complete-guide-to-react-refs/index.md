---
title: The Complete Guide to React Refs
date: "2019-06-17"
lastReview: "2019-06-17"
spoiler: Everything you need to know about Refs in React.
lang: en-us
---

[This article was originally posted in the Modus Create blog.](https://moduscreate.com/blog/everything-you-need-to-know-about-refs-in-react/)

The React API is fairly [simple](https://reactjs.org/docs/react-api.html), even though it has been growing bigger. With recent features such as Context and Hooks, the whole ecosystem has become more complete. Yet, some concepts are usually a source of struggle for beginners and even experienced developers. One of them is the [Refs API](https://reactjs.org/docs/refs-and-the-dom.html).

Short for “reference”, refs are a way to access underlying DOM elements in a React component. There are many reasons why you would want to access the DOM. Common use-cases are managing focus (critical for accessibility) and triggering animations. In this post, you will learn how to properly use refs, how to use the current API, and decide when to approach one over the other.

## The Problem with Refs

Manipulating DOM elements is JavaScript 101. So why is it that devs don’t feel comfortable using refs?

### Imperative Paradigm

Refs are basically *imperative*. [This contrasts with the *declarative* nature of React](https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming). To illustrate this, consider the following comparison between attaching an event handler to old-school JavaScript and modern React:

```html
<!-- HTML -->
<div id="my-custom-button">Click me!</div>
```

```js
// Vanilla JavaScript
var onClick = function() { console.log("Clicked!"); }
var button = document.getElementById("my-custom-button");
button.addEventListener(‘click’, onClick);
```

In conventional JavaScript, you would tell exactly *how* you want your code to proceed with the `onClick` handler. You would select the element and *then* attach the handler to it using the JavaScript API.

If you were to implement this in React, your code would be something like this:

```jsx
// React
const customButton = () => {
  const onClick = () => console.log("Clicked!");
  return <div onClick={onClick}>Click me!</div>
};
```

Aside from the obvious syntax sugar, notice that we declare *what* we expect to happen on click, without bothering too much on *how* we do it. This is the basic difference between those two approaches. Now, with refs you proceed very much like the first example: you define *how* to control the element. More details in a bit…

### Multiple APIs

When refs were first born, the React team encouraged the use of **string refs**. This is no longer the case as this API [will be deprecated](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs). A powerful alternative was introduced: **callback refs**. But all this power came with a price – callback refs are more verbose and may behave oddly. In order to simplify things, the **createRef** API came into play. And finally, after Hooks were introduced, `useRef` emerged. But, because there are four ways of doing the same thing, people started losing faith in refs. Let’s fix this.

## Deciding Between Callback Refs and createRef

With string refs condemned to the antique section of the React museum, a vital question remains: should we use callback refs or the `createRef` API?

The short answer is that *most of the time* you can safely use the `createRef` API. Although you can *always* achieve the same result using callback refs, recall that this new API was specially crafted in order to simplify your experience. [You can look at its RFC](https://github.com/reactjs/rfcs/pull/17/files) in order to understand the React team’s motivations behind it. In short, the goal was to maintain the simplicity of the deprecated string refs and purposely keep a simple API, leaving callback refs for more complex use cases.

In order to clarify the examples included in this post, I created a [simple cheat sheet](https://react-refs-cheatsheet.netlify.com/) that you can check anytime during your reading. The code is [available in GitHub](https://github.com/rafaelquintanilha/refs).

Consider then the [common case when you want to programmatically trigger focus on an element](https://react-refs-cheatsheet.netlify.com/#simple-createref):

```jsx
class SimpleRef extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  onClick() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}
```

The API is very simple. You first define a ref, assign it to the element you want to manipulate and call `focus` on ref’s `current` property.

[This is how](https://react-refs-cheatsheet.netlify.com/#simple-callback) to achieve the same using callback refs:

```jsx
class SimpleCallbackRef extends Component {

  onClick() {
    this.inputRef.focus();
  }

  render() {
    return (
      <div>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}
```

Notice that although you don’t need to manually create a ref anymore, the callback function `ref => { this.inputRef = ref; }` looks less natural. But there’s also an annoying caveat. [Consider the following example](https://react-refs-cheatsheet.netlify.com/#callback-rerender):

```jsx
class InlineCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
      <div>
        <input ref={ref => { this.inputRef = ref; }} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}
```

Now, we also trigger a re-render when the state changes. This has the peculiarity of calling the callback twice: first time with `null` and then with the correct value. [The docs also reserve a section to explain this](https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs).

It means that the following would raise an error (ref is `null` during the first call):

```jsx
<input ref={ref => ref.focus() } />
```

You can fix this by adding a safe condition `ref => ref && ref.focus()` or by binding the callback to a class method *in the constructor*. However, it won’t help if you bind directly in the `render` function.

```jsx
class ConstructorBoundCallbackRefWithReRender extends Component {

  constructor() {
    super();
    this.state = { count: 0 };
    // Need to bind in the constructor
    this.onRefMount = this.onRefMount.bind(this);
  }

  onClick() {
    this.inputRef.focus();
    this.setState({count: this.state.count + 1})
  }

  onRefMount(ref) {
    // Good! Called only once, during mounting
    ref.focus();
    this.inputRef = ref;
  }

  render() {
    return (
      <div>
        <input ref={this.onRefMount} />
        <button onClick={this.onClick.bind(this)}>Click to Focus</button>
      </div>
    );
  }
}
```

Notice how close to the `createRef` API it has become. Also, you are probably disappointed with callback refs already. They are too fragile. There are too many ways to breaking things and there are too many things to try and remember correctly.

Drama aside, it is clear why the React team has favored the `createRef` API for simple cases, which should be enough most of the times. Since I’m a fan of APIs which require me to think *less*, and therefore are less error prone, `createRef` is the winner here.

#### Function Components

In order to simplify things even more, consider writing a function component:

```jsx
const FunctionComponentWithRef = () => {
  const textInput = React.createRef();
  return (
    <div>
      <input ref={textInput} />
      <button onClick={() => textInput.current.focus()}>
        Click to Focus
      </button>
    </div>
  );
};
```

Which works fine in this simple case but is limited once function components can’t do everything a class does. Fortunately, with [Hooks becoming official since React 16.8.0](https://reactjs.org/docs/hooks-intro.html), this has changed. More about Hooks later.

#### The Case for Callback Refs

Sure, `createRef` provides a simple API. Still, callback refs weren’t deprecated. What’s good about them?

Consider the case when you need to create refs *dynamically*. Using `createRef` you *first* create and *then* assign the reference. This may put you in trouble when your ref [does not share the same lifecycle as the parent](https://github.com/reactjs/rfcs/pull/17#issuecomment-362754859).

Imagine a situation where the user can create a dynamic list of tasks, stacked upon each other, and each task has a button which when clicked scrolls to the task. In other words, you want [this](https://react-refs-cheatsheet.netlify.com/#dynamic-refs-callback).

How would you do that?

```jsx
import randomColor from 'randomcolor';

class DynamicRefs extends Component {

  constructor() {
    super();
    this.state = {
      // Here we have a dynamic array
      tasks: [
        { name: "Task 1", color: "red" },
        { name: "Task 2", color: "green" },
        { name: "Task 3", color: "yellow" },
        { name: "Task 4", color: "gray" }
      ]
    }
    this.refsArray = [];
  }

  render() {
    return (
      <div>
        <div><button onClick={() => {
          const newTasks = this.state.tasks.concat([{
            name: "Task " + this.state.tasks.length + 1,
            color: randomColor() // Just assign some random color
          }]);
          this.setState({tasks: newTasks});
        }}>Add new Task</button></div>
        {this.state.tasks.map((task, i) => (
          <button
            key={i}
            onClick={() => { this.refsArray[i].scrollIntoView(); }}>
            Go to {task.name}
          </button>
        ))}
        {this.state.tasks.map((task, i) => (
          <div 
            key={i}
            ref={ref => { 
              // Callback refs are preferable when 
              // dealing with dynamic refs
              this.refsArray[i] = ref; 
            }} 
            style={{height: "300px", backgroundColor: task.color}}>
            {task.name}
          </div>
        ))}
      </div>
    );
  }
}
```

Notice that because `this.state.tasks` is dynamic, whenever your component re-renders you use the callback ref to store the reference. Even if you manipulate the `tasks` array, you have your back covered.

In all fairness, you still can achieve the same result using `createRef`. But, in this case, it will be your responsibility to update `this.refsArray` every time `this.state.tasks` changes. Again, this is more error prone. If you are curious, [here’s a possible way of doing it](https://react-refs-cheatsheet.netlify.com/#dynamic-refs-createref).

#### Adding Refs to Children Components

All examples so far assume that we needed to assign refs to native DOM elements, such as an input, and that those elements were visible to the `render` function. How do you proceed if that’s not the case?

One might be tempted to write something like this:

```jsx
function CustomInput() {
  return <input />;
}

class SimpleRef extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // Won’t work
    return (
      <CustomInput ref={this.textInput} />
    );
  }
}
```

But this won’t work. The issue is that **function components don’t have instances**, and therefore any attempt to set a reference on it will fail.

The solution is fairly simple — although a bit odd. You define the component that should be “remotely operable” (thus *forward* his ref to his parent) by using a special API called `forwardRef`. This is especially handy when you create reusable components, as the [docs point out](https://reactjs.org/docs/forwarding-refs.html).

Our initial example with `forwardRef` would look like [this](https://react-refs-cheatsheet.netlify.com/#simple-ref-forwarding):

```jsx
// It MUST be a function component
const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} />
));

class SimpleRefForwarding extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  onClick() {
    this.inputRef.current.focus();
  }

  // Notice that now we assign the ref to a custom component
  render() {
    return (
      <div>
        <CustomInput ref={this.inputRef} />
        <button onClick={this.onClick.bind(this)}>
          Click to Focus
        </button>
      </div>
    );
  }
}
```

Notice that nothing changes in the parent component (besides switching from the native input element to `CustomInput`). The child element then uses the `forwardRef` API to make the input ref available to its parent.

This approach has a caveat — `forwardRef` only works with *function components*. This means that you can’t use any of the quirks that come with class components (e.g. state or lifecycle hooks) if you opt for *forwardRef*, unless you use Hooks.

If you *really* want to, you still can attach a ref to a class component. In this case you get the *component instance*, which means that you can call their methods from the parent. [This pattern is exemplified here](https://react-refs-cheatsheet.netlify.com/#forwarding-to-custom-components). Although this works, chances are that you don’t need it. Refs aren’t meant to be overused and exposing children refs to parents breaks encapsulation. [The docs](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) talk about this in greater detail.

## The useRef Hook

[As of React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), Hooks are officially available. While React was always about creating UI elements and reusing *components*, Hooks make it extremely trivial to reuse *logic*. Conveniently, there is a `useRef` hook that represents a mutable object that you want to persist across the component’s lifetime.

Our simple example with Hooks could be elegantly rewritten as:

```jsx
const RefsWithHooks = () => {
  const inputRef = useRef(null);
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Click to Focus</button>
    </div>
  )
};
```

Which is smaller and arguably less verbose. [Check the cheat sheet](https://react-refs-cheatsheet.netlify.com/#dynamic-refs-hooks) for an example with dynamic refs. If Hooks are available in your project, **I recommend using Hooks whenever possible**, once they eliminate most of the quirks we’ve seen in this article and are more powerful than class instances.

## Wrapping Up

The way to handle refs in React has changed over time but it seems to have settled now. I hope that I have covered most use cases and how to properly use the API. If you are ever in doubt, remember to consult the [cheat sheet](https://react-refs-cheatsheet.netlify.com/) and [check the repo](https://github.com/rafaelquintanilha/refs).

Finally, as a rule of thumb:

- **Don’t overuse refs**
- Abolish string refs
- Use callback refs when you have to dynamically set them
  - When in a class component, use `createRef` in all other cases
  - When in a function component, use `useRef` in all other cases
- Use `forwardRef` when you need access to a child ref
  - Use Hooks to empower your function component
  - If the child ref **must not** be a function component, then use a custom method to trigger focus programmatically from the parent (remember you will get a component instance, not a DOM element)