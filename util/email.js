var nodemailer = require('nodemailer');
const { google } = require("googleapis");

const fs = require('fs');
const readline = require('readline');

// If modifying these scopes, delete token.json.




exports.send = async(campos, fn) => {
    const OAuth2 = google.auth.OAuth2;
    // const oauth2Client = await new OAuth2(
    //     "67168347168-m0cce5hsusu3738jtq41qm6p5quplc3b.apps.googleusercontent.com", // ClientID 
    //     "IoBS74CfA3gUtYGkDs1c2TWq", // Client Secret 
    //     "https://developers.google.com/oauthplayground" // Redirect URL 
    // );

    // await oauth2Client.setCredentials({
    //     refresh_token: "1//04NJCGE_px2x9CgYIARAAGAQSNwF-L9IrGIQLm4eWmh3V27KqpQIgflTuEM-K8vQM3c7K0MibCYZsd8QiHJ8EAKySBUpr8LokUd0"
    // });

    // console.log("--- OAuth2 >>>>", oauth2Client)

    // const accessToken = await oauth2Client.getAccessToken().then(res => {
    //     console.log("--- accessToken oauth2Client >>>>", res)
    // }).catch(err => {
    //     console.log("--- accessToken ERRORRRR >>>>", err)

    // })
    console.log(">>>>>>>>>>>>>>>> CORREO >>>>>>>>>>>>>>>>>>>>><<<<<<<<<")

    // console.log("--- accessToken >>>>", accessToken)


    // let transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         type: "OAuth2",
    //         user: "ufpsconvenios@gmail.com",
    //         clientId: "67168347168-m0cce5hsusu3738jtq41qm6p5quplc3b.apps.googleusercontent.com",
    //         clientSecret: "IoBS74CfA3gUtYGkDs1c2TWq",
    //         refreshToken: "1//04NJCGE_px2x9CgYIARAAGAQSNwF-L9IrGIQLm4eWmh3V27KqpQIgflTuEM-K8vQM3c7K0MibCYZsd8QiHJ8EAKySBUpr8LokUd0",
    //         accessToken: accessToken
    //     },

    // });

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