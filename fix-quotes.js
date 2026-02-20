const fs = require('fs');
const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8');

// Fix templates with apostrophes
content = content.replace(/template: '([^']*'ve[^']*)'/g, 'template: "$1"');
content = content.replace(/template: '([^']*'re[^']*)'/g, 'template: "$1"');
content = content.replace(/template: '([^']*'ll[^']*)'/g, 'template: "$1"');
content = content.replace(/template: '([^']*'s[^']*)'/g, 'template: "$1"');
content = content.replace(/template: '([^']*'t[^']*)'/g, 'template: "$1"');
content = content.replace(/template: '([^']*'d[^']*)'/g, 'template: "$1"');

fs.writeFileSync(file, content);
console.log('Fixed apostrophes');
