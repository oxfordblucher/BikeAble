import React, { createContext } from 'react';

const CoordsContext = createContext({
    coords1: {},
    coords2: {},
    start: '',
    end: '',
    waypoint: {},
    zipCode: NaN,
    found: false,
    summary: {},
    setCoords: () => {},
    setWaypoint: () => {},
    setSummary: () => {}
});

export default CoordsContext;