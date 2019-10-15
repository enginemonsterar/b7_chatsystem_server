var io = require('socket.io')(process.env.PORT || 52300)

//Custom class
var Account = require('./Classes/Account.js');

console.log('Server has started Bro!');

var accounts = [];
var sockets = [];

io.on('connection', function(socket) {
    console.log("Connection Made Bro!");

    var account = new Account();
    var thisAccountID = account.id;

    accounts[thisAccountID] = account;
    sockets[thisAccountID] = socket;

    //tell the client that this is our id for the server    
    socket.emit('register', {id: thisAccountID});
    socket.emit('spawn', account); //Tell my self i have spawned
    socket.broadcast.emit('spawn', account); //Tell other i have spawned

    //Tell my self about everyone else in the game
    for (var accountID in accounts) {
        if(accountID != thisAccountID){
            socket.emit('spawn', accounts[accountID]);
        }
    }

    //Position data from client
    socket.on('sendMessage', function(data){
        account.id = data.id;
        account.username = data.username;
        account.message = data.message;

        socket.broadcast.emit('sendMessage', account);
    });

    // //Position data from client
    // socket.on('updatePosition', function(data){
    //     account.position.x = data.position.x;
    //     account.position.y = data.position.y;

    //     socket.broadcast.emit('updatePosition', account);
    // });

    socket.on('disconnect', function(){
        console.log('Someone has Disconnect from Server!');
        delete accounts[thisAccountID];
        delete sockets[thisAccountID];
        socket.broadcast.emit('disconnected', account);
    })
});