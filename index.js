'use strict';

const recommended = require('./configs/recommended');
const recommendedTypeChecked = require('./configs/recommended-type-checked');
const homeyApp = require('./configs/homey-app');
const homeyAppTypeChecked = require('./configs/homey-app-type-checked');

module.exports = {
  configs: {
    recommended,
    recommendedTypeChecked,
    homeyApp,
    homeyAppTypeChecked,
  },
};
