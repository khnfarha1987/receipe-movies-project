var moviesDiv = $("#movies-list")

//have global access to data from query
var movieData;


//Function that renders movie data
function renderMovie(response) {

    //create movie card
    var movieCard = $("<div>").attr("class", "movie-card");

    //assign all values needed for movie cards
    var title = $("<h3>").text(response.Title);
    var releaseDate = $("<p>").text("Release Date: " + checkIfAvailable(response.Year));
    var poster = $("<img>").attr("src", checkIfImageAvailable(response.Poster))

    //append all values to card, and card to the movieDiv
    movieCard.append(poster, title, releaseDate);
    moviesDiv.append(movieCard);

}

//check if data is available
function checkIfAvailable(data) {
    if (data != "N/A") {

    } else {
        data = "watch and discover yourself!"
    }

    return data;
}
//check if image url is available, if not pass url to a movie related gif
function checkIfImageAvailable(data) {
    if (data != "N/A") {

    } else {
        data = "https://media.tenor.com/mWpYDtV1zTkAAAAM/minions-shh.gif"
    }

    return data;
}

//Button on click listener - call RenderMovie data
$("#search-btn").on("click", function (event) {
    //prevent default
    event.preventDefault();

    //empty before rendering
    moviesDiv.empty();


    //get value from input
    var search = $("#search-input").val().trim();
    
    //Update heading
    $("#movies-heading").text("Movies featuring: " + search)

    //form query url
    var queryURL = "https://www.omdbapi.com/?s=" + search + "&apikey=trilogy";
    
    //get data from query
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // If movie was found
            if (response.Response == "True") {
                for (i = 0; i < response.Search.length; i++) {
                    //Render each movie
                    renderMovie(response.Search[i]);
                }
            } 
            //If nothing was wound, display "no results" message
            else {
                $("#movies-list").text("Sorry, no results available. Please try again.")
            }

        })

});
