// defines object in which API data is stored

var currentItem;
// saves all changes due to user interactions
var state = { "Similar": { // The value of Similar is an object thas 2 keys: Info and Results
                  "Info": [  // Info has an array of objects as its value - authors or titles inserted by user
                      {
                      "Name": "Pulp Fiction",
                      "Type": "movie"
                      }
                  ],
                  "Results": [
                      {
                      "Name": "Reservoir Dogs",
                      "Type": "movie",
                      "Expanded": false,
                      "wTeaser": '',
                      "Intro": 'Demons (Russian: Бесы, Bésy) is a novel by Fyodor Dostoyevsky, first published in the journal The Russian Messenger in 1871–2.',
                      },
                      {
                      "Name": "Death Proof",
                      "Type": "movie"
                      },
                      {
                      "Name": "Jackie Brown",
                      "Type": "movie"
                      }
                      ]
            }                   
}

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
      limit: 3,
      k: '263777-Bookelli-ZCKH0EIS' 
    },
    dataType: 'jsonp', 
    type: 'GET',
    success: callback
 
  }
  $.ajax(settings);

}

// state modification functions

// logs if the user clicked to read more about suggestion

var logClick = function(state, item) {
  console.log("logclick dela!");
  
//  var itemId = item;
  currentItem = getItem(state, item);
  state.Similar.Results[item].expanded = true;
  console.log(state); 
}

// opens a specific result in the array of results

function getItem(state, itemIndex) {
    console.log(itemIndex);
    return state.Similar.Results[itemIndex]; // dobi/odpre aktualen item
    
}

// saves short description into state

var makeShortIntro = function(state) {
  
  state.Similar.Results.forEach(function(item) {
   console.log('wteaser' + state);
   item["Intro"] = item.wTeaser.match( /[^\.!\?]+[\.!\?]+/g )[0];

  });
  
  
}

// display functions 

function displayTasteKidSearchData(data) {
  state = data;
  console.log(state);
  makeShortIntro(state); 
  var resultElement = '';
  if (data.Similar.Results) {
    
     data.Similar.Results.forEach(function(item, index) {
     resultElement += '<h3 class="search-results">' + item.Name + ' - ' + item.Intro + '  <button class="more-info" data-list-item-id="'+ index + '">+</button><div class="description"></div></h3>';
     
    });
  }
  
  else {
    console.log("No results");
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

//when user clicks 'more', description displays

var displayDescription = function (state, element) {

  
   
  var teaser = currentItem.wTeaser;

  var teaser = '<p>' + teaser + '</p>';
  
  return element.html(teaser); 
}

// displays editor's picks

var displayRecommendations = function(recommendations, element) {

  var recommendation = recommendations.map(function(item, index) {
  
  return '<p>' + item.Author + ' - ' + item.Title + '</p>'; 
  console.log(recommendation); 
  console.log(typeof recommendation); 
  
    
  });
  return  element.html(recommendation);  
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

//clicks on 'more' button to display description

$('.js-search-results').on('click', '.more-info', function(event) {
 
  event.preventDefault();
   
  logClick(state, $(this.closest('button')).attr('data-list-item-id'));
    
  displayDescription(state, $('.js-search-results')); // next() determines WHERE in DOM the description will appear
     
})

// clicks on Editor's picks button

$('.js-editors-picks').click(function(event) {
  event.preventDefault();
  displayRecommendations(recommendations, $('.js-search-results'));
  
})




$(function(){ 
  watchSubmit();
});





