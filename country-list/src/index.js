async function fetchData() {
  const users = await fetch(`https://restcountries.com/v3.1/all`);
  const json = await users.json(); // AWAIT = ЧЕКАТИ
  // The await keyword is used to pause the execution 
  // of the fetch operation until the Promise 
  // is resolved or rejected. This allows for 
  // writing asynchronous code in a more synchronous style.
  const dataUpdate = json.filter((country) => country.name.common !== 'Russia'); // прибрати зі списку
  return dataUpdate; // json = const that contains 
  // data obtained from the response of the fetch request.
  // obtain = отримати (receive, get)
}

let countPages = 10;
let totalPage = 1;
let countriesPerPage;

async function main(totalPage = 1) {
  const usersFetched = await fetchData();
  const div = document.getElementById('app');
  div.innerHTML = '';
  // для розміщення України на перше місце у списку
  const targetCountry = usersFetched.find(country => country.name.common === 'Ukraine');
  if (targetCountry) {
    const index = usersFetched.indexOf(targetCountry);
    if (index > -1) {
      usersFetched.splice(index, 1);
      // SPLICE'S A METHOD FOR REPLACING ELEMENT AT A SPECIFIC POSITION.
      usersFetched.unshift(targetCountry);
      // UNSHIFT IS A METHOD IS USED TO ADD AN ELEMENT TO THE BEGINNING OF AN ARRAY.
    }
  }
  // SNIPPET = ФРАГМЕНТ.
  countriesPerPage = Math.ceil(usersFetched.length / countPages); // для обрахунку кількості країн розміщених на кожній сторінці

  const startIndex = (totalPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesOnPage = usersFetched.slice(startIndex, endIndex);

  const blockClick = (element) => {
    let divProf = document.getElementsByClassName('photoMain')[0];
    const Blocks = Array.from(document.getElementsByClassName('block'));

    if (divProf) {
      // для повернення назад до списку
      div.removeChild(divProf);
      buttonBack.classList.remove('hide');
      Blocks.forEach((item) => {
        item.classList.remove('hide');
      });
    } else {
      buttonBack.classList.add('hide');
      Blocks.forEach((item) => {
        if (item.id !== element.id) {
          item.classList.add('hide');
        } else {
          item.classList.add('buttonActive');
        }
      });

      divProf = document.createElement('div');
      divProf.classList.add('photoMain');
      const profPhoto = document.createElement('img');
      profPhoto.src = element.flags.png;
      profPhoto.classList.add('photoMainSize');
      divProf.appendChild(profPhoto);
      div.appendChild(divProf);

      const backButton = document.createElement('button');
      backButton.textContent = '<';
      backButton.classList.add('buttonApp', 'textApp', 'buttonSpace');
      divProf.appendChild(backButton);

      backButton.addEventListener('click', () => {
        div.removeChild(divProf);
        buttonBack.classList.remove('hide');
        Blocks.forEach((item) => {
          item.classList.remove('hide');
        });
      });
    }
  };

  countriesOnPage.forEach((item, i) => {
    const block = document.createElement('div');
    block.id = item.id;
    const text = document.createElement('p');
    const img = document.createElement('img');

    block.appendChild(text);
    block.appendChild(img);
    text.textContent = item.name.common;
    img.src = item.flags.png;

    div.appendChild(block);
    block.classList.add('block');
    text.classList.add('textApp');
    img.classList.add('photoUser');

    block.addEventListener('click', () => blockClick(item));
  });

  const buttonBack = document.createElement('div');
  buttonBack.classList.add('buttonBack');

  const buttonLeft = document.createElement('button');
  buttonLeft.classList.add('buttonApp', 'textApp');
  buttonLeft.textContent = '<';
  buttonBack.appendChild(buttonLeft);

  buttonLeft.addEventListener('click', () => {
    if (1 < totalPage) {
      totalPage = totalPage - 1;
      main(totalPage);
    }
  });

  for (let i = 1; i <= countPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.id = i;

    button.classList.add('buttonApp', 'textApp');
    if (i === totalPage) {
      button.classList.add('buttonActive');
    } else {
      button.classList.remove('buttonActive');
    }

    button.addEventListener('click', () => {
      totalPage = i;
      main(totalPage);
    });
    buttonBack.appendChild(button);
    // a method available on DOM elements in JavaScript. 
    // It is used to add a new child element as the last 
    // child of the specified parent element.
    // parentElement.appendChild(childElement);
  }

  const buttonRight = document.createElement('button');
  buttonRight.classList.add('buttonApp', 'textApp');
  buttonRight.textContent = '>';
  buttonBack.appendChild(buttonRight);

  buttonRight.addEventListener('click', () => {
    if (totalPage < countPages) {
      totalPage = totalPage + 1;
      main(totalPage);
    }
  });
  div.appendChild(buttonBack);
}

main();
// main() is the main control flow

