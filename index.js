const container = document.createElement('div');
container.classList.add('container')

const getDogUpper = (dog) => dog.charAt(0).toUpperCase() + dog.slice(1);

function getPhoto(dog) {
    return fetch(`https://dog.ceo/api/breed/${dog}/images`)
    .then(response => response.json())
    .then(data => data.message[1])
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

function getWikiText(dog) {
    return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${getDogUpper(dog)}`)
    .then(response => response.json())
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

const dogs = ["saluki","beagle", "corgi", "dingo", "husky"] 
     
function createWikiItem(dog) {

    const wikiItem = document.createElement('div')
    wikiItem.classList.add('wiki-item')
    
    const header = document.createElement('h1');
    wikiItem.classList.add('wiki-header')
    header.textContent = getDogUpper(dog)
    wikiItem.appendChild(header)

    const content = document.createElement('div');
    content.classList.add('wiki-content')
    wikiItem.appendChild(content)

    const text = document.createElement('p');
    text.classList.add('wiki-text')
    getWikiText(dog)
    .then(data => {
        content.appendChild(text)
        text.textContent = data.extract       
    })
    .catch(error => console.error("Error setting image:", error))
    
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('img-container')
    content.appendChild(imageContainer)

    const photo = document.createElement('img')
    photo.classList.add('wiki-img')
    getPhoto(dog)
        .then(imgUrl => {
            photo.src = imgUrl;
            imageContainer.appendChild(photo)         
        })
        .catch(error => console.error("Error setting image:", error))

    return wikiItem
}

dogs.forEach(dog => {
    const wikiItem = createWikiItem(dog)
    container.appendChild(wikiItem)
})

document.body.appendChild(container);
