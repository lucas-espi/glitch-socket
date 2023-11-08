// Configuracion del socket del lado del cliente
const socket = io();

// primer parametro identificados y segundo el mensaje
socket.emit('message', 'Hola, me estoy comunicando desde un websocket!')

// Escuchamos evento de respuesta del servidor
socket.on('response', (data) => {
    console.log(`Mensaje recibido desde el backend: ${data}`);
})

socket.on('evento_para_todos_menos_el_actual', (data)=>{
    console.log(`Mensaje para todos menos el actua: ${data}`);
})

socket.on('evento_para_Todos', (data)=>{
    console.log(`Mensaje para todos: ${data}`);
})