const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const dataRoutes = require('./routes/dataRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 5000;

connectDB();


app.use(cors());
app.use(express.json());


app.use('/api', dataRoutes);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
