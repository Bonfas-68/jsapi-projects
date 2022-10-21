const jokeContainer = document.getElementById('joke');
const btn = document.getElementById('btn');
const url='https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single';
let getJoke=()=>{
    jokeContainer.classList.remove("fade");
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        jokeContainer.textContent=`${data.joke}`;
        jokeContainer.classList.add("fade");
    });
};
btn.addEventListener('click',getJoke);
getJoke();


const link="https://api.dictionaryapi.dev/api/v2/entries/en/"
const result=document.getElementById('result')
const sound=document.getElementById('sound')
const wordbtn=document.getElementById('search-btn')

wordbtn.addEventListener('click',()=>{
     let inpWord = document.getElementById('inp-word').value;


     fetch(`${link}${inpWord}`)
     .then(res=> res.json())
     .then((data)=> {
        result.innerHTML=`
        <div class="word">
                <h3>${inpWord}</h3>
                <button onClick="playSound()">
                    <i class="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            </div>
            <div class="details">
                <p>/${data[0].meanings[0].partOfSpeech}/</p>
                <p>/${data[0].phonetics[1].text}/</p>
            </div>
            <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition} </p>
            <div class="word-example">${data[0].meanings[0].definitions[0].example || 'no example, use correct phrases to find one'}</div>
        `;
        sound.setAttribute('src',`${data[0].phonetics[1].audio}`);
        console.log(sound);
     }).catch(error=>{
        result.innerHTML=`<h3 class='error'>Could not find the word sorry, yah try another...</h3>`
     })
})
function playSound(){
    sound.play();
}

// Country search functionality
let searchBtn=document.getElementById('btn-country')
let countryInp=document.getElementById('country-inp')
const sresult=document.getElementById('sresult')

searchBtn.addEventListener('click',()=>{
    // let countryName="kenya";
    let countryName=countryInp.value;
    let finalURL=`https://restcountries.com/v2/name/${countryName}?fullText=true`;
    fetch(finalURL)
    .then(res=> res.json())
    .then(data=>{
        // // logs used for testing
        // console.log(data[0])
        // console.log(data[0].capital)
        // console.log(data[0].flags.svg)
        // console.log(data[0].area)
        // console.log(data[0].altSpellings[2])
        // console.log(data[0].currencies[0].name)
        // console.log(Object.keys(data[0].languages).toString().split(',').join(', '));

        sresult.innerHTML=`
        <img src='${data[0].flags.svg}' class='flag-img'/>
        <h2>${data[0].name}</h2>
        <div class='s-wrapper'>
            <div class="data-wrapper">
                <h4>Capital: 
                <span>${data[0].capital}</span></h4>
            </div>
        </div>  
        <div class='s-wrapper'>
            <div class="data-wrapper">
                <h4>Continent: 
                <span>${data[0].region}</span></h4>
            </div>
        </div>  
        <div class='s-wrapper'>
            <div class="data-wrapper">
                <h4>Population: 
                <span>${data[0].population}</span></h4>
            </div>
        </div>  
        <div class='s-wrapper'>
            <div class="data-wrapper">
                <h4>Currency: 
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${data[0].currencies[Object.keys(data[0].currencies)].symbol}</span></h4>
            </div>
        </div>  
        <div class='s-wrapper'>
            <div class="data-wrapper">
                <h4>Common Languages: 
                <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span></h4>
            </div>
        </div>  
        `
    } ).catch(()=>{
        if(countryName.length == 0){
            sresult.innerHTML=`<h3>The input field cannot be empty`
        }else{
            sresult.innerHTML=`<h3>Please enter a valid country name</h3>`
        }
    })
});