/**
 * Script to add title property to all achievements
 * Run with: node backend/server/scripts/add-achievement-titles.js
 */

const fs = require('fs');
const path = require('path');

const achievementsPath = path.join(__dirname, '../../../js/achievements.js');

// Read the file
let content = fs.readFileSync(achievementsPath, 'utf8');

// Function to generate a title from achievement name
function generateTitle(name) {
  // For most achievements, the name itself makes a good title
  // We can add "the" prefix for certain types
  const prefixWithThe = [
    'God of Fishing', 'Trawler', 'Fisher King', 'Century Fisher',
    'Myth of the Sea', 'Tsunami', 'Half-Millionaire', 'Sea Emperor',
    'Leviathan Lord', 'Heir of Poseidon', 'Reality Bender'
  ];

  if (prefixWithThe.includes(name)) {
    return `the ${name}`;
  }

  return name;
}

// Replace pattern: add title property after name
// Match: { id: '...', name: '...', desc: '...'
// Replace with: { id: '...', name: '...', title: '...', desc: '...'

const achievementRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*desc:/g;

content = content.replace(achievementRegex, (match, id, name) => {
  const title = generateTitle(name);
  return `{ id: '${id}', name: '${name}', title: '${title}', desc:`;
});

// Write back to file
fs.writeFileSync(achievementsPath, content, 'utf8');

console.log('✅ Successfully added titles to all achievements!');
console.log('📝 File updated:', achievementsPath);
