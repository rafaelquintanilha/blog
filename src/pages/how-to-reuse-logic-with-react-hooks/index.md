---
title: How to Reuse Logic with React Hooks
date: "2019-06-25"
lastReview: "2019-06-25"
spoiler: Learn why Hooks are a game-changer and write your first hook.
lang: en-us
---

[This article was originally posted in the ButterCMS blog.](https://buttercms.com/blog/learn-react-hooks-by-writing-your-first-hook)

React has always been great for reusing and composing *components*. That means you can write a piece of UI and simply reuse it later on. Moreover, your component can have some embedded logic that you can reuse too. Write once, and use everywhere. A big win!

But what if you want to reuse the logic *only*? It means that you don’t care about the UI, but you care about the behavior of the component. Can you still write it once and use it everywhere?

And the answer is… yes! React developers have designed all kinds of patterns for reusing logic, the most prominent being *Higher-Order Components (HOC)* and *Render Props*. They work and have been in use for quite a while. But still, those two approaches don’t feel quite right and have some shortcomings (which we will see soon). What could be a possible alternative?

[As of React 16.8, Hooks were introduced](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html). Hooks are a way to reuse *logic* across applications. You write a specific behavior (logic) and “hook” it into any component. This component now can use this logic normally.

### Why do we need React Hooks?

Consider that you want to add a clock into your application. Clearly, you think, this is something very common that someone might have already developed. You find a React library that renders the clock and exposes a few props to customize its style and functionality (size, display seconds or not, frequency of update, etc). After a few tweaks, you have your component pretty similar to what you want, though *not quite*. Maybe you want to customize only the hours (make it bigger) or add a different color to the minutes. In the end, you wish you could just use the clock *logic* and style it exactly how you want.

This scenario is a great use case for Hooks. You can “hook” the “clock behavior” into a component and have the current time available. Then, you just use the time as you would use any variable declared in the scope of your component, the difference being that you don’t need to worry about it (in case you are curious, check the [useClock](https://github.com/rafaelquintanilha/use-clock) hook that I developed and that illustrates this principle).

But before diving deeper into Hooks, let us understand the issues with the former solutions.

# The world before Hooks

We have seen that React is great for reusing UI but that sometimes we might be interested only in the logic behind a component. Hooks are an answer to this demand. Let’s examine how we reused logic in the *pre*-Hooks era.

### Higher-Order Components (HOC)

Probably the first pattern to be widely adopted by the React community on this matter, HOCs, solved the reusable logic problem using *composition*. Here is the idea: you develop a component which implements the logic and pass the computed values (for example, the current time) to the children, which have access to the values via props. Generically:

```jsx
<ComponentWhichImplementsLogic>
  <ComponentWhichUsesLogic />
<ComponentWhichImplementsLogic>
```

Because `<ComponentWhichImplementsLogic>` is higher in the DOM order, we call them *Higher-Order Components*. HOCs conventionally start with the *with* prefix.

We can make them more legible by creating a function that accepts a component and returns this component with the injected logic:

```jsx
ComponentWhichImplementsLogic(ComponentWhichUsesLogic)
```

Or, recalling our example:

```jsx
withClock(MyComponent)
```

Considering that `withClock` is an HOC which implements the clock feature and exposes the current time, `MyComponent` would then access the current time via props. I won’t dive into the specifics of the development, but consider that a `withClock` component would store the current time in the state, add a `setInterval` in `componentDidMount` that increments the time at each interval, and does the proper cleanup when unmounted (calls `clearInterval`).

The first problem with this approach is that using multiple HOCs starts to become cumbersome. Suppose you also want your component to track the user’s current mouse position:

```jsx
withMousePosition(withClock(MyComponent))
```

And you can certainly imagine why this is suboptimal if the number of injected logic grows. Also, it makes debugging and testing a pain. If your component misbehaves, detecting the flaw in a tree of HOC’s won’t be pleasant.

### Render Props

When people started complaining about the issues of Higher-Order Components, a new pattern emerged: *render props.* You can read all about it [in this very popular post by Michael Jackson](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce). Basically, the component which implements the logic receives a *render prop* and calls it in its *own* render function, but now exposing the computed values:

```jsx
<Clock render={props => <MyComponent {...props} />} />
```

This way, whatever props are returned by `Clock`, will be accessible to `MyComponent`. The render props pattern avoids some hard to debug issues such as name collision (suppose you accidentally override a prop or state name) and is somewhat less verbose, despite of the excess of JSX.

While the community seemed to adopt the render props pattern, composing logic is still suboptimal and some started to complain about the dreaded [callback hell](https://twitter.com/acdlite/status/955954032194895872?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E955954032194895872&ref_url=https%3A%2F%2Fwww.richardkotze.com%2Fcoding%2Fhoc-vs-render-props-react):

```jsx
<Clock render={({time}) => (
  <Mouse render={({x, y}) => ( 
    <MyComponent time={time} x={x} y={y} />
  )} />
)} />
```

This becomes unreadable pretty quickly. Clearly, there is still much room for improvement. Next, we will see what a Hooks approach would look like.

# The Hooks solution

While React definitely has alternatives for the reuse of *logic*, we have seen that it is suboptimal – particularly for composition (multiple logics being added to a single component can become too verbose, too hard to debug and too similar to callback hell).

Without further ado, consider how the former example could be written using hooks:

```jsx
const MyComponent = () => {
  const [time] = useClock();
  const [x, y] = useMouseMove();
  // do something with those values
  return (
    <>
      <div>Current time: {time}</div>
      <div>Mouse coordinates: {x},{y}</div>
    </>
  );
}
```

That’s it! You simply declare your Hooks (in this case, `useClock` and `useMouseMove`) and have them instantly available inside your component. There is no extra work. Just plug it (hook) into your component and you are good to go.

Notice that we can use as many Hooks as we want. It is seamlessly composable and trivial to test (forget about a deep tree of nested components and weird inline JSX). And there is more: as you can see in the above example, *it works with functional components*, which reduces the verbosity of your component considerably (forget about using this or setting up constructors).

Indeed, with the advent of Hooks using class components are somewhat discouraged. [According to the docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes), there are just a few edge cases where classes have no Hooks equivalent, so it is very likely that you can start using Hooks right away.

Does that mean that you need to rewrite all your class components using Hooks? **Definitely not**. Hooks are a powerful solution and it is being well received by the community. However, by no means feel like you should do a major rewrite just because of that.

With that being said, let’s understand the main differences between classes and Hooks.

### The Mental Model

One of the biggest distinctions between classes and Hooks is that *Hooks have no lifecycles*. For experienced React developers, this can take some time to click. We are used to thinking in terms of `componentDidMount`, `componentWillUpdate`, etc. But with Hooks things don’t work this way.

So the first thing you need to avoid is trying to map a given lifecycle to a particular use case with Hooks. This will only confuse you. Instead, just think that for Hooks any state or prop change calls the function again (recall your component is a function) with the updated values (state and props). For peace of mind, [the docs give you a rough equivalency](https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks) of certain lifecycles in the Hooks world.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;[...] Hooks have no lifecycles. For experienced React developers, this can take some time to click. We are used to thinking in terms of componentDidMount, componentWillUpdate, etc. But with Hooks things don’t work this way.&quot;<br><br>My article on learning <a href="https://twitter.com/reactjs?ref_src=twsrc%5Etfw">@reactjs</a> Hooks 👇 <a href="https://t.co/8o6tUHkuDE">https://t.co/8o6tUHkuDE</a></p>&mdash; Rafael Quintanilha (@webquintanilha) <a href="https://twitter.com/webquintanilha/status/1140811628398743553?ref_src=twsrc%5Etfw">June 18, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

One of the core contributors to React, Dan Abramov, wrote in his blog [a piece on the differences between function and class components](https://overreacted.io/how-are-function-components-different-from-classes/). Go check it out if you are curious about the internals.

Now that we understand that Hooks do not operate based on lifecycles (like classes do), let’s examine how the most common Hooks work.

### useState

The first and simplest Hook is `useState`. Basically, it does exactly what you would expect: you declare a variable and a setter. Here’s how it looks:

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

As you can see, the hook returns an array with two elements and takes one parameter.

- The first element of the array is the current value for this state;
- The second element of the array is a setter that changes the value of this state;
- The parameter used in the hook (in our example, 0) is the initial value of this state.

Naturally, you can add multiple states by adding multiple hooks:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  return (
    <div>
      <div>Current count: {count}</div>
      <button 
        onClick={() => setCount(count + step)}>
        Increment by {step}
      </button>
    </div>
  );
}
```

Now recall that with Hooks every re-render is nothing else than the function being called again (in our example, `Counter`). But for every re-render, the state will be updated with its current value. This is the main difference between a state variable and a regular variable. Regular variables will always be re-defined.  State variables will be derived from the previous state.

How do we trigger a re-render? Every time a prop or state variable change we trigger a re-render.  This is done by invoking the setter, in our example through the click of the button. This is important to know so we can better understand the next Hook.

### useRef

Sometimes we want to store a value in our component for future reference, but we don’t want to trigger a re-render (as this value isn’t expected to change often or has little or no UI impact). This would be the equivalent of having a class property:

```jsx
this.myValue = value;
```

To address this case, `useRef` was introduced. Refs give us a way to store a variable in the scope of the function and preserve its value across renders. One typical case is to set a reference into an HTML component:

```jsx
import React, { useRef } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);
  const onClick = () => inputRef.current.focus();
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={onClick}>Focus</button>
    </div>
  );
}
```

Notice that `useRef` receives an initial value (in our example, `null`) and returns the ref variable. Whatever is stored in this ref can be accessed via `myRef.current`, so when we assign the ref of the input element to `inputRef`, `inputRef.current` holds the actual DOM element, allowing us to programmatically trigger focus.

In fact, `useRef` is a special case of `useState`, but one that we set its value directly instead of using a setter, which persists the value across renders without triggering a re-render.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">useRef vs useState<br><br>What&#39;s the difference between the two Hooks?<br><br>useRef is a special case of useState: <a href="https://t.co/Y2tCnuBeQZ">https://t.co/Y2tCnuBeQZ</a><br><br>- useRef persists values across re-renders<br>- changing useRef does not trigger a re-render<br><br>More about <a href="https://twitter.com/hashtag/hooks?src=hash&amp;ref_src=twsrc%5Etfw">#hooks</a>: <a href="https://t.co/7MRBkpAHXL">https://t.co/7MRBkpAHXL</a></p>&mdash; Rafael Quintanilha (@webquintanilha) <a href="https://twitter.com/webquintanilha/status/1138915113824595968?ref_src=twsrc%5Etfw">June 12, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

If you want to learn refs in depth, [The Complete Guide to React Refs](/the-complete-guide-to-react-refs/) has a comprehensive coverage of how refs work.

So far we have learned how to manipulate variables inside a component using Hooks. We are still missing how to respond to some events. For example, how can I fetch data from an API when the component mounts, or how can I perform an operation if a particular state changed?

### useEffect

The `useEffect` hook can be tricky to grasp, particularly if you think too much in terms of old React class lifecycles. It has some subtleties that are not immediate but definitely make sense. Let us start from the beginning: what exactly is an effect?

> An *effect*, or *side effect*, is an operation that you run after a render.

A practical example: suppose you have a component that fetches a list of products for a given category. Once your component renders (“mounts”) you want to trigger the API call. And if later the category changes (for example if the user navigates from the sports section to the fashion section of an e-commerce site), you want to call the API again.

Notice that with what we learned about `useState` and `useRef` we are unable to do so. We currently haven’t learned a way to only perform operations given that certain things happened to our state or props.

In the old-style class component, our example would look like this:

```jsx
class ProductsList extends React.Component {
  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps) {
    if ( prevProps.categoryId !== this.props.categoryId ) {
      this.getProducts();
    }
  }

  getProducts() {
    // perform API call with this.props.categoryId
  }

  ...
}
```

Now, what is the Hooks equivalent?

```jsx
const ProductsList = props => {
  const getProducts = () => {
    // perform API call with props.categoryId
  }

  useEffect(() => {
    getProducts();
  });

  ...
}
```

This looks way cleaner. We define an *effect* which accepts a function that will be called after render and then will perform some operation (here, call `getProducts`). However, this isn’t quite right yet. The above code runs the effect after every render. How can we fix that?

Luckily, `useEffect` accepts a dependency array. It means that you can declare upon which state or props change you want to trigger the effect. For us, it would look like this:

```jsx
useEffect(() => {
  getProducts();
}, [props.categoryId]);
```

The above code will run after the first render and in all renders caused by a change in `props.categoryId`. It is a combination of `componentDidMount` and `componentDidUpdate`.

What if you want to call the effect only on “mount” (or in Hooks jargon, after the first render)?

```jsx
useEffect(() => {
  getProducts();
}, []);
```

The answer is to make the dependency array an empty one. Remember that when we add a dependency array, the effect gets called after the first render and whenever any of the values in the array change. Logically, if there is no element in the array, it will only be called after the first render.

If you want to run your effect after every render, simply remove the dependency array at all (like in our first example). However, make sure you know what you are doing because this can cause performance issues (imagine calling an API whenever a component with plenty of states and props re-renders).

There is one last thing that I want to mention about `useEffect`. Sometimes you might want to do a cleanup, the equivalent of the `componentWillUnmount` lifecycle. For example, you might have added a DOM listener that you want to remove upon unmount. Recall our `useMouseMove` hook? Here is how we can implement it with Hooks using what we have learned so far:

```jsx
import React, { useState, useEffect } from 'react';

