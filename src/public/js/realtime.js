let socket;  

document.addEventListener('DOMContentLoaded', () => {
    socket = io();  

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


function updateTable(items) {
    const tbodyId = document.getElementById('tbodyId');
    tbodyId.innerHTML = "";

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

// Función para eliminar un ítem por su ID
function deleteItem(id) {
    socket.emit('delete item', { id: id });
}
