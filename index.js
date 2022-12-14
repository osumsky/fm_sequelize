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
  // console.log(err.message);
  res.status(500).end(err.message);
});

app.listen(PORT, () => {
  console.log('Server started on Port ' + PORT);
});
