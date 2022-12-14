const express = require('express');
const router = require('./routers');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.end('Hello from server');
});

app.use('/api', router);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Internal server error';
  res.status(errStatus).end(errMessage);
});

app.listen(PORT, () => {
  console.log('Server started on Port ' + PORT);
});
