import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn , handleSignOut, handleFBSignIn, initializeLoginFramwork, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './loginManager';

initializeLoginFramwork();

function Login() {
  const [newUser,setnewUser] = useState(false)
  const [User,setUser] = useState({
    isSignIn : false,
    name : '',
    email : '',
    password : "",
    photo : '',
    error : '',
    success : false
  })

  const [loggedInUser,setloggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || {  from: {pathname:"/"}};

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
    setUser(res)
    setloggedInUser(res)
    history.replace(from)
    })
  }

  const fbSignIn = () => {
    handleFBSignIn()
    .then(res => {
    setUser(res)
    setloggedInUser(res)
    history.replace(from)
    })
  } 

  const signOut = () => {
    handleSignOut()
    .then(res => {
    setUser(res)
    setloggedInUser(res)
    })
  }
  
  const handleblur = (event) => {
     //console.log(event.target.name, event.target.value);
     let isFormvalid = true;
     if(event.target.name === 'email'){
       const isEmailvalid = /\S+@\S+\.\S+/.test(event.target.value);
       isFormvalid = isEmailvalid;
     }
     if(event.target.name === 'password'){
       const isEmailvalid = event.target.value.length>7;
       const passwordHasNumber = /\d{1}/.test(event.target.value);
       isFormvalid = (isEmailvalid  && passwordHasNumber);
     }
     if(isFormvalid){
       const newUserInfo = {...User};
       newUserInfo[event.target.name] = event.target.value;
       setUser(newUserInfo);
     }
  }
  
  const handleSubmit = (event) => {
     if(newUser && User.email && User.password){
      createUserWithEmailAndPassword(User.name,User.email,User.password)
      .then(res => {
        setUser(res)
        setloggedInUser(res)
        history.replace(from)
        })
     }
     if(!newUser && User.email && User.password){
      signInWithEmailAndPassword(User.email,User.password)
      .then(res => {
        setUser(res)
        setloggedInUser(res)
        history.replace(from)
        })
     }
     event.preventDefault();
  }

  
 
  return (
    <div style={{textAlign : 'center'}}>
        {
          User.isSignIn ?  <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>
        }
        {
          User.isSignIn && <div>
             <p>Welcome, {User.name}</p>
             <p>Your email : {User.email}</p>
             <img src={User.photo} alt=""></img>
          </div>
        }
        <br/>
        
        <br/> <button onClick={fbSignIn}>Sign by Facebook</button>
        
        <br/>
        <h1>Our Own Authentication</h1>
        <input type="checkbox" name="newUser"  onChange={() => setnewUser(!newUser)} id="" />
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" placeholder="Enter Your Name" onBlur={handleblur} required></input>}
          <br></br>
          <input type="text" name="email" placeholder="Your Email Address" onBlur={handleblur} required></input>
          <br></br>
          <input type="password" name="password" placeholder="Your pasword" onBlur={handleblur} required></input>
          <br></br>
          <input type="submit" value={ newUser ? 'Sign Up' : 'Sign In'}></input>
        </form>
        <p style={{color:'red'}}>{User.error}</p>
        { User.success && <p style={{color:'#00c853'}}> User is successfully {newUser ? "created" : "Log In"}</p> } 
    </div>
  );
}

export default Login;
