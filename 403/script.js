const container = document.querySelector('.container');

const title = createTitle('Добавление, Изменение и Удаление Элемента из Таблицы');
container.append(title);

const form = createForm();
container.append(form);

const table = createTable();
container.append(table);

showAllRows();

const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(button => {
    button.addEventListener('click', openEditModal);
});

const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

window.addEventListener('click', event => {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', event => {
    event.preventDefault();
    const editNameInput = document.getElementById('editName');
    const editYearInput = document.getElementById('editYear');

    const row = document.querySelector('.edit-btn.active').closest('tr');
    row.children[1].textContent = editNameInput.value.trim();
    row.children[2].textContent = editYearInput.value.trim();

    closeModal.click();
});

function createTitle(text) {
    const title = document.createElement('h1');
    title.textContent = text;
    return title;
}

function createForm() {
    const form = document.createElement('form');
    form.classList.add('form');

    const nameGroup = createFormGroup('name', 'Имя', 'text', 'Имя');
    form.append(nameGroup);

    const ageGroup = createFormGroup('age', 'Возраст', 'number', 'Возраст');
    form.append(ageGroup);

    const showButton = document.createElement('button');
    showButton.setAttribute('type', 'button');
    showButton.classList.add('btn');
    showButton.textContent = 'Показать';
    showButton.addEventListener('click', filterRows);
    form.append(showButton);

    return form;
}

function createFormGroup(id, labelText, type, placeholder) {
    const group = document.createElement('div');
    group.classList.add('form-group');

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;
    group.append(label);

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', id);
    input.setAttribute('placeholder', placeholder);
    group.append(input);

    return group;
}

function createTable() {
    const table = document.createElement('table');
    table.classList.add('table');

    const thead = createTableHeader();
    table.append(thead);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'table-body');
    table.append(tbody);

    const students = [{ no: 1, name: 'Bruce Reyes', year: 1997 },
    { no: 2, name: 'Benjamin Dean', year: 1194 },
    { no: 3, name: 'Philip Lucas', year: 1525 },
    { no: 4, name: 'Jose Hill', year: 4325 }, 
    { no: 5, name: 'Jerry Andrews', year: 683 },
    { no: 6, name: 'Nicolas Lee', year: 2798 },
    { no: 7, name: 'Alan Wade', year: 3586 },];

    students.forEach(student => {
        const row = document.createElement('tr');

        Object.values(student).forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            row.append(td);
        });

        const actionsTd = createActionsTd();
        row.append(actionsTd);
        tbody.append(row);
    });

    return table;
}

function createTableHeader() {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['No', 'Имя студента', 'Год рождения', 'Действия'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.append(th);
    });
    thead.append(headerRow);

    return thead;
}

function showAllRows() {
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach(row => {
        row.classList.add('visible');
    });
}

function filterRows() {
    const nameInput = document.getElementById('name').value.toLowerCase();
    const ageInput = document.getElementById('age').value;

    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        const yearOfBirth = parseInt(row.children[2].textContent);
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - yearOfBirth;

        if ((name.includes(nameInput) || !nameInput) && (calculatedAge == ageInput || !ageInput)) {
            row.classList.add('visible');
        } else {
            row.classList.remove('visible');
        }
    });
}

function createActionsTd() {
    const actionsTd = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.classList.add('action-btn', 'edit-btn');
    editButton.textContent = '✏️';
    editButton.addEventListener('click', openEditModal);
    actionsTd.append(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-btn', 'delete-btn');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', deleteRow); 
    actionsTd.append(deleteButton);

    return actionsTd;
}

function deleteRow(event) {
    const row = event.target.closest('tr');
    row.remove();
}


function openEditModal(event) {
    const editModal = document.getElementById('editModal');
    const row = event.target.closest('tr');
    const columns = row.querySelectorAll('td');

    const editNameInput = document.getElementById('editName');
    const editYearInput = document.getElementById('editYear');

    editNameInput.value = columns[1].textContent.trim();
    editYearInput.value = columns[2].textContent.trim();

    editModal.style.display = 'block';

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
}
