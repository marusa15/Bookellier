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
                      "Expanded": false
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
  
  var itemId = item;
  currentItem = getItem(state, itemId);
  state.Similar.Results[item].expanded = true;
   console.log(state); 
}

function getItem(state, itemIndex) {
    console.log(itemIndex);
    return state.Similar.Results[itemIndex]; // dobi/odpre aktualen item
    
}

// display functions

function displayTasteKidSearchData(data) {
  state = data;
  console.log(state); 
  var resultElement = '';
  if (data.Similar.Results) {
    
     data.Similar.Results.forEach(function(item, index) {
     resultElement += '<h3 class="search-results">' + item.Name + '  <button class="more-info" data-list-item-id="'+ index + '">+</button><div class="description"></div></h3>';
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
    
   console.log(state.Similar.Results.expanded);

   
  var teaser = '<p>' + currentItem.wTeaser + '</p>';
  

   

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
 
  event.preventDefault();
  console.log('+' + $(this.closest('button')).attr('data-list-item-id'));
  
  logClick(state, $(this.closest('button')).attr('data-list-item-id'));
  console.log(state.Similar.Results.expanded);
 
  displayDescription(state, $(this).next()); // next() determines WHERE in DOM the description will appear
})




$(function(){ 
  watchSubmit();
});





