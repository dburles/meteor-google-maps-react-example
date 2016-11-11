import React, { PropTypes } from 'react';
import GoogleMap from './lib/GoogleMap';
import { createContainer } from 'meteor/react-meteor-data';

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
      <GoogleMap onReady={this.handleOnReady} mapOptions={this.props.mapOptions}>
        Loading!
      </GoogleMap>
    );
  }
}

MyMap.propTypes = {
  mapOptions: PropTypes.func.isRequired,
};

// Pass reactive data and map options function as props
const MyMapContainer = createContainer(() => {
  function mapOptions() {
    return {
      center: new google.maps.LatLng(-37.8136, 144.9631),
      zoom: 8,
    };
  };

  return {
    mapOptions,
  };
}, MyMap);

export default MyMapContainer;
