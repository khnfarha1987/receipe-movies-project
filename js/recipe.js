var searchBtn = document.getElementById('search-btn');
var mealList = document.getElementById('meal');
var mealDetailsContent = document.querySelector('.meal-details-content');
var recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList() {
    var searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=447e563198c34679afe3427fe0ed747b&includeIngredients=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            var html = "";
            if (data.results) {
                data.results.forEach(recipe => {
                    html += `
                    <div class = "meal-item" data-id = "${recipe.id}">
                        <div class = "meal-img">
                            <img src = "${recipe.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${recipe.title}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        var mealItem = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?apiKey=447e563198c34679afe3427fe0ed747b`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data));
    }
}

// create a modal
function mealRecipeModal(data) {
    console.log(data);
    //meal = meal[0];
    var html = `
        <h2 class = "recipe-title">${data.title}</h2>
        <p class = "recipe-category">${data.cuisines}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${data.instructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${data.image}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${data.spoonacularSourceUrl}" target = "_blank">"${data.sourceName}"</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}