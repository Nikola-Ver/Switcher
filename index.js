const keypress = require('keypress');
const colors = require('colors');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const accDir = './accounts';
let currentPos = 0;

fs.readdir(accDir, (err, files) => {
  console.clear();
  let info = 'Use arrow key to move and c key to select:\n\n';
  files.forEach((file, i) => {
    if (i === currentPos) {
      info += '>  ' + file.replace(/\..*/, '') + '\n';
    } else {
      info += new String(' ' + file.replace(/\..*/, '') + '\n').gray;
    }
  });
  console.log(info);

  keypress(process.stdin);

  process.stdin.on('keypress', function (ch, key) {
    console.clear();
    let info = 'Use arrow key to move and c key to select:\n\n';
    if (key) {
      if (key.name === 'c') {
        exec(path.join(accDir, files[currentPos]));
        process.stdin.pause();
        return;
      } else if (key.name === 'up') {
        if (currentPos > 0) currentPos--;
      } else if (key.name === 'down') {
        if (currentPos < files.length - 1) currentPos++;
      }
    }
    files.forEach((file, i) => {
      if (i === currentPos) {
        info += '>  ' + file.replace(/\..*/, '') + '\n';
      } else {
        info += new String(' ' + file.replace(/\..*/, '') + '\n').gray;
      }
    });
    console.log(info);
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
});
