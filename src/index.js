import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'
import viewsMessage from './routes/views.router.js'

const app = express();
const PORT = 8080;


// Preparar la configuracion del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configurar el motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+"/views");
app.set('view engine', 'handlebars');

// Carpeta public
app.use( express.static(__dirname+'/public'));

// Rutas
app.get('/', viewsRouter);
app.get('/message', viewsMessage);




const httpServer = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

const socketServer = new Server(httpServer);

// Abrimos el canal de comunicacion
socketServer.on("connection", (socket)=>{
    console.log('Nuevo cliente conectado!!');

    //Escuchamos al cliente
    // primer parametro identificados y segundo capturamos mensaje del cliente
    socket.on("message", (data)=>{
        console.log(`Mensaje recibido: ${data}`)
    });

    // Enviar mensaje desde el servidor hacia el cliente
    socket.emit('response', 'Mensaje enviado desde el backend' );

    // Enviamos mensaje para todos menos el socket actual
    socket.broadcast.emit('evento_para_todos_menos_el_actual', 'Este mensaje es para todos menoos el actual');

    // Mensaje para todos
    socketServer.emit('evento_para_Todos', 'mensaje para todos los sockets')

    // ejercicio1
    socket.on('msg1', (data)=>{
        console.log(`Mensaje msg1: ${data}`);
        socketServer.emit('log', data)
    });

    // ejercicio2
    const logs = [];
    socket.on('msg2', (data)=>{
        console.log(`Mensaje msg2: ${data}`);
        logs.push({socketid:socket.id ,message: data});
        socketServer.emit('log', {logs});
    });

});

