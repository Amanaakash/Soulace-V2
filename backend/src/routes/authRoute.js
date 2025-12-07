import express from "express";
import Professional from "../models/professional.model.js";
import { oauth2Client, getGoogleAuthURL } from "../services/googleAuth.js";
import { google } from "googleapis";

const router = express.Router();

// 1. Step: Send user to Google Login
router.get("/google", (req, res) => {
  return res.redirect(getGoogleAuthURL());
});

// 2. Step: Google redirects back with code
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    // Fetch user info
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get();

    // Save in DB
    let prof = await Professional.findOne({ email: data.email });

    if (!prof) {
      prof = await Professional.create({
        name: data.name,
        email: data.email,
        googleId: data.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        tokenExpiry: tokens.expiry_date
      });
    } else {
      prof.accessToken = tokens.access_token;
      prof.refreshToken = tokens.refresh_token ?? prof.refreshToken;
      prof.tokenExpiry = tokens.expiry_date;
      await prof.save();
    }

    // Redirect to frontend with success
    return res.redirect(`http://localhost:3000/profDashboard?email=${data.email}`);

  } catch (err) {
    console.log("Error:", err);
    return res.status(500).send("Authentication failed");
  }
});

export default router;
