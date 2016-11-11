import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import MyMap from './imports/MyMap';

class App extends React.Component {
  render() {
    return <MyMap />;
  }
}

if (Meteor.isClient) {
  Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
  });
}
