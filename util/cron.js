var tareaProgramada = require('../controllers/agreement_controller')
const CronJob = require('cron').CronJob;
const job = new CronJob('30 18 * * *', function() {
    console.log("<<<<<<<<< function CRON  >>>>>>>>>>> ");
    tareaProgramada.cron()
}, null, true, "America/Bogota");
job.start();
console.log("<< PROXIMA EJECUCION CRON >> ", job.nextDates())