import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Footer } from './components/Footer'
import { FormUser } from './components/FormUser'
import { UserCard } from './components/UserCard'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [Modal, setModal] = useState(false)


  const getAllUsers = () => {
    const url = `https://users-crud.academlo.tech/users/`
    axios.get(url)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }

  const createNewUser = data => {
    const url = `https://users-crud.academlo.tech/users/`
    axios.post(url, data)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const deleteUserById = id => {
    const url = `https://users-crud.academlo.tech/users/${id}/`
    axios.delete(url)
    .then(res => {
      console.log(res)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const updateUserById = (id, data) => {
    const url = `https://users-crud.academlo.tech/users/${id}/`
    axios.put(url, data)
    .then(res => {
      console.log(res)
      getAllUsers()
      setUpdateInfo()
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  
  
  return (
    <div className="App">
      <div className='app__navbar'>
        <FormUser
          createNewUser={createNewUser}
          updateInfo={updateInfo}  
          setUpdateInfo={setUpdateInfo}
          updateUserById={updateUserById}
          Modal={Modal}
          setModal={setModal}
        />        
      </div>
      <div className='app__UsersCotainer'>
        {
          users?.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              deleteUserById={deleteUserById}
              setUpdateInfo={setUpdateInfo}
              updateUserById={updateUserById}
              setModal={setModal}
            />
          ))
        }
      </div>
      <Footer />
    </div>
  )
}

export default App
