const fs = require('fs');

// fs.writeFileSync('note.txt', 'Hello, Rock');
fs.appendFileSync('note.txt', '\nSecond line.');
