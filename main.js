const form = document.querySelector('#form');
const input = document.querySelector('#input');
const header = document.querySelector('#header');
// let resp;

async function addCard(resp) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5eb3167315mshff206757a62af0ap1d7849jsn39deabe18b6c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${input.value}`, options)
        .then(response => response.json())
        .then(response => {
            resp = response;
            let html = `<div class="card" id="card">
        <div class="underCard"></div>
        <h2 class="card-city">${response.location.name}, ${response.location.country}</h2>

        <div class="card-weather">
            <div class="card-temperature">${response.current.temp_c}℃, Feels like ${response.current.feelslike_c}℃</div>

            <img class="img" src="./img/Sunny.png" alt="weather-img">
        </div>

        <div class="card-windSpeed">${response.current.wind_dir}, ${response.current.wind_kph}kph</div>
        
        <div class="card-description">${response.current.condition.text}</div>
        </div>`

            let card = document.querySelector('#card')
            if (card) {
                card.remove();
            }
            

            header.insertAdjacentHTML('afterend', html);
            input.value = "";
        })
        .catch(err => {
            alert(`${resp.error.message}`);
            console.error(err)});
}

form.onsubmit = async (e) => {
    e.preventDefault();

    addCard();

}

