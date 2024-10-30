document.addEventListener('DOMContentLoaded', () => {
    fetchHeroes();
    setUpEventListener();
});

function fetchHeroes() {
    fetch('/heroes')
        .then(response => response.json())
        .then(heroes => {
            const heroList = document.getElementById('heroes');
            heroList.innerHTML = '';

            heroes.forEach(hero => {
                const li = document.createElement('li');

                const informationButton = document.createElement('button');
                informationButton.textContent = 'Information';

                const menuButton = document.createElement('button');
                menuButton.innerHTML = '...';
                menuButton.classList.add('menu-button');

                const dropdownMenu = document.createElement('div');
                dropdownMenu.classList.add('dropdown-content');
                dropdownMenu.innerHTML = `
                    <button class="dropdown-item update-button" data-id="${hero.id}">Update</button>
                    <button class="dropdown-item delete-button" data-id="${hero.id}">Delete</button>
                `;

                informationButton.addEventListener('click', () => {
                    openInfoModal(hero);
                });

                menuButton.addEventListener('click', (event) => {
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                    event.stopPropagation();
                });

                dropdownMenu.addEventListener('click', (event) => {
                    if (event.target.classList.contains('update-button')) {
                        openUpdateModal(hero);
                    } else if (event.target.classList.contains('delete-button')) {
                        const heroId = event.target.getAttribute('data-id');
                        deleteHero(heroId);
                    }
                    dropdownMenu.style.display = 'none';
                });

                window.addEventListener('click', () => {
                    dropdownMenu.style.display = 'none';
                });

                li.textContent = hero.name;
                li.appendChild(informationButton);
                li.appendChild(menuButton);
                li.appendChild(dropdownMenu);
                heroList.appendChild(li);
            });
        });
}

function setUpEventListener() {
    document.getElementById('marvelForm').addEventListener('submit', (event) => {
        event.preventDefault();
        openAddModal();
    });

    document.getElementById('close-add').addEventListener('click', closeAddModal);
    document.getElementById('close-info').addEventListener('click', closeInfoModal);
    document.getElementById('close-update').addEventListener('click', closeUpdateModal);

    createHero();
    setUpUpdateHeroEventListener();
}


// Add a superhero

function handleHeroCreation(event) {
    event.preventDefault();
    const name = document.getElementById('hero-name').value;
    const alias = document.getElementById('hero-alias').value;
    const powersInput = document.getElementById('hero-powers').value;

    if(!name || !alias || !powersInput) {
        alert('Please fill out all fields.');
        return;
    }

    const powerArray = powersInput.split(',').map(power => properCase(power.trim()));

    const hero = {
        name: properCase(name),
        alias: properCase(alias),
        powers: powerArray
    };
    addHero(hero);
    closeAddModal();
    document.getElementById('hero-name').value = '';
    document.getElementById('hero-alias').value = '';
    document.getElementById('hero-powers').value = '';
}

function createHero(){
    const submitButton = document.getElementById('submit-creation');
    submitButton.removeEventListener('click', handleHeroCreation);
    submitButton.addEventListener('click', handleHeroCreation);
}

function addHero(heroData){
    fetch('/heroes', {
        method: 'POST',
        body: JSON.stringify(heroData),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(() => {
            fetchHeroes();
        })
        .catch((error) => {
            console.error('Error creating hero', error);
        });
}

// Update hero
function handleUpdateHero(event){
    event.preventDefault();
    const name = document.getElementById('update-hero-name').value;
    const alias = document.getElementById('update-hero-alias').value;
    const powers = document.getElementById('update-hero-powers').value;
    const heroId = this.dataset.heroId;

     if(!name || !alias || !powers){
         alert('Please fill out all fields.');
         return;
     }

    const powerArray = powers.split(',').map(power => properCase(power.trim()));

     const updatedData = {
         name: properCase(name),
         alias: properCase(alias),
         powers: powerArray
     };

     updateHero(heroId, updatedData);
     closeUpdateModal();
}

function setUpUpdateHeroEventListener() {
    const submitButton = document.getElementById('submit-update-hero');
    submitButton.removeEventListener('click', handleUpdateHero);
    submitButton.addEventListener('click', handleUpdateHero);
}

function updateHero(heroId, updatedData) {
    fetch(`/heroes/${heroId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    })
        .then(response => {
            if(response.ok) {
                fetchHeroes();
            } else {
                console.error('Error updating hero', response);
            }
        })
        .catch(error => {
            console.error('Error updating hero', error);
        });
}

// Delete hero
function deleteHero(heroId) {
    fetch(`/heroes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: heroId })
    })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to delete hero', response);
                return;
            }
            return response.json();
        })
        .then(() => {
            console.log('Hero deleted');
            fetchHeroes();
        })
        .catch((error) => {
            console.error('Error deleting hero', error);
        });
}

// Modals

function openAddModal() {
    const modal = document.getElementById('modal-add');
    modal.style.display = 'block';
    createHero();
}

function openInfoModal(hero) {
    const modal = document.getElementById('modal-info');
    document.getElementById('mhero-name').textContent = hero.name;
    document.getElementById('mhero-alias').textContent = hero.alias;
    document.getElementById('mhero-powers').textContent = hero.powers;
    modal.style.display = 'block';
}

function openUpdateModal(hero) {
    const modal = document.getElementById('modal-update');
    document.getElementById('update-hero-name').value = hero.name;
    document.getElementById('update-hero-alias').value = hero.alias;
    document.getElementById('update-hero-powers').value = hero.powers;
    document.getElementById('submit-update-hero').dataset.heroId = hero.id;
    modal.style.display = 'block';
    setUpUpdateHeroEventListener();
}

function closeAddModal() {
    const modal = document.getElementById('modal-add');
    modal.style.display = 'none';
}

function closeInfoModal(){
    const modal = document.getElementById('modal-info');
    modal.style.display = 'none';
}

function closeUpdateModal(){
    const modal = document.getElementById('modal-update');
    modal.style.display = 'none';
}

function properCase(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}