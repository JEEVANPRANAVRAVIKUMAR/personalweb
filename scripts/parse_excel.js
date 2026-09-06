// scripts/parse_excel.js
const fs = require('fs');
const path = require('path');

console.log("Checking modules and files...");
console.log("Excel file exists:", fs.existsSync(path.join(__dirname, '../LeetCode_250_Practice_Tracker (1).xlsx')));
