let modal = document.getElementById('modal');
let add = document.getElementById('add');
let add_btn = document.querySelector('.add-btn');
let submit = document.getElementById('submit');

add_btn.onclick = function() {
    modal.style.display = 'flex';
}

add.onclick = function() {
    modal.style.display = 'none';
}

submit.onclick = function() {
    let farm = document.getElementById('farm').value;
    let plant = document.getElementById('plant').value;
    let activity = document.getElementById('activity').value;
    let date = document.getElementById('date').value;

    let body = {
        farm: farm,
        plant: plant,
        activity: activity,
        date: date
    }

    console.log(body);
    fetch('http://localhost:3000/api/v1/activities', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        modal.style.display = 'none';
        console.log(JSON.stringify(data));
        location.reload();
    })
    .catch(err => console.log(err));
}

function createCard(plant, activity, date) {
    let records = document.querySelector('.records');

let card = document.createElement('div');
let img = document.createElement('div');
let details = document.createElement('div')
let items = document.createElement('div');
let plants = document.createElement('span');
let activitys = document.createElement('span');
let dates = document.createElement('div');

card.className = "card";
img.className = "img";
details.className = "details";
items.className = "items";
plants.className = "plant";
activitys.className = "activity";
dates.className = "date";

plants.innerHTML = plant
activitys.innerHTML = activity
dates.innerHTML = date

records.appendChild(card);
card.appendChild(img);
card.appendChild(details);
details.append(items, dates);
items.appendChild(plants);
items.appendChild(activitys);
}

fetch('http://localhost:3000/api/v1/activities', {
        method: 'GET',
        mode: 'cors',
        
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json'
            },
            
    })
    .then(res => res.json())
    .then(data => {
        console.log(JSON.stringify(data));
        data.map((data)=>{
            return createCard(data.plant, data.activity, data.date);
        })
    })
    .catch(err => console.log(err));
