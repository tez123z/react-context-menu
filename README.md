# react-context-menu

A lightweight right-click context menu implemented in React.

![example right-click menu](react-context-menu.png?raw=true "example right-click menu")

To use:

Install the component in your project:

```npm install react-context-menu --save```

Import the component into your project:

```javascript
import ContextMenu from 'react-context-menu';
```

Pass a ```contextID```, and an array of menu items with labels, and onClick functions -- like so:

```jsx
<ContextMenu contextID={'clickable-area'} items={[{label: 'Configure', onClick: this.configHandler}, {label: 'Delete', onClick: this.deleteHandler}]} />
```

The ```contextID``` is the area in which you'd like right-click functionality. Add a unique ```id``` to your right-clickable element, and react-context-menu will be available anywhere within that element.

Your functions will reside in your parent component. By default, when you right click an element, the ```event.target``` is stored in state and is passed to the menu item functions. This can be useful for DOM manipulation -- for instance, removing an element from the DOM via a "delete" function passed to ```ContextMenu```'s props.
