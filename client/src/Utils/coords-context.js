import React, { createContext } from 'react';

const CoordsContext = createContext({
    coords1: {},
    coords2: {},
    waypoint: {},
    found: false,
    setCoords: () => {}
});

export default CoordsContext;