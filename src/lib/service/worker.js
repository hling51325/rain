const { connect } = require('./rabbitMQ')
connect()
  .then(({ ch }) => {
    var q = 'task_queue';
    ch.consume(q, function (msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function () {
        console.log(" [x] Done");
      }, secs * 1000);
    }, { noAck: true });
  })
  .catch(e => {
    console.log(e)
  })
