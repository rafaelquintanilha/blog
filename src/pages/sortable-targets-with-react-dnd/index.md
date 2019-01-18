---
title: Sortable Targets with React DnD
date: "2016-03-13"
lastReview: "2018-12-27"
spoiler: Let's add some order. Sort of.
lang: en-us
---

If you ever had to add some drag and drop functionality to your app, chances are you suffered a bit. For those building their apps with React, however, [React DnD](https://react-dnd.github.io/react-dnd/about) does not fall in this category. The API is clean, the docs are comprehensive and [there are many examples](https://react-dnd.github.io/react-dnd/examples).

This library provides a thin layer to cover your components. First add a drag and drop context, then start connecting your components with the functionality you want. If you haven’t had a chance to test it yet, go there and fiddle around. [Read the docs](https://react-dnd.github.io/react-dnd/docs/overview) to understand the mindset behind.

The aim of this post is not to explain or advocate for React DnD (I’m positive his author, [Dan Abramov](https://github.com/gaearon/), would do a better job). I will also steer clear from Babel and Webpack configuration (let’s reduce the tooling overhead). Instead, I would like to focus on the code and add a new use case.

But if you do want to know the insides, I got you covered: [there’s a reproducible repository](https://github.com/rafaelquintanilha/experiments/tree/master/sortable-target) set on GitHub.

## The Problem

Imagine you have many elements and you want to drag and drop them into different containers. You are also asked to sort them. How one would solve this?

The docs provided almost what we want. There is a [sortable example](https://react-dnd.github.io/react-dnd/examples/sortable/simple) and a [single target](https://react-dnd.github.io/react-dnd/examples/dustbin/single-target) example. Our goal is to combine them and build a sortable multi targets example.

If you still are having problems picturing this – don’t worry! Check the example right below.

<iframe src="/apps/sortabletargets/" width="700" height="460" frameborder="0"></iframe>

Note that every container is a target. When dropping elements into other containers, they are pushed to the end. When inside, they are sorted. Pretty simple.

## The Rationale

I’ll not extend myself too much because there isn’t anything really new here. If you have understood the examples I cited before, you will have no trouble in following this. Saying that, my focus will be in how to go from the examples to the app I just presented.

There are 3 components in our app:

- `App`, a container component that is connected to the application and plugs the `DragDropContext`;
- `Container`, a component that will hold every card and act like a target for other cards;
- `Card`, a component that will be dragged around (either to other Containers or inside the one it is in).

Now should be simple to identify that we have one drag source (the `Card`) and two drop targets (the `Container` and also the `Card`). When dragging Cards outside its Container, we need to remove it to its original Container and push to the new. When dragging inside, sort them.

Let’s start from the beginning.

## The App Component

This component is straightforward. Just render the Containers on the screen and give them some props. What props?

Well, definitely the Container should know which cards it is holding. This should be one.

Also, we need a way to distinguish Containers. Remember that we sort Cards being dragged inside its parent Container and push when it’s a new one. So we might pass an id as well.

Our `App` component should be something like this:

```jsx
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class App extends Component {

	render() {
		const style = {
			display: "flex",
			justifyContent: "space-around",
			paddingTop: "20px"
		}

		const listOne = [
			{ id: 1, text: "Item 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" }
		];

		const listTwo = [
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
			{ id: 6, text: "Item 6" }
		];

		const listThree = [
			{ id: 7, text: "Item 7" },
			{ id: 8, text: "Item 8" },
			{ id: 9, text: "Item 9" }
		];

		return (
			<div style={{...style}}>
				<Container id={1} list={listOne} />
				<Container id={2} list={listTwo} />
				<Container id={3} list={listThree} />
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App);
```

We are defining some style using [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), hardcoding our lists and creating our Containers. Note the last line, when we tell React that `App` is a `DragDropContext` with HTML5 Backend. [Check the docs](https://react-dnd.github.io/react-dnd/docs/backends/html5) if you want a more in-depth explanation.

## The Container Component

This is the main component, responsible for managing the state (cards currently inside him) and being a drop target.

Note that we change the `Container` state in 3 different situations:

- A `Card` is *pushed*, meaning we need to add it to the state;
- A `Card` is *pushed* into another container, meaning we need to remove it from the state.
- A `Card` is *moved* inside the `Container`, meaning we need to sort it.

This is how I would implement it:

```jsx
import React, { Component } from 'react';
import update from 'react/lib/update';

class Container extends Component {

	constructor(props) {
		super(props);		
		this.state = { cards: props.list };
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {		
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;		
		const dragCard = cards[dragIndex];

		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}
}
```

Each method should be straightforward. We are using [React’s update helper](https://reactjs.org/docs/update.html), a handy Immutability Helper that I strongly recommend you to learn. Some methods might sound cumbersome, but once you get the grasp you follow through pretty easily.

Also note that the `moveCard` method is identical to the one provided in the sortable example. Talk about reusability!

Now let’s write the `render` method for our class:

```jsx
import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';

class Container extends Component {

	...

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
		const style = {
			width: "200px",
			height: "404px",
			border: '1px dashed gray'
		};

		const backgroundColor = isActive ? 'lightgreen' : '#FFF';

		return connectDropTarget(
			<div style={{...style, backgroundColor}}>
				{cards.map((card, i) => {
					return (
						<Card 
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}														
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} />
					);
				})}
			</div>
		);
  }
}
```

There is nothing really new here. Some background styling and an iteration in order to render the `Card` component and `connectDropTarget` to tell we might expect some dropping to happen here.

Check that we are passing `listId`, `removeCard` and `moveCard` as props. This is necessary because we have to know in which `Container` we are, as well wich actions we need to perform. Note that `pushCard` is an event related to the Component, so we don’t need `Card` to handle it.

Finally, let’s wrap this class up:

```jsx
import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';

class Container extends Component {
...
}

const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();		
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Container);
```

There are some important things happening here:

- We are importing `DropTarget`;
- Our `cardTarget` object has a drop callback. This function analyses if the Container’s id is different from the Container’s id of the object being dropped. If positive, then we push the element. We don’t need to push elements when the Containers are the same – in this case we are just moving Cards around. The return is an object with the Container’s id. This is necessary because we need a way to know if a Card from its original Container should be removed. More on that later.
- Finally we just connect things together and export the class. Nothing new if you are familiar with the Single Target example.

Now the last piece of the puzzle!

## The Card Component
Let’s start with the easy part: rendering and styling.

```jsx
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	margin: '.5rem',
	backgroundColor: 'white',
	cursor: 'move'
};

class Card extends Component {

	render() {
		const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div style={{ ...style, opacity }}>
				{card.text}
			</div>
		));
	}
}
```

You should be comfortable with this code. We are styling the `Card` and defining some opacity effect.

Now remember that `Card` has two behaviors: it is a source and a target, because it is able to be dragged but also to be reordered. Let’s see the source callbacks:

```jsx
import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

class Card extends Component {
...
}

const cardSource = {

	beginDrag(props) {		
		return {			
			index: props.index,
			listId: props.listId,
			card: props.card
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	

		if ( dropResult && dropResult.listId !== item.listId ) {
			props.removeCard(item.index);
		}
	}
};
```

- `beginDrag` returns an object with useful properties when dragging event is over.
- `endDrag` handles what to do when we finished dragging. Any resemblance with the drop callback we just wrote? We are doing the same check, but now in the Card’s realm. If we successfully dropped the Card in a target (a Container) and the id’s are different (meaning we moved a Card from one Container to another), then call the `removeCard` method from the Container. Both ends are tied together!

The missing piece here is the callback when the Card is the target, i.e., the sort event. Luckily only a couple of changes to the [original from the Sortable example](https://github.com/react-dnd/react-dnd/blob/master/packages/documentation-examples/src/04%20Sortable/Simple/Card.tsx) need to be made.

```jsx
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

class Card extends Component {
...
}

const cardSource = {
...
};

const cardTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;	

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if ( props.listId === sourceListId ) {
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}		
	}
};
```

The difference is now we are grabbing the `sourceListId`, the id from the element being dragged around, and comparing with the id from the current component. If they are the same, this is a “Cards being hovered over Cards inside the same Container” situation – sort them. If they are different, don’t dispatch any hover event.

Finally connect the callbacks (note I’m avoiding using decorators. Instead, lodash flow function allows me to connect more than one function to the component.

```jsx
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

...

export default flow(
	DropTarget("CARD", cardTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("CARD", cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Card);
```

And we are done! Note we can spawn as many Containers as we like and this will still work.

## Final Considerations

Don’t forget to check out the [repo](https://github.com/rafaelquintanilha/experiments/tree/master/sortable-target) set for this example. Have a good look at the source code and play around if you want.

From here, a possible improvement is to sort Cards in other Containers while they are being dragged. This is not trivial once we need to remove it from the original Container but push it back if the drop place is not a valid target. Wanna have a shot? 🙂

Don’t hesitate in leaving a message if you have any question, observation or correction to do. Feel free to contact me as via [Twitter](https://github.com/rafaelquintanilha/experiments/tree/master/sortable-target) as well. Special thanks for Dan Abramov and his awesome docs and library – the React community appreciates your hard work.