import admin from "firebase-admin";
import serviceAccount from "../../armath2-firebase.json" assert { type: "json" };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://armath2-default-rtdb.firebaseio.com",
  storageBucket: "gs://armath2.appspot.com"
});

const bucket = admin.storage().bucket();

export default {
  bucket
};