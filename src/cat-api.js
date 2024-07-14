import axios from "axios";
import Notiflix from 'notiflix';
axios.defaults.headers.common["x-api-key"] = "live_sYXuSggjKyYsHRwDwvlbInTFTtJfu0yWbspcPm6rD3EUc385GdDwv97hRwxxqhdO";

export function getCatBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => Notiflix.Notify.failure("❌ Couldn't get the cat breeds, please try again later!"));
}

export function getCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => Notiflix.Notify.failure("❌ Couldn't get cats by breed, try again later"));
}


// axios is used to handle HTTP reuests to the Cat API setting headers, 
// get requests nad handling responses or errors