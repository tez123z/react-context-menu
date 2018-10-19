import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import MenuItem from './@components/MenuItem';

export default class ContextMenu extends React.PureComponent {
  constructor(props) {
    super(props);

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

    menu.style.cssText = `left: ${event.clientX + xOffset}px;`
      + `top: ${event.clientY + yOffset}px;`
      + 'visibility: visible;';
  }

  closeContextMenu() {
    const menu = document.getElementById('contextMenu');
    menu.style.cssText = 'visibility: hidden;';
  }

  render() {
    const { items } = this.props;
    return (
      <div id="contextMenu">
        {items.map(item => (
          <MenuItem item={item} />
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
};

ContextMenu.defaultProps = {
  items: [],
};
