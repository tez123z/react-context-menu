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

Pass a ```contextId```, and an array of menu items with labels, onClick functions, and optional icon paths -- like so:

```jsx
<ContextMenu contextId={'clickable-area'} items={[{label: 'Configure', onClick: this.configHandler, icon: 'path/to/icon.svg'}, {label: 'Delete', onClick: this.deleteHandler}]} />
```

The ```contextId``` is the area in which you'd like right-click functionality. Add a unique ```id``` to your right-clickable element, and react-context-menu will be available anywhere within that element.

By default, when you right click an element, the ```event.target``` is stored in state and is passed to the menu item functions. This can be useful for DOM manipulation -- for instance, removing an element from the DOM via a "delete" function passed to ```ContextMenu```'s props.
