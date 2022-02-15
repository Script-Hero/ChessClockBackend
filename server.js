const SerialPort = require('serialport')



//const port = new SerialPort('/dev/ttyACM0');
const express = require('express');

app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

io.on('connection', async function(socket){
    console.log("Connection!");
        //port.on('data', function(data){ // ignore

        while(true){ // In the real version, this can be on receieving port data, or it can update each clock 
                    // every x milliseconds

            // Simulate Arduino input. In the future, this will be the actual values from the serial port
            // Determine who is active on board 1
            let one = Math.round(Math.random());
            let two = one == 1 ? 0 : 1;

            // Determine who is active on board 2
            let three = Math.round(Math.random())
            let four = three == 1 ? 0 : 1;

            let clockActivityStates = [one, two, three, four]; // 1 or 0 for on or off for each clock
            socket.emit('data', clockActivityStates); // send clock activity states to frontend ui
            console.log('Sent state: ' + JSON.stringify(clockActivityStates));
            await delay(Math.random() * 5000); // delay so we don't spam the clock. In the real version, this may not be necessary
        }
    //}) // ignore
})



http.listen(4000, ()=> {
    console.log("Listening on Port 4000.")
})