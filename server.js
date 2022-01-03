const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: "colibridesignweb@gmail.com",
    pass: "CDW0rkPass",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "colibridesignweb@gmail.com",
    subject: "Mesaj Contact Form",
    html: `<table>
             <tr><td>Nume: </td><td>${name}</td></tr>
             <tr><td>Email: </td><td>${email}</td></tr>
             <tr><td>Telefon: </td><td>${phone}</td></tr>
             <tr><td>Message: </td><td>${message}</td></tr>
           </table>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Mesaj trimis" });
    }
  });
});