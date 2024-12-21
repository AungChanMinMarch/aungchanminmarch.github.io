const fs = require('fs');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your Firebase Admin SDK key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const collection = db.collection('questions');

// Function to upload questions to Firestore
const uploadToFirestore = async (questions) => {
  try {
    for (const question of questions) {
      const docRef = await collection.add(question);
      console.log(`Uploaded question with ID: ${docRef.id}`);
    }
    console.log('All questions uploaded successfully!');
  } catch (error) {
    console.error('Error uploading to Firestore:', error);
  }
};

// Main function to read JSON and upload data
const main = async () => {
  try {
    // Read the JSON file
    const data = fs.readFileSync('./src/questions.json', 'utf-8');
    const questions = JSON.parse(data);

    if (Array.isArray(questions) && questions.length > 0) {
      console.log(`Found ${questions.length} questions. Uploading to Firestore...`);
      await uploadToFirestore(questions);
    } else {
      console.log('No questions found in the JSON file.');
    }
  } catch (error) {
    console.error('Error reading JSON file or uploading data:', error);
  }
};

// Run the main function
main();

