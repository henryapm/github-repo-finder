const selectLanguageEl = document.querySelector('#selectLanguage');
const repoEl = document.querySelector('.repo');
const refreshBtn = document.querySelector('.refresh__btn');
const optionsEndPoint = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';
const githubEndPoint = 'https://api.github.com';

async function displayOptions(){
  const response = await fetch(optionsEndPoint);
  const data = await response.json();
  data.forEach(element => {
    selectLanguageEl.innerHTML += 
    /*html*/
    `
      <option value="${element.title}">
        ${element.title}
      </option>
    `
  });
}

displayOptions()

selectLanguageEl.addEventListener('change', () => retreiveRepo());

async function retreiveRepo(){
  displayInitialClass()
  const language = selectLanguageEl.value
  if (!localStorage.getItem(language)) {
    try{
      displayRepo(await getRepoFromEndPoint(language));
    }catch(err){
      displayErrorClass()
      repoEl.textContent = 'Error fetching repositories' + err;
    }
  } else {
    displayRepo(getRepoFromLocalStorage(language));
  }
}

async function getRepoFromEndPoint(language){
  repoEl.innerHTML = 'Loading, please wait..'
  let githubResponse = await fetch(`${githubEndPoint}/search/repositories?q=${language}`);
  let githubData = await githubResponse.json();
  localStorage.setItem(language, JSON.stringify(githubData));
  console.log('git', githubData)
  return randomRepo(githubData)
}

function getRepoFromLocalStorage(language){
  localStorageData = localStorage.getItem(language);
  storageData = JSON.parse(localStorageData);
  console.log('storage', storageData)
  return randomRepo(storageData)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomRepo(repos){
  return repos.items[getRandomInt(repos.items.length)]
}

function displayRepo(repo){
  repoEl.innerHTML = 
  /*html*/
  `
  <h3>${repo.full_name}</h3>
  <p>${repo.description}</p>
  <div class="stats">
    <span>&#9733;${repo.stargazers_count}</span>
    <span><i class="fa-solid fa-code-fork"></i>${repo.forks_count}</span>
    <span>
      <i class="fa-solid fa-circle-info"></i>${repo.open_issues_count}
    </span>
  </div>
  `
}

function displayErrorClass(){
  repoEl.classList.add('error')
}

function displayInitialClass(){
  repoEl.classList.remove('error')
}

refreshBtn.addEventListener('click', function(){
  retreiveRepo(selectLanguageEl.value)
})