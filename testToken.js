import { google } from 'googleapis';
const CLIENT_ID = 'dummy';
const CLIENT_SECRET = 'dummy';
const REDIRECT_URI = 'dummy';
const REFRESH_TOKEN = 'dummy';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function check() {
    try {
        const res = await oAuth2Client.getAccessToken();
        console.log(typeof res);
        console.log(res);
    } catch (err) {
        console.error("error:", err.message);
    }
}
check();
