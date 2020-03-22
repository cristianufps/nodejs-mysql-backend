'use strict'

var bd = require('./config/bd')

var app = require('./app');
var port = 4200

app.listen(port, () => {
    console.log('Server running')
    // bd.connection()
})

