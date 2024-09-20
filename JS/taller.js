let activities = [];
let editingIndex = null;
let deletingIndex = null;

const actividades = document.getElementById('actividades');
const averageSpan = document.getElementById('promedio');
const statusSpan = document.getElementById('status');
const guardar = document.getElementById('guardar');
const modal = document.getElementById('modal'); 
const modalsi = document.getElementById('modalsi'); 
const modalno = document.getElementById('modalno'); 

guardar.addEventListener('click', () => {
    const activityInput = document.getElementById('actividad');
    const notaInput = document.getElementById('nota');
    const actividad = activityInput.value;
    const nota = parseFloat(notaInput.value);

    if (actividad && !isNaN(nota)) {
        if (editingIndex !== null) {
            activities[editingIndex] = { actividad, nota };
            editingIndex = null;
        } else {
            activities.push({ actividad, nota });
        }

        activityInput.value = '';
        notaInput.value = '';
        renderTable();
    }
});

function renderTable() {
    actividades.innerHTML = ''; 

    activities.forEach((item, index) => {
        const row = document.createElement('tr');

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => confirmDelete(index));
        actionsCell.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Modificar';
        editButton.addEventListener('click', () => editActivity(index));
        actionsCell.appendChild(editButton);

        row.appendChild(actionsCell);

        const activityCell = document.createElement('td');
        activityCell.textContent = item.actividad;
        row.appendChild(activityCell);

        const notaCell = document.createElement('td');
        notaCell.textContent = item.nota;
        row.appendChild(notaCell);

        actividades.appendChild(row);
    });

    updateAverage();
}

function editActivity(index) {
    const actividad = activities[index];
    document.getElementById('actividad').value = actividad.actividad;
    document.getElementById('nota').value = actividad.nota;
    editingIndex = index;
}

function confirmDelete(index) {
    deletingIndex = index;
    modal.style.display = 'block';
}

modalsi.addEventListener('click', () => {
    activities.splice(deletingIndex, 1);
    deletingIndex = null;
    modal.style.display = 'none';
    renderTable();
});

modalno.addEventListener('click', () => {
    deletingIndex = null;
    modal.style.display = 'none';
});

function updateAverage() {
    if (activities.length === 0) {
        averageSpan.textContent = '0';
        statusSpan.textContent = 'No aprobado';
        return;
    }

    const total = activities.reduce((sum, item) => sum + item.nota, 0);
    const promedio = total / activities.length;
    averageSpan.textContent = promedio.toFixed(2);

    if (promedio >= 3) {
        statusSpan.textContent = 'Aprobado';
    } else {
        statusSpan.textContent = 'No aprobado';
    }
}
