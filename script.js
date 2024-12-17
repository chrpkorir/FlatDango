function renderMovie() {
    // Set the movie details on the page
    document.addEventListener("DOMContentLoaded", function(){
        fetch("db.json")
        .then(res => res.json)
        .then(data => {
            const movie = data.films[0]

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
                buyTicketButton.textContent = "Sold Out"; 
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

