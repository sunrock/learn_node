const fs = require('fs');

const notes = [
  {
    title: 'note_01',
    body: 'body_01'
  }
];

const noteJSON = JSON.stringify(notes);

fs.writeFileSync('lesson03.json', noteJSON);
