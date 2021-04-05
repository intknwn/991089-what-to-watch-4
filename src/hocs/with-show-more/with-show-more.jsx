import React from 'react';
import {func, number} from 'prop-types';

const MIN_ITEMS_TO_SHOW = 1;

const withShowMore = (Component) => {
  class WithShowMore extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        itemsToShow: this.props.itemsToShow || MIN_ITEMS_TO_SHOW,
      };

      this.cb = this.props.cb || ((itemsToShow) => itemsToShow);
      this.itemsToShowChangeHandler = this._itemsToShowChangeHandler.bind(this);
    }

    _itemsToShowChangeHandler() {
      this.setState(({itemsToShow}) => ({itemsToShow: this.cb(itemsToShow)}));
    }

    render() {
      return <Component
        {...this.props}
        itemsToShow={this.state.itemsToShow}
        itemsToShowChangeHandler={this.itemsToShowChangeHandler}
      />;
    }
  }

  WithShowMore.propTypes = {
    itemsToShow: number,
    cb: func,
  };

  return WithShowMore;
};

export default withShowMore;
