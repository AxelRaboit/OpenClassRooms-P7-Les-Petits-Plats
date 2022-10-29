export default class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.name = recipe.name;
        this.servings = recipe.servings;
        this.ingredients = recipe.ingredients;
        this.time = recipe.time;
        this.description = recipe.description;
        this.appliance = recipe.appliance;
        this.ustensils = recipe.ustensils;
        this.visible = true;

        // Stock all recipes in an array
        Recipe.instance = [...Recipe.instances, this];
    }

    static instances = [];

    /**
     * View of a receipe
     * @returns {HTMLElement}
     */
    view = () => {
        const container = document.createElement('article');
        container.setAttribute('class', 'recipe');

        const image = document.createElement('img');
        image.setAttribute('src', 'https://dummyimage.com/380x300/ED6454/fff'); // Default aaa/fff

        image.setAttribute('class', 'recipe__img');

        const description = document.createElement('div');
        description.setAttribute('class', 'recipe__description');

        const descriptionTop = document.createElement('div');
        descriptionTop.setAttribute('class', 'recipe__description__top');

        descriptionTop.innerHTML = `
            <h2 class="name">${this.name}</h2>
            <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>
        `;

        const ingredients = document.createElement('ul');
        ingredients.setAttribute('class', 'ingredients-list');

        this.ingredients.forEach(ingredient => {
            ingredients.innerHTML += 
            `
                <li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>
                    ${ingredient.quantity} ${ingredient.unit || ''}
                </li>
            `;
        });

        const howToMake = document.createElement('p');
        howToMake.setAttribute('class', 'howToMake');

        // If the description is too long, we cut it
        if (this.description.length >= 200) {
            howToMake.innerText = `${this.description.slice(0, 200)}...`;
        } else {
            howToMake.innerText = this.description;
        }

        const bottomDescription = document.createElement('div');
        bottomDescription.setAttribute('class', 'recipe__description__bottom');

        bottomDescription.appendChild(ingredients);
        bottomDescription.appendChild(howToMake);

        description.appendChild(descriptionTop);
        description.appendChild(bottomDescription);

        container.appendChild(image);
        container.appendChild(description);

        this.element = container;

        return container;
    }
}