const useMouseMove = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const handler = ({ clientX, clientY }) => {
      setCoords([clientX, clientY]);
    };
    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
    };
  }, []);

  return coords;
};
```

[The above is outlined in the terrific use-event-listener library](https://github.com/donavon/use-event-listener). After the first render, you add a listener to the window object and call a cleanup function when the component is removed from the DOM. Whatever function you return from inside your effect will be called upon unmount. [The official docs](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup) provide more details if you want to dive deeper.

Finally, in the Overreact blog by Dan Abramov, [there is a comprehensive guide](https://overreacted.io/a-complete-guide-to-useeffect/) of `useEffect`. The post is very long but I encourage you to find some time and read it if you want to master `useEffect`.

### Other Hooks

There are several other built-in Hooks in the new API. All of them are described in the [API reference](https://reactjs.org/docs/hooks-reference.html), but I will highlight some:

#### useContext

Equivalent to the [Context API](https://reactjs.org/docs/context.html). Allows your component to read from a Context:

```jsx
const value = useContext(MyContext);
```

#### useReducer

For some time, state management libraries such as Redux were a controversial point in the React community. They evolved during the years but the hype has been diminishing. Hooks, however, provide a very neat way to add a reducer in your component.

A *reducer* is basically a function that accepts a state and an action. Based on the action, it updates the state. This leads the developer to a better encapsulation of the state, while increases the maintainability of the state as it grows. [More about useReducer in the docs](https://reactjs.org/docs/hooks-reference.html#usereducer).

#### useCallback

The last built-in Hook that I want to mention is `useCallback`. Basically, `useCallback` receives a function and a dependency array and memoizes that function until any of its dependencies change. It is useful for optimizations and borrows the `shouldComponentUpdate` mindset.

Suppose you render a `Button` component:

```jsx
const Component = () => {
  const onClick = () => console.log(“Clicked”);
  return <Button onClick={onClick}>Click</Button>;
}
```

Whenever `Component` re-renders, `onClick` will be redefined (recall that we call the function scope every render). Once `onClick` essentially changed, `Button` will re-render too. But notice that `onClick` is in practice the same function, so we re-rendered `Button` unnecessarily!

```jsx
const Component = () => {
  const onClick = useCallback(() => console.log(“Clicked”), []);
  return <Button onClick={onClick}>Click</Button>;
}
```

The above code fixes our problem. By wrapping our function in `useCallback` we now have it memoized and only recreated if any value in the dependency array changes (in our case, because `useCallback` has no dependencies, it will never change).

`useCallback` is very related to `useMemo`, which does basically the same thing, but memoizing the *result* of a function, not the function itself. There is a nice piece about their differences in this [Stack Overflow comment](https://stackoverflow.com/a/54963730/4487722).

#### Next

We have covered everything we needed (much more, in fact) to write our first hook. So the next section will stop the theory and explain how we can create a custom hook for ourselves.

# Writing your first hook

So far we learned how to use Hooks to achieve the same things we would achieve with a class component. But recall that the greater goal of Hooks is to make logic *shareable*, so this is our next objective.

We saw a sneak peek of this process in the `useMouseMove` hook provided in the last section. Basically, we wrote a function that used some hooks (`useState` and `useEffect`) and returned a value.

For this section, we will write a `useButter` hook. This hook will make our life easier when injecting ButterCMS data in any component. [ButterCMS is a headless Content Management System that you can learn more about here](https://buttercms.com/api-first-cms/). Let’s get started writing our `useButter` hook.

### Modeling the API

[Butter docs](http://buttercms.com/docs/api-client/react#Quickstart) cover all you need to know about using Butter in a React application. In short, once you have your Butter client set with the correct API key, listing the first 10 posts of your blog is as easy as:

```jsx
butter.post.list({page: 1, page_size: 10}).then(function(response) {
  console.log(response);
});
```

Notice that the butter client exposes us to some entities (in this example, *page*) and a few methods (in this example, *list*). Finally, we can also pass some options (in this example, the number of pages and the page size) and after the API resolves, access the response. [Check the API reference](https://buttercms.com/docs/api/?javascript#introduction) for a complete list of entities and methods.

Ideally, our hook would receive the entity, method, and options, and return the API response. To give us more control over the network request, we will also need to know if the API is still loading or if it failed.

### Creating the Hook

Let us now start creating our hook. All code in this article is present in [this GitHub repo](https://github.com/rafaelquintanilha/butter-hooks-example). Afterward, we will build a simple app which fetches posts from the ButterCMS API. [Here’s a live preview](https://butter-hooks-example.netlify.com/).

#### Setting up Butter

First, we will setup Butter and create the hook. When it’s done we then “hook” it into our component.

Go ahead and create your app. For the sake of this example, I’ll use [create-react-app](https://facebook.github.io/create-react-app/):

```
npx create-react-app butter-hooks-example
```

Then, navigate to the newly created *butter-hooks-example* directory and add the butter library:

```
yarn add buttercms
```

Once it’s done, create a file in the *src* folder called *butter-client.js* and add the following:

```jsx
import Butter from 'buttercms';

