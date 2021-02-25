import React, { createContext } from 'react';

const CoordsContext = createContext({
    coords1: {},
    coords2: {},
    start: '',
    end: '',
    waypoint: {},
    zipCode: NaN,
    found: false,
    user: false,
    summary: {},
    directions: [],
    logIn: () => {},
    logOut: () => {},
    setCoords: () => {},
    setWaypoint: () => {},
    setSummary: () => {},
    unmountMap: () => {},
    mountMap: () => {}
});

export default CoordsContext;