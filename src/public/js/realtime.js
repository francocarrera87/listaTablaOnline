let socket;  // Declarar socket en el ámbito global

document.addEventListener('DOMContentLoaded', () => {
    socket = io();  // Inicializar socket aquí

    const itemDescription = document.getElementById('itemDescription');
    const createItemButton = document.getElementById('createItemButton');
    const tbodyId = document.getElementById('tbodyId');

    createItemButton.addEventListener('click', () => {
        socket.emit('new item', { description: itemDescription.value });
        itemDescription.value = '';
    });

    socket.on('list updated', (items) => {
        updateTable(items);
    });
});

// Función para eliminar un ítem por su ID
function deleteItem(id) {
    socket.emit('delete item', { id: id });
}

function updateTable(items) {
    const tbodyId = document.getElementById('tbodyId');
    tbodyId.innerHTML = "";

    // Verificar si items es un array
    if (Array.isArray(items)) {
        items.forEach(item => {
            tbodyId.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.description}</td>
                    <td><button onclick="deleteItem(${item.id})">delete</button></td>
                </tr>`;
        });
    }
}

