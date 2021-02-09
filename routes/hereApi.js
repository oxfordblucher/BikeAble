const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/autocomplete/:query', function (req, res) {
    axios.get('https://autocomplete.search.hereapi.com/v1/autocomplete', {
        'params': {
            'apiKey': process.env.REACT_APP_hereApiKey,
            'q': `${req.params.query}`,
            'limit': 3
        }
    })
    .then(resp => {
        console.log(resp);
        res.json(resp.data);
    })
})

router.get('/route/:lat1/:lon1/:lat2/:lon2', function (req, res) {
    axios.get('https://router.hereapi.com/v8/routes?transportMode=bike', {
        'params': {
            'origin': `${req.params.lat1},${req.params.lon1}`,
            'destination': `${req.params.lat2},${req.params.lon2}`,
            'return': 'polyline',
            'apiKey': process.env.REACT_APP_hereApiKey
        }
    })
    .then(resp => {
        res.json(resp.data);
    })
})

module.exports = router;