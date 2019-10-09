---
title: The 5 Best Libs for Accessible React Applications
date: "2019-10-08"
lastReview: "2019-10-08"
spoiler: Accessibility is in high demand and these libraries will save you time.
lang: en-us
---

Creating accessible applications is hard. There is a wide range of guidelines to follow, plenty of compatibility issues and sometimes the results aren't easily perceived. Nonetheless, accessible principles really enhance your software and, the most important thing, make sure it is usable across a diverse set of people.

The [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) have the standards for developing accessible applications. However, implementing each principle from scratch is extremely time-consuming. Not only you need to make sure your app is behaving well but browsers vary in some implementations and chances are you will end up fixing weird bugs in older browsers. Speaking from experience, it's frustrating.

Thankfully, React makes UI reusability a smooth experience, which means that if you have a particular widget, say a [combobox](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html), you can embed accessible behavior once and reuse it later. That prompted a surge in the number of accessible libraries that, if used correctly, can save you **a lot** of time.

The following is a non-exhaustive unordered list of accessible React libraries that I have _personally_ used in my projects. I can attest they work really good in real-world applications that are WCAG compliant, so if that's a requirement for you, this post will be really helpful.

## 1. Reach UI

[Reach UI](https://ui.reach.tech/) is perhaps the most complete set of accessible components for React. The collection is vast and it was developed with _accessibility first_ as a principle by [Ryan Florence](https://twitter.com/ryanflorence).

This library is definitely a must-see when you are looking for accessible components. Docs are great, customization is easy and you can choose to install only a particular component (e.g. [Tooltip](https://ui.reach.tech/tooltip)) instead of the whole lib. This makes the library particularly suited for dropping it in an existent application without increasing its bundle size too much.

When choosing an accessible component, often you are more interested in its _behavior_ rather than the styling. Reach UI components have minimal styling, so you have all you need to style them the way you fancy.

I had a particularly good experience with [`MenuButton`](https://ui.reach.tech/menu-button) and can't recommend it enough for things like dropdowns (I had a lot of headaches using [Semantic UI Dropdown](https://react.semantic-ui.com/modules/dropdown/) in the past, so this was a life-changer!)

Make sure you check all elements of the library as it's almost certain you can benefit from at least one of them.

## 2. React Modal

[React Modal](http://reactcommunity.org/react-modal/) is probably one of the libraries that I have most used in my React applications. It's a very common requirement to have a modal overlay, and the folks from `react-modal` have really nailed it.

If not done properly, modals can really ruin the navigation experience for someone using only a keyboard. Modals should implement [focus trapping](https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-trapping.html), which means that the keyboard should interact within the modal, not with what is _underneath_ it. Long story short, it's a mess.

That's why `react-modal` is really valuable — it covers everything you need about focus management and works very well with screenreaders. Their docs are comprehensive and there is a lot of examples online.

## 3. React Select

[React Select](https://react-select.com/home) is one of the most used React libraries out there and the most powerful combobox I've ever used within the React community. There are tons of customizations and you can use if for both simple and complex use-cases.

I mentioned earlier that Reach UI has a combobox and that's true. However, sometimes your combo needs extra functionality. For example, you might want to be able to select multiple options (and therefore need the option to remove them as well). Or maybe you want to dynamically add options (like creating tags). In those situations, `react-select` might be a safer bet. The docs are amazing, it's fully customizable and you can handle dynamic requirements with the powerful [`Creatable`](https://react-select.com/creatable).

Notice, however, that `react-select` is more opinionated, meaning that if you have a really custom design or requirements, you will spend some time making it [look exactly how you want](https://react-select.com/styles). The library takes advantage of [emotion](https://emotion.sh/), so make sure you check it out as well.

## 4. React Tabs

[React Tabs](https://github.com/reactjs/react-tabs) is a simple to use, fully customizable alternative for creating accessible tabs in React. This is one of my favorite libraries and the best thing about it is that it comes with no styling at all. It will require some upfront work to make it look like you want, but in the end it pays off. 

One of the best aspects of tabs is that they are flexible by nature and really help you leverage content you want to display. This example was created using `react-tabs` and minimal configuration and styling:

<span style="display:block;text-align:center">![React Tabs Example](./tabs.gif)</span>

Again, there is an overlap with [Reach UI Tabs](https://ui.reach.tech/tabs/). They share the same principle and I'll leave it to you the decision of which is best for your project.

## 5. React Datepicker

Datepickers are troublesome components. They can be hard to operate in mobile devices and frequently break users' expectations (are you going to make a 40-year old user go back 40 years in the calendar to select his or her birthdate?). However, they do work well for relatively close dates (booking a flight or a hotel, for example) and they are somehow expected for users. 

Unfortunately, we can't rely on [input date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) as its compatibility with older browsers is poor and its implementation varies. How to solve the datepicker issue then?

The simplest yet powerful solution that I found is [`react-datepicker`](https://reactdatepicker.com/). It does pretty much what you expect right off the bat. It has great [keyboard support](https://github.com/Hacker0x01/react-datepicker/#keyboard-support) and it's under active development. 

Notice, however, that it doesn't try to solve all your problems (and sometimes this is a strength). So if all you want is a year picker, perhaps a single dropdown using `react-select` is best. To be frank, this excess of customization is what makes me favor `react-datepicker` over [AirBnB's `react-dates`](https://github.com/airbnb/react-dates). Arguably more famous, I had to spent too much time in `react-dates` docs when I used it, sometimes with a not so great experience. But if `react-datepicker` doesn't cut for you, consider `react-dates` as an alternative.

## Final Thoughts

If you have a hard requirement of accessibility (e.g. being WCAG compliant), truth is that you will need to spare some time to get it right. However, if you plan for it ahead and have some experience in the subject, creating accessible applications will become less and less painful.

Consider accessibility as a natural requirement, not a _plus_ for your application (the same way that writing tests isn't a plus, but an investment). Unfortunately, this might include dropping huge collections of UI components (e.g. [Semantic UI](https://react.semantic-ui.com/)), that will hardly be as compliant as you need.

The good news is that with the libraries you have seen in this post you have enough to cover most hard-to-implement-from-scratch use-cases out there. Give them a try, bake them naturally into your applications and help to create a more inclusive and satisfactory internet.

Did I forget to mention a relevant library? Feel free to reach me on [Twitter](https://twitter.com/webquintanilha) and help me expand this list!