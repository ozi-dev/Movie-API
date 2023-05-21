const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require("dotenv").config();

// **Express creation**
const app = express();
app.use(express.json());

// **DB conn**
async function dbconn() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('DB connection succes');
  } catch (error) {
    console.error('DB connection failed', error);
  }
}
dbconn();

// **Schema creation**
const detailsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  year: Number,
  genre: String,
});
const Details = mongoose.model('Details', detailsSchema);

// **GET endpoint**
app.get('/api/details/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Details.findOne({ id: id });

    if (data) {
      res.json(data);
      console.log('There is data for '+ id +' in db that show up as json');

    } else {
      console.log('!!! There is no data for '+ id +' in db, NOW getting data from API !!!');
      await api_detail(id);
      const newData = await Details.findOne({ id: id });
      res.json(newData);
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// **Posting data to db**
function postdb(id_detail, title_detail, year_detail, genre_detail) {
  const newDetails = new Details({
    id: id_detail,
    title: title_detail,
    year: year_detail,
    genre: genre_detail,
  });

  newDetails.save()
    .then(() => {
      console.log('Saving succes');
    })
    .catch((error) => {
      console.error('Saving error: ', error);
    });
}

// **Getting data from API**
function api_detail(id) {
  var dynamic_url = process.env.url.replace(/movie_id/, id);

  let config = {
    method: process.env.method,
    maxBodyLength: process.env.maxBodyLength,
    url: dynamic_url,
    headers: process.env.headers
  };

  return axios.request(config)
    .then((response) => {
      for (genre of response.data.genres) {
        console.log(genre.name)
      }
      let year = response.data.release_date.split('-')[0];
      console.log(year, response.data.title);
      postdb(id, response.data.title, year, genre.name);
    })
    .catch((error) => {
      console.error('Can not get data from API', error);
    });
}

// **Server**
app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});
