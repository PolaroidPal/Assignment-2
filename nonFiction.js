const urlNonFictional = "https://openlibrary.org/people/mekBot/books/want-to-read.json";
const options = {
    method: 'GET'
};

document.addEventListener('DOMContentLoaded', () => {
    fetchNonFictionalData()
});

async function fetchNonFictionalData() {
    try {
        const response = await fetch(urlNonFictional, options);
        const result = await response.json(); // Parse JSON data
        console.log('Non-Fictional Books:', result); // Debugging: Log the response data
        displayNonFictionalData(result.reading_log_entries);
    } catch (error) {
        console.error('Error fetching non-fictional data:', error);
        document.getElementById('non-fictional-content').innerText = 'Error loading non-fictional books.';
    }
}

function displayNonFictionalData(data) {
    const container = document.getElementById('non-fictional-content');
    container.innerHTML = '';
    data.forEach(entry => {
        const book = entry.work;
        let price = 0;
        if(book.first_publish_year < 2000) {
            price = 400
        } else if(book.first_publish_year >= 2000 && book.first_publish_year <= 2010) {
            price = 590
        } else if(book.first_publish_year > 2010 && book.first_publish_year <= 2015) {
            price = 700
        } else {
            price = 900
        }
        const bookElement = document.createElement('div');
        bookElement.classList.add('card', 'mb-3');
        bookElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" class="img-fluid rounded-start" alt="${book.title} cover">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.author_names ? book.author_names.join(', ') : 'Unknown Author'}</p>
                        <p class="card-text">First Published: ${book.first_publish_year}</p>
                        <p class="card-text"> Price: <b> ₹${price} </b> </p>
                        <button class="btn btn-primary"> Add to cart </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bookElement);
    });
}