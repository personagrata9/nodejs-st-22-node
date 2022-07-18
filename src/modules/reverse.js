import { Transform, pipeline } from 'stream';

const reverseStdin = () => {
  console.log(`Enter text to transform or press ctrl + c to exit`);
  
  const transformStream = new Transform({
    transform (chunk, encoding, cb) {
      try {
        const chunkStringified = chunk.toString().trim();
        const reversedString = chunkStringified.split('').reverse().join('');

        cb(null, reversedString + `\n\n`);
      } catch (error) {
        cb(error);
      }
    }
  });

  pipeline(
    process.stdin,
    transformStream,
    process.stdout,
    (error) => {
      console.error(error.message);
    }
  );
};

export default reverseStdin();
