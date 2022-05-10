// Event Listeners

const searchText = document.querySelector('.searchText')
const submitButton = document.querySelector('.submitButton').addEventListener('click', getDrinkName);
const searchIngredients = document.querySelector('.searchIngredients')
const display = document.querySelector('.display')
const randomDrink = document.querySelector('.randomDrink').addEventListener('click', getRandomDrink);

// Get recipe for a drink from API

function getDrinkName() {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.drinks);
        })
        .then((result) => function displayDrinks(result){
            // If there are no drinks related to user input, display message
            if (result.drinks == null){
                alert("No drinks found. Please try again.");
                return;
            }
        
            // If there are drinks related to user input, display them
            result.forEach((element) => {
                let {thumbnail, glass, measurements, instructions, ingredients, alocholic, category } = showDrink();
        
                // Thumbnail from API
                let drinkThumbnail = document.querySelector('img');
                drinkThumbnail.src = element.strDrinkThumbnail;
        
                // Drink name from API
                let drinkName = document.querySelector('h2');
                drinkName.innerHTML = element.strDrink;
        
                // Instructions from API into a paragraph
                let drinkInstructions = document.querySelector('p');
                drinkInstructions.innerHTML = element.strInstructions;
            });
        
            function showDrink() {
                let thumbnail = document.querySelector('.drinkThumbnail');
                let glass = document.querySelector('.glass');
                let measurements = document.querySelector('.measurements');
                let instructions = document.querySelector('.instructions');
                let ingredients = document.querySelector('.ingredients');
                let alocholic = document.querySelector('.alocholic');
                let category = document.querySelector('.category');
        
                return { thumbnail, glass, measurements, instructions, ingredients, alocholic, category };
            };
        })
        .catch(error => alert(error));
}

// Get a random drink from API

function getRandomDrink() {
    fetch (`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
        console.log(data.drinks);
    })
    .then((result) => function returnRandom(result){
    
        result.forEach((element) => {
            let {thumbnail, glass, measurements, instructions, ingredients, alocholic, category } = showDrink();
    
            // Thumbnail from API
            let drinkThumbnail = document.querySelector('img');
            drinkThumbnail.src = element.strDrinkThumbnail;
    
            // Drink name from API
            let drinkName = document.querySelector('h2');
            drinkName.innerHTML = element.strDrink;
    
            // Instructions from API into a paragraph
            let drinkInstructions = document.querySelector('p');
            drinkInstructions.innerHTML = element.strInstructions;
        });
    
        function showDrink() {
            let thumbnail = document.querySelector('.drinkThumbnail');
            let glass = document.querySelector('.glass');
            let measurements = document.querySelector('.measurements');
            let instructions = document.querySelector('.instructions');
            let ingredients = document.querySelector('.ingredients');
            let alocholic = document.querySelector('.alocholic');
            let category = document.querySelector('.category');
    
            return { thumbnail, glass, measurements, instructions, ingredients, alocholic, category };
        };
    })
    .catch(error => alert(error)); 
}
