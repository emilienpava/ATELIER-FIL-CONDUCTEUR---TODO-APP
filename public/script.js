// Variables globales
let todos = [];
let apiHealthy = false;

// Vérifier la santé de l'API
async function checkApiHealth() {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      apiHealthy = true;
      updateApiStatus(true);
      console.log('✅ API est accessible');
    } else {
      apiHealthy = false;
      updateApiStatus(false);
      console.log('❌ API inaccessible');
    }
  } catch (error) {
    apiHealthy = false;
    updateApiStatus(false);
    console.error('❌ Erreur de connexion à l\'API:', error);
  }
}

// Mettre à jour l'affichage du statut API
function updateApiStatus(isHealthy) {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');

  if (isHealthy) {
    statusIndicator.className = 'status-dot status-ok';
    statusText.textContent = 'API connectée ✅';
  } else {
    statusIndicator.className = 'status-dot status-error';
    statusText.textContent = 'API indisponible ❌';
  }
}

// Ajouter une tâche
function addTodo(taskText) {
  if (!taskText.trim()) {
    alert('Veuillez entrer une tâche valide');
    return;
  }

  const todo = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  todos.push(todo);
  renderTodos();
  document.getElementById('taskInput').value = '';
}

// Supprimer une tâche
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// Marquer une tâche comme complétée
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// Afficher les tâches
function renderTodos() {
  const todosList = document.getElementById('todosList');

  if (todos.length === 0) {
    todosList.innerHTML = `
      <div class="empty-state">
        <p>Aucune tâche pour le moment. Commencez par ajouter une!</p>
      </div>
    `;
    return;
  }

  todosList.innerHTML = todos.map(todo => `
    <div class="todo-item ${todo.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        ${todo.completed ? 'checked' : ''} 
        onchange="toggleTodo(${todo.id})"
      >
      <span class="todo-text">${escapeHtml(todo.text)}</span>
      <button class="btn-delete" onclick="deleteTodo(${todo.id})">Supprimer</button>
    </div>
  `).join('');
}

// Échapper les caractères spéciaux HTML (sécurité)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Application TODO chargée');

  // Vérifier l'API au chargement
  checkApiHealth();

  // Vérifier l'API toutes les 10 secondes
  setInterval(checkApiHealth, 10000);

  // Écouteur du formulaire
  const todoForm = document.getElementById('todoForm');
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    addTodo(taskInput.value);
  });

  // Afficher les tâches initiales (vides)
  renderTodos();
});
