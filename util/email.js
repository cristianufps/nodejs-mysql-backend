var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

const CLIENT_ID = '1078653232327-0ack9us4oj8ueh18570pnoo9ehr3f7p0.apps.googleusercontent.com'
const CLIENT_SECRET = 'ieTyj70cjZQQYm0ocVFGZfkr'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04dGMUK4fpeGnCgYIARAAGAQSNwF-L9IrM_ZYneHNT_OP1QmPFe8HzDYco-KPJnsevVC-PLMehVbL4kIWBvXdFf0ORKB_1mRGQfM'


const OAuth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
OAuth2.setCredentials({ refresh_token: REFRESH_TOKEN })

exports.send = async(campos, fn) => {
    // console.log(">>>>>>>>>>>>>>>> ACCESS_TOKEN >>>>>>>>>>>>>>>>>>>>><<<<<<<<<")
    // const accessToken = await OAuth2.getAccessToken()
    // console.log(accessToken)
    // let transporterOauth = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: 'convenio.ufps@gmail.com',
    //         clientId: CLIENT_ID,
    //         clientSecret: CLIENT_SECRET,
    //         refreshToken: REFRESH_TOKEN,
    //         accessToken: accessToken.token
    //     },
    //     tls: {
    //         rechazarUnauthorized: false
    //     }
    // });
    // console.log(">>>>>>>>>>>>>>>> transporterOauth >>>>>>>>>>>>>>>>>>>>><<<<<<<<<")

    // console.log(transporterOauth)


    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'convenio.ufps@gmail.com',
            pass: 'UFPS.@2021'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
            from: 'CONVENIOS UFPS', // sender address
            to: campos.to, // list of receivers
            subject: campos.subject, // Subject line
            // text: campos.mail, // plain text body
            html: campos.mail // html body
        },
        function(error, info) {
            if (error) {
                console.log("ERROR MAIL  ---", error);
                return { message: "Mail error", status: 'fail', aplicated: 'false' };
            } else {
                return { message: "success", status: 'ok', aplicated: 'true' };
            }
        }
    );
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}