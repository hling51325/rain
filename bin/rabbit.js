let { connect } = require('../src/lib/service/rabbitMQ')

connect()
    .then(() => {
        console.log('success')
    })