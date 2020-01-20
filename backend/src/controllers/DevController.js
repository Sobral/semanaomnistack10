const axios = require('axios');
const Dev = require('../models/Dev');
const {findConnections, SendMessage} = require('../websocket');

module.exports = {
    async store (request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){

            const github_api_response = await axios.get(`https://api.github.com/users/${github_username}`);

            const {name = login, avatar_url, bio} = github_api_response.data;

            techsArray = techs.split(',').map(tech => tech.trim());

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location: location
            });

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
            );

            SendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    }
};