---
title: Making Better Investments with Math and JavaScript
date: "2019-01-18"
lastReview: "2019-01-18"
spoiler: NPV and IRR with bits of math and chunks of computer science.
lang: en-us
---

It is often said that one of the greatest physicists of the last century, [Richard Feynman](https://en.wikipedia.org/wiki/Richard_Feynman), endorsed that the best way of learning a subject is to refine a concept to be simple enough for a 5-year-old to understand. Well, I don't expect to have any kids among my audience but I will try to explain how financial concepts NPV and IRR work using what you like (code and math).

This will set the foundations for building an online calculator and help us make better financial decisions in the future (_disclaimer: don't blame me if you go bankrupt_).

Let's start then with a simple but intriguing problem.

## The Problem

Suppose that your friend Elon asks if you are interested on backing his new endeavour. He says that if you lend him **$10,000** he expects to return **$11,000** to you after **one year**. Should you accept the offer?

In other words: **should you deposit \$10,000 now in order to withdraw \$11,000 in one year?**

Of course I don't intend to go into metaphysical questions about what you should do with your money neither to assess the risks of such transaction (as Elon's predictions might not be true). The real goal here is to develop a tool where one can *compare* potential investments and then decide which one fits best *given* one's condition.

## Net Present Value

Now suppose the following: you know that you can easily allocate funds in government bonds that pay 5% per year. If your goal is to receive back the same amount your friend Elon is promising, how much should you invest?

Well, it's easy to see that $(1 + 0.05)x = 11000$, where $x$ is the initial investment in order to receive the same return Elon promised but with government bonds. This yields $x \cong 10476$.

It means that, in **today's money**, \$11,000 equates to \$10,476 if you decide to go with public bonds. But according to Elon all you need is \$10,000 and hence we say that 
$$
NPV = 10476 - 10000 = 476
$$

Which means that, in **today's money**, you are expected to have a **net profit of \$476** in this transaction.

More generally, we can define NPV as:

$$
NPV = \sum_{t=0}^n \frac{C_t}{(1 + r)^t}
$$

Where $C_t$ is the **cash inflow or outflow** in period $t$ and $r$ is the **discount rate**. Check that for $C_0 = -10000$, $C_1 = 11000$, $n = 1$ and $r = 0.05$ we achieve the same result.

Remember, in plain english (and according to [investopedia](https://www.investopedia.com/terms/n/npv.asp)):

> NPV = (Today’s value of the expected cash flows) – (Today’s value of invested cash)

## Writing a Function to Evaluate the NPV

Shall we write some code?

The goal here is to write a function that translates the above equation into bits. Thankfully with JavaScript we can write it in a single-line function:

```jsx
const NPV = (cashflow, discountRate) => cashflow
  .reduce((acc, val, i) => acc + val / Math.pow((1 + discountRate), i), 0);
```

Beautiful, isn't it?

If you are not familiar with arrow functions, I suggest you take some time and read [this great article about it](https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26). You may also want to check [`.reduce` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) in JavaScript.

Let's walk through it:

First we assume that `cashflow` is an array of numbers, the one we want to *reduce*. The `.reduce` method takes two arguments, the first one being the *reducer* and the second one being an optional *initial value*.

```jsx
const reducer = (acc, val, i) => acc + val / Math.pow((1 + discountRate), i);
```

On the other hand, *reducer* is a function which takes three args:

- `acc` is the accumulator, the result of previous iterations.
- `val` is the current value being evaluated.
- `i` is the current index.

We are then calling the *reducer* for every entry in the array (here assuming the value of `val`), and evaluation the following:

```jsx
acc + val / Math.pow((1 + discountRate), i)
```

Which basically is evaluating $\frac{C_i}{(1 + discountRate)^i}$ and adding to the previously evaluated $i$ (remember that we initialize `acc` as 0).

You are now ready to test our function:

```jsx
const NPV = (cashflow, discountRate) => cashflow
  .reduce((acc, val, i) => acc + val / Math.pow((1 + discountRate), i), 0);

const cashflow = [-10000, 11000];
const discountRate = 0.05;
console.log(NPV(cashflow, discountRate)); // 476.19047619047524
```

Great, now you know how to define NPV in english, in mathematics and in JavaScript. Tell me about being a polyglot!

## Internal Rate of Return

NPV is great but still an **absolute** number. Is $NPV = 476$ good or bad? Apart from the fact that this is a particular question (once risks are assessed differently by different people), it lacks information. For example, it is clear that this number is significantly better if the initial investment $C_0$ was \$5,000, and definitely worse if $t = 10$.

You then start looking for another metric. Instead of thinking about _how much money you would make_ with such investment, you try to figure out what the _discount rate_ is. You know that the government pays you 5%, but how much is Elon paying you _given_ his predictions become true?

Again, it's easy to see that $(1 + r)10000 = 11000$, where $r$ is the discount rate for this investment with the projected cash inflow. This yields $r = 0.1$, or **10%**.

And now we are talking! You have a very concrete way of _comparing_ (this is the key word) two investments: government bonds paying 5%, Elon paying 10%. Are Elon's projections real? Well, for twice the rate you find in the market, you may consider give it a shot.

Meet IRR -- the **internal return rate** for a given initial investment and a projected cash inflow or outflow over a period of time. We can define IRR as:

$$
0 = \sum_{t=0}^n \frac{C_t}{(1 + r)^t}
$$

Where $C_t$ is the **cash inflow or outflow** over period $t$ and $r$ is the **internal return rate**. Check that for $C_0 = -10000$, $C_1 = 11000$ and $n = 1$ the formula yields $r = 0.1$.

> IRR is the discount rate that, for a projected cash inflow or outflow, yields $NPV = 0$.

And now things are making more sense (hopefully).

## A More Complex Problem

Elon's example was deliberately easy to follow but -- as many things in life -- there is not always the case.  

You are a businessman and as such you understand that immediate returns are not usually big. Is your understanding that, in order to extract maximum value, you need to reinvest your money for at least 5 years.

Your friend Jeff then approaches with a different opportunity: you invest initally \$10,000 and reinvest all generated cash for the next 5 years. His estimates are that this business will generate **\$11,000** in year 1, **\$12,000** in year 2, **\$13,000** in year 3, **\$14,000** in year 4 and finally **\$15,000** in year 5.

That sounds good, but how good exactly? You then use the IRR formula you just learned in order to evaluate the _expected rate of growth_ for this project:

$0 = \frac{10000}{(1 + r)^0} + \frac{11000}{(1 + r)^1} + \frac{12000}{(1 + r)^2} + \frac{13000}{(1 + r)^3} + \frac{14000}{(1 + r)^4} + \frac{15000}{(1 + r)^5}$

You quickly realize that things look more elegant if you let $x = \frac{1}{1 + r}$:

$15000x^5 + 14000x^4 + 13000x^3 + 12000x^2 + 11000x - 10000 = 0$

Which is _quintic polynomial_. Well, you definitely know how to solve quadratic polynomials (your friend Bhaskhara), cubic polynomials ([Cardano-Tartaglia's](https://en.wikipedia.org/wiki/Cubic_function#Cardano's_method) method) and quartic polynomials ([which is ugly but doable](https://math.stackexchange.com/questions/785/is-there-a-general-formula-for-solving-4th-degree-equations-quartic)). But it happens that for 5th degree polynomials a fellow named [Évariste Galois](https://en.wikipedia.org/wiki/%C3%89variste_Galois) explains that you simply _can't_ have a nice formula (as Bhaskara is). [His ideas](https://en.wikipedia.org/wiki/Galois_theory) were used to proof the [Abel-Ruffini theorem](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem) (Galois later died at age of 20 in a duel, but this is another story).

Anyway, we live in the computer era and therefore we shall be able solve the above equation.

## Newton's Method

Couple centuries ago one guy named Isaac Newton was born and did some great stuff. That should ring a bell.

Among thousand other things, Newton figured out a way to find _roots_ of an equation. You can find a full reference about it in [Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_method) but I'll try to give some intuition here.

First, we are not trying to find _all_ solutions. We are specially interested on the solution that is _semantically coherent_, meaning that we should be able to put our discount rate in a fair range -- I know that Jeff's operation is expected to be lucrative, therefore $r > 0$. On the other hand, it's certainly not multiplying my capital by a factor of 5, so $r < 4$. Intuitively, then, $r$ must exist and be somewhere in the middle.

Now consider the above polynomial as the function:

$f(x) = 15000x^5 + 14000x^4 + 13000x^3 + 12000x^2 + 11000x - 10000$

For $x = 0$ we have $f(0) = -10000$ and for $x = 1$ we have $f(1) = 55000$. What does that mean?

Recall that a _root_ of a function is a $x$ in which $f(x) = 0$. But also consider that, for $x > 0$, $15000x^5 + 14000x^4 + 13000x^3 + 12000x^2 + 11000x$ is **always** positive and therefore $f(x)$ is **crescent** in this interval.

So if I evaluate $f$ for $x = 0.1$ it must be _bigger_ than $f(0)$. I also know that $f$ is crescent, $f(0) < 0$ and $f(1) > 0$. Then if I keep increasing $x$ in baby steps, eventually I'm expected to get close to 0, i.e., close to the _root_.

In other words, knowing that [all polynomials are continuous](https://math.stackexchange.com/questions/284184/prove-that-any-polynomial-function-is-continuous), in order to go from a negative number to a positive number, I necessarily need to cross _zero_, that is, the _root_.

This, my friends, is the root (pun intended) of Newton's Method.

## Writing a Function to Evaluate the IRR

We already understand NPV and how it is needed to evaluate the IRR. But also discovered that isn't _that_ simple to find roots of big polynomials. We therefore simplified Newton's Method by adjusting it to our use-case. How to turn this into code?

That's how:

```jsx
const IRR = (cashflow, initialGuess = 0.1) => {
  const maxTries = 10000;
  const delta = 0.001;
  let guess = initialGuess;
  const multiplier = NPV(cashflow, guess) > 0 ? 1 : -1;
  let i = 0;
  while ( i < maxTries ) {
    const guessedNPV = NPV(cashflow, guess);
    if ( multiplier * guessedNPV > delta ) {
      guess += (multiplier * delta);
      i += 1;
    }
    else break;
  }
  console.log(`Found IRR = ${guess} in ${i} trials`);
}
```

Let it sink a bit. But don't worry, we are going to cover it all:

The first part basically defines the necessary variables. Here `cashflow` is the array of cash inflow or outflow and `initialGuess` our starting point for the Search of the Root™.

- `maxTries` defines the maximum number of iterations. Eventually the algo can get stuck or our guess was too bad and we don't want this to take forever;
- `delta` is the iteration step and also how close to 0 we are satisfied to get;
- `guess` is the current guess for the root is in a particular iteration;
- `i` is the iteration counter;
- `multiplier` is $±1$. In short, it is $+1$ when we need to _increase_ $x$ (decrease $r$) in the next step and $-1$ when our guess was too big and we need to _decrease_ $x$ (increase $r$). Recall that we made the transformation $x = \frac{1}{1 + r}$ and therefore $x$ is _inversely_ proportional to $r$.

Next lines should be easy. `guessedNPV` is the NPV value for the current guess. Recall this is what we are trying to approximate to zero.

We then check in the following lines if our guessed value is bigger than the designated `delta`, increase the iteration and go again. If smaller -- bingo! We have found a $x$ that gets as close as desirable to 0 and we shall stop.

Go ahead and test the code:

```jsx
// Elon's proposition: IRR = 10%
IRR([-10000, 11000], 0.05); // Found IRR = 0.10000000000000005 in 50 trials

// Jake's proposition: IRR = 115%
IRR([-10000, 11000, 12000, 13000, 14000, 15000]); // Found IRR = 1.150999999999984 in 1051 trials
```

With our brand new code we are able to evaluate how much our IRR is for Jeff's project: **115%**. Not bad, huh?

## Wrapping Up

Both NPV and IRR are comparative metrics you might want to use when deciding between investments. For a given initial amount, you expect the investments with higher projected NPV and IRR to theoretically be better. In real life that's not always the case.

1. Although IRR gives you a number to compare, it says nothing about the _risks_ involved. For example, Jeff may be more reliable than Elon. His projections may be more solid. His business model more consistent. So if investment A yields 20% and investment B yields 24% but with a _riskier model_, you may want to put your money on A.

2. Liquidity matters. IRR tells about returns, but don't forget that investments may have different durations. If investment A yields 20% _in 2 years_ and investment B yields 24% _in 5 years_, you may want to go with A. 

3. IRR assumes all available money in the end of each $t$ will be reinvested. In real life that rarely is the case.

Now that our knowledge about IRR and NPV is solid, we can move forward. In this post we have made assumptions (about convergence, for example) that won't always be true. In the next post we will cover those gaps and build together a React app that evaluates the IRR of a given investment.

Stay tuned!