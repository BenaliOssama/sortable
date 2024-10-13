// async function loadHeroes() {
//     const response = await fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
//     const response_1 = await response.json()
//     return response_1
// }
// const loadData = heroes => {
//     return heroes
// }


fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
.then((response) => response.json())
.then(page)

let c = 20 ; 
function page(data) {
    console.log(c)
    console.log(data)
    const select= document.querySelector('select')
select.addEventListener('input', (e)=>{
    console.log(select.value)
    c = Number(select.value)
    const tbody = document.querySelector('tbody') // Get the first tbody
    if (typeof data !== "undefined") {
        for (let i = 0 ; i < c ; i ++){
        let item = data[i]
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
        };
    }
})

}

page()
// Icon (.images.xs, should be displayed as images and not as a string)
// Name (.name)
// Full Name (.biography.fullName)
// Powerstats (each entry of .powerstats)
// Race (.appearance.race)
// Gender (.appearance.gender)
// Height (.appearance.height)
// Weight (.appearance.weight)
// Place Of Birth (.biography.placeOfBirth)
// Alignment (.biography.alignment)
// The information must be displayed in multiple pages. Use a <select> input to chose the page size from 10, 20,50, 100 or all results
// The default page size selected option must be 20
// searching "man" should find all superheros with "man" in their name.


// Sort
// It will be valuable to sort the information in the table by any of its columns. Results should be sortable alphabetically or numerically.

// Initially all rows should be sorted by the column name by ascending order.
// The first click on a column heading will sort the table by the data in that column in ascending order.
// Consecutive clicks on a column heading will toggle between ascending and descending.
// Some of the columns are composed of strings, but represent numerical values. For example, when the weight column is sorted in ascending order, then "78 kg" must be displayed before "100 kg".
// Missing values should always be sorted last, irrespective of ascending or descending.