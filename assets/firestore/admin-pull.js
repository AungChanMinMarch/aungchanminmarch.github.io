const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const mypretty = require(path.join(__dirname, './prettifyFirebaseObj.js'));

// Load and fix service account JSON
const serviceAccount = require(path.join(__dirname, "./serviceAccount.json"));
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Export Firestore data
const exportQuestionsToFile = async () => {
  try {
    const template = fs.readFileSync(path.join(__dirname, "./template.js"), 'utf-8');
    const templateContent = template.split("[firestoreObj]");
    if(templateContent.length !==2){
				console.log(`template error: [] must exist exactly once in template.js, found=${templateContent.length-1}`);
				return;
    }
    const snapshot = await db.collection("questions").get();

    if (snapshot.empty) {
      console.log("No documents found.");
      return;
    }

    const questions = [];
    snapshot.forEach((doc) => {
      // Only include the document data
      const data = doc.data();
      questions.push({ id: doc.id, ...data });
    });
    const fileContent = templateContent[0] + mypretty(questions) + templateContent[1];

    // Write the prettified object to a JavaScript file
    fs.writeFileSync(path.join(__dirname, "../../_site/questions.js"), fileContent, "utf8");
    console.log("Questions exported successfully as a JavaScript module!");
  } catch (error) {
    console.error("Error exporting questions:", error);
  }
};

exportQuestionsToFile();
