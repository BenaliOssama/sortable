fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then((response) => response.json()).then(page)
let c = 20;  // initial value
const tbody = document.querySelector('tbody'); // Get the first tbody
const select = document.querySelector('select');
let ascending = true; // To keep track of sorting order


function page(data) {
    
    displayItems(data, c);

    select.addEventListener('input', (e) => {
        c = select.value
        displayItems(data, c); 
    });

    const headers = document.querySelectorAll('th[id]');
        
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const columnId = header.id;
            console.log(data)
            data = sortTableBy(columnId, data);
            console.log(data)
            displayItems(data, c); 
        });
    });
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
        <td>
            <ul>
                <li>Combat: ${item.powerstats.combat}</li>
                <li>Durability: ${item.powerstats.durability}</li>
                <li>Intelligence: ${item.powerstats.intelligence}</li>
                <li>Power: ${item.powerstats.power}</li>
                <li>Speed: ${item.powerstats.speed}</li>
                <li>Strength: ${item.powerstats.strength}</li>
            </ul>
        </td>
        <td>${item.appearance.race}</td>
        <td>${item.appearance.gender}</td>
        <td>${item.appearance.height}</td>
        <td>${item.appearance.weight}</td>
        <td>${item.biography.placeOfBirth}</td>
        <td>${item.biography.alignment}</td>
    `;
    
    tbody.appendChild(row);
}


/*function sortTableBy(columnId, data) {
    console.log(columnId)
    // Toggle the sort order
    ascending = !ascending;
    console.log(ascending)
    data.sort((a, b) => {
        console.log("test")
    });
    
}*/
function sortTableBy(columnId, data) {
    // Toggle the sort order
    ascending = !ascending;
    
    // Sort `filteredHeroes` (or your current dataset) based on `columnId`
    data.sort((a, b) => {
        let valA = getColumnValue(a, columnId);
        let valB = getColumnValue(b, columnId);
        
        if (valA == null) return 1; // Null values should go last
        if (valB == null) return -1;
        
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
    //return []
    return data
    //renderTable(); // Re-render table after sorting
}
function getColumnValue(item, columnId) {
    switch (columnId) {
        case 'name':
            return item.name;
        case 'fullName':
            return item.biography.fullName || 'N/A';
        case 'powerstats':
            return item.powerstats.intelligence || 0; // Choose a default stat to sort by
        case 'race':
            return item.appearance.race || 'N/A';
        case 'gender':
            return item.appearance.gender || 'N/A';
        case 'height':
            return parseInt(item.appearance.height[1]) || 0; // Convert height to integer for sorting
        case 'weight':
            return parseInt(item.appearance.weight[1]) || 0; // Convert weight to integer for sorting
        case 'placeOfBirth':
            return item.biography.placeOfBirth || 'N/A';
        case 'alignment':
            return item.biography.alignment || 'N/A';
        default:
            return null;
    }
}

/*function sortTableBy(columnId) {
    // Toggle the sort order
    ascending = !ascending;
    
    // Sort `filteredHeroes` (or your current dataset) based on `columnId`
    filteredHeroes.sort((a, b) => {
        let valA = getColumnValue(a, columnId);
        let valB = getColumnValue(b, columnId);
        
        if (valA == null) return 1; // Null values should go last
        if (valB == null) return -1;
        
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
    
    renderTable(); // Re-render table after sorting
}

/*function getColumnValue(item, columnId) {
    switch (columnId) {
        case 'name':
            return item.name;
        case 'fullname':
            return item.biography.fullName || 'N/A';
        case 'powerstats':
            return item.powerstats.intelligence || 0; // Choose a default stat to sort by
        case 'race':
            return item.appearance.race || 'N/A';
        case 'gender':
            return item.appearance.gender || 'N/A';
        case 'height':
            return parseInt(item.appearance.height[1]) || 0; // Convert height to integer for sorting
        case 'weight':
            return parseInt(item.appearance.weight[1]) || 0; // Convert weight to integer for sorting
        case 'placeOfBirth':
            return item.biography.placeOfBirth || 'N/A';
        case 'alignment':
            return item.biography.alignment || 'N/A';
        default:
            return null;
    }
}*/