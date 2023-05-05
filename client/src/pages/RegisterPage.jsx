import React from "react"
import { useState } from "react"
import { Link,Navigate } from "react-router-dom"
import axios from "axios";
export const RegisterPage = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      axios.get('/test', );
      await axios.post('/register', {
        name,
        email,
        password,
      });
  
      alert('Registrasi successful. Now you can log in');
      setRedirect(true);
    }catch(e) {
      alert('Registration failed. Please try again later');
    }
  }

  if(redirect) {
    return <Navigate to={'/login'}/>
  }

  return (
    <section>
      <div className="mt-4 grow flex  items-center justify-around">
        <div className="my-36">
            <h1 className="text-4xl text-center mb-4">Register</h1>

                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                  
                    <input type="text"  placeholder="meyzan al Yutra" value={name} onChange={ev =>setName(ev.target.value)}/>
                    <input type="email"  placeholder="your@email.com" value={email} onChange={ev =>setEmail(ev.target.value)}/>
                    <input type="password"  placeholder="password" value={password} onChange={ev =>setPassword(ev.target.value)}/>

                    <button className="primary my-4">Register</button>

                    <div className="text-center text-gray-500">
                       Already a member ? <Link className="underline text-black" to={"/login"}>Login</Link>
                    </div>
                </form>
        </div>

       
      </div>
    </section>
  )
}
