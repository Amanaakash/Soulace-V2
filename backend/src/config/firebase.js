import admin from 'firebase-admin';
import serviceAccount from './admin-sdk.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://soulace-47673-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export default admin;
