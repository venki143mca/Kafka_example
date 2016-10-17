/*     Producer  */
var kafka = require('kafka-node');

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('localhost:2181');
var topic = 'test';
var p = 0;
var a = 0;
var producer = new Producer(client, { requireAcks: 1 });

module.exports = {
    produce : function(message) {
        console.log(message);
        var finalResult;
        producer.on('ready', function () {
        producer.send([
            { topic: topic, partition: p, messages: [message], attributes: a }
          ], function (err, result) {
              console.log(err || result);
             finalResult = result;
          });
        });

        producer.on('error', function (err) {
          console.log('error', err);
        });
        
        return finalResult;
    }
}
