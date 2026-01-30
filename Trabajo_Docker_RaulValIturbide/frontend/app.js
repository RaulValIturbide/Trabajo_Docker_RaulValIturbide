// Configuración de la API backend
const API_URL = 'http://localhost:4000';

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

// Función para cargar todas las tareas
async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();
    
    renderTasks(tasks);
  } catch (error) {
    console.error('Error al cargar tareas:', error);
    showError('No se pudieron cargar las tareas');
  }
}

// Función para renderizar las tareas en el DOM
function renderTasks(tasks) {
  tasksList.innerHTML = '';
  
  if (tasks.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    li.innerHTML = `
      <input 
        type="checkbox" 
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id}, this.checked)"
      />
      <span class="task-title">${escapeHtml(task.title)}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
    `;
    
    tasksList.appendChild(li);
  });
}

// Manejar el envío del formulario
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = taskInput.value.trim();
  if (!title) return;
  
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    if (response.ok) {
      taskInput.value = '';
      loadTasks();
    } else {
      showError('Error al crear la tarea');
    }
  } catch (error) {
    console.error('Error al crear tarea:', error);
    showError('No se pudo crear la tarea');
  }
});

// Función para marcar/desmarcar tarea como completada
async function toggleTask(id, completed) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    
    if (response.ok) {
      loadTasks();
    } else {
      showError('Error al actualizar la tarea');
    }
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    showError('No se pudo actualizar la tarea');
  }
}

// Función para eliminar una tarea
async function deleteTask(id) {
  if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      loadTasks();
    } else {
      showError('Error al eliminar la tarea');
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    showError('No se pudo eliminar la tarea');
  }
}

// Función auxiliar para escapar HTML y prevenir XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Función para mostrar errores
function showError(message) {
  alert(message);
}