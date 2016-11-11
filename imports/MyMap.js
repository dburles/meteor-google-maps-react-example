import React from 'react';
import GoogleMap from './lib/GoogleMap';

function handleMapOptions() {
  return {
    center: new google.maps.LatLng(-37.8136, 144.9631),
    zoom: 8,
  };
}

function handleOnReady(name) {
  GoogleMaps.ready(name, map => {
    const marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
    });
  });
}

function MyMap() {
  return (
    <GoogleMap onReady={handleOnReady} mapOptions={handleMapOptions}>
      Loading!
    </GoogleMap>
  );
}

export default MyMap;
