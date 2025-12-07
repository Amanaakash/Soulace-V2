import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getGoogleAuthURL = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar",     // IMPORTANT
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",  // needed for refresh token
    prompt: "consent",       // ensures refresh token is returned every time
    scope: scopes,
  });
};
