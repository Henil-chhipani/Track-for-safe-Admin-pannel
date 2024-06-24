const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');
dotenv.config();
var serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB_URL,
  databaseAuthVariableOverride: null,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID
});

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB_URL,
  databaseAuthVariableOverride: null,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID
});