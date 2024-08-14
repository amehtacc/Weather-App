const apiKey = '' // paste api key here

const searchBtn = document.querySelector('#search-button')
const weatherInfo = document.querySelector('#weather-info')
const input = document.querySelector('#search-location')
const message = document.querySelector('#message')

/* here I use the event listner on search button and async function to fetch weather API */
searchBtn.addEventListener('click', () => {
    if(input.value.trim() === ""){
        message.innerText = 'Please enter a location'
        return
    }
    if((weatherInfo.style.display === "none" || weatherInfo.style.display === "none") && input.value) {
        message.innerText = null;
        weatherInfo.style.display = "flex"
    }
    else {
        weatherInfo.style.display = "none"
    }
    //async function
    async function getData(apiKey, input) {
        try {
            const location = input.value
            const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
            const result = await promise.json()
            return accessData(result)
        }
        catch(error) {
            console.log(error);
        }            
    }
    getData(apiKey, input)
})



/* here I manipulate the HTML document using DOM */
const today = document.querySelector('.today')
const currentDate = document.querySelector('.curr-date')
const currentLocation = document.querySelector('#location-text')
const currTemp = document.querySelector('.curr-temp')
const windSpeed = document.querySelector('.wind-speed')
const humidity = document.querySelector('.humidity')

function accessData(data) {
    const day = getDay(data.location.localtime)
    today.innerText = day
    const date = convertDate(data.location.localtime)
    currentDate.innerText = date
    currentLocation.innerText = `${data.location.name}, ${data.location.region}, ${data.location.country} `
    currTemp.innerText = Math.round(data.current.temp_c)
    windSpeed.innerText = `${data.current.wind_kph} km/h`
    humidity.innerText = `${data.current.humidity}%`
}



/* here I will convert Date formate */
function convertDate(currentDate){
    const currDate = currentDate

    const newDate = new Date(currDate)

    const date = newDate.getDate()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[newDate.getMonth()]

    const year = newDate.getFullYear()

    const newFormatedDate = `${date} ${month}, ${year}`
    return newFormatedDate
}

/* here I will get Day from current date */
function getDay(currentDate) {
    const currDate = currentDate

    const newDate = new Date(currDate)

    const day = newDate.getDay()

    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const currDay = weekDays[day]

    return currDay
}