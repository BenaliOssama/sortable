fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json())
    .then(page);

let c = 20;  // initial value
const tbody = document.querySelector('tbody'); // Get the first tbody
const select = document.querySelector('select');

function page(data) {
    displayItems(data, c);

    select.addEventListener('input', (e) => {
        c = (select.value == "all") ? data.length : parseInt(select.value);
        displayItems(data, c);
    });

    const buttonIds = ['name', 'fullname', 'powerstats', 'race', 'gender', 'height', 'weight', 'placeOfBirth', 'alignment'];
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', (event) => {
                const buttonId = event.target.id;
                let sortedData = [...data]; // Create a copy to avoid mutating the original data

                switch (buttonId) {
                    case "name":
                        sortedData.sort((a, b) => a.name.localeCompare(b.name));
                        break;

                    case "fullname":
                        sortedData.sort((a, b) => {
                            const fullNameA = a.biography.fullName || "";
                            const fullNameB = b.biography.fullName || "";
                            return fullNameA.localeCompare(fullNameB);
                        });
                        break;

                    case "powerstats":
                        sortedData.sort((a, b) => b.powerstats.strength - a.powerstats.strength);
                        break;

                    case "race":
                        sortedData.sort((a, b) => a.appearance.race.localeCompare(b.appearance.race));
                        break;

                    case "gender":
                        sortedData.sort((a, b) => a.appearance.gender.localeCompare(b.appearance.gender));
                        break;

                    case "height":
                        sortedData.sort((a, b) => {
                            const heightA = parseFloat(a.appearance.height[0]) || 0; // Assuming height is an array
                            const heightB = parseFloat(b.appearance.height[0]) || 0;
                            return heightA - heightB;
                        });
                        break;

                    case "weight":
                        sortedData.sort((a, b) => {
                            const weightA = parseFloat(a.appearance.weight) || 0; // Assuming weight is a string
                            const weightB = parseFloat(b.appearance.weight) || 0;
                            return weightA - weightB;
                        });
                        break;

                    case "placeOfBirth":
                        sortedData.sort((a, b) => a.biography.placeOfBirth.localeCompare(b.biography.placeOfBirth));
                        break;

                    case "alignment":
                        sortedData.sort((a, b) => a.biography.alignment.localeCompare(b.biography.alignment));
                        break;
                }

                displayItems(sortedData, c); // Display sorted data
            });
        }
    });
}

function displayItems(data, count) {
    tbody.innerHTML = '';
    for (let i = 0; i < count && i < data.length; i++) {
        addElement(data[i]);
    }
}

function addElement(item) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${item.images.xs}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.biography.fullName || 'N/A'}</td>
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
        <td>${item.appearance.race || 'N/A'}</td>
        <td>${item.appearance.gender || 'N/A'}</td>
        <td>${item.appearance.height.join(", ") || 'N/A'}</td>
        <td>${item.appearance.weight || 'N/A'}</td>
        <td>${item.biography.placeOfBirth || 'N/A'}</td>
        <td>${item.biography.alignment || 'N/A'}</td>
    `;

    tbody.appendChild(row);
}

function pagination(data) {
    let pp = Math.round(data.length / c);
    console.log(pp);
}
