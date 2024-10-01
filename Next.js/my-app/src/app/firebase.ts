import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";

const firebaseConfig:FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('ブラウザを閉じるとセッションが切れます');
  })
  .catch((error) => {
    console.error('ブラウザを閉じてもセッションが切れません', error);
  });
} catch (error) {
  console.error('Firebase初期化に失敗しました', error);
}
const provider = new GoogleAuthProvider();

export { auth, provider };