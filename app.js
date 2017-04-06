var TasteKid_BASE_URL = 'https://www.tastekid.com/api/similar'; //maybe without similar?

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: TasteKid_BASE_URL,
    data: {
      q: searchTerm,
      type: 'books',
      info: 1,
      limit: 3,
      k: '' 
    },
    dataType: 'jsonp', 
    type: 'GET',
    success: callback
    
  //  TasteKid_BASE_URL, query, callback
  }
  $.ajax(settings);
}


function displayTasteKidSearchData(data) {
  console.log(data);
  var resultElement = '';
  if (data.Similar.Results > 0) {
    data.Similar.Results.forEach(function(item) {
     resultElement += '<p>' + item.Name + ' <br><br> ' + item.wTeaser + ' <br><br>Wikipedia: ' + item.wUrl + '</p>';
    });
  }
  else {
    console.log("No results");
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    console.log("Hello");
    getDataFromApi(query, displayTasteKidSearchData);
  });
}

$(function(){ 
  watchSubmit();
});