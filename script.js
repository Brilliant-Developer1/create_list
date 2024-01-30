const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clearAll = document.querySelector('.clear-all');
let items = [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);

  localStorage.setItem(localStorage.length, item.text);

  showItems(itemsList);
  this.reset();
}

function showItems(itemsPlates) {
  items = [];

  let html = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (value !== null && value !== undefined) {
      html += `
        <li>
          <input id="${key}" data-index="${i}" name="checkbox" type="checkbox" />
          <label for="${key}">${value}</label>
        </li>
      `;

      items.push({ text: value, done: false });
    }
  }

  if (localStorage.length) {
    itemsPlates.innerHTML = html;
  } else {
    itemsList.innerHTML = `<li>
      Loading Tapas...
    </li>`;
  }

  handleCheckBoxes();
}

function handleClearAll() {
  localStorage.clear();
  showItems(itemsList);
}

function handleCheckBoxes() {
  const checkboxes = document.querySelectorAll('[name="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', checkbox => {
      localStorage.removeItem(checkbox.id);

      showItems(itemsList);
    });
  });
}

showItems(itemsList);

addItems.addEventListener('submit', addItem);

clearAll.addEventListener('click', handleClearAll);
//               ${item.done ? 'checked' : ''}
