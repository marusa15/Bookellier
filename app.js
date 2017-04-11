var retrievedObject = {};

var TasteKid_BASE_URL = 'https://www.tastekid.com/api/similar'; 
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: TasteKid_BASE_URL,
    data: {
      q: searchTerm,
      type: 'books',
      info: 1,
      limit: 3,
      k: '263777-Bookelli-ZCKH0EIS' 
    },
    dataType: 'jsonp', 
    type: 'GET',
    success: callback
        
    
  //  TasteKid_BASE_URL, query, callback
  }
  $.ajax(settings);
}

// display functions

function displayTasteKidSearchData(data) {
  retrievedObject = data; 
  var resultElement = '';
  if (data.Similar.Results) {
    
     data.Similar.Results.forEach(function(item) {
     resultElement += '<h3 class="search-results">' + item.Name + '  <button class="more-info">+</button></h3><div class="description"></div>';
    });
  }
  
  else {
    console.log("No results");
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

//when user clicks 'more', description displays

var displayDescription = function (data, element) {
    
    var teaser = retrievedObject.Similar.Results.map(function(item) {
    return '<p>' + item.wTeaser + '</p>';
        
    });

    return element.html(teaser);
}


// event listeners

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    console.log("Hello");
    getDataFromApi(query, displayTasteKidSearchData);
  });
}

//clicks on 'more' button

$('.js-search-results').on('click', '.more-info', function(event) {
  console.log("Hello more info!");
  event.preventDefault();
  displayDescription(retrievedObject, $('.description'));
})




$(function(){ 
  watchSubmit();
});





