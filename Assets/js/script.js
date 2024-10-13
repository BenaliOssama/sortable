fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then((response) => response.json()).then(page)
let c = 20;  // initial value
const tbody = document.querySelector('tbody'); // Get the first tbody
const select = document.querySelector('select');
let ascending = true; // To keep track of sorting order

function page(data) {
    console.log(data)
    let currentPage = 1; // Initialize current page
    //let c = 20; // Default items per page (can be changed via select input)
    const totalPages = () => Math.ceil(data.length / c); // Calculate total pages

    // Function to display items for the current page
    function displayCurrentPage(data) {
        let startIndex = (currentPage - 1) * c;
        let endIndex = startIndex + parseInt(c);

        const currentData = data.slice(startIndex, endIndex);
        displayItems(currentData, c); // Update display with current data
        document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages()}`;
        updatePaginationButtons();
    }

    // Update pagination buttons
    function updatePaginationButtons() {
        document.getElementById('prev-btn').disabled = currentPage === 1;
        document.getElementById('next-btn').disabled = currentPage === totalPages();
    }

    // Pagination button listeners
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage(data);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages()) {
            currentPage++;
            displayCurrentPage(data);
        }
    });

    // Handle change in number of rows (items per page)
    select.addEventListener('input', (e) => {
        c = e.target.value === 'all' ? data.length : parseInt(e.target.value);
        currentPage = 1; // Reset to first page when page size changes
        displayCurrentPage(data);
    });

    // Sort elements
    const headers = document.querySelectorAll('th[id]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const columnId = header.id;
            data = sortTableBy(columnId, data);
            currentPage = 1; // Reset to first page after sorting
            displayCurrentPage(data);
        });
    });

    // Search for element
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase(); // Get search query
        let filteredData = findHeroesByName(query, data); // Filter data
        currentPage = 1; // Reset to first page after filtering
        displayCurrentPage(filteredData); // Display filtered results
    });

    // Initial display of items
    displayCurrentPage(data);
}

function findHeroesByName(name, heroesArray) {
    // Convert the input name to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();
    
    // Filter the heroes array and return all matching objects
    return heroesArray.filter(hero => 
        hero.name.toLowerCase().includes(lowerCaseName)
    );
}

function filterHeroes(query) {
    const filtered = data.filter(hero => 
        hero.name.toLowerCase().includes(query) // Check if name includes the search query
    );

    renderTable(filtered); // Pass the filtered heroes to render the table
}

function displayItems(data, count) {
    tbody.innerHTML = '';
    if (typeof data === "undefined") {
        return
    }
    if (count === "all"){
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            addElement(item);
        }
    }else{
        count = Number(count);
        for (let i = 0; i < count && i < data.length; i++) {
            let item = data[i];
            addElement(item);
        }
    }
}

function addElement(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${item.images.xs}"></td>
        <td>${item.name}</td>
        <td>${item.biography.fullName === "" ? 'N/A' : item.biography.fullName}</td>
        <td>${item.powerstats.combat}</td>
        <td>${item.powerstats.durability}</td>
        <td>${item.powerstats.intelligence}</td>
        <td>${item.powerstats.power}</td>
        <td>${item.powerstats.speed}</td>
        <td>${item.powerstats.strength}</td>
        <td>${item.appearance.race}</td>
        <td>${item.appearance.gender}</td>
        <td>${item.appearance.height}</td>
        <td>${item.appearance.weight}</td>
        <td>${item.biography.placeOfBirth}</td>
        <td>${item.biography.alignment}</td>
        `;
    
    tbody.appendChild(row);
}

function sortTableBy(columnId, data) {


    // Toggle the sort order
    ascending = !ascending;
    
    // Sort the data based on `columnId`
    data.sort((a, b) => {
        let valA = getColumnValue(a, columnId);
        let valB = getColumnValue(b, columnId);

        
        // Handle missing values (null, undefined, or "N/A")
        if (valA == null || valA === "N/A" || valA === '-' ) return 1;
        if (valB == null || valB === "N/A" || valB === '-'   ) return -1;
        

        if (columnId === "weight" || columnId === "height") {
            if (valA == 0){return 1};
            if (valB == 0){return -1};
        }


        // For numeric values
        if (!isNaN(valA) && !isNaN(valB)) {
            return ascending ? valA - valB : valB - valA;
        }
        
        // For strings (case insensitive)
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
        
        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
    });

    return data;
}



function getColumnValue(item, columnId) {
    switch (columnId) {
        case 'name':
            return item.name;
        case 'fullname':
            return item.biography.fullName || 'N/A';
        case 'combat':
            return item.powerstats.combat || 0; // Default to 0 if not available
        case 'durability':
            return item.powerstats.durability || 0; // Default to 0 if not available
        case 'intelligence':
            return item.powerstats.intelligence || 0; // Default to 0 if not available
        case 'power':
            return item.powerstats.power || 0; // Default to 0 if not available
        case 'speed':
            return item.powerstats.speed || 0; // Default to 0 if not available
        case 'strength':
            return item.powerstats.strength || 0; // Default to 0 if not available
        case 'race':
            return item.appearance.race || 'N/A';
        case 'gender':
            return item.appearance.gender || 'N/A';
        case 'height':
            return parseInt(item.appearance.height[0]) || 0; // Convert height to integer for sorting
        case 'weight':
            return parseInt(item.appearance.weight[0]) || 0; // Convert weight to integer for sorting
        case 'placeOfBirth':
            return item.biography.placeOfBirth || 'N/A';
        case 'alignment':
            return item.biography.alignment || 'N/A';
        default:
            return null;
    }
}


// Helper function to convert values to centimeters
function convertToCm(value) {
    console.log(value)
    if (typeof value === 'string') {
        // Handle meters
        if (value.includes('meters')) {
            let [imperial, metric] = value.split(',');
            let meters = parseFloat(metric.replace(' meters', ''));
            return meters * 100; // Convert meters to cm
        }

        // Handle feet and inches
        if (value.includes("'")) {
            let [feet, inchesAndCm] = value.split(',');
            let [inchesPart, cmPart] = inchesAndCm.split(' ');
            let feetVal = parseInt(feet.replace("'", '')) * 30.48; // Convert feet to cm
            let cmVal = parseFloat(cmPart.replace(' cm', '')); // Get cm
            return feetVal + cmVal; // Total in cm
        }

        // Handle direct cm value
        if (value.includes('cm')) {
            return parseFloat(value.replace(' cm', ''));
        }
    }
    return 0; // Default value if unrecognized format
}