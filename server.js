/*
    ~ * ~ * ~ * SERVER
    ~ * ~ * ~ * 
    ~ * ~ * ~ * 
    ~ * ~ * ~ * 
*/

//create server
let port = process.env.PORT || 8000;
const express = require('express');
let app = express();
let httpServer = require('http').createServer(app);
httpServer.listen(port, function(){
  console.log('Server is listening at port: ', port);
});

//where we look for files
app.use(express.static('public'));

// MARK: Socket Server
const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: true, //lets external websites connect
  }
});

//
//  MARK:
//  client webpage (mobile) --> in this most basic version, also what TD connects to
//

var main = io.of('/');
//listen for anyone connecting to default namespace
main.on('connection', (socket) => { //socket contains the info about the connected client
  console.log('new connection: ' + socket.id + '\n'); //their "id" is a unique name that identifies them to the server

  //listen for the event message that gets sent from webpage on button press
  //anytime any page presses the button, all the pages will get a "hello" message
  socket.on('buttonPress', ()=>{ //no data to parse, just the event
    console.log('hello button event')
    io.emit('hello'); //io.emit sends to everyone connected to this server
  })

  //listen for this client to disconnect
  socket.on('disconnect', () => {
    console.log('client disconnected: ' + socket.id + "\n");
  });

});
