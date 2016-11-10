import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class App extends React.Component {
  render() {
    return <MyTestMap />;
  }
};

class MyTestMap extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    GoogleMaps.load();
  }

  render() {
    if (this.props.loaded)
      return <GoogleMap name="mymap" options={this.props.mapOptions} />;

    return <div>Loading map...</div>;
  }
};

let MyTestMapContainer = createContainer (() => {
  const loaded = GoogleMaps.loaded();
  const _mapOptions = function() {
    return {
      center: new google.maps.LatLng(-37.8136, 144.9631),
      zoom: 8    
    }
  }
  const mapOptions = _mapOptions();

  return {
    loaded,
    mapOptions
  }

})

class GoogleMap extends React.Component{
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: React.findDOMNode(this),
      options: this.props.options
    });

    GoogleMaps.ready(this.props.name, function(map) {
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  }

  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  }

  render() {
    return <div className="map-container"></div>;
  }
};

GoogleMap.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    return React.render(<App />, document.getElementById('root'));
  });
}
