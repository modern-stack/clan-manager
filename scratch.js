const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');

admin.initializeApp({
  credential: admin.credential.cert(require('./credentials.json')),
  databaseURL: 'https://clan-manager-78b3d.firebaseio.com',
});

var db = admin.firestore();

const api = axios.create({
  baseURL: 'https://api.clashroyale.com/',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjhiMThmNTAxLTMyNTYtNDE5MS05ODk2LTJiNmNiOGM2OGViYyIsImlhdCI6MTU0MzMyMjM1Miwic3ViIjoiZGV2ZWxvcGVyLzE5NTU1NjEyLTg0MDYtNjY2MC1mN2FmLTU2NThmODYwMDhlOSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI1MS41Mi4xODMuMTY2Il0sInR5cGUiOiJjbGllbnQifV19.ow8vTz_DsIJCimSoeM3cBo0zF5Cx5mxPapmbeQtnxSDBG7KR5EgEvM2ljI7pBdl5d5HBpAohXiNKJFtMFzESdg',
  },
});

(async () => {
  const response = await api.get('v1/clans/%238VQURY9/members');

  response.data.items.forEach(($) => {
    const { name, donations, donationsReceived } = $;
    var docRef = db.collection('clan').doc($.name);

    docRef.set({ name, donations, donationsReceived });
  });
})();
