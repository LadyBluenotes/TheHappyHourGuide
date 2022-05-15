// Event Listeners

document.getElementById('searchButton').addEventListener('click', getDrinkName);
document.getElementById('randomDrink').addEventListener('click', getRandomDrink);
document.getElementById('closeButton').addEventListener('click', closeButton);
window.addEventListener('click', outsideClick);

// Get recipe for a drink from API

function getDrinkName() {

    const searchText = document.querySelector('.searchText').value;

    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.drinks);
       
            if (data.drinks == null){
                alert("No drinks found. Please try again.");
                return;
            } else {

                // Show image
                let chosenDrink = document.querySelector('#drinkThumbnail');
                chosenDrink.src = data.drinks[0].strDrinkThumb;

                // Show drink name
                let chosenDrinkName = document.querySelector('.drinkName');
                chosenDrinkName.innerHTML = data.drinks[0].strDrink;

                // Show drink instructions
                let chosenDrinkInstructions = document.querySelector('.drinkInstructions');
                chosenDrinkInstructions.innerHTML = data.drinks[0].strInstructions;

                // Show drink ingredients
                let chosenDrinkIngredients = document.querySelector('.drinkIngredients');

                for (let i = 1; i < 15; i++) {
                    if (data.drinks[0][`strIngredient${i}`] != null && data.drinks[0][`strMeasure${i}`] != null) {
                        chosenDrinkIngredients.innerHTML += `<li> ${data.drinks[0][`strMeasure${i}`]} ${data.drinks[0][`strIngredient${i}`]} </li>`;
                    }
                }
            };
        })
        .catch(error => alert(error));

        // Show window with drink info
        document.querySelector('#modalDisplay').style.display = 'block';
    }
       

// Get a random drink from API

let randomDrinkPicked = '';

function getRandomDrink() {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
        console.log(data.drinks);

        // Show image
        let randomDrink = document.querySelector('#drinkThumbnail');
        randomDrink.src = data.drinks[0].strDrinkThumb;

        // Show drink name
        let randomDrinkName = document.querySelector('.drinkName');
        randomDrinkName.innerHTML = data.drinks[0].strDrink;

        // Show drink instructions
        let randomDrinkInstructions = document.querySelector('.drinkInstructions');
        randomDrinkInstructions.innerHTML = data.drinks[0].strInstructions;

        // Show drink ingredients
        let randomDrinkIngredients = document.querySelector('.drinkIngredients');

        for (let i = 1; i < 15; i++) {
            if (data.drinks[0][`strIngredient${i}`] != null && data.drinks[0][`strMeasure${i}`] != null) {
                randomDrinkIngredients.innerHTML += `<li> ${data.drinks[0][`strMeasure${i}`]} ${data.drinks[0][`strIngredient${i}`]} </li>`;
            }
        }
    })
    
    // Show window with drink info
    document.querySelector('#modalDisplay').style.display = 'block';
}

// To close the window 

function closeButton() {
    document.querySelector('#modalDisplay').style.display = 'none';
}

function outsideClick(e) {
    if (e.target == document.querySelector('#modalDisplay')) {
        document.querySelector('#modalDisplay').style.display = 'none';
    }
}
