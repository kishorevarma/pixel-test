import fs from 'fs';
import xml2js from 'xml2js';

export const getLiquorData = () => (
  new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    fs.readFile(`${__dirname}/../xml/beers.xml`, (error, data) => {
      if (error) {
        reject(error);
      }
      parser.parseString(data, (err, result) => {
        if (err || !result) {
          reject(err);
        }
        resolve(result);
      });
    });
  })
);
