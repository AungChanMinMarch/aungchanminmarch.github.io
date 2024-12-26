const admin = require("firebase-admin");
const fs = require("fs");
const beautify = require("js-beautify").html;

// Load and fix service account JSON
const serviceAccount = require("./serviceAccount.json");
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();



function prettifyObject(obj, seen = new WeakSet(), indent = 2) {
  if (seen.has(obj)) {
    return '"[Circular Reference]"'; // Prevent infinite recursion
  }

  seen.add(obj); // Track visited objects
  const indentation = ' '.repeat(indent);

  if (Array.isArray(obj)) {
    // Handle arrays distinctly
    let result = '[\n';
    for (const value of obj) {
      if (typeof value === 'string' && value.trim().startsWith('<')) {
        // Prettify HTML strings
        const prettyHTML = beautify(value, { indent_size: 2, space_in_empty_paren: true });
        result += `${indentation}\`\n${' '.repeat(indent + 2)}${prettyHTML.replace(/\n/g, `\n${' '.repeat(indent + 2)}`)}\n${indentation}\`,\n`;
      } else if (typeof value === 'object' && value !== null) {
        // Recursively prettify nested objects or arrays
        result += `${indentation}${prettifyObject(value, seen, indent + 2)},\n`;
      } else {
        // Stringify primitive values
        result += `${indentation}${JSON.stringify(value)},\n`;
      }
    }
    result += `${' '.repeat(indent - 2)}]`;
    seen.delete(obj); // Allow garbage collection
    return result;
  }

  if (typeof obj === 'object' && obj !== null) {
    // Handle objects
    let result = '{\n';
    for (const [key, value] of Object.entries(obj)) {
      result += `${indentation}${JSON.stringify(key)}: `;
      if (typeof value === 'string' && value.trim().startsWith('<')) {
        // Prettify HTML strings
        const prettyHTML = beautify(value, { indent_size: 2, space_in_empty_paren: true });
        result += `\`\n${' '.repeat(indent + 2)}${prettyHTML.replace(/\n/g, `\n${' '.repeat(indent + 2)}`)}\n${indentation}\``;
      } else if (typeof value === 'object' && value !== null) {
        // Recursively prettify nested objects
        result += prettifyObject(value, seen, indent + 2);
      } else {
        // Stringify primitive values
        result += JSON.stringify(value);
      }
      result += ',\n';
    }
    result += `${' '.repeat(indent - 2)}}`;
    seen.delete(obj); // Allow garbage collection
    return result;
  }

  // For primitives, return JSON string
  return JSON.stringify(obj);
}

// Export Firestore data
const exportQuestionsToFile = async () => {
  try {
    const template = fs.readFileSync("./template.js", 'utf-8');
					console.log(template)
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
    const fileContent = templateContent[0] + prettifyObject(questions) + templateContent[1];

    // Write the prettified object to a JavaScript file
    fs.writeFileSync("questions.js", fileContent, "utf8");
    console.log("Questions exported successfully as a JavaScript module!");
  } catch (error) {
    console.error("Error exporting questions:", error);
  }
};

exportQuestionsToFile();
