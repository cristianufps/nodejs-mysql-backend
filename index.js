'use strict'

var app = require('./app');
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log('SERVIDOR CORRIENDO EN EL PUERTO ', PORT)
})

require('./util/cron')
exports.addTested = function(value) {
    var result = value + " tested";
    return result;
};