var nodemailer = require('nodemailer');
exports.send = async(campos, fn) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'meideyy@gmail.com',
            pass: 'sindromedepeterpan1'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: campos.to, // list of receivers
            subject: campos.subject, // Subject line
            text: campos.mail, // plain text body
            // html: "<b>Si le llega esto es porque soy crack :D </b>" // html body
        },
        function(error, info) {
            if (error) {
                console.log("ERROR MAIL", error);
                return { message: "Mail error", status: 'fail', aplicated: 'false' };
            } else {
                return { message: "success", status: 'ok', aplicated: 'true' };
            }
        }
    );
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}