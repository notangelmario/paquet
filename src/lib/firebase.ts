import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyDxDQKoKzXLhWnqowxQKENGKHLTUdKNf7I",
	authDomain: "paquetromania.firebaseapp.com",
	projectId: "paquetromania",
	storageBucket: "paquetromania.appspot.com",
	messagingSenderId: "438836893082",
	appId: "1:438836893082:web:ffe467c2087768ad6f9623",
	measurementId: "G-3VH95LD4JB"
};

const firebase = initializeApp(firebaseConfig);
let analytics = null;
let performance = null;

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
	performance = getPerformance(firebase);
	analytics = getAnalytics(firebase);
}

export {
	firebase,
	analytics,
	performance
};