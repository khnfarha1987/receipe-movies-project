var search = $("#search-input").val().trim();

//array to save search history
var searches = [];

var savedSearches = JSON.parse(localStorage.getItem("saved-searches"))

//update searches with thw values from local storages
if (savedSearches != null) {
    searches = savedSearches;
}


//Save search and render new button in history area
function saveSearch(value) {

    //create a button
    var button = $("<button>")
    button.text(value).attr("class", "btn")

    // add to the history area in html
    $("#history-list").prepend(button);

    //save search in array and save to local storage
    searches.push(value);
    localStorage.setItem("savedSearches", JSON.stringify(searches))

}

//Render all saved searches as buttons
function renderSearches() {
    savedSearches = JSON.parse(localStorage.getItem("saved-searches"))

    //if there are saved searches in the local storage, then update the searches array
    if (savedSearches != null) {
        searches = savedSearches;
    }

    for (i = 0; i < searches.length; i++) {
        var button = $("<button>")
        button.text(searches[i]).attr("class", "btn savedBtn")

        $("#history-list").prepend(button);
    }
}

//When search button is added, save value to the search history
$("#search-btn").on("click", function (event) {
    //prevent default
    event.preventDefault();

    //get value from input
    var search = $("#search-input").val().trim();

    //add search button to history div
    saveSearch(search);

    //update local storage
    localStorage.setItem("saved-searches", JSON.stringify(searches));

});

// Display data when show history button is searched
$("#history-btn").on("click", function (event) {

    event.preventDefault();

    //check if the search history list is currently visible
    isVisible = ($("#history-list")[0].className);

    //Allow to close and view the history list
    if (isVisible == "visible") {
        $("#history-btn").text("View History");
        console.log("I'm visible");
        visibility = "hidden"
        $("#history-list").attr("class", visibility);
    } else {
        $("#history-btn").text("Close history");
        visibility = "visible"
        $("#history-list").attr("class", visibility);
    }

    //empty history list div
    $("#history-list").empty();

    //render all buttons
    renderSearches();

});

//show results
$(document).on("click", ".savedBtn", function (event) {

    event.preventDefault();
    console.log("I'm clicked");

    //get value from button
    var search = $(this).text().trim();

    //Render movies
    //empty movies list
    $("#movies-list").empty()
    //update movie title
    $("#movies-heading").text("Movies featuring: " + search)

    //form query url
    var queryURL = "https://www.omdbapi.com/?s=" + search + "&apikey=trilogy";

    //get data from query
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // if movie is found
            if (response.Response == "True") {
                for (i = 0; i < response.Search.length; i++) {
                    //render each movie
                    renderMovie(response.Search[i]);
                }
            } 
            // if no results found
            else {
                $("#movies-list").text("Sorry, no results available. Please try again.")
            }

        })


    // Render recipies
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=447e563198c34679afe3427fe0ed747b&includeIngredients=${search}`)
        .then(response => response.json())
        .then(data => {
            var html = "";
            if (data.results) {
                data.results.forEach(recipe => {
                    html += `
                    <div class = "meal-item" data-id = "${recipe.id}">
                        <div class = "meal-img">
                            <img src = "${recipe.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${recipe.title}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });

        

})