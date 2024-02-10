document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

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

    function updateTable(items) {
        const tbody = document.getElementById('tbodyId');
        tbody.innerHTML = '';
    
        items.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.id}</td>
                <td>${item.description}</td>
                <td><button onclick="deleteItem(${item.id})">delete</button></td>
            </tr>`;
        });
    }
});

function removeRow(id) {
    const row = document.querySelector(`#itemTable tbody tr td:first-child:contains('${id}')`).parentNode;
    row.remove();
}