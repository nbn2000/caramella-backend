const apikey = process.env.APIKEY;
const authdomain = process.env.AUTHDOMAIN;
const projectid = process.env.PROJECTID;
const storagebucket = process.env.STORAGEBUCKET;
const messagingsenderid = process.env.MESSAGINGSENDERID;
const appid = process.env.APPID;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: authdomain,
  projectId: projectid,
  storageBucket: storagebucket,
  messagingSenderId: messagingsenderid,
  appId: appid,
};

module.exports = firebaseConfig;
