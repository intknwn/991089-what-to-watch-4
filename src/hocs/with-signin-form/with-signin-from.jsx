import React from 'react';
import {func} from 'prop-types';
import history from '../../history.js';

const withSignInForm = (Component) => {
  class WithSignInForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };

      this.emailRef = React.createRef();
      this.passwordRef = React.createRef();

      this.onChange = this._onChange.bind(this);
      this.onErrorHandler = this._onErrorHandler.bind(this);
      this.onSubmitHandler = this._onSubmitHandler.bind(this);
    }

    _onChange() {
      if (this.state.error) {
        this.setState({error: null});
      }
    }

    _onErrorHandler(err) {
      const re = /\[(.*?)\]/;
      const errMessage = err.match(re)[1];

      this.setState({error: errMessage});
    }

    _onSuccessHandler() {
      history.goBack();
    }

    _onSubmitHandler(evt) {
      evt.preventDefault();

      const {onSubmit} = this.props;

      onSubmit({
        email: this.emailRef.current.value,
        password: this.passwordRef.current.value,
      },
      this._onSuccessHandler,
      this.onErrorHandler
      );
    }

    render() {
      const {error} = this.state;

      return (
        <Component
          {...this.props}
          emailRef={this.emailRef}
          error={error}
          onChange={this.onChange}
          onSubmit={this.onSubmitHandler}
          passwordRef={this.passwordRef}
        />
      );
    }
  }

  WithSignInForm.propTypes = {
    onSubmit: func.isRequired,
  };

  return WithSignInForm;
};

export default withSignInForm;
