import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { PlacesPage } from './PlacesPage';
import { AccountNav } from '../assets/Component/AccountNav/AccountNav';

const AccountPage = () => {
  const {ready, user, setUser} = useContext(UserContext)
  const [redirect, setRedirect] = useState(null)

  // untuk memanggil nilai parameter di url
  let {subpage} = useParams();

  // console.log(subpage);

  if(subpage === undefined){
    subpage = 'account';
  }

  const logout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if(!ready){
    return <>
      <div className="container">
        Loading....
    </div>
    </>
  }

  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }

  
 
  // logout redirect
  if(redirect){
    return <Navigate to={redirect} />
  }


  return (
    <section>
      <div className="mx-auto w-full md:max-w-3xl   xl:max-w-6xl">
          <AccountNav />
          {
            subpage === 'account' && (
              <div className='leading-4 text-center'> 
                Logged in as {user.name} ({user.email})

                <button onClick={logout} className='bg-primary py-2 px-6 flex rounded-full mx-auto mt-4 text-white'>Logout</button>
              </div>
            )
          }   
          {
            subpage === 'places' && (
              <PlacesPage />
            )
          }

      </div>
  </section>
  )
}

export default AccountPage
