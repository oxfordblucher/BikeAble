import React, { createContext } from 'react';
import { Component } from 'react';

const CoordsContext = createContext({
    coords: {
        coords1:{},
        coords2:{}
    },
    found: false,
    setCoords: () => {}
});

export default CoordsContext;