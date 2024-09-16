
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBYMFUBzGtvJ91xZI_GOH6XkONlbXNYeA4",
    authDomain: "padaria-54e12.firebaseapp.com",
    databaseURL: "https://padaria-54e12-default-rtdb.firebaseio.com",
    projectId: "padaria-54e12",
    storageBucket: "padaria-54e12.appspot.com",
    messagingSenderId: "1020891832982",
    appId: "1:1020891832982:web:26d821841b5455c1c5d8b7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };