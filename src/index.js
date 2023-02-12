/* eslint-disable no-return-await */
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import input from 'input';
import dayjs from 'dayjs';
import { promises as fs } from 'fs';
import { inspectJSON, timelog } from './util/index.js';
import config, { saveSession } from './config.js';

const main = async () => {
  const {
    apiId,
    apiHash,
    stringSession: session,
  } = await config();

  const stringSession = new StringSession(session ?? '');

  timelog('Loading interactive example...');

  const client = new TelegramClient(stringSession, Number(apiId), apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.password('Please enter your password: '),
    phoneCode: async () => await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });

  timelog('You should now be connected.');

  const sessionToSave = client.session.save();
  saveSession(sessionToSave); // Save this string to avoid logging in again

  const welcomeMessageResult = await client.sendMessage(
    'me',
    {
      message: `[${
        dayjs().format('YYYY-MM-DD HH:mm:ss')
      }] Hello! telegram-bulk-messages actived!`,
    },
  );

  // timelog(inspectJSON({ welcomeMessageResult }));

  const file = await fs.readFile('.list')
    .catch((err) => err);

  if (file instanceof Error) {
    if (file.errno === -4058) {
      timelog('Please create a ".list" file listing user ids separated by linebreaks.');
      const fileResults = await fs
        .appendFile(
          '.list',
          '\n',
        )
        .catch((err) => err);
      timelog(`Error: ${inspectJSON(fileResults)}`);
    } else {
      timelog(`Error: ${inspectJSON(file)}`);
    }
    return false;
  }

  const fileText = file.toString();

  const ids = fileText.split(/(\n|\r)+/)
    .filter((str) => (
      str
      && str !== '\n'
      && str !== '\r'
      && !/^#/.test(str)
    ));

  let index = 0;
  let timer;

  const loop = async () => {
    if (index >= ids.length) {
      clearInterval(timer);
      process.exit();
      return;
    }
    const id = `${/^@/.test(ids[index]) ? '' : '@'}${ids[index]}`;

    timelog(`Sending message to ${id}`);

    const sendMessageResult = await client.sendMessage(
      id,
      {
        message: `[${
          dayjs().format('YYYY-MM-DD HH:mm:ss')
        }] Hello! telegram-bulk-messages actived!`,
      },
    )
      .catch((err) => err);

    if (sendMessageResult instanceof Error) {
      timelog(`Error in sending message to ${id} : ${
        inspectJSON(sendMessageResult)
      }`);
    } else {
      timelog(`Sending message to ${id} succeeds!`);
    }

    index += 1;
  };

  timer = setInterval(loop, 10_000);
  loop();
};

main();
