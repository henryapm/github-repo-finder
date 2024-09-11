const selectEl = document.querySelector('#selectLanguage');
let url = 'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';

fetch(url)
.then(res => res.json())
.then(out =>
  populateSelect(out))
.catch(err => console.log(err));

function populateSelect(json){
  console.log(json[0])
  json.forEach(element => {
    selectEl.innerHTML += 
    /*html*/
    `
      <option value="${element.title}">
        ${element.title}
      </option>
    `
  });
}