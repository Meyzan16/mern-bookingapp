import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AccountNav } from '../assets/Component/AccountNav/AccountNav';
// import { PlacesForm } from '../assets/Component/PlacesPage/PlacesForm';
import axios from 'axios';
import { Image } from '../assets/Image';
export const PlacesPage = () => {
    // ambil aksi apa yan di request account/places/NEW . url ke 3 merupakan actions
    // const {action} = useParams();
    // console.log(action);   

    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]); 


  return (
    <section>
            <AccountNav />
            <div className='text-center '>
                        <Link className='inline-flex bg-primary py-2 px-6 gap-1 text-white rounded-full' to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add new place
                        </Link>
            </div>
            <div className='w-full grid lg:grid-cols-2  mt-12 gap-5 '>
                {places.length > 0 && places.map(place => (
                    <div key={place._id}> 
                        <Link  to={'/account/places/'+place._id} className="flex cursor-pointer bg-gray-200 shadow-xl px-6 py-4 rounded-2xl gap-4 hover:bg-gray-300  ">
                            <div className='flex w-32 h-32 bg-gray-300 rounded-lg grow shrink-0 '>
                                {place.photos.length >0 && (
                                    <Image className='object-cover rounded-lg' src={place.photos[0]}  />
                                )}
                            </div>
                            <div className=' grow-0 shrink'>
                                <h2 className='text-xl font-semibold'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
    </section>
  )
}
