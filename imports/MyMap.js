import React, { Component } from 'react';
import { Session } from 'meteor/session';
import GoogleMap from './lib/GoogleMap';
import Markers from './markers';

class MyMap extends Component {
  constructor() {
    super();
    this.handleOnReady = this.handleOnReady.bind(this);
  }

  handleMapOptions() {
    return {
      center: new google.maps.LatLng(-37.8136, 144.9631),
      zoom: 8,
    };
  }

  handleOnReady(name) {
    GoogleMaps.ready(name, map => {
      Tracker.autorun(c => {
        google.maps.event.addListener(map.instance, 'click', function(event) {
          Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        });

        var markers = {};

        Markers.find().observe({
          added: function(document) {
            var marker = new google.maps.Marker({
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(document.lat, document.lng),
              map: map.instance,
              id: document._id,
            });

            google.maps.event.addListener(marker, 'dragend', function(event) {
              Markers.update(marker.id, {
                $set: { lat: event.latLng.lat(), lng: event.latLng.lng() },
              });
            });

            markers[document._id] = marker;
          },
          changed: function(newDocument, oldDocument) {
            markers[newDocument._id].setPosition({
              lat: newDocument.lat,
              lng: newDocument.lng,
            });
          },
          removed: function(oldDocument) {
            markers[oldDocument._id].setMap(null);
            google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
            delete markers[oldDocument._id];
          },
        });
        this.computation = c;
      });
    });
  }

  componentWillUnmount() {
    this.computation.stop();
  }

  render() {
    return (
      <GoogleMap
        onReady={this.handleOnReady}
        mapOptions={this.handleMapOptions}
      >
        Loading!
      </GoogleMap>
    );
  }
}

export default MyMap;
