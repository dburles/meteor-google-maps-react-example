import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import MyMap from './imports/MyMap';

if (Meteor.isClient) {
  Meteor.startup(() => {
    render(<MyMap />, document.getElementById('root'));
  });
}
