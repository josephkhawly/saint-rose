const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
// const formidable = require("express-formidable");
// const sgMail = require("@sendgrid/mail");
const postmark = require("postmark");
const cors = require("cors");
const app = express();

// sgMail.setApiKey(
//   "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"
// );

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

// async function sendMail(frontFile, backFile, inspirationPhoto, fields) {
//   return new Promise((resolve, reject) => {
//     Promise.all([
//       readFile(frontFile),
//       readFile(backFile),
//       readFile(inspirationPhoto),
//     ])
//       .then((files) => {
//         const {
//           firstName,
//           lastName,
//           email,
//           phone,
//           hairLength,
//           hairThickness,
//           hairTexture,
//           services,
//           lastService,
//           colorPermanent,
//           greys,
//           percentageGrey,
//           refresh,
//           currentColorDislikes,
//           previousTreatments,
//           lastTreatment,
//         } = fields;

//         const attachements = [];

//         if (frontFile) {
//           attachements.push({
//             content: files[0].toString("base64"),
//             filename: "photo_1",
//             type: frontFile.type,
//             disposition: "attachment",
//             contentId: "photo_1",
//           });
//         }

//         if (backFile) {
//           attachements.push({
//             content: files[1].toString("base64"),
//             filename: "photo_2",
//             type: backFile.type,
//             disposition: "attachment",
//             contentId: "photo_2",
//           });
//         }

//         if (inspirationPhoto) {
//           attachements.push({
//             content: files[2].toString("base64"),
//             filename: "photo_3",
//             type: inspirationPhoto.type,
//             disposition: "attachment",
//             contentId: "photo_3",
//           });
//         }

//         var client = new postmark.ServerClient(
//           "b8583bd2-0e3c-4633-aaa8-0cdfa2541fd4"
//         );

//         const msg = {
//           // to: "info@hairbysaintrose.com",
//           // from: "info@hairbysaintrose.com",
//           From: "saintrose@superheavyco.com",
//           To: "saintrose@superheavyco.com",
//           Subject: "Hello from Postmark",
//           MessageStream: "outbound",
//           HtmlBody: "Hello!"
//           // HtmlBody: `
//           // <strong>First Name:</strong> ${firstName}
//           // <br />
//           // <strong>Last Name:</strong> ${lastName}
//           // <br />
//           // <strong>Email:</strong> ${email}
//           // <br />
//           // <strong>Phone:</strong> ${phone}
//           // <br />
//           // <strong>Please select the services you would like to book an appointment for:</strong> ${services}
//           // <br />
//           // <strong>What is your hair length?:</strong> ${hairLength}
//           // <br />
//           // <strong>What is your hair density?:</strong> ${hairThickness}
//           // <br />
//           // <strong>What is your hair texture?:</strong> ${hairTexture}
//           // <br />
//           // <strong>When was your last color service?:</strong> ${lastService}
//           // <br />
//           // <strong>Is the color permanent?:</strong> ${colorPermanent}
//           // <br />
//           // <strong>Do you have grey hairs to cover?:</strong> ${greys}
//           // <br />
//           // <strong>If yes, please note percentage of grey.:</strong> ${percentageGrey}
//           // <br />
//           // <strong>Are we refreshing your current color, or are we making a change?:</strong> ${refresh}
//           // <br />
//           // <strong>What don't you like about your current hair color?:</strong> ${currentColorDislikes}
//           // <br />
//           // <strong>Have you ever had a Brazillian keratin treatment, stripped your color, or used henna or vegetable dye? Select all that apply:</strong> ${previousTreatments}
//           // <br />
//           // <strong>If yes to any of above, when was the service?:</strong> ${lastTreatment}
//           // `,
//           attachments: attachements,
//         };

//         mailClient
//           .send(msg)
//           .then((response) => {
//             resolve("success");
//           })
//           .catch((error) => {
//             reject("error");
//           });
//       })
//       .catch((error) => reject(error));
//   });
// }

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
          // filename: "resume",
          // type: resumeFile.type,
          // disposition: "attachment",
          // contentId: "resumeFile",
          contentType: resumeFile.mimetype,
          name: resumeFile.originalFilename,
        });

        var client = new postmark.ServerClient(
          "b8583bd2-0e3c-4633-aaa8-0cdfa2541fd4"
        );

        const msg = {
          From: "info@hairbysaintrose.com",
          To: "info@hairbysaintrose.com",
          // From: "saintrose@superheavyco.com",
          // To: "saintrose@superheavyco.com",
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
// app.post("/book", async (req, res) => {
//   console.log("req.fields", req.fields);
//   console.log("req.files", req.files);
//   if (req.files.frontPhoto && req.files.backPhoto) {
//     try {
//       if (req.files.inspirationPhoto) {
//         await sendMail(
//           req.files.frontPhoto,
//           req.files.backPhoto,
//           req.files.inspirationPhoto,
//           req.fields
//         );
//       } else {
//         await sendMail(
//           req.files.frontPhoto,
//           req.files.backPhoto,
//           null,
//           req.fields
//         );
//       }
//       res.json({ status: "success" });
//     } catch (error) {
//       res.json({ status: "error", message: "Unable to process request." });
//     }
//   } else {
//     res.json({ status: "error", message: "Please include hair photos." });
//   }
// });

app.post(
  "/careers",
  // cors({
  //   origin: "http://localhost:3000",
  // }),
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
