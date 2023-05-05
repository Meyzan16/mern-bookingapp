import React, { useContext } from "react"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import {UserContext} from "../UserContext";
import axios from "axios";

export const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);


  const {setUser} = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      });
      setUser(data);
      alert('login  successful');
      setRedirect(true);
    }catch(e) {
      alert('login failed');
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <section>
      <div className="mt-4 flex  items-center justify-around">
        <div className="my-36">
            <h1 className="text-4xl text-center mb-4">Login</h1>
    
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email"  placeholder="your@email.com" value={email} onChange={ev =>setEmail(ev.target.value)} />
                    <input type="password"  placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />

                    <button className="primary my-4">Login</button>

                    <div className="text-center text-gray-500">
                        Don"t have an account yet ? <Link className="underline text-black" to={"/register"}>Register</Link>
                    </div>
                </form>
        </div>

       
      </div>
    </section>
  )
}
