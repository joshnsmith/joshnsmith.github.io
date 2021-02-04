const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject);  // temporary checking for valid response and data parsing
        const prophets = jsonObject['prophets'];

        for (let i = 0; i < prophets.length; i++ ) {
            let card = document.createElement('section');
            card.classList.add('card');
            let h2 = document.createElement('h2');
            h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
            let p1 = document.createElement('p');
            p1.textContent = 'Birthday: ' + prophets[i].birthdate
            let p2 = document.createElement('p');
            p2.textContent = 'Birth Place: ' + prophets[i].birthplace
            let img = document.createElement('img');
            img.setAttribute('src', prophets[i].imageurl);
            card.appendChild(h2);
            card.appendChild(p1);
            card.appendChild(p2);
            card.appendChild(img);
            document.querySelector('div.cards').appendChild(card);
        }
    })
    .catch(er => {
        console.log(er);
    })