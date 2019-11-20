let movies = [
    {
        "title": "IT",
        "image_url": "images/it.jpg",
        "youtube_id": "xKJmEC5ieOk"
    },

    {
        "title": "The Witch",
        "image_url": "images/witch.jpg",
        "youtube_id": "iQXmlf3Sefg   "
    },

    {
        "title": "Annabelle Creation",
        "image_url": "images/annabelle.jpg",
        "youtube_id": "KisPhy7T__Q"
    },

    {
        "title": "The Nun",
        "image_url": "images/thenun.jpg",
        "youtube_id": "pzD9zGcUNrw"
    },

    {
        "title": "Apostle",
        "image_url": "images/apostle.jpg",
        "youtube_id": "J1JdWOqc9Q8"
    },

    {
        "title": "Jigsaw",
        "image_url": "images/jigsaw.jpg",
        "youtube_id": "vPP6aIw1vgY"
    }
];




function loadCatalogue() {
    // Get the movies container
    let container = document.querySelector('.catalogue .grid-container');

    movies.forEach((movie, movieIndex) => {
        // Build the movie element
        let movieElement = document.createElement('section');
        movieElement.className = 'movie';
        movieElement.setAttribute('data-index', movieIndex);

        // Retrieve data from JSON
        let title = movie.title;
        let imageUrl = movie.image_url;

        // Add the movie's title
        let titleElement = document.createElement('h4');
        titleElement.innerHTML = title;
        movieElement.appendChild(titleElement);

        // Add the movie's image
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        movieElement.appendChild(imageElement);

        // Add the built movie element to the container
        container.appendChild(movieElement);
    });
}

function loadMovie(movieIndex) {
    let movieDetailsContainer = document.querySelector('.movie-details');

    let titleElement = movieDetailsContainer.querySelector('.title');
    let imdbRatingElement = movieDetailsContainer.querySelector('.imdb-rating');
    let ageElement = movieDetailsContainer.querySelector('.age');
    let plotElement = movieDetailsContainer.querySelector('.plot');
    let trailerElement = movieDetailsContainer.querySelector('.trailer');

    let movie = movies[movieIndex];

    fetch('http://www.omdbapi.com/?apikey=2d913d20&t=' + movie.title)
        .then(response => {
            return response.json();
        })
        .then(omdbData => {
            // Populate the movie details with data from the JSON and OMDB
            titleElement.innerHTML = movie.title;
            imdbRatingElement.innerHTML = 'Rating:  ' + omdbData.imdbRating;
            ageElement.innerHTML = 'Released:  ' + ((new Date()).getFullYear() - parseInt(omdbData.Year)) + ' years ago';
            plotElement.innerHTML = 'Plot:  ' + omdbData.Plot;
            trailerElement.innerHTML = '';

            // Build the trailer iframe
            let iframeElement = document.createElement('iframe');
            iframeElement.width = '100%';
            iframeElement.height = '515';
            iframeElement.src = 'https://www.youtube.com/embed/' + movie.youtube_id;
            trailerElement.appendChild(iframeElement);

            // Show the movie details
            showMovieDetails();
        })
        .catch(err => {
            alert('Couldn\'t connect to OMDB API :(');
        })
}

function showMovieDetails() {
    // Show the movie details
    document.querySelector('.movie-details').style.display = 'block';

    // Hide the catalogue
    document.querySelector('.catalogue').style.display = 'none';
}

function hideMovieDetails() {
    // Hide the movie details
    document.querySelector('.movie-details').style.display = 'none';

    // Show the catalogue
    document.querySelector('.catalogue').style.display = 'block';
}




// Initialize the page by first loading the catalogue
loadCatalogue();

// Load a specific movie whenever a picture/title is clicked
let movieElements = document.querySelectorAll('.catalogue .movie');
movieElements.forEach(movieElement => {
    movieElement.addEventListener('click', function (event) {
        // A movie was clicked on
        let closestMovie = event.target.closest('.movie');
        let movieIndex = closestMovie.getAttribute('data-index');
        loadMovie(movieIndex);
    }, false)
});

// Close the movie and return to the catalogue when the back button is pressed
document.querySelector('.movie-details .back').addEventListener('click', function (event) {
    hideMovieDetails();
}, false);