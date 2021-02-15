import React, { Component } from 'react';
import bikeIcon from '../assets/riding-fill.png';
import flagIcon from '../assets/racing-flag.png';
import FormGroup from 'react-bootstrap/esm/FormGroup';

class Map extends Component {
  // Create a reference to the HTML element we want to put the map on
  mapRef = React.createRef();

  state = {
    map: null
  }

  componentDidMount = () => {

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "HNUr88gYr5pMHAxGfu2rSzHK6R2okLg7Tymzq3dH-24"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: parseFloat((this.props.lat1 + this.props.lat2) / 2), lng: parseFloat((this.props.lon1 + this.props.lon2) / 2) },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });


    const onResult = (result) => {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

  

          let startIcon = new H.map.Icon(bikeIcon);

          let endIcon = new H.map.Icon(flagIcon)

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 }
          });

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location, {
            icon: startIcon
          });

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location, {
            icon: endIcon
          });

          // Add the route polyline and the two markers to the map:
          map.addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };

    const routingParams = {
      'routingMode': 'fast',
      'transportMode': 'bicycle',
      'origin': `${this.props.lat1},${this.props.lon1}`,
      'destination': `${this.props.lat2},${this.props.lon2}`,
      'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary'
    };

    const router = platform.getRoutingService(null, 8);

    router.calculateRoute(routingParams, onResult,
      (error) => {
        alert(error.message);
      });

  }

  componentWillUnmount = () => {
    this.state.map.dispose();
  }

  render() {
    return <div className="map" ref={this.mapRef} style={{ height: "600px" }} />;
  }
}

export default Map;