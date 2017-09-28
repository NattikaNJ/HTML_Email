const nodemailer = require('nodemailer'); //to require module
const express = require('express');
const bodyParser = require('body-parser');
const jade = require('jade');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('./public')); //express static (auf Public-Folder direkt zugreifen)

app.get('/', function (req, res) {
  res.render('email');
})

app.post('/', function (req, res){
  var jadeCompile = jade.compileFile('./views/template_email.jade');
  var fromemail = req.body.from;
  var msgMain = req.body.message;
  var subject = req.body.subject;
  var msgtitle = req.body.title;
  var msgLeft = req.body.left;
  var msgRight = req.body.right;
  var htmlTemplate = jadeCompile({from: fromemail, main: msgMain, subject: subject, title: msgtitle, left: msgLeft, right: msgRight});
  if(fromemail && subject && msgMain && msgtitle && msgLeft && msgRight){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'singasongyouandme@gmail.com', // generated ethereal user
            pass: 'Singasong1'  // generated ethereal password
        }
    });

    var mailOptions = {
        from: fromemail, // sender address
        to: 'nattika.jugk@gmail.com', // list of receivers
        subject: subject, // Subject line
        html: htmlTemplate // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
  }
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
