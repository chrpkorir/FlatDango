
/*document.addEventListener("DOMContentLoaded", function() {
    const filmList = document.getElementById("films");
    const placeHolder = filmList.querySelector("li");
    if (placeHolder){
        filmList.removeChild(placeHolder)
    
    } 
})?*/

// Make request to fetch movie data
/*fetch("db.json")
.then(res => res.json)
.then( movieData =>
    movieData.movies.forEach(movie => {
        const movieItem = document.createItem("li")
        movie.classList.add("film", "item")

        movieItem.textContent = movie.title;

        // Setinner HTML of the li with movie title
        movieItem.textContent = movie.title;

        // Append li to the ul#films
        filmsList.appendChild(movieItem);
    })
)
.catch(error => {
    console.error('Error fetching movies:', error);
  });*/

  // Initialize the page with movie data
  function renderMovie() {
    // Set the movie details on the page
    document.addEventListener("DOMContentLoaded", function(){
        fetch("db.json")
        .then(res => res.json)
        .then(data => {
            const movie = data.movies[0]

            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
            document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;

            // Calculate available tickets
            const availableTickets = movie.capacity - movie.ticketsSold;
            document.getElementById('available-tickets').textContent = availableTickets;


            const buyTicketButton = document.getElementById('buy-ticket');
            // Disable the "Buy Ticket" button if no tickets vailable
            if (availableTickets <= 0) {
                buyTicketButton.disabled = true;
                buyTicketButton.textContent = "Sold Out"; // Optionally change the button text
            } 
            else {
                buyTicketButton.disabled = false;
                buyTicketButton.textContent = "Buy Ticket"; // Reset button text if there are tickets
            }


            // Handle the "Buy Ticket" button click
            document.getElementById('buy-ticket').addEventListener('click', function() {
                // Calculate available tickets
                const availableTickets = movie.capacity - movie.ticketsSold;
  
                if (availableTickets > 0) {
                    // Send request to buy a ticket
                    fetch('/buy-ticket', {
                        method : 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                         body: JSON.stringify({ movieId: movie.id })
                        })
                        .then(response => response.json())
                        .then(updatedData => {
                            // Update available tickets count on success
                            const newAvailableTickets = movie.capacity - updatedData.ticketsSold;
                            document.getElementById('available-tickets').textContent = newAvailableTickets;
                
                            // If sold out, disable the button
                            if (newAvailableTickets === 0) {
                              buyTicketButton.disabled = true;
                              buyTicketButton.textContent = "Sold Out";
                            }
                          })
                          .catch(error => {
                            alert('Error buying ticket: ' + error);
                          });
                        }
                      });
                    })
                    .catch(error => {
                      console.error('Error fetching movie data:', error);
                    });
})
  }