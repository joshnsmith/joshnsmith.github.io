const url = 'https://byui-cit230.github.io/weather/data/towndata.json'
const targetLoadArea = document.getElementById('towns');
const selectedTowns = ['Preston', 'Soda Springs', 'Fish Haven']
const townList = []

fetch(url)
    .then(res => res.json())
    .then(json => {
        
        json.towns.forEach(town => {
            if (selectedTowns.includes(town.name))
                townList.push(town);
        });

        console.log(townList)

        selectedTowns.forEach(name => {
            targetLoadArea.appendChild(newTownSection(townList.find(town => town.name === name)));
        });

    })

function newTownSection(town) {
    let container = document.createElement('div')
    container.classList.add('town-container')

    let description = document.createElement('div');
    description.classList.add('town-description');

    let h2 = document.createElement('h2')
    h2.textContent = town.name;

    let p = document.createElement('p');
    p.textContent = town.motto

    let pEnhanced1 = document.createElement('p');
    pEnhanced1.textContent = 'Town founded in: ' + town.yearFounded;
    pEnhanced1.classList.add('enhanced')
    let pEnhanced2 = document.createElement('p');
    pEnhanced2.textContent = 'Town\'s Population: ' + town.currentPopulation;
    pEnhanced2.classList.add('enhanced')
    let pEnhanced3 = document.createElement('p');
    pEnhanced3.textContent = 'Town\'s Average Rainfall: ' + town.averageRainfall;
    pEnhanced3.classList.add('enhanced')

    description.appendChild(h2);
    description.appendChild(p);
    description.appendChild(pEnhanced1);
    description.appendChild(pEnhanced2);
    description.appendChild(pEnhanced3);

    let img = document.createElement('img');
    img.setAttribute('src', './assets/img/' + town.photo);
    let imgHolder = document.createElement('div');
    imgHolder.appendChild(img);

    container.appendChild(description);
    container.appendChild(imgHolder);

    return container
}