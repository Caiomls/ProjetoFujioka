module.exports = function(to, subject, text){
    const mailer = require("nodemailer")

    const smtpTransport = mailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const message = {
        from: process.env.SMTP_USERNAME,
        to: "Caiomls@hotmail.com",
        subject,
        text,

    }

    smtpTransport.sendMail(message, function(error, response){
        if(error)
            console.log(error)
        else
            console.log("Email enviado: " + response.message);
        smtpTransport.close();
    })

}