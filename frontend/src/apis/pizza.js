import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5001',
});

//"start": "node ./backend/server.js",
//"start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"