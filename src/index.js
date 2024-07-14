
// importam cele doua functii exportate de noi in cat-api
import { getCatBreeds, getCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

// eventlistener-ul declanseaza actiunea la incarcarea continutului din DOM

document.addEventListener('DOMContentLoaded', () => {
    const breedSelector = document.querySelector('.breed-select');
    const loader = document.querySelector('.loader');
    const error = document.querySelector('.error');
    const catInfo = document.querySelector('.cat-info');

    
    
    function showLoader() {
        loader.hidden = false;
    }
    
    function hideLoader() {
        loader.hidden = true;
    }

    function showError() {
        error.hidden = false;
    }

    function hideError() {
        error.hidden = true;
    }

    // getting and creating cat breed options to select using the SlimSelect.
    // valorile optiunilor sunt setate in breed.id si textContent in breed.name
    // each option is appended as a child to the breedSelector list    
    // an error is caught if the function doesnt work as designed
    function fillBreeds() {
        showLoader();
        getCatBreeds()
            .then(breeds => {
                breeds.forEach(breed => {
                    const option = document.createElement('option');
                    option.value = breed.id;
                    option.textContent = breed.name;
                    breedSelector.appendChild(option);
                });
                new SlimSelect({ select: '.breed-select' });
                hideLoader();
                breedSelector.hidden = false;
            })
            .catch(err => {
                Notiflix.Notify.failure(err.message);
                hideLoader();
                showError();
            });
        
    }

    // gets the info from breedId and creats html for each breed.we show the loader
    // while the paging is loading its info and hides after its loaded.    
    function loadCatsInfo(breedId) {
        showLoader();
        getCatByBreed(breedId)
            .then(data => {
                const cat = data[0];
                const breed = cat.breeds[0];
                catInfo.innerHTML = `
                    <img src="${cat.url}" alt="${breed.name}" />
                    <h2>${breed.name}</h2>
                    <p>${breed.description}</p>
                    <p><strong>Temperament:</strong> ${breed.temperament}</p>
                `;
                hideLoader();
                catInfo.hidden = false;
            })
            .catch(err => {
                Notiflix.Notify.failure(err.message);
                hideLoader();
                showError();
            })
    }

    function selectABreed() {
        const breedId = breedSelector.value;
        catInfo.hidden = true;
        hideError();
        loadCatsInfo(breedId);
    };

// on breed change in the selector, the value of breedSelector is set to the breedId
//     catInfo is hidden on selection of a new breed. and a new breed is loaded
    breedSelector.addEventListener('change', selectABreed);
    fillBreeds();

});