const butter = Butter(<YOUR API KEY HERE>);

export default butter;
```

Make sure to insert your own API key. That’s all you need to start communicating with the Butter API.

#### useButter

In the same *src* directory create a file called *useButter.js*, where our hook will live. Go ahead and add this basic skeleton:

```jsx
import butter from './butter-client';

const useButter = () => {

}

export default useButter;
```

We now need to add the functionality of our hook. Recall that we decided to return the API response and control variables that determine if the API is loading or if it failed. It makes sense to create them as state variables, so add the following:

```jsx
import { useState } from 'react';
import butter from './butter-client';

const useButter = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // do something with them
  return { response, loading, error };
}

export default useButter;
```

We declared three different state variables, each with different initial values. In the end, we return them in the form of an object.

Now, I want to give the user the ability to control when to call the API. Therefore, we need to expose the API call. Let us create the `callAPI` function:

```jsx
...
const callAPI = async (entity, method, ...options) => {
  if ( butter[entity] === undefined || 
       butter[entity][method] === undefined ) {
    setError(`Unable to call method ${method} from entity ${entity}`);
    return;
  }
  setError(null);
  setLoading(true);
  try {
    const response = await butter[entity][method](...options);
    setResponse(response);
  } catch (e) {
    setError(`${e.status}: ${e.statusText}`);
  }
  setLoading(false);  
}
...
```

Recall that the butter client needs an *entity* and a *method* (e.g. *post* and *list*). The above code checks if, for a given *entity* and *method*, the function exists (setting an error if not true). After, we change the state to inform that the API is loading and await the response from the API, we make sure we pass the correct options to the butter client. If it fails, we set the error message and if it works, we set the response. Pretty neat.

The complete code for the hook is:

```jsx
import { useState } from 'react';
import butter from './butter-client';

