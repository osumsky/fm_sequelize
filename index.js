const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.handler.mw');
const router = require('./routers');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('uploads'));
app.use(express.json());

app.get('/', (req, res) => {
  res.end('Hello from server');
});
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on Port ' + PORT);
});