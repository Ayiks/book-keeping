let modal = document.getElementById('modal');
let add = document.getElementById('add');
let add_btn = document.querySelector('.add-btn');
let submit = document.getElementById('submit');


//to display modal
add_btn.onclick = function() {
    modal.style.display = 'flex'
}

//to close modal
add.onclick = function() {
    modal.style.display = "none"
}

//function to add new activity\
submit.onclick = function() {
    //getting values from the form fields
    let farm = document.getElementById('farm').value;
    let plant = document.getElementById('plant').value;
    let activity = document.getElementById('activity').value;
    let date = document.getElementById('date').value;

    //creating a new object to send to the server
    let body ={
        farm: farm,
        plant: plant,
        activity: activity,
        date: date
    }

    //sending the object to the server
    console.log(body);
    fetch('http://localhost:8080/farmRecords',{
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

        //close the modal after data is sent
        modal.style.display = 'none';
        alert("Record added successfully");
        location.reload();
    })
    .catch(err => {
        alert('Something went wrong' + err);
    });
}

//building card
function createCard(plants, activitys, dates) {
    let records = document.querySelector('.records');

    //creating the HTML elements
    let card = document.createElement('div')
    let img = document.createElement('div')
    let details = document.createElement('div')
    let items = document.createElement('div')
    let plant = document.createElement('span')
    let activity = document.createElement('span')
    let date = document.createElement('div')

    //adding classes to the elements
    card.className = "card";
    img.className = "img";
    details.className = "details";
    items.className = "items";
    plant.className = "plant";
    activity.className = "activity";
    date.className = "date";

    //adding the elements to the DOM
    records.appendChild(card);
    card.append(img, details);
    details.append(items, date);
    items.append(plant, activity);

    //pass data to the DOM
    plant.innerHTML = plants
    activity.innerHTML = activitys
    date.innerHTML = dates
}


//reading the objects from the db.
fetch("http://localhost:8080/farmRecords", {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Accept': '*',
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(data => {
    console.log(data);
    //loop through the objects and create a card for each object
    for(let key in data) {
        for (let i = 0; i <= data[key].length; i++) {
            createCard(data[key][i].plant, data[key][i].activity, data[key][i].date);
        }
    }

    // data.forEach(element => {
    //     createCard(element.plant, element.activity, element.date);
    // });
})
.catch(err => console.log(err));