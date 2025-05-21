const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const postmark = require("postmark");
const app = express();

var mailClient = new postmark.ServerClient(
  "b8583bd2-0e3c-4633-aaa8-0cdfa2541fd4"
);

function readFile(file) {
  if (file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file.filepath, function (error, data) {
        if (error) return reject(error);
        resolve(data);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
}

async function sendMail(fields, resumeFile) {
  return new Promise((resolve, reject) => {
    Promise.all([readFile(resumeFile)])
      .then((files) => {
        const {
          firstName,
          lastName,
          email,
          phone,
          address,
          startDate,
          instagramHandle,
          license,
          position,
          question1,
          question2,
          question3,
          question4,
          question5,
          question6,
        } = fields;

        const attachements = [];

        attachements.push({
          content: files[0].toString("base64"),
          contentType: resumeFile.mimetype,
          name: resumeFile.originalFilename,
        });

        var client = new postmark.ServerClient(
          "b8583bd2-0e3c-4633-aaa8-0cdfa2541fd4"
        );

        const msg = {
          From: "info@hairbysaintrose.com",
          To: "info@hairbysaintrose.com",
          Subject: "Submission from careers page",
          MessageStream: "outbound",
          HtmlBody: `
          <strong>What position are you applying for?:</strong> ${position}
          <br />
          <strong>First Name:</strong> ${firstName}
          <br />
          <strong>Last Name:</strong> ${lastName}
          <br />
          <strong>Email:</strong> ${email}
          <br />
          <strong>Phone:</strong> ${phone}
          <br />
          <strong>Address:</strong> ${address}
          <br />
          <strong>When can you start?:</strong> ${startDate}
          <br />
          <strong>Business Instagram handle:</strong> ${instagramHandle}
          <br />
          <strong>Do you have a valid Texas Cosmetology License?:</strong> ${license}
          <br />
          <strong>What do you know about Saint Rose?:</strong> ${question1}
          <br />
          <strong>What are you looking for in a salon?:</strong> ${question2}
          <br />
          <strong>Give us an example of exceptional customer service.:</strong> ${question3}
          <br />
          <strong>How do you want to improve yourself in the next year?:</strong> ${question4}
          <br />
          <strong>Who has impacted you the most in your career and how?:</strong> ${question5}
          <br />
          <strong>Is there anything else you would like us to know?:</strong> ${question6}
          <br />
          `,
          attachments: attachements,
        };

        mailClient
          .sendEmail(msg)
          .then((response) => {
            resolve("success");
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => reject(error));
  });
}

app.use(express.static(path.join(__dirname, "/public")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post(
  "/careers",
  async (req, res) => {
    const form = formidable({
      uploadDir: path.join(__dirname, "public", "uploads"),
      multiples: true,
      keepExtensions: true,
      type: "multipart",
      maxFieldsSize: 20 * 1024 * 1024,
      maxFileSize: 20 * 1024 * 1024,
      maxFields: 20,
    });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        console.log("form.parse error:");
        console.log(error);
        res.json({ status: "error", message: "Unable to process request." });
      }

      if (files.resumeFile) {
        console.log("files");
        console.log(files);

        try {
          await sendMail(fields, files.resumeFile);
          res.json({ status: "success" });
        } catch (error) {
          console.log("Mail error:");
          console.log(error);
          res.json({ status: "error", message: "Unable to process request." });
        }
      } else {
        res.json({ status: "error", message: "Please include resume." });
      }
    });
  }
);

const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
