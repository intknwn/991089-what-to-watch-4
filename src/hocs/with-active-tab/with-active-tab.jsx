import React from 'react';
import {Tab} from '../../const.js';
import {movieType} from '../../types/types.js';

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeTab: Tab.OVERVIEW};

      this.activeTabChangeHandler = this._activeTabChangeHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.movie.id !== this.props.movie.id) {
        this.setState({activeTab: Tab.OVERVIEW});
      }
    }

    _activeTabChangeHandler(tab) {
      this.setState({activeTab: tab});
    }

    render() {
      return <Component
        {...this.props}
        activeTab={this.state.activeTab}
        onTabClick={this.activeTabChangeHandler}
      />;
    }
  }

  WithActiveTab.propTypes = {
    movie: movieType,
  };

  return WithActiveTab;
};

export default withActiveTab;
