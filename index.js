'use strict'

var bd = require('./config/bd')

var app = require('./app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN EL PUERTO ', PORT)
        // bd.connection()
})