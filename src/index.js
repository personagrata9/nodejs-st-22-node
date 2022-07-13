const { createReadStream, createWriteStream } = require('fs');
const csv = require('csvtojson');
const { pipeline } = require('stream');

const convertCsvToJson = () => {
  const sourcePath = 'src/csv/nodejs-hw1-ex1.csv';
  const destinationPath = 'src/csv/nodejs-hw1-ex1.txt';
  
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath, 'utf8');

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

convertCsvToJson();