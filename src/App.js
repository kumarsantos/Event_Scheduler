import React,{useReducer,createContext} from 'react'
import {Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/HomePage/Home'
import Login from './components/UserAuthentication/Login'
import Register from './components/UserAuthentication/Register'
import CreateEvent from './components/EventCreation/CreateEvent'
import HeroSection from './components/HeroSection/HeroSection'
import Navbar from './components/Navbar/Navbar'
import { initialState, reducer } from './components/Reducers/UserReducer';

export const userContext=createContext();

const App = () => {
  const history=useHistory()


  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(()=>{
    const token=localStorage.getItem('token')
    const user=JSON.parse(localStorage.getItem('user'))
    if(!token){
        history.push('/')
    }
    else{
        dispatch({type:"USER",payload:{...user}})
        history.push('/home')
    }
   
},[])

  return (
    <userContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/' exact component={HeroSection} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/event' exact component={CreateEvent} />
      </Switch>
    </userContext.Provider>
  )
}

export default App
