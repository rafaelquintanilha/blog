---
title: React Testing Library Common Scenarios
date: '2019-07-16'
lastReview: '2019-07-16'
spoiler: How to write tests that are common to many applications using React Testing Library.
lang: en-us
---

**tl;dr – [React Testing Library Examples](http://react-testing-library-examples.netlify.com)**

When I was first introduced to [React Testing Library](https://testing-library.com/react), my first reaction was "alright, yet another React framework" and I didn't pay much attention to it. The library quickly gained traction, but as I had been working with Enzyme for a while, I didn't bother.

With the introduction of React Hooks, testing with Enzyme became harder. To be frank, I never completely enjoyed Enzyme and paradoxically this was the main reason I relucted to switch libraries – I was too committed. Moreover, most of the test scenarios I use in my workdays were already developed and I needed to do little thinking when creating new tests.

Yet, every now and then I'd struggle writing some test, especially if it involved mocking API calls. Somehow the tests didn't feel right. Finally, I decided to give React Testing Library a shot and, well, as you might have imagined, I love it!

**This article is a compilation of common test scenarios that you are likely to find when developing your application**. For each scenario, I describe the problem and how you can write a test for it with [Jest](https://jestjs.io) + React Testing Library.

#### Table of Contents

1. [Controlled Component](#scenario-1---controlled-component)
2. [Input Change](#scenario-2---input-change)
3. [Focused Element](#scenario-3---focused-element)
4. [Effects](#scenario-4---effects)
5. [setTimeout](#scenario-5---settimeout)
6. [Fetch](#scenario-6---fetch)
7. [Multiple API calls](#scenario-7---multiple-api-calls)

If you are reading this post as a reference, you can skip the next session. Else, let us understand what makes RTL _better_.

### Why React Testing Library

> The more your tests resemble the way your software is used, the more confidence they can give you.

The above sentence is the [guiding principle](https://testing-library.com/docs/guiding-principles) of React Testing Library and in fact says a lot about it. With Enzyme, tests were always uncomfortably implementation-dependent. They were fragile to changes.

With RTL, when you render a component, you have the actual DOM element exposed to you. This makes your test way more predictable and reduces the learning curve (it boils down to good ol' JavaScript).

One can argue that all you can do with RTL is possible to be done with Enzyme. True. But in the end, RTL was designed to _enforce good practices_. That's why you `render` and access elements through accessibility-compliant attributes (get via semantic attributes such as text, label and placeholder, instead of using meaningless class selectors).

Another pleasant difference is that tests are smaller, [which is a good thing](/how-to-become-a-bad-developer/#take-pleasure-in-writing-more-code).

Enough with the prelude, let us take a look at our first scenario.

## Scenario 1 - Controlled Component

Suppose that you need to create a button component that is meant to be shared across your app:

```jsx
import React from 'react'

const Button = props => {
  return <button onClick={props.onClick}>{props.text}</button>
}

export default Button
```

There are two things that you might want to assert:

1. The button is rendered with the correct text;
2. Whatever function passed as the `onClick` prop is called after click.

Here's how you can write a test to address the first point:

```jsx
import React from 'react'
import Button from './Button'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

const defaultProps = {
  onClick: jest.fn(),
  text: 'Submit',
}

test('button renders with correct text', () => {
  const { queryByText } = render(<Button {...defaultProps} />)
  expect(queryByText('Submit')).toBeTruthy()
})
```

Notice that `render` returns functions that allow you to select and manipulate DOM elements. In our case, we are using [queryByText](https://testing-library.com/docs/dom-testing-library/api-queries#queryby), which (surprise!) allows you to query nodes by their text. It will return `null` if no nodes satisfy the query and throw an error if more than one are found (when you might consider using [queryAllBy](https://testing-library.com/docs/dom-testing-library/api-queries#queryallby)).

So our test was able to assert that there is a DOM node whose text is _Submit_. And if we want to make sure that it works for other prop values too?

```jsx
test('button renders with correct text', () => {
  const { queryByText, rerender } = render(<Button {...defaultProps} />)
  expect(queryByText('Submit')).toBeTruthy()

  // Change props
  rerender(<Button {...defaultProps} text="Go" />)
  expect(queryByText('Go')).toBeTruthy()
})
```

The `rerender` function allows you to manually trigger a rerender, this time with a different prop. Our first test is done!

Now let's check how we can guarantee that by clicking on the button we call the `onClick` prop:

```jsx
import React from 'react';
import Button from './Button';
import { render, fireEvent, cleanup } from '@testing-library/react';

...

test('calls correct function on click', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <Button {...defaultProps} onClick={onClick} />
  );
  fireEvent.click(getByText(defaultProps.text));
  expect(onClick).toHaveBeenCalled();
});
```

Here we are creating a simple [Jest mock function](https://jestjs.io/docs/en/mock-functions) and passing it as the `onClick` prop to the `Button` component. We then use [getByText](https://testing-library.com/docs/dom-testing-library/api-queries#getby) to select the button this time (`getByText` will throw an error if 0 or more than one element match the query).

With the node selected, we then call `fireEvent.click`, which is the declarative way of RTL firing events. All we need to do next is to confirm that our mock function was indeed called.

And our first basic scenario is complete. [The complete test is in GitHub.](https://github.com/rafaelquintanilha/react-testing-library-examples/blob/master/src/Button.test.js)

## Scenario 2 - Input Change

Another very common use-case is an input change that modifies the UI. Consider a text field for the user's name and a greeting that changes with the input:

```jsx
import React, { useState } from 'react'

function ChangeInput() {
  const [name, setName] = useState('')
  return (
    <div>
      <span data-testid="change-input-greeting">
        Welcome, {name === '' ? 'Anonymous User' : name}!
      </span>
      <br />
      <input
        type="text"
        aria-label="user-name"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  )
}

export default ChangeInput
```

Notice that we are using React Hooks to manage the state. However, **internal implementations shouldn't matter at all**. Here's how the test would look like:

```jsx
import React from 'react'
import ChangeInput from './ChangeInput'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('displays the correct greeting', () => {
  const { getByLabelText, getByTestId } = render(<ChangeInput />)
  const input = getByLabelText('user-name')
  const greeting = getByTestId('change-input-greeting')
  expect(input.value).toBe('')
  expect(greeting.textContent).toBe('Welcome, Anonymous User!')
  fireEvent.change(input, { target: { value: 'Rafael' } })
  expect(input.value).toBe('Rafael')
  expect(greeting.textContent).toBe('Welcome, Rafael!')
})
```

Pretty straightforward, we select the input via the `aria-label` attribute (a good example of the library enforcing accessibility good practices) and also check that both the greeting and the input have the correct initial value. Then, we call `fireEvent.change` to trigger a change event, making sure we pass the correct event object with the new input.

Finally, we need to assert that the input has the correct value and the right greeting is being displayed. And there two of my favorite things with RTL stand:

1. We access values and attributes as we would with regular DOM nodes. So getting an element's text is as easy as accessing `textContent`.
2. Nodes are passed as _reference_, so if you assign them to a variable _before_ a change, you can use the same variable to later check if any of its attributes have changed. This is a huge plus over Enzyme, where I found myself many times dealing with bugs where I assumed a change would be there but I needed to select the element again. Notice how the same `greeting` variable has different `textContent` values based on the event triggered.

## Scenario 3 - Focused Element

Accessible applications need to keep track of the focused element. For example, suppose you want to make sure that after clicking on a button, the focus goes to a given input.

```jsx
import React, { useRef } from 'react'

const FocusInput = () => {
  const inputRef = useRef(null)
  return (
    <div>
      <input
        type="text"
        aria-label="focus-input"
        ref={inputRef}
        placeholder="Focus me!"
      />
      <button onClick={() => inputRef.current.focus()}>Click to Focus</button>
    </div>
  )
}

export default FocusInput
```

The `useRef` hook stores the input's reference. You can find more about refs in [The Complete Guide to React Refs](/the-complete-guide-to-react-refs/).

Let's write a test to assert that the input receives focus after click:

```jsx
import React from 'react'
import FocusInput from './FocusInput'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('clicking on button trigger focus on input', () => {
  const { getByPlaceholderText, getByText } = render(<FocusInput />)
  fireEvent.click(getByText('Click to Focus'))
  const input = getByPlaceholderText('Focus me!')
  expect(input).toBe(document.activeElement)
})
```

This time we introduce `getByPlaceholderText`, which can be handy in some situations (however, [a placeholder is not a substitute for a label](https://www.nngroup.com/articles/form-design-placeholders/).

The experience of testing focused elements is, in my opinion, very superior to Enzyme's. In particular, I love how idiomatic `expect(input).toBe(document.activeElement)` is.

#### Snapshots

Let me introduce how you can do snapshot testing with React Testing Library:

```jsx
...

test('FocusInput matches snapshot', () => {
  const { container } = render(<FocusInput />)
  expect(container.firstChild).toMatchSnapshot();
});
```

Notice that `render` returns a `container` element. By default, every component is rendered into a `div`. That's why we access the element via `container.firstChild`. There are some occasions when you don't want to render into a `div`, e.g. when your component renders a `tr` and therefore the container needs to be a `table` element. You can check the [render API](https://testing-library.com/docs/react-testing-library/api#render-options) for more information.

## Scenario 4 - Effects

We have already covered `useState` and `useRef`. Next, let us combine them with `useEffect`. Consider a component where the user can increment a counter and mark a checkbox in order to display the count in the document's title.

```jsx
import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'

function Counter() {
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const initialTitleRef = useRef(document.title)

  useEffect(() => {
    document.title = checked
      ? `Total number of clicks: ${count}`
      : initialTitleRef.current
  }, [checked, count])

  return (
    <div>
      <span data-testid="count">
        Clicked {count} time{count === 1 ? '' : 's'}
      </span>
      <br />
      <Button onClick={() => setCount(count + 1)} text="Increment" />
      <div>
        <input
          type="checkbox"
          id="checkbox-title"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <label htmlFor="checkbox-title">
          Check to display count in document title
        </label>
      </div>
    </div>
  )
}

export default Counter
```

First, let us make sure that the counter works as expected:

```jsx
import React from 'react'
import Counter from './Counter'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('count starts with 0', () => {
  const { getByTestId } = render(<Counter />)
  expect(getByTestId('count').textContent).toBe('Clicked 0 times')
})

test('clicking on button increments counter', () => {
  const { getByText, getByTestId } = render(<Counter />)
  fireEvent.click(getByText('Increment'))
  expect(getByTestId('count').textContent).toBe('Clicked 1 time')
  fireEvent.click(getByText('Increment'))
  expect(getByTestId('count').textContent).toBe('Clicked 2 times')
})
```

Nothing really new so far. Time to test the effect:

```jsx
...

test('window title changes after every increment if checkbox is checked', () => {
  global.window.document.title = "My Awesome App";
  const { getByText, getByLabelText } = render(<Counter />);

  // When checkbox is unchecked, incrementing has no effect
  fireEvent.click(getByText("Increment"));
  expect(global.window.document.title).toBe("My Awesome App");

  // Check and assert the document title changes
  const checkbox = getByLabelText("Check to display count in document title");
  fireEvent.click(checkbox);
  expect(global.window.document.title).toBe("Total number of clicks: 1");

  // Works if you increment multiple times
  fireEvent.click(getByText("Increment"));
  expect(global.window.document.title).toBe("Total number of clicks: 2");

  // Unchecking will return to the original document title
  fireEvent.click(checkbox);
  expect(global.window.document.title).toBe("My Awesome App");
});
```

The test should be straightforward to follow. Some remarks:

- We start by defining `document.title` in the `global.window` object. Notice that we initialize it once and then the effect is responsible for further changes;
- Even though the checkbox has an `onChange` event handler, we need to fire a `click` event;
- Differently from the `aria-label` example in Scenario 2, we now use a `label` element to select the input.

This example is heavy on Hooks. If you want to learn more about them, make sure to check [How to Reuse Logic with React Hooks](how-to-reuse-logic-with-react-hooks).

## Scenario 5 - setTimeout

All of our examples so far were synchronous, meaning that we didn't need to wait for anything before checking the result of an operation. From now on, the examples will include async code. Async code is mostly found in timeouts, intervals and API calls.

Let us start with a simple application that should display a message 5 seconds after a button is clicked:

```jsx
import React, { useState } from 'react'
import useTimeout from 'use-timeout'

const TimeoutMessage = () => {
  const [message, setMessage] = useState('This will timeout in 5 seconds')
  useTimeout(() => setMessage('Timeout!'), 5000)

  return <div data-testid="timeout-message">{message}</div>
}

export default TimeoutMessage
```

First thing we will do is confirm that `TimeoutMessage` has the expected behavior. It initially displays a message that is changed upon timeout:

```jsx
import React from 'react'
import TimeoutMessage from './TimeoutMessage'
import { render, cleanup } from '@testing-library/react'

jest.useFakeTimers()

afterEach(cleanup)

test('renders with default text', () => {
  const { getByTestId } = render(<TimeoutMessage />)
  expect(getByTestId('timeout-message').textContent).toBe(
    'This will timeout in 5 seconds'
  )
})

test('text changes after timeout', () => {
  const { getByTestId } = render(<TimeoutMessage />)
  jest.runAllTimers()
  expect(getByTestId('timeout-message').textContent).toBe('Timeout!')
})
```

The key here is to use [Jest timer mocks](https://jestjs.io/docs/en/timer-mocks). We declare `jest.useFakeTimers()` at the top of the test file and then call `jest.runAllTimers()` in order to run the timeout.

Now, let us integrate `TimeoutMessage` into our main `Timeout` component:

```jsx
import React, { useState } from 'react'
import TimeoutMessage from './TimeoutMessage'

const Timeout = () => {
  const [hasClicked, setHasClicked] = useState(false)
  return (
    <div>
      <button disabled={hasClicked} onClick={() => setHasClicked(true)}>
        Click to trigger timeout
      </button>
      {hasClicked && <TimeoutMessage />}
    </div>
  )
}

export default Timeout
```

For some extra fun, we also want the button to be disabled once the user has clicked. Now, we have two ways to proceed with the test:

1. `TimeoutMessage` returns a div with `data-testid="timeout-message"`. We can create a test that will check that an element with this `data-testid` is present in the DOM after click. That would be enough to assure that we are rendering `TimeoutMessage`, however, we wouldn't the whole feature (click + timeout message) integrated.
2. We can assert that the correct messages are being displayed after click and timeout. In the end, that's what matters. Consider also that `TimeoutMessage` could be more generic, e.g. accepting two props `initialMessage` and `timeoutMessage`, and then it would make sense to check that the right text is displayed.

Here's the integration test:

```jsx
import React from 'react'
import Timeout from './Timeout'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

jest.useFakeTimers()

test('clicking on button displays timeout message', () => {
  const { getByText, queryByTestId, getByTestId } = render(<Timeout />)
  const button = getByText('Click to trigger timeout')
  expect(queryByTestId('timeout-message')).toBeNull()
  fireEvent.click(button)
  expect(getByTestId('timeout-message').textContent).toBe(
    'This will timeout in 5 seconds'
  )
  jest.runAllTimers()
  expect(getByTestId('timeout-message').textContent).toBe('Timeout!')
})
```

`Timeout` has no knowledge of `TimeoutMessage`, yet we have asserted that the whole app is integrated.

Finally, we need to confirm that the button is disabled after click:

```jsx
...

test('clicking on button makes it disabled', () => {
  const { getByText } = render(<Timeout />);
  const button = getByText("Click to trigger timeout");
  expect(button.disabled).toBeFalsy();
  fireEvent.click(button);
  expect(button.disabled).toBeTruthy();
});
```

Again, as `button` is a regular DOM element, we can access its `disabled` attribute just fine. Pretty neat!

## Scenario 6 - Fetch

A very common use-case is to assert changes in the UI after data is fetched from an API. This is what we are going to do now. Our next application will fetch a Chuck Norris joke after click and display it to the user. Here's the `Fetch` component:

```jsx
import React from 'react'
import useAPI from './useAPI'

const Fetch = () => {
  const [response, callAPI] = useAPI()
  return (
    <div>
      <button
        onClick={() => callAPI('https://api.chucknorris.io/jokes/random')}
      >
        Get a Chuck Norris joke
      </button>
      {response.loading && <div data-testid="fetch-loading">Loading...</div>}
      {response.error && <div data-testid="fetch-error">{response.error}</div>}
      {response.success && (
        <div data-testid="fetch-joke">{response.data.value}</div>
      )}
    </div>
  )
}

export default Fetch
```

I've used a custom hook called `useAPI` that returns the response from the server and a function to invoke the API. The implementation of `useAPI` is out of the scope of this article, but you shouldn't have any trouble to [follow along with the source code](https://github.com/rafaelquintanilha/react-testing-library-examples/blob/master/src/useAPI.js).

Let's get to the tests. First thing we want to do is assert that no jokes are displayed when the component renders:

```jsx
import React from 'react'
import Fetch from './Fetch'
import { render, fireEvent, cleanup, wait } from '@testing-library/react'

afterEach(cleanup)

test('starts without any joke', () => {
  const { queryByTestId } = render(<Fetch />)
  expect(queryByTestId('fetch-joke')).toBeNull()
})
```

Recall that we use `queyByTestId` when we want to assert that an element is _not_ present (`getByTestId` would throw an error).

Next, let's write a test to confirm a loading message is displayed after click:

```jsx
...

test('after clicking on button, displays loading message', () => {
  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  expect(getByTestId("fetch-loading").textContent).toBe("Loading...");
});
```

So far so good. But how we assert the async response?

The answer is the [wait](https://testing-library.com/docs/dom-testing-library/api-async#wait) function that comes with RTL. `wait` allows you to halt the test until the relevant element is visible in the DOM:

```jsx{17}
...

test('after clicking on button, displays joke if API succeeds', async () => {
  const joke = "Chuck Norris counted to infinity. Twice.";

  // Mock API
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        value: joke
      })
    }));

  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  await wait(() => getByTestId("fetch-joke"));

  expect(getByTestId("fetch-joke").textContent).toBe(joke);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random");

  // Clear mock
  global.fetch.mockClear();
});
```

1. [jest.spyOn](https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname) mocks the global `fetch` function. I strongly recommend that you read the docs to get a better sense of how the spy works.
2. [mockImplementation](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockimplementationfn) defines which function the spy will invoke. Once `fetch` returns a Promise that later will be converted to `json`, we mock the two functions. Also notice that the `status` is 200 so our `useAPI` hook doesn't throw an error.
3. `await wait(() => getByTestId("fetch-joke"))` basically waits for the element with `data-testid="fetch-joke"` to become visible in the DOM. This is our async mark.
4. Now that we have waited for the Promises to resolve and the DOM element to become visible, the next step is as simple as checking that the joke is where it was supposed to be.
5. Lastly, we assert that we indeed called the right API. `mock.calls` return an array of calls, each of them composed by an array of args. So `mock.calls[0][0]` is the first arg of the first call, `mock.calls[0][1]` is the second arg of the first call and so on.

As of now we are able to test the majority of the use-cases you will find when developing React applications. But there is one last scenario that I would like to mention.

## Scenario 7 - Multiple API calls

What if you trigger a _second_ API call as a result of the first API call? This is what we are going to see now.

Consider an application that fetches a blog post and, once the post is retrieved, fetches all comments related to the post:

```jsx
import React, { useEffect } from 'react'
import useAPI from './useAPI'

const MultipleFetches = () => {
  const [postResponse, callPostAPI] = useAPI()
  const [commentsResponse, callCommentsAPI] = useAPI()

  useEffect(() => {
    if (postResponse.success) {
      callCommentsAPI('https://jsonplaceholder.typicode.com/posts/1/comments')
    }
  }, [postResponse.success, callCommentsAPI])

  return (
    <div>
      <button
        onClick={() =>
          callPostAPI('https://jsonplaceholder.typicode.com/posts/1')
        }
      >
        Fetch post and comments
      </button>
      <div>
        {postResponse.loading && (
          <div data-testid="fetch-loading-post">Loading post...</div>
        )}
        {postResponse.error && (
          <div data-testid="fetch-error-post">{postResponse.error}</div>
        )}
        {postResponse.success && (
          <div data-testid="fetch-post">{postResponse.data.title}</div>
        )}
      </div>
      {!postResponse.loading && (
        <div>
          {commentsResponse.loading && (
            <div data-testid="fetch-loading-comments">Loading comments...</div>
          )}
          {commentsResponse.error && (
            <div data-testid="fetch-error-comments">
              {commentsResponse.error}
            </div>
          )}
          {commentsResponse.success && (
            <ul>
              {commentsResponse.data.slice(0, 10).map(comment => (
                <li key={comment.id} data-testid="comment-author">
                  {comment.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {postResponse.success && commentsResponse.success && (
        <div data-testid="multiple-fetch-success">All fetched!</div>
      )}
    </div>
  )
}

export default MultipleFetches
```

We now use a combination of [useAPI](https://github.com/rafaelquintanilha/react-testing-library-examples/blob/master/src/useAPI.js) and `useEffect`. Once the first call succeeds, the second API is called. What's the difference from the single fetch example?

```jsx
import React from 'react'
import MultipleFetches from './MultipleFetches'
import { render, fireEvent, cleanup, wait } from '@testing-library/react'

afterEach(cleanup)

describe('API tests', () => {
  // Group API tests so we can clear the mock more easily
  afterEach(() => global.fetch.mockClear())

  test('displays post if API succeeds', async () => {
    // Mock API
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              title: 'How to Become a Bad Developer',
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve([
              { id: 1, name: 'Rafael' },
              { id: 2, name: 'Andressa' },
            ]),
        })
      )

    const { getByTestId, getByText, getAllByTestId } = render(
      <MultipleFetches />
    )
    fireEvent.click(getByText('Fetch post and comments'))

    await wait()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch.mock.calls[0][0]).toBe(
      'https://jsonplaceholder.typicode.com/posts/1'
    )
    expect(global.fetch.mock.calls[1][0]).toBe(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    )

    expect(getByTestId('fetch-post').textContent).toBe(
      'How to Become a Bad Developer'
    )
    expect(getByText('All fetched!')).toBeTruthy()

    const authors = getAllByTestId('comment-author')
    expect(authors[0].textContent).toBe('Rafael')
    expect(authors[1].textContent).toBe('Andressa')
  })
})
```

First, we are now using [jest.mockImplementationOnce](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockimplementationoncefn) as we need more control over the fetches (each call should have a different response).

Plus, we use `await wait()`, with no function as argument. The result of doing that is waiting for the next _tick_ in [Node event loop](https://nodejs.org/fa/docs/guides/event-loop-timers-and-nexttick/). Without going into many details, what it does is to wait until the next async operation is performed.

Once we have awaited the resolution of both calls, the next is easy: just assert that every call was called with the correct API and that the data is being displayed in the DOM.

The full test file including the failure scenarios is [available in GitHub](https://github.com/rafaelquintanilha/react-testing-library-examples/blob/master/src/MultipleFetches.test.js).

## Wrapping Up

I hope this article helps you when creating tests with Jest and React Testing Library. Don't forget that you can consult [React Testing Library Examples](https://react-testing-library-examples.netlify.com) as a shorter reference when convenient.
