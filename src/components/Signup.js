import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credential, setCredential] = useState({ name: "", email: "", password: "" })
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            // alert("Same user already exist")
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" onChange={onChange} value={credential.name} className="form-control" id="name" name='name' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} value={credential.email} className="form-control" id="email" name='email' minLength={5} required aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={onChange} value={credential.password} name='password' minLength={5} required className="form-control" id="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default Signup