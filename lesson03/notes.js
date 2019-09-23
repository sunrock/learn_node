const fs = require('fs');
const _ = require('lodash');
const chalk = require('chalk');

// const getNotes = function() {
//   return 'My notes are here.';
// };

const addNotes = function(title, body) {
  let notes = loadNotes();

  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      // title: title,
      // body: body
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.black.bgGreen(' New note added. '));
  } else {
    console.log(chalk.bgRed(' Title is not valid. '));
  }
};

const removeNotes = function(title) {
  let notes = loadNotes();
  const notesToRemove = _.remove(notes, { title: title });

  if (notesToRemove.length === 0) {
    console.log(chalk.bgRed(' Note not found. '));
  } else {
    console.log(chalk.black.bgGreen(' Note removed. '));
    saveNotes(notes);
  }

  // OR
  // const notesToKeep = notes.filter(note => {
  //   return note.title !== title;
  // });
  // saveNotes(notesToKeep);
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgGreen.black(' Your notes: '));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNotes = title => {
  const notes = loadNotes();
  // OR use filter
  const noteToRead = notes.find(note => {
    return note.title === title;
  });

  console.log(noteToRead);

  if (noteToRead != null) {
    console.log(chalk.bgGreen.black(' Read a note: '));
    console.log(`Title: ${noteToRead.title}\nBody: ${noteToRead.body}`);
  } else {
    console.log(chalk.red.inverse(' Note not found. '));
  }
};

const loadNotes = function() {
  // New! Add try & catch
  try {
    const dataBuffer = fs.readFileSync('./data/notes.json');
    const dataJSON = dataBuffer.toString();
    // String to Array
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = function(notesArray) {
  console.log(notesArray);
  const dataJSON = JSON.stringify(notesArray);
  fs.writeFileSync('./data/notes.json', dataJSON);
};

// const checkDuplicate = function() {};

module.exports = {
  // addNotes: addNotes,
  // removeNotes: removeNotes,
  addNotes,
  removeNotes,
  listNotes,
  readNotes
};
