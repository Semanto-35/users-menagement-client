
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(name, email, user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=> {
      console.log(data);
      const newUsers = [...users, data]
      setUsers(newUsers)
      form.reset();
    })
  }
  return (
    <>
      <h1>Users Mensgement system</h1>
      <h3>Total users: {users.length}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Name' /><br />
        <input type="email" name="email" placeholder='Email' /><br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      {
        users.map((user) => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
      }
    </>
  )
}

export default App
