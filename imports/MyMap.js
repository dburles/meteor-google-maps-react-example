import React, { PropTypes } from 'react';
import GoogleMap from './lib/GoogleMap';
import { createContainer } from 'meteor/react-meteor-data';

// This function is called once the library has loaded
function mapOptions() {
  return {
    center: new google.maps.LatLng(-37.8136, 144.9631),
    zoom: 8,
  };
};

class MyMap extends React.Component {
  handleOnReady(name) {
    GoogleMaps.ready(name, map => {
      const marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance,
      });
    });
  }

  render() {
    return (
      <GoogleMap onReady={this.handleOnReady} mapOptions={mapOptions}>
        Loading!
      </GoogleMap>
    );
  }
}

export default MyMap;
