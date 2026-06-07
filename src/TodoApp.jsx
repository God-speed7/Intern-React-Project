import { useEffect, useState } from 'react'
import './TodoApp.css'

const STORAGE_KEY = 'react-vite-todos'

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Save todos automatically whenever the todos list changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (title.trim() === '' || description.trim() === '') {
      return
    }

    if (editingId) {
      updateTodo()
    } else {
      addTodo()
    }

    resetForm()
  }

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    }

    setTodos([...todos, newTodo])
  }

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          title: title.trim(),
          description: description.trim(),
        }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  const editTodo = (todo) => {
    setTitle(todo.title)
    setDescription(todo.description)
    setEditingId(todo.id)
  }

  const deleteTodo = (id) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id)
    setTodos(remainingTodos)

    if (editingId === id) {
      resetForm()
    }
  }

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  return (
    <section className="todo-section">
      <div className="todo-form-card">
        <p className="eyebrow">Task 3</p>
        <h1>Todo App</h1>

        <form onSubmit={handleSubmit}>
          <label className="todo-label" htmlFor="todo-title">
            Title
          </label>
          <input
            id="todo-title"
            className="todo-input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter todo title"
          />

          <label className="todo-label" htmlFor="todo-description">
            Description
          </label>
          <textarea
            id="todo-description"
            className="todo-textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter todo description"
          />

          <div className="todo-form-actions">
            <button type="submit" className="todo-submit-button">
              {editingId ? 'Update Todo' : 'Add Todo'}
            </button>

            {editingId && (
              <button
                type="button"
                className="todo-cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Add your first todo.</p>
        ) : (
          todos.map((todo) => (
            <article
              className={`todo-card ${todo.isCompleted ? 'completed' : ''}`}
              key={todo.id}
            >
              <div className="todo-card-header">
                <h2>{todo.title}</h2>
                <span className="todo-status">
                  {todo.isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>

              <p>{todo.description}</p>

              <div className="todo-card-actions">
                <button type="button" onClick={() => editTodo(todo)}>
                  Edit
                </button>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
                <button type="button" onClick={() => toggleCompleted(todo.id)}>
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default TodoApp
