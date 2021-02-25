import React, { Component } from 'react';
import bikeIcon from '../assets/riding-fill.png';
import flagIcon from '../assets/flag.png';
import Panel from './Panel';
import CoordsContext from '../Utils/coords-context';

class Map extends Component {
  // Create a reference to the HTML element we want to put the map on
  mapRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      map: null,
      label: '',
      directions: [],
      summary: {}
    }
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
        center: { lat: parseFloat((this.props.lat1 + this.props.lat2) / 2), lng: parseFloat((this.props.lng1 + this.props.lng2) / 2) },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    let startIcon = new H.map.Icon(bikeIcon);
    let endIcon = new H.map.Icon(flagIcon);

    window.addEventListener('resize', () => map.getViewPort().resize());

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });

    const onResult = (result) => {
      console.log(result.routes[0]);
      // ensure that at least one route was found
      let startMarker,
        endMarker,
        routeLine,
        distance = 0,
        duration = 0,
        directions = [];
      if (result.routes.length) {
        for (let i = 0; i < result.routes[0].sections.length; i++) {
          let section = result.routes[0].sections[i];
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

          // Create a polyline to display the route:
          routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 }
          });

          distance += section.travelSummary.length;
          duration += section.travelSummary.duration;

          directions = directions.concat(section.actions);
        };

        let sections = result.routes[0].sections;
        if (sections.length > 1) {
          directions = directions.filter(action => action.action !== 'arrive');
          directions.push(sections[sections.length - 1].action);
        }

        // Create a marker for the start point:
        startMarker = new H.map.Marker(sections[0].departure.place.location, {
          icon: startIcon
        });

        // Create a marker for the end point:
        endMarker = new H.map.Marker(sections[sections.length - 1].arrival.place.location, {
          icon: endIcon
        });

        this.setState({
          label: `Navigation Success!`,
          directions: directions,
          summary: {
            distance: parseFloat(distance / 1609.34).toFixed(2),
            duration: `${Math.floor(duration / 60)} minutes ${(duration % 60)} seconds`
          },
          map
        });

        console.log(this.state.directions[0]);

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);
        map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
      }
    };

    const routingParams = {
      'routingMode': 'fast',
      'transportMode': 'bicycle',
      'origin': `${this.props.lat1},${this.props.lng1}`,
      'destination': `${this.props.lat2},${this.props.lng2}`,
      'return': 'polyline,turnByTurnActions,actions,instructions,travelSummary'
    };

    if (this.props.wayLat && this.props.wayLng) {
      routingParams.waypoint = `${this.props.wayLat},${this.props.wayLng}`
    }

    const router = platform.getRoutingService(null, 8);

    router.calculateRoute(routingParams, onResult,
      (error) => {
        alert(error.message);
      });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  render() {
    const label = this.state.label;

    const renderDirections = () => {
      if (label) {
        return <Panel
          label={this.state.label}
          directions={this.state.directions}
          summary={this.state.summary}
        />
      } else {
        return null;
      }
    }
    return (
      <div>
        <div className="map" ref={this.mapRef} style={{ height: "600px" }} />
        {renderDirections()}
      </div>
    );
  }
}

export default Map;