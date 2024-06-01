const urlFictional = 'https://potterapi-fedeperin.vercel.app/en/books';
const options = {
    method: 'GET'
};

document.addEventListener('DOMContentLoaded', () => {
    fetchFictionalData();
});

async function fetchFictionalData() {
    try {
        const response = await fetch(urlFictional, options);
        const result = await response.json(); // Parse JSON data
        console.log('Fictional Books:', result); // Debugging: Log the response data
        displayFictionalData(result);
    } catch (error) {
        console.error('Error fetching fictional data:', error);
        document.getElementById('fictional-content').innerText = 'Error loading fictional books.';
    }
}

function displayFictionalData(data) {
    const container = document.getElementById('fiction');
    container.innerHTML = '';
    data.forEach(book => {
        let price;
        if(book.pages <= 300) {
            price = 450
        } else if(book.pages > 300 && book.pages <= 500) {
            price = 600
        } else {
            price = 700
        }
        const bookElement = document.createElement('div');
        bookElement.classList.add('card', 'mb-3');
        bookElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${book.cover}" class="img-fluid rounded-start" alt="${book.title} cover">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.description}</p>
                        <p class="card-text"><small class="text-muted">Release Date: ${book.releaseDate}</small></p>
                        <p class="card-text"> Price: <b> ₹${price} </b> </p>
                        <button class="btn btn-primary" onClick="addToCart(${book.title, price})"> Add to cart </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bookElement);
    });
}