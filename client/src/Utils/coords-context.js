import React, { createContext } from 'react';

const CoordsContext = createContext({
    coords1: {},
    coords2: {},
    waypoint: {},
    zipCode: NaN,
    found: false,
    setCoords: () => {},
    setWaypoint: () => {}
});

export default CoordsContext;