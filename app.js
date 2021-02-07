const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
mealDetailsContent.parentElement.classList.remove('showRecipe');
});



// get meal ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3 class = "recipe-btn">${meal.strMeal}</h3>
                            
                        </div>
                    </div>
                `;
            });
            
        } else{
            html = `<p class="error">Sorry, we didn't find any meal!</p>`;
            
        }

        mealList.innerHTML = html;   
    }); 
}


// get recipe of the meal
function getMealRecipe(details){
    details.preventDefault();
    if(details.target.classList.contains('recipe-btn')){
        let mealItem = details.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}


// create modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">Title: ${meal.strMeal}</h2>
        <p class = "tags">Tags: ${meal.strTags}</p>
        <p class = "recipe-category">Category: ${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
        <p> Area: ${meal.strArea}</p>
           
        </div>
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}