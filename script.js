const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];
let itemsKey = 0;

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  //   console.log(item.text);
  localStorage.setItem(itemsKey, item.text);
  //   console.log(localStorage.getItem(itemsKey));
  showItems(itemsList);
  this.reset();
  itemsKey++;
}
showItems(itemsList);
function showItems(itemsPlates) {
  let html = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    html += `
        <li>
          <input id="${key}" data-index="${i}"  name="checkbox" type="checkbox" />
          <label for="${key}">${value}</label>
        </li>
      `;
  }

  itemsPlates.innerHTML = html;
}

addItems.addEventListener('submit', addItem);

function handleCheckBoxes(items) {
  const checkboxes = document.querySelectorAll('input[name="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const index = this.getAttribute('data-index');
      items[index].done = this.checked;

      if (this.checked) {
        items.splice(index, 1);
        showItems(items, itemsList);
      }
    });
  });
}

//               ${item.done ? 'checked' : ''}
