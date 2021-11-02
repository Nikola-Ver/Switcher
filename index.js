const keypress = require('keypress');
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

const CHECK_GIT_NAME = 'git config user.name';
const CHECK_GIT_EMAIL = 'git config user.email';
const ACC_DIR = path.join(process.argv[1], '../', 'accounts');

let currentPos = 0;

fs.readdir(ACC_DIR, async (_, files) => {
  const { stdout } = await exec(CHECK_GIT_EMAIL);
  files.forEach((file, index) => {
    const reg = new RegExp(' ' + stdout.replace(/\n/g, '') + '($| |\n|\r)');
    const fileContent = fs.readFileSync(path.join(ACC_DIR, file)).toString();
    if (reg.test(fileContent)) {
      currentPos = index;
    }
  });

  if (!files) return;

  let info = 'Use arrow key to move and c key to select:\n\n';
  files.forEach((file, i) => {
    if (i === currentPos) {
      info += '>  ' + file.replace(/\..*/, '') + '\n';
    } else {
      info += new String(' ' + file.replace(/\..*/, '') + '\n').gray;
    }
  });

  console.clear();
  console.log(info);
  process.stdout.write('\x1B[?25l');
  keypress(process.stdin);

  let isShowConfig = false;

  process.stdin.on('keypress', async (ch, key) => {
    console.clear();
    let info = 'Use arrow key to move and c key to select:\n\n';

    if (key) {
      if (key.name === 'p') {
        exec(path.join(ACC_DIR, files[currentPos]));
      } else if (key.name === 'c') {
        exec(path.join(ACC_DIR, files[currentPos]));
        process.stdout.write('\x1B[?25h');
        process.stdin.pause();
        return;
      } else if (key.name === 'up') {
        if (currentPos > 0) currentPos--;
      } else if (key.name === 'down') {
        if (currentPos < files.length - 1) currentPos++;
      } else if (key.name === 'q') {
        process.stdin.pause();
        process.stdout.write('\x1B[?25h');
        return;
      } else if (key.name === 's') {
        if (!isShowConfig) {
          let res = 'Name: '.gray + (await exec(CHECK_GIT_NAME)).stdout;
          res += 'Email: '.gray + (await exec(CHECK_GIT_EMAIL)).stdout;
          console.log(res);
          isShowConfig = true;
          return;
        }
      }
    }

    isShowConfig = false;

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
