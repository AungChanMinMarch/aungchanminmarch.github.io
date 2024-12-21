import { collection, getDocs } from "firebase/firestore";
import db from "./db.js";

const fetchData = async () => {
  try {
    // Reference to the "questions" collection
    const questionsCollection = collection(db, "questions");

    // Fetch all documents in the collection
    const querySnapshot = await getDocs(questionsCollection);

    // Map each document to an object
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return questions;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;

