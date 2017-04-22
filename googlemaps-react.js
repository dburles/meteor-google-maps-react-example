import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import MyMap from './imports/MyMap';

if (Meteor.isClient) {
  class App extends React.Component {
    constructor() {
      super();
      this.state = { open: true };
    }

    render() {
      return (
        <div>
          <button onClick={() => this.setState({ open: !this.state.open })}>
            Toggle
          </button>
          <hr />
          {this.state.open ? <MyMap /> : null}
        </div>
      );
    }
  }

  Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
  });
}
