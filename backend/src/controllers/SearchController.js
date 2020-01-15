const Dev = require('../models/Dev');
module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs} = request.query;

        techsArray = techs.split(',').map(tech => tech.trim());

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 30000,
                },
            },
            
            
        });


        return response.json({devs});
    }
}