import React from 'react';
import {string} from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.activeItem || null,
      };

      this.activeItemChangeHandler = this._activeItemChangeHandler.bind(this);
    }

    _activeItemChangeHandler(activeItem) {
      this.setState({activeItem});
    }

    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        activeItemChangeHandler={this.activeItemChangeHandler}
      />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: string,
  };

  return WithActiveItem;
};

export default withActiveItem;
