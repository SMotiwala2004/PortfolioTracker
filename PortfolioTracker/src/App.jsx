import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  //Usernames
  const [username, setUsername] = useState('')
  //Password
  const [password, setPassword] = useState('')
  //Status
  const [status, setStatus] = useState('')
  //Error
  const [hasError, setHasError] = useState(false)
  //Navigate
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    setStatus('')
    setHasError(false)
    //retrieve endpoint
    axios.post('http://127.0.0.1:5000/login', {
      username: username,
      password: password
    })

    .then(response => { 
      setStatus(response.data.status);
      setHasError(response.data.status !== 'Login Successful');
      navigate('/Profile')
      
  })
    .catch(error => {
      console.error('There was an error logging in!', error);
      setStatus('Incorrect Login Username and/or Password.');
      setHasError(true);
   });
  };


  return (
    <>
    <div className='information'>
      <p>ⓘ Sign in with your Robinhood credentials<br/>to allow access to your Robinhood portfolio</p>
    </div>
    <div className="AuthForm">
      <form>
        <input id='email'
        type='email'
        placeholder='Email'
        value = {username}
        onChange={e => setUsername(e.target.value)}>
        </input>
        <input id='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}>
        </input>
        <button id = 'Login'
        onClick={handleLogin}
        >Login
        </button>
      </form>
    </div>
    </>
  )
}

export default App;
