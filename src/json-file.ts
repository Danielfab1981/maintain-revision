// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import * as fs from 'fs';
import * as core from '@actions/core';

// TODO Catch errors and reject the promise if the function fails
export const readVersion = async (filename: string): Promise<string> =>
  new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        core.warning(err);
      } else {
        const { version } = JSON.parse(data);
        core.debug(`The version number field read from the package file is ${version}`);
        resolve(version);
      }
    });
  });

export const writeVersion = async (
  packageVersion: string,
  newVersion: string,
  filename: string,
): Promise<void> =>
  new Promise((resolve) => {
    fs.readFile(filename, 'utf8', (readError, data) => {
      if (readError) {
        core.warning(readError);
      } else {
        const result = data.replace(packageVersion, newVersion);

        fs.writeFile(filename, result, 'utf8', (writeError) => {
          if (writeError) {
            core.warning(writeError);
          }
        });
      }
    });
    resolve();
  });
