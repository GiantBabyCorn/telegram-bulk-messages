/* eslint-disable no-return-await */
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import input from 'input';
import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
import { inspectJSON, timelog } from './util/index.js';

dotenv.config();

const envFileName = './.env';

const {
  apiId,
  apiHash,
  stringSession,
} = process?.env ?? {};

export default async () => {
  const inputs = {
    apiId: '',
    apiHash: '',
    stringSession: '',
  };

  if (apiId === undefined) {
    const fileResults = await fs
      .appendFile(
        envFileName,
        '\n# Login into your telegram account at https://my.telegram.org/ and get the "apiId".\napiId = \n',
      )
      .catch((err) => err);
  }

  if (apiId === '' || apiId === undefined) {
    inputs.apiId = await input.password('Please login into your telegram account at https://my.telegram.org/ and get the "apiId".\napiId:');

    const file = await fs.readFile(envFileName);

    const text = file.toString()
      .replace(/\s*apiId\s*=\s*/, `\napiId = ${inputs.apiId}\n\n`);

    const fileResults = await fs.writeFile(
      envFileName,
      text,
    );
  }

  if (apiHash === undefined) {
    const fileResults = await fs
      .appendFile(
        envFileName,
        '\n# Login into your telegram account at https://my.telegram.org/ and get the "apiHash".\napiHash = \n',
      )
      .catch((err) => err);
  }

  if (apiHash === '' || apiHash === undefined) {
    inputs.apiHash = await input.password('Please login into your telegram account at https://my.telegram.org/ and get the "apiHash".\napiHash:');

    const file = await fs.readFile(envFileName);

    const text = file.toString()
      .replace(/\s*apiHash\s*=\s*/, `\napiHash = ${inputs.apiHash}\n\n`);

    const fileResults = await fs.writeFile(
      envFileName,
      text,
    );
  }

  if (stringSession === undefined) {
    const fileResults = await fs
      .appendFile('./.env', '\n# the session you got after you logged in via TelegramClient.\nstringSession = \n')
      .catch((err) => err);
  }

  return {
    apiId: apiId ?? inputs.apiId,
    apiHash: apiHash ?? inputs.apiHash,
    stringSession,
  };
};

export const saveSession = async (session = '') => {
  const file = await fs.readFile(envFileName);

  const text = file.toString()
    .replace(/\s*stringSession\s*=\s*[0-9a-zA-Z\/\+\-\=]*\s*/, `\nstringSession = ${session}\n\n`);

  const fileResults = await fs.writeFile(
    envFileName,
    text,
  );

  return session;
};
