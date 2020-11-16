const prevBtn = document.getElementById("carousel-prevBtn")
const cont = document.getElementById("carousel-inner")
const ricerca = document.getElementById("ricerca")
const query = 'https://pixabay.com/api/?key=19009045-9eb5cf0198b60c98ec48629a8'
const bottone= document.getElementById("button-addon2")
const immagini = document.getElementById("immagini")
let images = []
async function main (){
    let v = await fetch('https://pixabay.com/api/?key=19009045-9eb5cf0198b60c98ec48629a8&q=random&image_type=photo').then(r => r.json());
    images = v.hits
    console.log(images)
    addALLimages()

}
function addImage (imageurl){
    let container = document.createElement("div")
    container.className= "carousel-item"
    container.setAttribute("data-interval","2000")

    let image = document.createElement("img")
    image.className= "d-block w-100"
    image.src = imageurl

    container.appendChild(image)
    immagini.appendChild(container)
}

function addALLimages (){
    images.forEach(img => {

        addImage(img.webformatURL)

    })
}

function searchimages(cerca){
    let lista = cerca.split(" ")
    let temp = ""  //stringa finale
    lista.forEach(parola => {
        temp += parola +  "+"
    })
    
    let url = query + "&q=" + temp.substr(0,temp.length -1) + "&image_type=photo" 
    fetch(url).then(r => r.json()).then(b=> {
        images = b.hits
        immagini.innerHTML = ""
        document.getElementById("active").className = "carousel-item active"
        addALLimages()

    })
}
bottone.onclick = ( ) => {
    searchimages(ricerca.value)
}

ricerca.addEventListener("submit", ( e)=> {

    console.log(e.target.value)
})


main()