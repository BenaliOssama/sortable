let heroes = [];
let filteredHeroes = [];
let sortOrder = 'asc';
let currentPage = 1;
let pageSize = 20;

// Fetch superhero data
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(data => {
        heroes = data;
        filteredHeroes = heroes;
        renderTable();
    });

// Event listeners for search and page size
//document.getElementById('search').addEventListener('input', filterHeroes);
//document.getElementById('pageSize').addEventListener('change', changePageSize);

function renderTable() {

    const tbody = document.querySelector('#heroTable tbody');

    pageData.forEach(hero => {
        const row = `
            <tr>
                <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
                <td>${hero.name}</td>
                <td>${hero.biography.fullName || 'N/A'}</td>
                <td>${hero.appearance.race || 'N/A'}</td>
                <td>${hero.appearance.gender || 'N/A'}</td>
                <td>${hero.appearance.height[1] || 'N/A'}</td>
                <td>${hero.appearance.weight[1] || 'N/A'}</td>
                <td>${hero.biography.placeOfBirth || 'N/A'}</td>
                <td>${hero.biography.alignment || 'N/A'}</td>
                <td>${formatPowerstats(hero.powerstats)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


