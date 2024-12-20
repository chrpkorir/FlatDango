
async function fetchMovie() {
    try {
        // Replace with your actual API endpoint (e.g., a local mock server like json-server)
        const response = await fetch("http://localhost:3000/films");  // Fetch the movie with id "1"
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        filmdetails(data)

          // Automatically display the movie at index 1 in the main content (if exists)
        const fistmovie = data.find(film => film.id === '1');
          if (fistmovie) {
            showmovie(fistmovie)
    }
}
    catch (error) {
        console.error('Error fetching movie data:', error);
        } 


    function filmdetails(data){
        // Parse the response in a json format instead of harcording it
        const filmlist = document.getElementById('films');
        filmlist.innerHTML = ''
        // Populate the films list
        data.forEach(elem => {
            const item = document.createElement('li');
            item.classList.add('film', 'filmitem');
            item.textContent = elem.title;

            item.addEventListener('click', () =>{
                showmovie(elem)
            })
            filmlist.appendChild(item)
        })
    }
}
            

function showmovie(elem){
    // Calculate the available tickets if any
    const tickets = elem.capacity - elem.tickets_sold;
    console.log('Selected movie details:', elem);
    moviedetails.innerHTML = `
    <h1>${elem.title}</h1>
            <img src="${elem.poster}" alt="${elem.title}" style="max-width: 200px;">
            <p><strong>Runtime:</strong> ${elem.runtime} minutes</p>
            <p><strong>Showtime:</strong> ${elem.showtime}</p>
            <p><strong>Capacity:</strong> ${elem.capacity}</p>
            <p><strong>Tickets Sold:</strong> ${elem.tickets_sold}</p>
            <p><strong>Description:</strong> ${elem.description}</p>`

    if (tickets > 0) {
        moviedetails.innerHTML += `
            <button id="buy-ticket">Buy Ticket</button> `
        const buyTicketBtn = document.getElementById('buy-ticket');
        buyTicketBtn.addEventListener('click', () => buyticket(elem, tickets));
    } 
    else {
        // Disable the button if sold out
        moviedetails.innerHTML += `<p>Sorry, this movie is sold out.</p>`;
    }
    }

function buyticket(elem, tickets){
    if (tickets <= 0){
        alert('No more tickets')
        return
    }

    elem.tickets_sold += 1;
    showmovie(elem)
    alert(`Ticket purchased for "${elem.title}"!`);
}

window.onload = fetchMovie;


