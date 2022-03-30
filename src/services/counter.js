const { readFile, writeFile } = require('fs/promises');
const { localeData } = require('moment');
const { join } = require('path');

const logFile = join(__dirname, '..', '..', 'data', 'acces-log.json');
const counterFile = join(__dirname, '..', '..', 'data', 'counter.txt');


const readCount = async () => Number(await readFile(counterFile));

const writeCount = async (value) => writeFile(counterFile, `${value + 1}`);

const readAndUpdateCounter = async (req = null) => {
  try{
  // const count = await readCount();
  // writeCount(count)
  // return count;
await logAccess(req);
return await getAccessCount();
  } catch (err) {
    console.log(`[ERROR] ${err.message}`);
  }

};

const getAccessCount = async () => {
  const log = JSON.parse(await readFile(logFile));
  return log.length;

}
const logAccess = async (req) => {
  const access = {
    url: req.url,
    time:Date.now(),
    from: parseIp(req)
  };
  
  const log = JSON.parse(await readFile(logFile));

  log.push(access);

  await writeFile(logFile, JSON.stringify(log));
}

const parseIp = (req) => 
req.headers['x-forwarded-for']?.split(',').shift()
|| req.socket?.remoteAdress

module.exports = {
  readAndUpdateCounter
}