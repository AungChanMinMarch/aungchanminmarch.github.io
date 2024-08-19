const fs = require('fs');
const path = require('path');

// Function to recursively read all files within a folder
function readFilesRecursively(folderPath, fileCallback) {
    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            readFilesRecursively(filePath, fileCallback);
        } else {
            fileCallback(filePath);
        }
    });
}

// Function to read the content of a file
function readContent(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Function to aggregate content of all files
function aggregateContent(folderPath) {
    const aggregatedContent = [];
    readFilesRecursively(folderPath, filePath => {
        aggregatedContent.push(readContent(filePath).split("---")[2]);
    });
    return aggregatedContent.join('\n');
}

// Get the current directory
const currentDirectory = __dirname;

// Define the folder path to aggregate
const folderPath = path.join(currentDirectory, 'src', 'topology', 'ch07');

// Aggregate the content of all files within the folder
const aggregatedContent = `---
title: Topology
layout: page.njk
---` + aggregateContent(folderPath);

// Output the aggregated content
const outputFilePath = path.join(currentDirectory, 'src', 'download.html');


// Write the aggregated content to the new file
fs.writeFileSync(outputFilePath, aggregatedContent);

console.log(`Aggregated content has been written to ${outputFilePath}`);