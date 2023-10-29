import axios from "axios";
import { json } from "body-parser";
import * as express from "express";
import { createTransport } from "nodemailer";
import { SendDetailsRequest } from "./common.model";
import { englishTemplate, hebrewTemplate } from "./templates";

const app = express();

app.use(json());

app.post("/send_details", async (req: SendDetailsRequest, res) => {
  const adminUrl = await shorten(
    `${process.env.DESTINATION_URL}/group/edit?id=${req.body.adminId}`
  );
  const viewUrl = await shorten(
    `${process.env.DESTINATION_URL}/group/view?id=${req.body.groupId}`
  );

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: req.body.email,
    subject:
      req.body.lang === "he"
        ? "נפתחה קבוצה חדשה"
        : "Congrats! New Group Opened",
    html:
      req.body.lang === "he"
        ? hebrewTemplate(req.body.title, adminUrl, viewUrl)
        : englishTemplate(req.body.title, adminUrl, viewUrl),
  };

  try {
    const transporterResponse = await transporter.sendMail(mailOptions);

    console.info(
      `Mail was successfully sent to ${req.body.email}. RESPONSE: ${transporterResponse}`
    );

    return res.status(200).json({ hasSucceeded: true });
  } catch (err) {
    console.error(
      `There has been an error sending mail to ${req.body.email}. ERROR: ${err}`
    );

    return res.status(500).json(err);
  }
});

app.get("/authenticate", (req, res) =>
  res.status(200).json({
    "X-Hasura-Role": req.headers["X-Hasura-Group-Admin-Id"] ? "edit" : "public",
  })
);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

const shorten = async (url: string) => {
  const apiCall = {
    method: "post",
    url: "https://api.rebrandly.com/v1/links",
    data: {
      destination: url,
      domain: { fullName: "rebrand.ly" },
    },
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.URL_SHORTENER_API_KEY,
    },
  };

  const apiResponse = await axios(apiCall);

  return apiResponse.data.shortUrl;
};
