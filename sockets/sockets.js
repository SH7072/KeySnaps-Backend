exports.LobbySockets = (io) => {
    io.on("connection", (socket) => {
        console.log("New Client Connected", socket.id);

        socket.on('player-joined', ({ lobbyCode, userid, username }) => {
            // console.log(username, userid, lobbyCode);
            socket.join(lobbyCode);
            socket.to(lobbyCode).emit('announcement', `${username} has joined the Lobby`);
        });

        socket.on('start-game', ({ lobbyCode, waitTime, startTime, difficulty, paragraph }) => {
            socket.to(lobbyCode).emit('announcement', `Game is starting in ${waitTime} seconds`);
            socket.to(lobbyCode).emit('game-ready', { waitTime, startTime, difficulty, paragraph });
        });

        socket.on('end-game', ({ lobbyCode, userid, username }) => {
            socket.to(lobbyCode).emit('announcement', `Game is Finished`);
        });

        socket.on('start-typing', ({ lobbyCode, userid, username }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has started typing`);
        });

        socket.on('stop-typing', ({ lobbyCode, userid, username }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has stopped typing`);
        });

        socket.on('player-left', ({ lobbyCode, userid, username }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has left the Lobby`);
        });

        // socket.on('disconnect', () => {
        //     console.log("Client Disconnected", socket.id);
        // });






    });
};