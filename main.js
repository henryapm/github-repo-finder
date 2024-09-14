const selectEl = document.querySelector('#selectLanguage');
const optionsEndPoint = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';
const githubEndPoint = 'https://api.github.com'

async function displayOptions(){
  const response = await fetch(optionsEndPoint);
  const data = await response.json();
  data.forEach(element => {
    selectEl.innerHTML += 
    /*html*/
    `
      <option value="${element.title}">
        ${element.title}
      </option>
    `
  });
}

displayOptions()

selectEl.addEventListener('change', function(){
  if (!localStorage.getItem(selectEl.value)) {
    getFromEndPoint();
  } else {
    getFromLocalStorage();
  }
})

async function getFromEndPoint(){
  let githubResponse = await fetch(`${githubEndPoint}/search/repositories?q=${selectEl.value}`);
  let githubData = await githubResponse.json();
  localStorage.setItem(selectEl.value, JSON.stringify(githubData));
  console.log('getting date from Github', githubData);
  console.log(githubData.items)
}

function getFromLocalStorage(){
  localStorageData = localStorage.getItem(selectEl.value);
  jsonData = JSON.parse(localStorageData);
  console.log('getting from storage', jsonData);
  console.log(jsonData.items[getRandomInt(30)]);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayRepo(repo){
  
}