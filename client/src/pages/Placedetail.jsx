import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { HiMapPin } from "react-icons/hi2";
import { BookingWidget } from '../assets/Component/Placedetail/BookingWidget';
import { PlaceGallery } from '../assets/Component/Placedetail/PlaceGallery';
import { AddressLink } from '../assets/Component/Placedetail/AddressLink';

export const Placedetail =  () => {
    const {id} = useParams();
    const [place,setPlaces] = useState(null);
    

    useEffect( () => {
        if(!id){
            return;
        }
        const a = axios.get(`/places/${id}`).then(response =>
        {
            setPlaces(response.data);
        });

    },[id]);

    if (!place) return '';
    
    // console.log(place);
    

  return (

    <section className='mt-10 xl:px-32  '>
        <h1 className='text-2xl font-normal text-slate-800'>{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>

        <PlaceGallery place={place}/>


        <div className='mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] '>
            <div>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>Description</h2>
                    {place.description}
                </div>

                Check-in : {place.checkIn} <br />
                Check-out : {place.checkOut} <br />
                Max number of guests: {place.maxGuests} 
            </div>

            <div>
                <BookingWidget place={place}/>
            </div>
        </div>

        <div className='mt-4'>
            <h2 className='font-semibold text-2xl'>Extra Info</h2>
        </div>
        <div className='text-sm text-gray-700 leading-relaxed mt-2 mb-4'>
                    {place.extraInfo}
        </div>
  
    </section>
  )
}
