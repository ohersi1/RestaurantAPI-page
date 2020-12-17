const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const mainContent = document.querySelector('.main-content');
const italianDiv = document.querySelector('.Italian')
const chineseDiv = document.querySelector('.Chinese')
const indianDiv = document.querySelector('.Indian')
const arabianDiv = document.querySelector('.Arabian')
const africanDiv = document.querySelector('.African')
const europeanDiv = document.querySelector('.European')
const americanDiv = document.querySelector('.American')

let cuisinesArray = [italianDiv, chineseDiv, indianDiv, arabianDiv, africanDiv, europeanDiv, americanDiv];


function getLocation(name) {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude; 
            console.log(position)

            getData(lat, lon, name)
        });
    }
    
}

async function getData(lat, lon, name) {
    //searchBox.innerHTML = "";
   
    
    
    await fetch(`https://developers.zomato.com/api/v2.1/search?q=${name}&count=20&lat=${lat}&lon=${lon}&radius=3000&sort=real_distance&order=asc`, { headers: { "user-key": "cec772b3e1dadbda85a7708bc383a235"} })
  .then(response =>  response.json())
  .then(data => {
    console.log(data)
    
    let output = data.restaurants.map((i) => {
    return `<ul class="bullet-points">
              <li>Restaurant: ${i.restaurant.name} </li>
              <li>Rating: ${i.restaurant.user_rating.aggregate_rating}/10</li>
              <li>Address: ${i.restaurant.location.address}</li>
            </ul>`;
 }).join("");

 mainContent.innerHTML = "";
 mainContent.insertAdjacentHTML('afterbegin', output);
    
    })
  .catch(error => console.log(error))

}

// searchBox.addEventListener('keypress', function(event){
//         if (event.key == 'Enter'){
//             alert(searchBox.value)
//         }
//   })
searchButton.addEventListener('click',() => getLocation(searchBox.value));
cuisinesArray.forEach(cuisine => {
  cuisine.addEventListener('click', function() { 
    getLocation(cuisine.className)
  })
})


// const apiCall = fetch('https://developers.zomato.com/api/v2.1/search?count=20&sort=rating')
// const apiResponse = apiCall.then(response => response.json)
// const Data = apiCall.then(data => console.log(data))

// fetch({
//     method: 'GET',
//     url: 'https://developers.zomato.com/api/v2.1/search?entity_type=city&count=20&category=italian',
//     headers: {
//         "user-key": "cec772b3e1dadbda85a7708bc383a235",
//         "content-type": "application/JSON"
//     }
// })
// .then(response => {
//     console.log(response);
// }).catch(error => {
//     console.log(error);
// })

// const apiKey = "cec772b3e1dadbda85a7708bc383a235";
// let restaurantName = data.restaurants[0].restaurant.name;
//     let Rating = data.restaurants[0].restaurant.user_rating.aggregate_rating
//     let Location = data.restaurants[0].restaurant.location.address
//     const note = `<div class="restaurant-card"><h3>${restaurantName}</h3><h3>Rating:${Rating}/10</h3><h3>${Location}</h3></div>`
//     mainContent.insertAdjacentHTML('beforeend', note);