const socketio = require('socket.io');
const CalculateDistance = require('./utils/CalculateDistance');
const connections =[];

let io;

exports.setupWebSocket = (server) => {
    io = socketio(server);

    io.on('connection', socket =>{
        const {latitude, longitude, techs} = socket.handshake['query'];

        connections.push({
            id: socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: techs.split(',').map(tech => tech.trim())

        });

    });
};

exports.findConnections = (coordinates, techs) => {
        return connections.filter(connection => {
            return CalculateDistance(coordinates, connections.coordinates) < 10 
            && connection.techs.some(item=>techs.includes(item)); 
        });
}


exports.SendMessage = (to, message, data) => {
    to.array.forEach(connection => {
        io.to(connection.id).emit(message, data);        
    });
}