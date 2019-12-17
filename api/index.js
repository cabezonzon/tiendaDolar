//We load the mongoose module to connect to MongoDB
var mongoose = require('mongoose');

//Load the app.js file with the Express configuration
var app = require('./app');

//SETTING
app.set('port', process.env.PORT || 3000); 

//Create conection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/miniverso', )
    .then(() => {
        console.log("successful database connection")
          const server = app.listen(app.get('port'), () => {
                let host = server.address().address
                let port = server.address().port 
                console.log("App listening at  http://%s:%s", host, port);
        });
    }).catch(err => console.log(err));

