import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './home'
import Login from './login'



function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(()=>{
    fetch('http://localhost:3000/logged_in',{
      credentials: 'include'
    })
    .then(res=>{
      if(res.ok){
        return res.json().then(data=>{
          setLoggedIn(true)
          setUser(data.user)
        })
      }
    })
    
  },[])

  const router = createBrowserRouter([
    {
      path: '/',
      element:  <Home verify={e=>setLoggedIn(e)} user={user}/>
    }
  ])



  return (
    <>
      {loggedIn ? <RouterProvider router={router}/> : <Login verify={e=>setLoggedIn(e)} user={e=>setUser(e)}/>}
    </>
  )
}

export default App
