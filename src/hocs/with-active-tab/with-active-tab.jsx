import React from 'react';
import {Tab} from '../../const.js';

const withActiveTab = (Component) => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {activeTab: Tab.OVERVIEW};

      this.activeTabChangeHandler = this._activeTabChangeHandler.bind(this);
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

  WithActiveTab.propTypes = {};

  return WithActiveTab;
};

export default withActiveTab;
