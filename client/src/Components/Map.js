import React from 'react';

const Map = (props) => {
  const centerLat = parseFloat((props.lat1 + props.lat2) / 2);
  const centerLon = parseFloat((props.lon1 + props.lon2) / 2);
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);
  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: `${process.env.REACT_APP_hereApiKey}`
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: centerLat, lng: centerLon },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1
    });

    const onResult = (result) => {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
             // Create a linestring to use as a point source for the route line
            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
    
            // Create a polyline to display the route:
            let routeLine = new H.map.Polyline(linestring, {
              style: { strokeColor: 'blue', lineWidth: 3 }
            });
    
            // Create a marker for the start point:
            let startMarker = new H.map.Marker(section.departure.place.location);
    
            // Create a marker for the end point:
            let endMarker = new H.map.Marker(section.arrival.place.location);
    
            // Add the route polyline and the two markers to the map:
            hMap.addObjects([routeLine, startMarker, endMarker]);
    
            // Set the map's viewport to make the whole route visible:
            hMap.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
        });
      }
    };

    const routingParams = {
      'routingMode': 'fast',
      'transportMode': 'bicycle',
      'origin': `${props.lat1},${props.lon1}`,
      'destination': `${props.lat2},${props.lon2}`,
      'return': 'polyline'
    };

    const router = platform.getRoutingService(null, 8);

    router.calculateRoute(routingParams, onResult,
      (error) => {
        alert(error.message);
      });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
}

  export default Map;