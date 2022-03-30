const { render } = require('../core/view');
const { readAndUpdateCounter } = require('../services/counter');

// let counter = 0;

module.exports = async (request) => {
  // counter++;
  const counter  = await readAndUpdateCounter(request);
  
 return await render('counter', {counter});
};