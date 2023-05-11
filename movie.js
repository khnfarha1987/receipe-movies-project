var moviesDiv = $("#movies-list")

//have global access to data from query
var movieData;


//Function that renders movie data

function renderMovie(response){
    console.log("rendering movie");

    var movieCard = $("<div>").attr("class","card");

    var title = $("<h2>").text(response.Title);
    var plot = $("<p>").text("Plot: "+checkIfAvailable(response.Plot));
    var releaseDate =  $("<p>").text("Release Date: "+checkIfAvailable(response.Year));
    var runTime =  $("<p>").text("Runtime: "+checkIfAvailable(response.Runtime));
     var poster =  $("<img>").attr("src",checkIfImageAvailable(response.Poster))

    movieCard.append(title, plot, releaseDate, runTime, poster);
    moviesDiv.append(movieCard);

}

//Function that generates random number for the movie id

//check if data is available
function checkIfAvailable(data){
    if(data !="N/A"){
        
    }else{
        data = "watch and discover yourself!"
    }

    return data;
}

function checkIfImageAvailable(data){
    if(data !="N/A"){
        
    }else{
        data = "https://media.tenor.com/mWpYDtV1zTkAAAAM/minions-shh.gif"
    }

    return data;
}

//Button on click listener - call RenderMovie data
$("#search-button").on("click", function (event) {
    //prevent default
    event.preventDefault();

    moviesDiv.empty();

    //get value from input
    var search = $("#search-input").val().trim();
    console.log(search);
    //form query url
    var queryURL = "https://www.omdbapi.com/?s=" + search + "&apikey=trilogy";
    //get data from query
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            for(i=0; i<response.Search.length; i++){
                console.log(response.Search[i]);
                renderMovie(response.Search[i]);
            }
        })
        
});
