import React from 'react';
import {func, bool} from 'prop-types';
import {MOVIES_PER_PAGE} from '../../const.js';

const withShowMore = (Component) => {
  class WithShowMore extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        itemsToShow: MOVIES_PER_PAGE,
      };

      this.cb = this.props.cb || ((itemsToShow) => itemsToShow);
      this.itemsToShowChangeHandler = this._itemsToShowChangeHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.isDefault !== this.props.isDefault) {
        this.setState({itemsToShow: MOVIES_PER_PAGE});
      }
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
    cb: func,
    isDefault: bool,
  };

  return WithShowMore;
};

export default withShowMore;
