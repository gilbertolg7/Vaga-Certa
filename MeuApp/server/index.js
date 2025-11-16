require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobsRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');
    await sequelize.sync({ alter: true });
    console.log('DB synchronized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start server', err);
    process.exit(1);
  }
}

start();
