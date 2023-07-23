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
            socket.to(lobbyCode).emit('announcement', `${username} has ended the game`);
            socket.to(lobbyCode).emit('end-lobby', { lobbyCode, userid, username });
        });

        socket.on('player-progress-info', ({ lobbyCode, userid, username, stats }) => {
            // console.log("Player Progress Info", lobbyCode, userid, username, stats);
            socket.to(lobbyCode).emit('player-progress-report', { userid, username, stats });
        });

        socket.on('player-finish-info', ({ lobbyCode, userid, username, stats }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has finished the game`);
            socket.to(lobbyCode).emit('player-finish-report', { userid, username, stats });
        });

        socket.on('player-left', ({ lobbyCode, userid, username }) => {
            socket.to(lobbyCode).emit('announcement', `${username} has left the Lobby`);
        });

        socket.on('disconnect', () => {
            console.log("Client Disconnected", socket.id);
        });
    });
};