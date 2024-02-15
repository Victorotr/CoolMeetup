import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';
import { postMessageMeetup } from '../../db/meetupQueries/postMessageMeetup.js';
export let io; // Variable para almacenar el objeto io y poder exportarlo


export const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [
                process.env.CLIENT_URL,
                'http://localhost:5173',
                'http://192.168.1.65:5173',
            ],
            credentials: true,
        }, 
    });

    // Usar cookie-parser en el middleware de conexión de Socket.IO
    io.use((socket, next) => {
        // Obtener el objeto handshake
        const { headers } = socket.handshake;
        // Parsear las cookies utilizando cookie-parser
        if (headers.cookie) {
            cookieParser()(socket.handshake, null, () => {
                next();
            });
        } else {
            next();
        }
    });

    io.on('connection', (socket) => {

        try {
            const cookies = socket.handshake.cookies;
            const validate = jsonwebtoken.verify(cookies.user_token.token, process.env.SECRET_TOKEN);
            socket.userId = validate.id;
            console.log(validate?.username + ' se ha connectado');
        } catch (error) {
            console.log(error)
            socket.disconnect();
        }


        socket.on('message',async (data) => {
            console.log('Mensaje recibido:', data);
           const inserted = await postMessageMeetup(data.user.id,data.meetup,data.message)
        console.log(inserted);
        const now = new Date();
        data.created_at = now;
            io.emit('messages', data)
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};
