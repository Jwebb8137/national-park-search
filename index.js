'use strict';

// put your own value below!
const apiKey = 'VzopHx0eWhOQPdJepOOG0MkOjTafw7yUIeeXwzrY'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  // 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    console.log(responseJson.data[i]);
    $('#results-list').append(
      `<div class="item">
        <li>
          <img src='${responseJson.data[i].images[0].url}'>
          <h3>${responseJson.data[i].fullName}</h3>
          <p>${responseJson.data[i].description}</p>
          <p>${responseJson.data[i].addresses[0].line1}<br>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</p>
          <a href="${responseJson.data[i].url}">Go To Website</a>
        </li>
      </div>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(state, maxResults=10) {
  const params = {
    stateCode: state,
    limit: maxResults,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(state, maxResults);
  });
}

$(watchForm);