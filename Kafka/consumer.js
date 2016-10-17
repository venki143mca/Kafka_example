/* Consumer */
var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var topic = 'test';


var client = new Client('localhost:2181');
var topics = [
    {topic: topic, partition: 0}
];


var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);


module.exports = {
   
    consume: function () {
         var result;
        consumer.on('message', function (message) {
            result = result + message;
           
        });
        consumer.on('error', function (err) {
            console.log('error', err);
        });
console.log(result);
    }
}