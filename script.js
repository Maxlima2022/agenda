document.addEventListener('DOMContentLoaded', function () {
    loadEvents();
});

function addEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    if (eventName && eventDate) {
        const event = {
            name: eventName,
            date: eventDate
        };

        let events = getEvents();
        events.push(event);
        saveEvents(events);
        loadEvents();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function loadEvents() {
    const events = getEvents();
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    events.forEach(function (event, index) {
        const li = document.createElement('li');
        li.textContent = `${event.name} - ${event.date} `;
        
        // Adiciona botão para excluir o evento
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function () {
            deleteEvent(index);
        };

        li.appendChild(deleteButton);
        eventList.appendChild(li);
    });
}

function clearEvents() {
    localStorage.removeItem('events');
    loadEvents();
}

function deleteEvent(index) {
    let events = getEvents();
    events.splice(index, 1);
    saveEvents(events);
    loadEvents();
}

function getEvents() {
    const eventsString = localStorage.getItem('events');
    return eventsString ? JSON.parse(eventsString) : [];
}

function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}
