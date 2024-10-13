fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json').then((response) => response.json()).then(page)

let c = 20 ;  // initial value
const tbody = document.querySelector('tbody') // Get the first tbody
const select= document.querySelector('select')

function page(data) {

    console.log(c)
    console.log(data)

    select.addEventListener('input', (e)=>{

        console.log(select.value)
        c = Number(select.value)

        if (typeof data !== "undefined") {

            for (let i = 0 ; i < c ; i ++){

                let item = data[i]
                addElement(item)

            };

        }
    })

}

page()

function addElement(item){
    //data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><img src="${item.images.xs}"></td>
    <td>${item.name}</td> 
    <td>${item.biography.fullName == "" ? 'N/A' :item.biography.fullName}</td>
    <td> <ul> <li> Combat :${item.powerstats.combat} </li>
    <li> durability${item.powerstats.durability} </li>
    <li> durability ${item.powerstats.intelligence} </li>
    <li> durability${item.powerstats.power} </li>
    <li> durability${item.powerstats.speed} </li>
    <li> durability ${item.powerstats.strength} </li> </ul> </td>
    <td>${item.appearance.race}</td>
    <td>${item.appearance.gender}</td>
    <td>${item.appearance.height}</td>
    <td>${item.appearance.weight}</td>
    <td>${item.biography.placeOfBirth}</td>
    <td>${item.biography.alignment}</td>
    `; // Adjusted to match typical API structure
    tbody.appendChild(row);
}