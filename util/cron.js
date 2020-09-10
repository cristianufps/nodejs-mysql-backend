var tareaProgramada = require('../controllers/agreement_controller')
    //CRON
    // var cron = require('node-cron');
    // cron.schedule('0 18 * * *', tareaProgramada.cron, {
    //     scheduled: true,
    //     timezone: "America/Bogota"
    // });
const CronJob = require('cron').CronJob;
const job = new CronJob('30 21 * * *', function() {
    console.log(">>>>>>>>>>>>> function CRON    >  >>>>>>> ");
    tareaProgramada.cron()
}, function() {
    console.log(">>>>>>>>>>>>> CRON COMPLETE   >>>>>>>> ");
}, true);
// job.start();
// console.log("objetc job ", job);
console.log("PROXIMA EJECUCION ->> ", job.nextDates())