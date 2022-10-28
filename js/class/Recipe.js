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

        Recipe.instance = [...Recipe.instances, this];
    }

    static instances = [];

    /**
     * View of a receipe
     * @returns {HTMLElement}
     */
    view = () => {
        let container = document.createElement('article');
        container.setAttribute('class', 'recipe');

        let image = document.createElement('img');
        image.setAttribute('src', 'https://dummyimage.com/380x300/ED6454/fff'); // Default aaa/fff


        image.setAttribute('class', 'recipe__img');

        let description = document.createElement('div');
        description.setAttribute('class', 'recipe__description');

        let descTop = document.createElement('div');
        descTop.setAttribute('class', 'recipe__description__top');

        descTop.innerHTML = `
            <h2 class="name">${this.name}</h2>
            <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>
        `;

        let ingredients = document.createElement('ul');
        ingredients.setAttribute('class', 'ingredients-list');

        this.ingredients.forEach(ingredient => {
            ingredients.innerHTML += 
            `
                <li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>
                    ${ingredient.quantity} ${ingredient.unit || ''}
                </li>
            `;
        });

        let howToMake = document.createElement('p');
        howToMake.setAttribute('class', 'howToMake');

        if (this.description.length >= 200) {
            howToMake.innerText = `${this.description.slice(0, 200)}...`;
        } else {
            howToMake.innerText = this.description;
        }

        let descBottom = document.createElement('div');
        descBottom.setAttribute('class', 'recipe__description__bottom');

        descBottom.appendChild(ingredients);
        descBottom.appendChild(howToMake);

        description.appendChild(descTop);
        description.appendChild(descBottom);

        container.appendChild(image);
        container.appendChild(description);

        this.element = container;

        return container;
    }

    toggleVisibility = () => {
        this.element.classList.toggle('hidden');
        this.visible = !this.visible;
    }
}