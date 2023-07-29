import React,{useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
import {useHistory} from 'react-router-dom'
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory()

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

  const [error, setError] = useState('');

  const {firebase} = useContext(FirebaseContext)
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!username || !email || !phone || !password) {
      setError('Please fill out all fields');
      return;
    }
    if (phone.length!=10) {
      setError('phone number must be 10 digit');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
            history.push("/login")
        }).catch((err)=>{
          setError(err.message);
        })
      }).catch((err)=>{
        setError(err.message);
      })
    }).catch((err)=>{
      setError(err.message);
    })
   console.log(firebase);
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a onClick={()=>{
            history.push('/login')
          }}>Login</a>
      </div>
    </div>
  );
}
