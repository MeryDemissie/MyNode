const axios = require('axios');

// Use axios to fetch data
axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Axios is working! Fetched data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
