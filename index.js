let search = document.getElementById("temp");
let api;
api = `https://restcountries.eu/rest/v2/`;
generate();
search.addEventListener('input', () => {

    if (search.value == "") {
        api = `https://restcountries.eu/rest/v2/`;
    } else {

        api = `https://restcountries.eu/rest/v2/name/${search.value}`;
    }

    document.getElementsByClassName('main')[0].innerHTML = '';
    generate();
})

function generate() {

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let lang = [] // to store multiple languages
                for (let j = 0; j < data[i].languages.length; j++) {
                    lang.push(data[i].languages[j].name);
                }

                let x = document.createElement("div")
                x.setAttribute("class", "col-3 col-md-4 col-sm-6 p-4");
                x.innerHTML = "<div class=\"card cardStyle mx-auto \" style=\"width: 16rem;\">" +
                    "<img class=\"card-img-top cardImage\" src=" + data[i].flag + " alt=\"Card image cap\">" +
                    "<div class=\"card-body\">" +
                    "<h5 class=\"card-title\">" + data[i].name + "</h5>" +
                    "<p class=\"card-text\">Languages: " + lang + "</p>" +
                    "<p class=\"card-text\">Population: " + data[i].population + "</p>" +
                    "<p class=\"card-text\">Currency: " + data[i].currencies[0].name + "</p>" +
                    `<button id="` + data[i].name + `" data-name="` + data[i].name + `" class="btn btn-primary">Click here for Weather</button>` +
                    "</div></div></div>";


                document.querySelector(".main").appendChild(x);

                const APIkey = `3e9e4f1483579534a52a17f0daf3daaa`
                let button = document.getElementById(data[i].name);

                button.addEventListener('click', (event) => {

                    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + event.target.dataset.name + '&appid=' + APIkey)
                        .then((response) => {
                            return response.json();
                        })
                        .then((result) => {
                            console.log(result);

                            alert('Weather for: ' + data[i].name + '\n' + 'Weather: ' + result.weather[0].main + '\n' + 'Description: ' + result.weather[0].description)

                        })
                        .catch((err) => {
                            alert("check error exist!")
                        })

                })

            }
        }).catch((err) => {
            console.log(err);
        })
}