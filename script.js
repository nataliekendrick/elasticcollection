

var Airtable = require("airtable"); 
console.log(Airtable);

var base = new Airtable({ apiKey: "keyNTXrO3UGtDrQ1y" }).base(
  "appgntgDREfEa8WBc"
);

// Get your table from the base, select ALL the records, and specify the callback functions that will receive each page of data
base("movies").select({}).eachPage(gotPageOfMovies, gotAllMovies);

// an empty array to hold our people data
const movies = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of people
function gotPageOfMovies(records, fetchNextPage) {
  console.log("gotPageOfMovies()");
  // This takes the list of records and add them to the people array
  movies.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
// You don't need to edit this function.
function gotAllMovies(err) {
  console.log("gotAllMovies()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading people");
    console.error(err);
    return;
  }

  consoleLogMovies();
  showMovies();
}

function consoleLogMovies() {
  console.log("consoleLogMovies()");
  movies.forEach((movie) => {
    console.log("Movies:", movie);
  });
}

function showMovies() {
  console.log("showMovies()");
  movies.forEach((movie)=> {

    //var movieName = document.createElement("h1");
    //movieName.innerText = movie.fields.Name;
    //document.body.append(movieName);

    var container2 = document.createElement("div");
    container2.classList.add("bigmovieContainer");


    var movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    

    var movieImage = document.createElement("img");
    movieImage.src = movie.fields.images[0].url;

    var movieName = document.createElement("h2");
    movieName.classList.add("movieName")
    movieName.innerText = movie.fields.Name;
    movieContainer.append(movieName);

    var movieYear = document.createElement("h3");
    movieYear.classList.add("movieYear")
    movieYear.innerText = movie.fields.Year;
    movieContainer.append(movieYear);
 
    var movieDirector = document.createElement("h4");
    movieDirector.classList.add("movieDirector")
    movieDirector.innerText = movie.fields.Director;
    movieContainer.append(movieDirector);

    var movieBio = document.createElement("h3");
    movieBio.classList.add("movieBio")
    movieBio.innerText = movie.fields.Bio;
    movieContainer.append(movieBio);

    // add event listener to add active class to movie container
    container2.addEventListener("click", function(){
      movieContainer.classList.toggle("active");
    });

   container2.append(movieContainer);
   container2.append(movieImage);
   document.querySelector(".coverwrap").appendChild(container2);
  });
}
