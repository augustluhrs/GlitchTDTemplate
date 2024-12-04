/*
    ~ * ~ * ~ * 
    ~ * ~ * ~ * MOBILE 
    ~ * ~ * ~ * 
    ~ * ~ * ~ * INTERFACE
    ~ * ~ * ~ * 
*/

//might not work on safari?

//
// MARK: SOCKET
// this is where we put all the incoming 
// events we expect from the server
//

//open and connect the socket
let socket = io('/'); // the '/' just means the default namespace (url)

//listen for the confirmation of connection 
socket.on('connect', () => {
  console.log('now connected to server');
});

socket.on('hello', ()=>{ //the message that gets sent to us if anyone presses a button
  console.log('hello button');
  hue = (hue + 20) % 360; //adds to hue until hits maximum, then loops
});

//
// global variables
//

let butt; //will later hold a reference to our button
let hue = 80; //color changes when we get message
//
// MARK: SETUP AND DRAW
// these are p5.js functions that I'm using to run the page
// setup happens once and is where you... set things up...
// draw is stuff that needs to loop / run continuously (rn nothing)
//

function setup(){
  createCanvas(windowWidth, windowHeight); //makes a "canvas" that covers the screen, this is where all our stuff lives
  colorMode(HSB, 360, 100, 100); //sets the color maximum values
  background(hue,100,75); //bg color in hue, saturation, brightness

  butt = createButton('CLICK ME'); //creates an html button
  butt.class("buttons"); //gives the button the button class properties from style.css
  butt.size(width/4, height/5);
  butt.position(width/2 - butt.width/2, height/2 - butt.height/2); //puts the button in the center

  butt.mousePressed(()=>{ 
    //everything that should happen when we press our button
    //right now just sends a message to the server
    socket.emit('buttonPress');
  })
}

function draw(){
  //updates the color that changes when we get a message
  background(hue,100,75); //bg color in hue, saturation, brightness
}
