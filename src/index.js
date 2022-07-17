const ramenUrl = "http://localhost:3000/ramens";
const ramenMenuContainer = document.querySelector('#ramen-menu');
const ramenComment = document.querySelector('#comment-display');
const ramenRating = document.querySelector('#rating-display');
const ramenForm = document.querySelector('#new-ramen');
const ramenDetails = document.querySelector('#ramen-detail');

fetchRamen();
ramenForm.addEventListener('submit', addNewRamen);

function fetchRamen() {
    fetch(ramenUrl)
        .then(response => response.json())
        .then(renderRamenImages)
        .catch(console.error);
}

function renderRamenImages(ramenMenu) {
    for(const ramen of ramenMenu) {
        renderRamenImage(ramen);
    }
}

function renderRamenImage(ramen) {
    const ramenElement = document.createElement('img');
    ramenElement.src = ramen.image;
    ramenElement.addEventListener('click', () => updateRamenDetails(ramen));

    ramenMenuContainer.append(ramenElement);
}

function updateRamenDetails(ramenItem) {
    const ramenDetailImage = ramenDetails.querySelector('.detail-image');
    const ramenDetailName = ramenDetails.querySelector('.name');
    const ramenDetailRestaurant = ramenDetails.querySelector('.restaurant');

    // add details about clicked ramen
    ramenDetailImage.src = ramenItem.image;
    ramenDetailName.textContent = ramenItem.name;
    ramenDetailRestaurant.textContent = ramenItem.restaurant;

    ramenComment.textContent = ramenItem.comment;
    ramenRating.textContent = ramenItem.rating;

}

function addNewRamen(event) {
    event.preventDefault();

    const comment = ramenForm.querySelector('#new-comment').value;
    const img = ramenForm.querySelector('#new-image').value;
    const name = ramenForm.querySelector('#new-name').value;
    const rating = ramenForm.querySelector('#new-rating').value;
    const restaurant = ramenForm.querySelector('#new-restaurant').value;

    const newRamenItem = {
        comment: comment,
        id: Math.random()*100,
        image: img,
        name: name,
        rating: rating,
        restaurant: restaurant
    };
    renderRamenImage(newRamenItem);
}