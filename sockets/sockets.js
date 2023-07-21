exports.LobbySockets = (io) => {
    io.on("connection", (socket) => {
        console.log("New Client Connected", socket.id);

        socket.on('player-joined', ({ username, lobbyCode }) => {
            // console.log(username, lobbyCode);
            socket.join(lobbyCode);
            socket.to(lobbyCode).emit('announcement', `${username} has joined the Lobby`);
        });

        socket.on('start-game', ({ username, lobbyCode }) => {
            console.log(username, lobbyCode);
            socket.to(lobbyCode).emit('announcement', `${username} has started the game`);
            socket.to(lobbyCode).emit('start-game', { username, lobbyCode });
        });

        socket.on('end-game', ({ username, lobbyCode }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has ended the game`);
        });

        socket.on('start-typing', ({ username, lobbyCode }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has started typing`);
        });

        socket.on('stop-typing', ({ username, lobbyCode }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has stopped typing`);
        });

        socket.on('player-left', ({ username, lobbyCode }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has left the Lobby`);
        });






    });
};