const locationBtn = document.querySelector("#location-btn");
const inputLocation = document.querySelector("#input-location");

const todayGif = document.querySelector("#today-gif")

const condition = document.querySelector("#condition");
const wind = document.querySelector("#wind");
const precipitation = document.querySelector("#precipitation");
const uv = document.querySelector("#uv");
const humidity = document.querySelector("#humidity");
const temp = document.querySelector("#temp");


locationBtn.addEventListener("click", handleLocation);

async function handleLocation(e) {
    if(inputLocation.value.length > 0) {
        const city = inputLocation.value;

        const cityData = await fetch(`http://api.weatherapi.com/v1/current.json?key=e1e8aabdc17944c4982113741242202&q=${city}&aqi=yes`, {mode: 'cors'})
        .then((resolve) => resolve.json())

        const gifUrl = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Hoo8gwt5n0AlXFw3L6NWEkg3GP29bpc0&s=${cityData.current.condition.text}`, {mode: 'cors'}).then((response) => response.json()).then((obj) => obj.data.images.original.url);
        
        try {
            condition.textContent = `Condition: ${cityData.current.condition.text}`;
            wind.textContent = `${cityData.current.wind_kph}`;
            precipitation.textContent = `Precipitation: ${cityData.current.precip_mm}mm`;
            uv.textContent = `UV: ${cityData.current.uv}`;
            humidity.textContent = `Humidity: ${cityData.current.humidity}`;
            temp.textContent = `Temperature: ${cityData.current.temp_c}ºC`
            inputLocation.value = "";

            todayGif.src = gifUrl;
        } catch(err){
            alert(err);
        }
    }
}
