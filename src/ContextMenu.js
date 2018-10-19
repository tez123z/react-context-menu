import React from 'react';
import './style.css';

export default class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target: ''
    }
  }

  componentDidMount() {
    let context = document.getElementById(this.props.contextID);
    context.addEventListener('contextmenu', (event) => {
      this.openContextMenu(event)
    });

    let menu = document.getElementById('contextMenu');
    menu.addEventListener('mouseleave', () => {
      this.closeContextMenu()
    });

  }

  render() {
    return (
      <div id="contextMenu">
        {this.props.items.map((item) => {
          let clickHandler = () => {
            this.closeContextMenu();
            item.onClick(this.state.target);
          };
          let label = item.label;
          let icon = item.icon;
          return (
            <span onClick={clickHandler} key={label}>
              {icon &&
              <img className="icon" src={icon} role="presentation"/>
              }
              {label}
            </span>
          );
        })}
      </div>
    );
  }

  openContextMenu = (event) => {
    event.preventDefault();
    this.setState({target: event.target});

    let xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    let yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let menu = document.getElementById('contextMenu');

    menu.style.cssText =
      'left: ' + (event.clientX + xOffset) + 'px;' +
      'top: ' + (event.clientY + yOffset) + 'px;' +
      'visibility: visible;';
  };

  closeContextMenu = () => {
    let menu = document.getElementById('contextMenu');
    menu.style.cssText = 'visibility: hidden;';

  }
}
