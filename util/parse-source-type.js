'use strict';

const fs = require('fs');

function parseRootConfig(file) {
  try {
    const configFile = fs.readFileSync(`${process.cwd()}/${file}`, 'utf-8');
    return JSON.parse(configFile);
  } catch {
    return null;
  }
}

function getAppSourceType() {
  const hasPackageTypeModule = parseRootConfig('package.json')?.type === 'module';
  const hasAppESMConfig = parseRootConfig('app.js')?.esm === true;

  return hasPackageTypeModule || hasAppESMConfig ? 'module' : 'commonjs';
}

module.exports = {
  getAppSourceType,
};
