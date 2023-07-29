import React,{useState,useContext} from 'react';
import {FirebaseContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

  const history = useHistory()

  const {firebase} = useContext(FirebaseContext)
  const handleLogin = (e)=>{
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill out all fields');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
      }).catch((err)=>{
        alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {error && <p className="error-message">{error}</p>}
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{
          history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
