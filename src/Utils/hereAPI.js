import axios from 'axios';

const hereAPI = (props) => {
    const queryUrl = `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?
    apiKey=${process.env.hereApiKey}&waypoint0=geo!${props.lat1},${props.long1}&waypoint1=geo!${props.lat2},${props.long2}&mode=fastest;bicycle`;
    

    const getRoute = () => {
        return axios.get(queryUrl)
    }
}


export default hereAPI;