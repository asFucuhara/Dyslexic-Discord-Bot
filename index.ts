import express from 'express';
import './services/discord';

const { PORT } = require('./config/index');

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('prod');
  /*     app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    }); */
} else {
  app.use('/', (req, res) => {
    res.send('ok');
  });
}

app.listen(PORT, () => console.log('listening.......'));
