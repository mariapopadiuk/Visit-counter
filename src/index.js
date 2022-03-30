const { server, add } = require('./core/server');
const indexAction = require('./actions/home')
const port = parseInt(process.argv[2]) || 3000 

add('/', indexAction);

server.listen(port);
console.log(`'Server listening on port ${port}:  http://localhost:${port}`);

