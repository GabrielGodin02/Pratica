document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const sendChatButton = document.getElementById('send-chat');
    const documentList = document.getElementById('document-list');
    const uploadDocumentInput = document.getElementById('upload-document');
    const uploadButton = document.getElementById('upload-button');
    const activityList = document.getElementById('activity-list');
    const calendarEl = document.getElementById('calendar');

    function logActivity(activity) {
        const activityItem = document.createElement('li');
        activityItem.textContent = activity;
        activityList.appendChild(activityItem);
    }

    if (todoList && inProgressList && doneList && newTaskInput && addTaskButton && 
        chatInput && chatBox && sendChatButton && documentList && 
        uploadDocumentInput && uploadButton && activityList && calendarEl) {

        // Funcionalidad del Kanban
        addTaskButton.addEventListener('click', () => {
            if (newTaskInput.value.trim() !== '') {
                const taskItem = document.createElement('li');
                taskItem.textContent = newTaskInput.value;
                const moveButton = document.createElement('button');
                moveButton.textContent = 'Mover a En Progreso';
                moveButton.addEventListener('click', () => {
                    inProgressList.appendChild(taskItem);
                    taskItem.removeChild(moveButton);
                    const doneButton = document.createElement('button');
                    doneButton.textContent = 'Mover a Completado';
                    doneButton.addEventListener('click', () => {
                        doneList.appendChild(taskItem);
                        taskItem.removeChild(doneButton);
                        logActivity(`Tarea "${taskItem.textContent}" completada.`);
                    });
                    taskItem.appendChild(doneButton);
                });
                taskItem.appendChild(moveButton);
                todoList.appendChild(taskItem);
                logActivity(`Tarea "${taskItem.textContent}" añadida.`);
                newTaskInput.value = '';
            }
        });

        // Funcionalidad del Chat
        sendChatButton.addEventListener('click', () => {
            if (chatInput.value.trim() !== '') {
                const messageItem = document.createElement('div');
                messageItem.textContent = chatInput.value;
                chatBox.appendChild(messageItem);
                logActivity(`Nuevo mensaje en el chat: "${chatInput.value}"`);
                chatInput.value = '';
            }
        });

        // Funcionalidad de Documentos Compartidos
        uploadButton.addEventListener('click', () => {
            const file = uploadDocumentInput.files[0];
            if (file) {
                const fileItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = URL.createObjectURL(file);
                link.download = file.name;
                link.textContent = file.name;
                fileItem.appendChild(link);
                documentList.appendChild(fileItem);
                logActivity(`Documento "${file.name}" subido.`);
            }
        });

        // Inicializar el calendario
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true, // Permitir edición
            selectable: true, // Permitir selección
            events: [], // Puede inicializarse con eventos precargados si lo deseas
            select: function(info) {
                const title = prompt('Introduce el título del evento:');
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: info.startStr,
                        end: info.endStr,
                        allDay: info.allDay
                    });
                    logActivity(`Evento "${title}" añadido.`);
                }
                calendar.unselect();
            },
            eventClick: function(info) {
                if (confirm(`¿Quieres eliminar el evento "${info.event.title}"?`)) {
                    info.event.remove();
                    logActivity(`Evento "${info.event.title}" eliminado.`);
                }
            }
        });
        calendar.render();
    } else {
        console.error('Error: Uno o más elementos del DOM no se encontraron.');
    }
});