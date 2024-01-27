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
  console.log(localStorage.getItem(itemsKey));
  showItems(items, itemsList);
  this.reset();
  itemsKey++;
}

function showItems(items = [], itemsPlates) {
  itemsPlates.innerHTML = items
    .map((item, i) => {
      return `
          <li>
            <input id="${i}" data-index="${i}" name="checkbox" type="checkbox"
            ${item.done ? 'checked' : ''}
            />
            <label for="${i}">${item.text}</label>
          </li>
          `;
    })
    .join('');
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
