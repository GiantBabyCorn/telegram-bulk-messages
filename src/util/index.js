import { inspect } from 'util';
import dayjs from 'dayjs';
import crypto from 'crypto';
import { promises as fs } from 'fs';

/**
 * @function inspectJSON
 * @param {object|string} jsonObject object to format
 * @param {boolean} [colors] format with colors or not
 * @returns {string}
 */
export const inspectJSON = (jsonObject, colors = true, depth = Infinity) => inspect(jsonObject, {
  colors,
  depth,
});

export const timelog = (...str) => {
  console.log('\x1b[36m%s\x1b[39m', dayjs().format('YYYY-MM-DD HH:mm:ss'), '|', ...str);
};

export const sleep = (interval = 0) => new Promise((resolve) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    resolve(timer);
  }, interval);
});

export const appendLog = ({ file = './log/log', message }) => new Promise(
  async (resolve, reject) => {
    const messageToWrite = `${
      dayjs().format('YYYY-MM-DD HH:mm:ss')
    } | ${
      typeof message === 'string'
        // eslint-disable-next-line no-control-regex, prefer-regex-literals
        ? message.replace(new RegExp('\x1B\\[[0-9]+m', 'g'), '')
        : message
    }\n`;

    const fileResults = await fs.appendFile(file, messageToWrite)
      .catch((err) => err);

    if (fileResults instanceof Error) {
      reject(fileResults);
    } else {
      resolve('success');
    }
  },
);

export const getHash = (obj) => {
  const message = `${JSON.stringify(obj)}`;
  return crypto.createHmac('sha256').update(message).digest('hex');
};
