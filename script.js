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
  localStorage.setItem('items', JSON.stringify(items));
  //   console.log(items);
  this.reset();
  showItems(itemsList);
  //   createItems(items, itemsList);
}

function handleCheckBoxes(items) {
  const checkboxes = document.querySelectorAll('input[name="checkbox"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const index = this.getAttribute('data-index');
      items[index].done = this.checked;

      if (this.checked) {
        items.splice(index, 1);
        createItems(items, itemsList);
      }
    });
  });
}

function showItems(itemsPlates) {
  console.log(localStorage);
  if (!localStorage.length < 1) {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    itemsPlates.innerHTML = storedItems
      .map((item, i) => {
        return `
          <li>
            <input id="${i}" data-index="${i}" name="checkbox" type="checkbox"
            ${item.done ? 'checked' : ''}
            />
            <label contenteditable="true" for="${i}">${item.text}</label>
          </li>
        `;
      })
      .join('');
  }
}

showItems(itemsList);

addItems.addEventListener('submit', addItem);
