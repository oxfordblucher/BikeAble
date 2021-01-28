import axios from 'axios';
require('dotenv').config();

const queryUrl = `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?
apiKey=${process.env.hereApiKey}&waypoint0=geo!${lat1},${long1}&waypoint1=geo!${lat2},${long2}&mode=fastest;bicycle`;

export default {
    getRoute: function() {
        return axios.get(queryUrl)
    }
};