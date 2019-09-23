const yargs = require('yargs');
const notes = require('./notes.js');

// console.log(process.argv);

// Run node app.js --version
yargs.version('1.1.0');

// Add a note
yargs.command({
  command: 'add',
  describe: 'Add a new note.',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    // console.log(`Title: ${argv.title}\nBody: ${argv.body}`);
    notes.addNotes(argv.title, argv.body);
  }
});

// Remove a note
yargs.command({
  command: 'remove',
  describe: 'Remove a note.',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    console.log('Remove function');
    notes.removeNotes(argv.title);
  }
});

// List notes
yargs.command({
  command: 'list',
  describe: 'List notes.',
  handler: function() {
    console.log('List function');
    notes.listNotes();
  }
});

// List notes
yargs.command({
  command: 'read',
  describe: 'Read a note.',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    console.log('Read function');
    notes.readNotes(argv.title);
  }
});

// This line of code is important!
// console.log(yargs.argv);
// OR
yargs.parse();
