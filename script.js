document.addEventListener('DOMContentLoaded', () => {
    const apiCardsContainer = document.getElementById('api-cards');

    // Fetch data from Cat Facts API
    fetchData('https://catfact.ninja/fact')
        .then(data => createApiCard('Cat Fact', data.fact))
        .catch(error => console.error('Error fetching Cat Fact:', error));

    // Fetch data from Dog CEO API
    fetchData('https://dog.ceo/api/breeds/image/random')
        .then(data => createApiCard('Dog Image', <img src="${data.message}" alt="Dog" class="img-fluid">))
        .catch(error => console.error('Error fetching Dog Image:', error));

    // Fetch data from Random User API
    fetchData('https://randomuser.me/api/')
        .then(data => {
            const user = data.results[0];
            const userInfo = `
                <p>Name: ${user.name.first} ${user.name.last}</p>
                <p>Email: ${user.email}</p>
                <img src="${user.picture.large}" alt="User" class="img-fluid">
            `;
            createApiCard('Random User', userInfo);
        })
        .catch(error => console.error('Error fetching Random User:', error));

    // Function to fetch data
    function fetchData(url) {
        return fetch(url)
            .then(response => response.json());
    }

    // Function to create API card
    function createApiCard(title, content) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-sm-12';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.innerText = title;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.innerHTML = content;

        cardDiv.append(cardHeader, cardBody);
        colDiv.appendChild(cardDiv);
        apiCardsContainer.appendChild(colDiv);
    }