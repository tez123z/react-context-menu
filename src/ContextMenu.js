import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from './@components/MenuItem';

export default class ContextMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
    this.openContextMenu = this.openContextMenu.bind(this);
    this.closeContextMenu = this.closeContextMenu.bind(this);

    this.state = {
      target: '',
    };
  }

  componentDidMount() {
    const { contextId } = this.props;
    const context = document.getElementById(contextId);
    context.addEventListener('contextmenu', (event) => {
      this.openContextMenu(event);
    });

    const menu = document.getElementById('contextMenu');
    menu.addEventListener('mouseleave', () => {
      this.closeContextMenu();
    });
  }

  openContextMenu(event) {
    event.preventDefault();
    this.setState({ target: event.target });

    const xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    const yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    const menu = document.getElementById('contextMenu');

    menu.style.cssText = menu.style.cssText + `left: ${event.clientX + xOffset}px;`
      + `top: ${event.clientY + yOffset}px;`
      + 'visibility: visible;';
  }

  closeContextMenu() {
    const menu = document.getElementById('contextMenu');
    menu.style.cssText = menu.style.cssText + 'visibility: hidden;';
  }

  getItems() {
    const { items, closeOnClick } = this.props;
    if (closeOnClick) {
      return items.map(item => ({
        ...item,
        onClick: () => {
          this.closeContextMenu();
          item.onClick();
        },
      }))
    } else {
      return items;
    }
  }

  render() {

    const default_styles = {"position":"absolute","display":"flex","flexFlow":"column","border":"1px solid rgba(0,0,0,0.15)","borderRadius":"2px","boxShadow":"0 1px 1px 1px rgba(0,0,0,0.05)","padding":"10px 15px","background":"#f8f8f8","visibility":"hidden","z-Index":100000};
    let styles = this.props.styles;
    var final_styles = {...default_styles,...styles};

    return (
      <div
        id="contextMenu"
        style={final_styles}
      >
        {this.getItems().map(item => (
          <MenuItem item={item} key={item.label}/>
        ))}
      </div>
    );
  }
}

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
  })),
  contextId: PropTypes.string.isRequired,
  closeOnClick: PropTypes.bool,
};

ContextMenu.defaultProps = {
  items: [],
  closeOnClick: false,
};
