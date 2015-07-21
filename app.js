var io = require('socket.io')(3000);

var rooms = {};

io.on('connection', function(socket) {
   console.log('New connection id: ' + socket.id);

   /*
   socket.auth = false;
   
   socket.emit('identify', {});

   socket.on('authenticate', function(data) {

      if (!checkAuthenticate(data.id, data.token)) {
         console.log('authenticate: FAIL');

         socket.emit('loginplease', {});
      }else {
         console.log('authenticate: OK');
      }

   });

   socket.on('login', function(data) {

      if (!checkLogin(data.user, data.pass)) {
         console.log('login: FAIL');

         socket.emit('loginresult', {
            status : {
               code: 0,
               msg: 'Invalid username or password'
            }
         });

      }else {
         console.log('login: OK');

         socket.emit('loginresult', {
            status : {
               code: 1,
               msg: 'Login success'
            }
         });

      }

   });
   */

   if (typeof(rooms['room1']) == 'undefined') {
      console.log('create new room');
      rooms['room1'] = {
         down: socket.id,
         key: socket.id,
         viewers: []
      };

      socket.join(rooms['room1']);
   }else {
      console.log('join a room');
      rooms['room1'].up = socket.id;

      socket.join(rooms['room1']);
   }

   socket.to(rooms['room1']).emit('newplayer', socket.id);

   socket.on('spawnfish', function(data) {
      console.log('spawnfish');
   });
});

var checkAuthenticate = function(id, token) {
   if (typeof(id) == 'undefined' || typeof(token) == 'undefined')
      return false;
   
   // check authentication: id & token
   // check token expiration

   // test
   return false;

   return true;
};

var checkLogin = function(user, pass) {
   if (typeof(user) == 'undefined' || typeof(pass) == 'undefined')
      return false;

   // check login: user & pass

   return true;
};
