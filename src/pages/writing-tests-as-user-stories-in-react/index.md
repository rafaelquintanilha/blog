---
title: Writing Tests as User Stories in React
date: '2020-04-02'
lastReview: '2020-04-02'
spoiler: How to leverage React Testing Library to write tests that make sense.
lang: en-us
canonical: https://blog.logrocket.com/semantic-tests-with-react-testing-library/
---

[This article was originally posted in the LogRocket blog.](https://blog.logrocket.com/semantic-tests-with-react-testing-library/)

<figure>
  <img src="./cover.png" alt="Writing tests as user stories" />
</figure>

Testing code can be a controversial subject, largely due to the multitude of ways one can go about writing a test.

There are no clear rules, and ultimately you are the one in charge of deciding what’s worth testing and how you’re going to do it.

One common mistake is to test implementation details, but perhaps you’ve read that already.

Let me take a step back then — what is the end goal of a test?

## Writing user stories

A common software abstraction is to write user stories — that is, possible actions that a user can take when interacting with your application.

Suppose you are to build a Celsius-to-Fahrenheit converter. A legitimate story could be something like:

_“As a user, I want to be able to convert from Celsius to Fahrenheit.”_

Naturally, as a careful developer, you want to assert that for a given set of numbers and inputs the conversion works (or it fails gracefully for invalid inputs like “banana”).

Note, however, that testing that a function is able to successfully handle the conversion from Celsius to Fahrenheit is only half the story.

If you are able to perform the most expensive and relevant calculation but your end user can’t access it, all effort will be in vain.

Why is that?

Well, as a frontend developer, your job is to not only ensure users get the correct answers to their questions but also to make sure they can use your application.

Therefore, you need to assess that the user has interacted with your application as expected.

In our example, that means that somewhere in the screen you expect some text to be displayed like this: “25ºC equals 77ºF.”

Now, that’s a relevant test. You just assessed that, for a given input, the user satisfactorily got the right answer on the screen.

## Stories (mostly) don’t care about details

The main takeaway here is that the user stories aren’t centered on your development implementations, so your tests shouldn’t be, either.

Of course, the scenarios in question are related to application-wide tests (things that have context), not bare-bones libraries.

If your goal is to create a library that converts Celsius to Fahrenheit to Kelvin, then it’s fine to test the details once you are detached of context.

Now that we understand that tests should resemble user stories, you can predict where semantics come from.

At the end of the day, your tests should have clear semantics such that you could read them in plain English—the same way you describe user stories.

We’ll see how we can leverage the [React Testing Library API](https://github.com/testing-library/react-testing-library) to write semantic tests that make sense.

## Case study: Temperature Converter

Let’s dive further into the Temperature Converter application.

We’ll pretend that a competent Project Manager heard the complaints of their clients (probably any non-American who has moved recently to the US) and came up with the following requirements:

- As a user, I want to be able to convert from Celsius to Fahrenheit
- As a user, I want to be able to convert from Fahrenheit to Celsius
- As a user, I want to click on a Reset button so I can easily convert many values with minimal effort

Apart from the lack of creativity of the PM when writing stories, the requirements are pretty straightforward.

We will sketch a simple app, do a good ol’ smoke test to check that everything looks alright, and then apply what we just learned in order to write better tests.

Consider the following CodeSandbox for our sample application:
https://codesandbox.io/s/temperature-converter-mw7se

Diving into the specifics of the code is beyond the scope of this article (check [“How to Reuse Logic With React Hooks](https://rafaelquintanilha.com/how-to-reuse-logic-with-react-hooks)” for more context on how to use Hooks to create React applications).

However, the code should be pretty straightforward. We are basically requiring user input and allowing them to convert from Celsius to Fahrenheit or vice-versa.

We then display the results and a Reset button shows up. Upon clicking the button, the input is cleared and regains focus.

This aligns with what our users are looking for: we’ll improve the usability of the app and, most importantly, preserve its accessibility.

Now that we have a live application that seems to work, let’s be responsible developers and write some tests.

We’ll try to match each user story to a single test. By doing that, we will be confident that each requirement is being fulfilled with a set of tests backing us up.

Consider this basic skeleton for `App.test.js`:

```jsx
import React from 'react'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

test('user is able to convert from celsius to fahrenheit', () => {
  /* story 1 goes here */
})

test('user is able to convert from fahrenheit to celsius', () => {
  /* story 2 goes here */
})

test('user can reset calculation and automatically focus on the input', () => {
  /* story 3 goes here */
})
```

(We are using [Jest](https://jestjs.io/) as our test runner, but that’s not relevant to the main point presented in the article.)

Notice that our three tests are really straightforward and any failures in them would quickly expose what is really going on.

Now we’ll leverage RTL and write the first test in a way that makes sense:

```jsx
import React from 'react'
import App from './App.js'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

afterEach(cleanup)

test('user is able to convert from celsius to fahrenheit', () => {
  render(<App />)
  const input = screen.getByLabelText('Temperature:')
  userEvent.type(input, '25')
  expect(screen.getByText('25ºC equals to 77ºF')).toBeTruthy()
  userEvent.type(input, '0')
  expect(screen.getByText('0ºC equals to 32ºF')).toBeTruthy()
  userEvent.type(input, 'banana')
  expect(screen.queryByTestId('result')).toBeFalsy()
})

/* code goes on */
```

There are a couple things to notice with the dependencies:

First, we import the component in question `App.js`.

Then, notice that we are importing `render` and `screen` from RTL. While the first has been around since the library’s first launch, `screen` is a new addition [shipped on version 9.4.0](https://github.com/testing-library/react-testing-library/releases/tag/v9.4.0). We will see its main advantage shortly.

We also import a new dependency, [userEvents](https://github.com/testing-library/user-event), straight from `@testing-library/user-event`. This library will boost our test readability and help us achieve our goal of improving our semantics.

Let’s actually dive into the test. If you are used to RTL, the first thing you’ll notice is that `render` is not returning anything. In fact, that’s the main advantage of importing `screen`.

What `screen` does is basically expose all queries that allow you to select elements in the screen (hence the name).

This is a pretty good change because it helps you avoid bloating the test with lots of [destructuring](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), which is always annoying when you are not sure yet which queries to use.

Also, the code looks cleaner. (Note: there’s still a case for de-structuring `container` and `rerender` as mentioned by Kent C. Dodds [in this tweet](https://twitter.com/kentcdodds/status/1224790664354779136).)

The other difference from conventional tests you might have been writing is the `userEvent` object.

This object provides a handful of user interactions that are semantically understandable and conceal implementation details. Consider the following example:

```jsx
// Previously
fireEvent.change(input, { target: { value: '25' } })

// With userEvents
userEvent.type(input, '25')
```

Not only is our code is shorter, but it also makes much more sense now.

Remember that our goal is to write a test as close as possible to plain English. By encapsulating implementation details, `userEvent` really puts us on the right track.

If you are curious, [go ahead and check their documentation](https://github.com/testing-library/user-event).

Once we are able to fill the input, we can now assert that the correct text is being displayed.

Now we can test a bunch of other options and confirm that what is displayed in the screen is expected (e.g., an invalid input like `banana` won’t work).

Note: in a modular application, the conversion functions could be extracted in their own file and have their own tests (with many more test scenarios).

If you test the function separately, there’s no need to make redundant checks in the user stories as well (test is code and you want it maintainable as such).

With a test that is only eight lines long, we were able to check that our first scenario works as expected.

Let’s jump into our second user story — convert from Fahrenheit to Celsius (maybe a New Yorker having some fun on a beach in South America).

The test should be pretty similar to our first one, with a single caveat: we need to make sure that the user has selected the right option.

```jsx
test('user is able to convert from fahrenheit to celsius', () => {
  render(<App />)
  const fahrenheitOption = screen.getByLabelText('Fahrenheit to Celsius')
  userEvent.click(fahrenheitOption)
  const input = screen.getByLabelText('Temperature:')
  userEvent.type(input, '77')
  expect(screen.getByText('77ºF equals to 25ºC')).toBeTruthy()
  userEvent.type(input, '32')
  expect(screen.getByText('32ºF equals to 0ºC')).toBeTruthy()
  userEvent.type(input, 'banana')
  expect(screen.queryByTestId('result')).toBeFalsy()
})
```

That’s it. By leveraging `userEvent` again, emulating a click event becomes trivial.

Our code is perfectly readable and guarantees that the reverse direction (F to C) works as expected.

Our third and final test is slightly different — now our goal is to test the user experience rather than whether or calculator works.

We want to make sure that our application is accessible and that users can rapidly test several values:

```jsx
test('user can reset calculation and automatically focus on the input', () => {
  render(<App />)
  const input = screen.getByLabelText('Temperature:')
  userEvent.type(input, '25')
  expect(screen.queryByTestId('result')).toBeTruthy()
  const resetButton = screen.getByText('Reset')
  userEvent.click(resetButton)
  expect(screen.queryByTestId('result')).toBeFalsy()
  expect(document.activeElement).toBe(input)
})
```

There you have it. We basically made three checks:

- Whenever a user adds some input, there’s a result displayed (the actual message shown is omitted from the test once this isn’t what is being checked here)
- When the Reset button is clicked, the result is not there anymore
- The focus on the screen is back to the input

One of my favorite things about RTL is how easy it is to assert where a focus really is.

Notice how semantic `expect(document.activeElement).toBe(input)` is. That pretty much looks like plain English to me.

And that’s it. Our three stories are covered, the Project Manager is happier, and hopefully our tests will keep the code clean for a long time.

## Conclusion

The aim of this article was to expose the recent modifications in the React Testing Library’s API and show you how you can explore it to write better tests for you and your team.

I feel way more confident when I write tests that I understand because I stop chasing meaningless metrics (e.g. code coverage) to pay attention to what really matters (e.g. if my designed scenario works as expected).

React Testing Library was a big step in the right direction, mainly if you have some Enzyme background (in which case you might want to check “[React Testing Library Common Scenarios](https://rafaelquintanilha.com/react-testing-library-common-scenarios/),” where I explore how you tackle everyday scenarios in a React application).

It really facilitates to test what your application should do rather than how it does it. The semantics make a difference.
