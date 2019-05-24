module.exports = function() {
  return `/* eslint-disable */
    window.ENV =  "${process.env.ENV}"
    window.FIREBASE_API_KEY = "${process.env.FIREBASE_API_KEY}",
    window.FIREBASE_AUTH_DOMAIN = "${process.env.FIREBASE_AUTH_DOMAIN}",
    window.FIREBASE_DB_URL = "${process.env.FIREBASE_DB_URL}",
    window.FIREBASE_PROJECT_ID = "${process.env.FIREBASE_PROJECT_ID}",
    window.FIREBASE_MESSAGEING_ID = "${process.env.FIREBASE_MESSAGEING_ID}"
    window.FIREBASE_APP_ID = "${process.env.FIREBASE_APP_ID}"
    `;
};
