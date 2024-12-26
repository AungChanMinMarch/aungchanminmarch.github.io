import { doc, setDoc } from "firebase/firestore"; // Importing Firestore methods
import db from "./db.js"; // Assuming your Firebase Firestore instance is exported from db.js

const uploadData = async (questions) => {
    try {
        // Loop through each question and upload it to Firestore
        for (const question of questions) {
            // Reference to the specific document in Firestore by its ID
            const questionRef = doc(db, "questions", question.id);
            
            // Set or update the document with merge: true to avoid overwriting existing data
            await setDoc(questionRef, question, { merge: true });

            console.log(`Document with ID ${question.id} successfully written or updated!`);
        }
    } catch (error) {
        console.error("Error uploading data:", error);
    }
};

export default uploadData;
