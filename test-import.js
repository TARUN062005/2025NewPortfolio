// test-import.js
const path = require('path');

try {
  // Try to import your projects file
  const projectsModule = require('./src/constants/projects.ts');
  console.log("✅ Import successful");
  console.log("Projects found:", projectsModule.projects?.length || 0);
  console.log("First project title:", projectsModule.projects?.[0]?.title);
} catch (error) {
  console.log("❌ Import failed:", error.message);
  
  // Try reading file directly
  const fs = require('fs');
  const filePath = path.join(__dirname, 'src/constants/projects.ts');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log("File exists. First 200 chars:", content.substring(0, 200));
  } else {
    console.log("File does not exist at:", filePath);
  }
}