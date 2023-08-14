const accesskey = 'rmqygGeP078-qYKErVV2orXMeN1EQB2NDpRX6pI6ft4';
const formE1 = document.querySelector('form');
const inputE1 = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more-button');

let inputData = '';
let page = 1;
async function searchImages() {
  inputData = inputE1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    searchResults.innerHTML = '';
  }
  results.map((results) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');
    const image = document.createElement('img');
    image.src = results.urls.small;
    // image.alt = results.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = results.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = results.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
    return searchResults.append(image, imageLink, imageWrapper);
  });
  // console.log(data);

  page++;
  if (page > 1) {
    showMore.style.display = 'block';
  }
}

formE1.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener('click', () => {
  searchImages();
});
