const container = document.createElement('div');
container.classList.add('container')

function getPhoto(breed) {
    return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(response => response.json())
    .then(data => data.message[0])
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

const dogs = ["akita", "beagle", "boxer", "corgi", "dingo"] 
     
function createWikiItem(dog) {

    const wikiItem = document.createElement('div')
    wikiItem.classList.add('wiki-item')
    
    const header = document.createElement('h1');
    wikiItem.classList.add('wiki-header')
    header.textContent = dog.charAt(0).toUpperCase() + dog.slice(1);
    wikiItem.appendChild(header)

    const content = document.createElement('div');
    content.classList.add('wiki-content')
    wikiItem.appendChild(content)

    const text = document.createElement('p');
    text.classList.add('wiki-text')
    content.appendChild(text)
    text.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tortor felis, ornare sed ornare lobortis, feugiat pellentesque nibh. Ut est nulla, interdum porttitor mollis vel, pharetra in nibh. Mauris aliquet tempor nunc, sit amet finibus ex bibendum quis. Pellentesque sollicitudin orci in quam pellentesque sodales. Integer posuere, lorem quis sagittis faucibus, diam leo placerat elit, at vestibulum ipsum arcu sodales leo. Nam quis massa consequat, aliquam velit non, aliquet diam. Etiam placerat faucibus pharetra. Curabitur quis risus turpis."

    const imageContainer = document.createElement('div')
    imageContainer.classList.add('img-container')
    content.appendChild(imageContainer)

    const photo = document.createElement('img')
    photo.classList.add('wiki-img')
    getPhoto(dog)
        .then(imgUrl => {
            if (imgUrl) {
                photo.src = imgUrl;
                imageContainer.appendChild(photo)
            } else {
                console.error("No image")
            }           
        })
        .catch(error => console.error("Error setting image:", error))

    return wikiItem
}

dogs.forEach(dog => {
    const wikiItem = createWikiItem(dog)
    container.appendChild(wikiItem)
})

document.body.appendChild(container);
