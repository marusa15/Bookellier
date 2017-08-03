// defines object in which API data is stored at the moment

var currentItem;

// saves all user interactions

var state = {}; 

//how to put recommendations inside the state object? 

var recommendations = [];
state["recommendations"] = [
                {
                  Author: "Alessandro Baricco",
                  Title: "Mr. Gwin",
                  Description: "After celebrated author Jasper Gwyn suddenly and publicly announces that he will never write another book, he embarks on a strange new career path as a “copyist,” holding thirty-day sittings in a meticulously appointed room and producing, at the end, brief but profoundly rich portraits in prose. The surprising, beautiful, and even frightening results are received with rapture by their subjects—among them Gwyn’s devoted assistant, Rebecca; a beautiful fabric importer; a landscape painter; Gwyn’s own literary agent; two wealthy newlyweds; a tailor to the Queen; and a very dangerous nineteen-year-old.", 
                  URL: "https://store.mcsweeneys.net/products/mr-gwyn"
                },
                {
                  Author: "Elizabeth Gilbert",
                  Title: "The Signature of All Things",
                  Description: "Elizabeth Gilbert’s first novel in twelve years is an extraordinary story of botany, exploration and desire, spanning across much of the 19th century. The novel follows the fortunes of the brilliant Alma Whittaker (daughter of a bold and charismatic botanical explorer) as she comes into her own within the world of plants and science. As Alma’s careful studies of moss take her deeper into the mysteries of evolution, the man she loves draws her in the opposite direction—into the realm of the spiritual, the divine and the magical. Alma is a clear-minded scientist; Ambrose is a Utopian artist. But what unites this couple is a shared passion for knowing—a desperate need to understand the workings of this world, and the mechanism behind of all life.",
                  URL: "https://www.elizabethgilbert.com/books/the-signature-of-all-things/"
                },
                {
                  Author: "Patrick Modiano",
                  Title: "Missing Person", 
                  Description: "The missing person in the title of Patrick Modiano's novel, winner of the Goncourt Prize for 1978, is the detective himself. Guy Roland suffers from amnesia, the period of his life before launching his career as a private investigator is almost a complete blank. Even his name and nationality are a mystery to him. Now after a career of solving other people's problems, he turns to his own.",
                  URL: "http://www.postmodernmystery.com/missing_person.html"
                },
                {
                  Author: "Rodaan Al Galidi",
                  Title: "The autist and the carrier-pigeon",
                  Description: "Geert is an autistic boy, born to Janine, his alcoholic mother. He takes things literally and considers language something that means exactly what it says. Take the word in Dutch for ‘to move’ which is ‘verhuizen’ and contains the word ‘ver’, which means ‘far away’. So ‘verhuizen’ should, in Geert’s view, also take place far away. Also, when his mother tells him that he should make a girl wet before making love to her he throws a bucket of water over a girl.",
                  URL: "http://www.euprizeliterature.eu/author/2011/rodaan-al-galidi"
                },
                {
                  Author: "Julian Barnes",
                  Title: "The sense of an ending",
                  Description: "The Sense of an Ending is a 2011 novel written by British author Julian Barnes. The Sense of an Ending is narrated by a retired man named Tony Webster, who recalls how he and his clique met Adrian Finn at school and vowed to remain friends for life. When the past catches up with Tony, he reflects on the paths he and his friends have taken. In October 2011, The Sense of an Ending was awarded the Man Booker Prize. The following month it was nominated in the novels category at the Costa Book Awards.",
                  URL: "https://en.wikipedia.org/wiki/The_Sense_of_an_Ending"
                },
                {
                  Author: "Paul Auster",
                  Title: "Brooklyn Follies",
                  Description: "Nathan Glass, a retired life insurance salesman estranged from his family and facing an iffy cancer prognosis, is \"looking for a quiet place to die. Someone recommended Brooklyn.\" What he finds, though, in this ebullient novel by Brooklyn bard Auster (Oracle Night ), is a vital, big-hearted borough brimming with great characters. These include Nathan's nephew, Tom, a grad student turned spiritually questing cab driver; Tom's serenely silent nine-year-old niece, who shows up on Tom's doorstep without her unstable mom; and a flamboyant book dealer hatching a scheme to sell a fraudulent manuscript of The Scarlet Letter.",
                  URL: "https://www.publishersweekly.com/978-0-8050-7714-8"
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

var googleBooks_URL = 'https://www.googleapis.com/books/v1/volumes';

function getDataFromGBApi(searchTerm, callback) {
  var settings = {
    url: googleBooks_URL,
    data: {
      q: searchTerm,
    },
    dataType: 'jsonp', 
    type: 'GET',
    success: callback
 
  }
  $.ajax(settings);

}

function displayGoogleBooksData(data) {
  var result = '<img class="cover" src="' + data.items[0].volumeInfo.imageLinks.thumbnail + '">';
  $('.js-cover').html(result);
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
  var loadMore = '<div class="js-more"></div><button class="loadMore">Load more</button>';
  if (data.Similar.Results.length > 0) {
     data.Similar.Results.forEach(function(item, index) {
     if (index < 4) { 
     resultElement += '<div class="col-3 more-info" data-list-item-id="'+ index + '"><div class="book-cover"><div class="title">' + item.Name + '</div></div></div>';
     } 
    });
  resultElement += loadMore;
  }
  

  else {
    resultElement += '<p>Sorry, no results. Please try again.</p>';
  }

  
  $('.js-search-results').html(resultElement);
  
}

function displayMoreResults(state, element) {
  var resultElement = '';
  state.Similar.Results.forEach(function(item, index) {
  if (index >= 4) {
  resultElement += '<div class="col-3 more-info" data-list-item-id="'+ index + '"><div class="book-cover"><div class="title">' + item.Name + '</div></div></div>';
    }
  });
  return element.html(resultElement);
}

//when user clicks 'more', description displays

var displayDescription = function (state, element) {
  var teaser = currentItem.wTeaser;
  var teaser = '<div class="teaser"><h2>' + currentItem.Name + '</h2><br> <span><b>Description: </b></span>' + teaser + '<br> <p>More info: </p><a href="' + currentItem.wUrl + '">' + currentItem.wUrl + '</a></div><br><div class="js-cover"></div><br><button class="returnToResults">Back to search results</button>';
  
  return element.html(teaser); 
}

  var displayEditorsDescription = function (state, element) {
  var description = '<div class="teaser"><h2>' + currentItem.Name + '</h2><br> <span><b>Description: </b></span>' + teaser + '<br> <p>More info: </p><a href="' + currentItem.wUrl + '">' + currentItem.wUrl + '</a></div><br><button class="returnToResults">Back to search results</button>';
  return element.html(description);
} 

// displays editor's picks

var displayRecommendations = function(recommendations, element) {
  var recommendation = recommendations.map(function(item, index) {
  return '<div class="col-3"><div class="book-cover"><div class="author">' + item.Author + '</div><div class="title2">' + item.Title + '</div></div>'; 
  });
  return  element.html(recommendation);  
}

function displayGoogleBooksData(data) {
  var result = '<img class="cover" src="' + data.items[0].volumeInfo.imageLinks.thumbnail + '">';
  $('.js-cover').html(result);
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
  getDataFromGBApi($(this.closest('div')).text(), displayGoogleBooksData);
})

// clicks on Editor's picks button

$('.js-editors-picks').click(function(event) {
  event.preventDefault();
  $( ".teaser" ).remove();
  displayRecommendations(recommendations, $('.js-search-results'));
})

$('.js-search-results').on('click', '.returnToResults', function(event){
  event.preventDefault();
  displayTasteKidSearchData(state, $('.js-search-results'));
}) 

$('.js-search-results').on('click', '.loadMore', function(event){
  event.preventDefault();
  console.log('more!');
  displayMoreResults(state, $('.js-more'));
  $('.loadMore').remove();

})



$(function(){ 
  watchSubmit();
});





