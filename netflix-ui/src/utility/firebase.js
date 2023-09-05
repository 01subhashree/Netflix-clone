import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPz_leZTA19ubYAoFY-gkFhF7UjF0Jrfs",
  authDomain: "netfilx-clone-44e45.firebaseapp.com",
  projectId: "netfilx-clone-44e45",
  storageBucket: "netfilx-clone-44e45.appspot.com",
  messagingSenderId: "257604471",
  appId: "1:257604471:web:d38e6c6c0e6b828e43bf72",
  measurementId: "G-W4F27Q9K1G",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
