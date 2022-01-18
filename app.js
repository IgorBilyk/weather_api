window.addEventListener("load", () => {
  //All variables
  let form = document.querySelector("#weatherForm");
  let temp = document.querySelector("#temp");
  let hum = document.querySelector("#humidity");
  let desc = document.querySelector("#description");
  let time = document.querySelector("#time");
  let city = document.querySelector("#city");
  let country = document.querySelector("#country");
  let warningMessage = document.querySelector(".warning-message");
  let loadingSpinner = document.querySelector("#loading-spinner");
  let searchIcon = document.querySelector("#search-icon");
  let url = "http://openweathermap.org/img/wn/";
  let btnGetWeather = document.querySelector("#btnGetWeather");
  let apiKey = "1192ae3d1ebdb8edcae3bdfb00ac72b6";

  let d = new Date();
  let loading = true;
  //Api call to openWeatherApi
  btnGetWeather.addEventListener("click", fetchData);

  //Functions
  //Fetching data from API and displaying it
  function fetchData(e) {
    //Prevent submitting the form
    e.preventDefault();
    //Input value
    const inputValue = document.querySelector("#input").value;
    if (!inputValue) {
      warningMessage.style.display = "block";
      return false;
    } else {
      try {
        loading = true;

        warningMessage.style.display = "none";
        loadingSpinnerFunc(loading);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            form.reset();
            loading = false;
            loadingSpinnerFunc(loading);
            inputData(data);
          });
      } catch {
        console.log("Something went wrong!!!");
      }
    }
  }
  //Inserting data from API to page
  function inputData(data) {
    const { name, main, humidity, weather, sys } = data;
    let iconCode = weather[0].icon.replace("n", "d");
    //console.log(iconCode)
    temp.innerHTML = `
        Min: ${main.temp_min} &#8451; </br>
        Temperature ${main.temp} &#8451; </br>
        Max: ${main.temp_max} &#8451;`;
    hum.innerHTML = `
        Humidity: ${main.humidity} %
        `;
    desc.innerHTML = `
        Condition: ${weather[0].description}

    `;
    time.innerHTML = `
        Date: ${d.toJSON().substring(0, 10)}`;
    city.innerHTML = `
        ${name}
    `;
    country.innerHTML = `
        ${sys.country}
    `;
    console.log(url, "png");
    searchIcon.setAttribute("src", `${url}${iconCode}.png`);
  }

  function loadingSpinnerFunc(data) {
    data
      ? (loadingSpinner.innerHTML = "Loading...")
      : (loadingSpinner.innerHTML = "");
  }
});
