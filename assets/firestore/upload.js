import { doc, setDoc } from "firebase/firestore"; // Importing Firestore methods
import db from "./db.js"; // Assuming your Firebase Firestore instance is exported from db.js

function validateFirestoreData(data) {
  for (const key in data) {
    const value = data[key];
    if (typeof value === 'function') {
      throw new Error(`Unsupported field: ${key} contains a function`);
    }
    if (value === undefined) {
      throw new Error(`Unsupported field: ${key} contains undefined`);
    }
    if (typeof value === 'object' && value !== null) {
      validateFirestoreData(value); // Recursively validate nested objects.
    }
  }
}

const uploadData = async (questions) => {
    try {
        // Loop through each question and upload it to Firestore
        for (const question of questions) {
				   validateFirestoreData(question);
            // Reference to the specific document in Firestore by its ID
            const questionRef = doc(db, "questions", question.id);
            
            // Set or update the document with merge: true to avoid overwriting existing data
            await setDoc(questionRef, question, { merge: true });

            alert(`Document with ID ${question.id} successfully written or updated!`);
        }
    } catch (error) {
        console.error("Error uploading data:", error);
    }
};

export default uploadData;
