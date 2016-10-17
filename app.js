 express = require('express');
var app = express();
var bodyParser = express('body-parser');
var mongoose = express('mongoose');
var kafka = require('kafka-node');

//app.use(bodyParser.urlencoded({
//    extended: true
//}));
//app.use(bodyParser.json());

//connect to mongoose
mongoose.connect('mongodb://localhost/local_mongo');
var db = mongoose.connection;

//root home page.
app.get('/home',function(req, res) {
    res.setHeader('content-type', 'text/html');
    res.write('Below rest services are registered..</br>')
    app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        var route_val = r.route.path;
        res.write("<a href='http://localhost:3000"+ route_val + "'>");
        res.write(route_val);
        res.write("</a>");
        console.log(r.route.path);
       
        res.write("</br>")
      }
    })
    res.end('Server is started..');
});

//URL placeholders. 
/*app.get('/api/:message',function(req, res) {
    res.send('Here is the message'+ req.params.message);
});

//getting any paramters http://localhost:3000/api/users?id=4&token=sdfa3&geo=us
app.get('/api/users',function(req, res) {
   res.send(req.params.id + ' ' + req.params.token + ' ' + req.params.geo);
});
*/



app.get('/api/produce/:message', function(req, res) {
    var producer = require('./kafka/producer.js');
    var message = req.params.message;
    res.setHeader('content-type', 'text/plain');
    res.write(message);
    var result = producer.produce(message);
 
    res.end();
});

app.get('/api/consume', function(req, res) {
    var consumer = require('./kafka/consumer.js');
    consumer.consume();
    res.end("Messages has be produced to Kafka");
});

app.post('/api/home', function(req, res) {
    console.log(req.body);
    res.end('Here is the home..');
});

app.post('api/postJson', function(req, res) {
    console.log(req.body);
    res.end('done');
});
//kafka consumer
//require('./kafka/consumer.js');

app.listen(3000);
console.log('Starting');