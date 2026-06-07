import { useEffect, useState } from 'react'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingUserId, setEditingUserId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  })

  // Fetch users once when this page opens.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users')

        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        const data = await response.json()
        setUsers(data)
      } catch {
        setError('Something went wrong while loading users.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const getFullName = (name) => {
    return `${name.firstname} ${name.lastname}`
  }

  const startEditing = (user) => {
    setEditingUserId(user.id)
    setEditForm({
      name: getFullName(user.name),
      username: user.username,
      email: user.email,
      phone: user.phone,
    })
  }

  const cancelEditing = () => {
    setEditingUserId(null)
    setEditForm({
      name: '',
      username: '',
      email: '',
      phone: '',
    })
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target

    setEditForm({
      ...editForm,
      [name]: value,
    })
  }

  const saveUser = (id) => {
    const [firstName = '', ...lastNameParts] = editForm.name.trim().split(' ')

    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: {
            firstname: firstName,
            lastname: lastNameParts.join(' '),
          },
          username: editForm.username,
          email: editForm.email,
          phone: editForm.phone,
        }
      }

      return user
    })

    setUsers(updatedUsers)
    cancelEditing()
  }

  const deleteUser = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?')

    if (!shouldDelete) {
      return
    }

    setUsers(users.filter((user) => user.id !== id))

    if (editingUserId === id) {
      cancelEditing()
    }
  }

  return (
    <main className="page">
      <div className="page-heading">
        <p className="eyebrow">Task 4B</p>
        <h1>Dashboard Users</h1>
      </div>

      <div className="dashboard-stats">
        <article className="dashboard-stat-card">
          <p>Total Users</p>
          <span>{users.length}</span>
        </article>

        <article className="dashboard-stat-card">
          <p>Active Users</p>
          <span>{users.length}</span>
        </article>
      </div>

      {loading && <p className="message-card">Loading users...</p>}
      {error && <p className="message-card error-message">{error}</p>}

      {!loading && !error && (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                      />
                    ) : (
                      getFullName(user.name)
                    )}
                  </td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        name="username"
                        value={editForm.username}
                        onChange={handleEditChange}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      {editingUserId === user.id ? (
                        <>
                          <button
                            type="button"
                            className="action-save"
                            onClick={() => saveUser(user.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="action-cancel"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="action-edit"
                          onClick={() => startEditing(user)}
                        >
                          Edit
                        </button>
                      )}

                      <button
                        type="button"
                        className="action-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default Dashboard
