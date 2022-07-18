import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const convertCsvToJson = () => {
  const fileName = 'nodejs-hw1-ex1';
  const sourcePath = path.join(__dirname, '..', 'csv', `${fileName}.csv`);
  const destinationPath = path.join(__dirname, '..', `${fileName}.txt`);
  
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  const parserParameters = {
    headers: ['book', 'author', 'amount', 'price'],
    checkColumn: true,
    colParser: {
      'amount': 'omit',
      'price': 'number',
    },
    checkType: true,
  };

  const converter = csv(parserParameters);

  pipeline(
    source,
    converter,
    destination,
    (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log('File was successfuly converted!');
      }
    }
  );
};

export default convertCsvToJson();
