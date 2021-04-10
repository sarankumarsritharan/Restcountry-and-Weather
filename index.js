let search = document.getElementById("input");
let api;
api = `https://restcountries.eu/rest/v2/`;
generate();

search.onkeyup = () => {
    document.querySelector(".main").innerHTML = " ";
    if (search.value == "") {
        api = `https://restcountries.eu/rest/v2/`;
    } else {
        api = `https://restcountries.eu/rest/v2/name/${search.value}`;
    }
    generate();
}

function generate() {
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let lang = [] // to store multiple languages
                for (let j = 0; j < data[i].languages.length; j++) {
                    lang.push(data[i].languages[j].name);
                }
                let x = document.createElement("div")
                x.setAttribute("class", "col-3 col-md-4 col-sm-6 p-4");
                x.innerHTML = " ";
                x.innerHTML = "<div class=\"card cardStyle mx-auto \" style=\"width: 16rem;\">" +
                    "<img class=\"card-img-top cardImage\" src=" + data[i].flag + " alt=\"Card image cap\">" +
                    "<div class=\"card-body\">" +
                    "<h5 class=\"card-title\">" + data[i].name + "</h5>" +
                    "<p class=\"card-text\">Languages: " + lang + "</p>" +
                    "<p class=\"card-text\">Population: " + data[i].population + "</p>" +
                    "<p class=\"card-text\">Currency: " + data[i].currencies[0].name + "</p>" +
                    "<p class=\"card-text\">Capital: " + data[i].capital + "</p>" +
                    "<button id=weather class=\"btn btn-primary\">Click here for Weather" + "</button>" +
                    "</div></div></div>";

                document.querySelector(".main").appendChild(x);
            }
        });

}



const APIkey = `4dd03e8f4fc4e8c4be54dd8ce4103142`

let button = document.getElementById("weather")
button.onclick = () => {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIkey}&units=metric`
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            alert($(data[i].main.temp + " Celsius "))

        })
        .catch((err) => {
            alert("check error exist!")
        })
}
document.querySelector(".main").appendChild(button);