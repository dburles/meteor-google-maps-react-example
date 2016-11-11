import React from 'react';
import GoogleMap from './lib/GoogleMap';

class MyMap extends React.Component {
  handleMapOptions() {
    return {
      center: new google.maps.LatLng(-37.8136, 144.9631),
      zoom: 8,
    };
  }

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
      <GoogleMap onReady={this.handleOnReady} mapOptions={this.handleMapOptions}>
        Loading!
      </GoogleMap>
    );
  }
}

export default MyMap;
