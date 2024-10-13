fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then((response) => response.json()).then(page)
let c = 20;  // initial value
const tbody = document.querySelector('tbody'); // Get the first tbody
const select = document.querySelector('select');

function page(data) {
    console.log(c);
    console.log(data);
    
    displayItems(data, c);

    select.addEventListener('input', (e) => {
        console.log(select.value);
        c = Number(select.value);
        displayItems(data, c); 
    });
}

function displayItems(data, count) {
    console.log(count)
    tbody.innerHTML = '';
    if (typeof data === "undefined") {
        return
    }
    if (count === "all"){
        console.log("fouuuuuuuuuuuuuuuuuuuud")
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            addElement(item);
        }
    }else{
        for (let i = 0; i < count && i < data.length; i++) {
            console.log(i)
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
