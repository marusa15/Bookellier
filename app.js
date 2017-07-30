// defines object in which API data is stored at the moment

var currentItem;

// saves all user interactions

var state; 

var recommendations = [
                {
                  Author: "Alessandro Baricco",
                  Title: "Mr. Gwin" 
                },
                {
                  Author: "Elizabeth Gilbert",
                  Title: "The Signature of All Things"
                },
                {
                  Author: "Patrick Modiano",
                  Title: "Missing Person" 
                },
                {
                  Author: "Rodaan Al Galidi",
                  Title: "The autist and the carrier-pigeon" 
                },
                {
                  Author: "Julian Barnes",
                  Title: "The sense of an ending" 
                },
                {
                  Author: "Paul Auster",
                  Title: "Brooklyn Follies" 
                } 
]

var TasteKid_BASE_URL = 'https://www.tastekid.com/api/similar'; 

//retrieves data from TasteKid API
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: TasteKid_BASE_URL,
    data: {
      q: searchTerm,
      type: 'books',
      info: 1,
      limit: 24,
      k: '263777-Bookelli-ZCKH0EIS' 
    },
    dataType: 'jsonp', 
    type: 'GET',
    success: callback
 
  }
  $.ajax(settings);

}

// state modification functions

var logExpand = function(state, item) { // logs if the user clicked to read more about suggestion
  currentItem = getItem(state, item);
  state.Similar.Results[item].expanded = true;
}

// opens a specific result in the array of results

function getItem(state, itemIndex) {
    return state.Similar.Results[itemIndex];    
}

// saves short description into state

var makeShortIntro = function(state) {
   state.Similar.Results.forEach(function(item) {
   item["Intro"] = item.wTeaser[0];
    });
} 

// display functions 

function displayTasteKidSearchData(data) {
  state = data;
  console.log(state);
  makeShortIntro(state); 
  var resultElement = '';
  if (data.Similar.Results.length > 0) {
     data.Similar.Results.forEach(function(item, index) {
     resultElement += '<div class="col-3 more-info" data-list-item-id="'+ index + '"><div class="book-cover"><div class="title">' + item.Name + '</div></div></div>';
    });
  }
  
  else {
    resultElement += '<p>Sorry, no results. Please try again.</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

//when user clicks 'more', description displays

var displayDescription = function (state, element) {
  var teaser = currentItem.wTeaser;
  var teaser = '<div class="teaser"><h2>' + currentItem.Name + '</h2><br> <span><b>Description: </b></span>' + teaser + '<br> <p>More info: </p><a href="' + currentItem.wUrl + '">' + currentItem.wUrl + '</a></div>';
  
  return element.html(teaser); 
}

// displays editor's picks

var displayRecommendations = function(recommendations, element) {
  var recommendation = recommendations.map(function(item, index) {
  return '<div class="col-3"><div class="book-cover"><div class="author">' + item.Author + '</div><div class="title2">' + item.Title + '</div></div>'; 
  });
  return  element.html(recommendation);  
}


// event listeners

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayTasteKidSearchData);
   });
}

//clicks on title to display description

$('.js-search-results').on('click', '.more-info', function(event) {
  event.preventDefault();
  console.log(state);
  logExpand(state, $(this.closest('div')).attr('data-list-item-id'));
  displayDescription(state, $('.js-search-results')); // next() determines WHERE in DOM the description will appear
})

// clicks on Editor's picks button

$('.js-editors-picks').click(function(event) {
  event.preventDefault();

  $( ".teaser" ).remove();
  displayRecommendations(recommendations, $('.js-search-results'));
})

$(function(){ 
  watchSubmit();
});