const useButter = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callAPI = async (entity, method, ...options) => {
    if ( butter[entity] === undefined || 
         butter[entity][method] === undefined ) {
      setError(`Unable to call method ${method} from entity ${entity}`);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await butter[entity][method](...options);
      setResponse(response);
    } catch (e) {
      setError(`${e.status}: ${e.statusText}`);
    }
    setLoading(false);  
  }

  return [{ response, loading, error }, callAPI];
}

export default useButter;
```

Notice that we need to make `callAPI` available in the component, so we pass it alongside with the state object in the form of an array.

This should be enough for us to start hooking things around.

### Hooking up

With our hook ready it is time to finally see it in action. Go to `App.js` and add the following:

```jsx
import React, { useEffect } from 'react';
import useButter from './useButter';
import './App.css';

function App() {
  const [{ response, loading, error }, callAPI] = useButter();

  useEffect(() => {
    callAPI('post', 'list', { page: 1, page_size: 10 });
  }, []);

  return (
    <div className="container">
      <h1>useButter Example</h1>
      {loading && <div>Loading from API...</div>}
      {error && <div>There was an error: {error}</div>}
      {response && !error && !loading && <div>
        <h2>Posts List</h2>
        <ul>
          {response.data.data.map((post, i) => (
            <li key={i}>{post.title}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
}

export default App;
```

If you save your project and run yarn start you will see your hook in action. Congratulations!

<figure>
  <img src="./ButterCMS - First Hook Example.gif" alt="First hook example" />
</figure>

Notice that it loads all posts that I have saved in my account at this moment. Yours will vary.

Remember that I left the usage of the hook to the user. We did this by calling the API after the first render:

```jsx
const [{ response, loading, error }, callAPI] = useButter();
useEffect(() => {
  callAPI('post', 'list', { page: 1, page_size: 10 });
}, []);
```

What if we want to make the `page_size` configurable? Let’s go ahead and add an input to control this value. First, include the `useState` hook:

```jsx
import React, { useEffect, useState } from 'react';
...

function App() {
  const [pageSize, setPageSize] = useState(10);
  const [{ response, loading, error }, callAPI] = useButter();

  useEffect(() => {
    callAPI('post', 'list', { page: 1, page_size: pageSize });
  }, [pageSize]);
  ...
```

Now our effect will re-run every time `pageSize` changes (once it is in the dependency array). Let’s add the appropriate UI:

```jsx
...
return (
  <div className="container">
    <h1>useButter Example</h1>
    {loading && <div>Loading from API...</div>}
    {error && <div>There was an error: {error}</div>}
    {response && !error && !loading && <div>
      <h2>Posts List</h2>
      <ul>
        {response.data.data.map((post, i) => (
          <li key={i}>{post.title}</li>
        ))}
      </ul>
      <div>
        <label>Page Size</label>
        <br />
        <input
          autoFocus
          value={pageSize} 
          onChange={e => setPageSize(e.target.value)} 
          type="number"
        />
      </div>
    </div>}
  </div>
);
...
```

Here’s the final result:

<figure>
  <img src="./ButterCMS - Second Hook Example.gif" alt="Second hook example" />
</figure>

And that’s it! We have created a hook that shares logic with any component. Write once, use it everywhere.

#### Fixing the dependency array

If you have [ESLint](https://eslint.org/) configured, you will see the following warning:

> React Hook useEffect has a missing dependency: 'callAPI'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

What exactly does that mean? Recall our `useEffect` hook:

```jsx
useEffect(() => {
  callAPI('post', 'list', { page: 1, page_size: pageSize });
}, [pageSize]);
```

Notice that `callAPI` is a dependency of the effect as much as `pageSize`. Even though we don’t expect it to change, it is a good practice to list all dependencies in the dependency array. Let’s fix it:

```jsx
useEffect(() => {
  callAPI('post', 'list', { page: 1, page_size: pageSize });
}, [callAPI, pageSize]);
```

If you save your project and check it, you will see that there is an infinite loop going on. What’s happening?

Remember that our hook returns `callAPI`. So every time we call the API, it updates the state and the hook returns a new value. But `callAPI` is a new definition of the function (even though they are essentially the same) and therefore we trigger the effect again!

```jsx
return [{ response, loading, error }, callAPI];
```

So in every state change we redefine `callAPI`.  This is something we don’t want to do. Luckily, this is the exact case where `useCallback` is valuable: we want a function to persist unless some of its dependencies change. Because `callAPI` has no dependency, we don’t need it to ever change.

To fix this, go back to `useButter.js`, make sure you add `useCallback` along with `useState` and change the return statement to:

```jsx
return [{ response, loading, error }, useCallback(callAPI, [])];
```

And that’s it! Now `callAPI` won’t be redefined at every render. Save and see that it is working again.

# Wrapping up

In this article we learned what Hooks are and that they are meant to solve problems that have been a pebble in the shoes of the React community for a long time — how to easily reuse logic in between components instead of UI.

Hooks are an alternative to Higher-Order Components and Render Props, both with their pros and cons. Moreover, Hooks provide a way to map behaviors of class components to functional components (though they do not map directly).

Even though you can do (almost) everything classes do with Hooks, you don’t need to switch right away. Instead, try playing around with it until you feel comfortable. Although this is always a matter of personal opinion, I’d say Hooks are here to stay, not because of the hype, but ultimately because they are *better*.

Finally, we saw how to create your own Hook. `useButter` is an alternative to reuse logic when injecting [ButterCMS](http://buttercms.com/) data in your application. It makes accessing the API trivial and handles network requests. There is still room for improvement, so feel free to tweak my code and [contribute in GitHub](https://github.com/rafaelquintanilha/butter-hooks-example)!