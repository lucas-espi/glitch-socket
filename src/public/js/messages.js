// Configuracion del socket del lado del cliente
const socket = io();

socket.emit('msg', 'Hola me estoy cominicando con websocket!!!');

const input = document.getElementById('textoEntrada');
const log = document.getElementById('log');

// Primera parte
// input.addEventListener('keyup', evt=>{
//     let {key} = evt;
//     evt.target.value= '';
//     socket.emit('msg1', key);
// })

// socket.on('log', (data)=>{
//     log.innerHTML += data;
// })

// Segunda aprte Guardar mensaje por socketid.
input.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
       socket.emit('msg2', input.value);
       input.value='';
    }
});

socket.on('log', (data)=>{
    let logs= '';
    data.logs.forEach(log => {
        logs += `${log.socketid} dice: ${log.message} <br/>`
    });
    log.innerHTML=logs;
})
