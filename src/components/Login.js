import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credential, setCredential] = useState({email: "", password: ""})
    let history = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const response = await fetch("http://localhost:5000/api/auth/login", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: credential.email, password: credential.password })
      })
          const json = await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Logged in Successfully", "success")
          }
          else{
            // alert("Invalid credentials")
            props.showAlert("Invalid Details", "danger")
      
          }
    }
    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <form  onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" onChange={onChange} value={credential.email} className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} value = {credential.password} name='password' className="form-control" id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login