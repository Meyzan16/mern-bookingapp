import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { AddressLink } from '../assets/Component/Placedetail/AddressLink';
import { PlaceGallery } from '../assets/Component/Placedetail/PlaceGallery';
import {differenceInCalendarDays} from "date-fns";
import { HiCalendar } from "react-icons/hi2";
import {format} from 'date-fns';


export const BookingDetail = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(()=>{
      if(id)
      {
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) =>  _id === id);
          if(foundBooking){
            setBooking(foundBooking);
          }
        })
      }
    }, [id]);

    if(!booking){
      return '';
    }

  return (
    <section>
      <div className="mt-10 ">
       <h1 className='text-2xl font-normal text-slate-800'>{booking.place.title}</h1>
        <AddressLink> 
          {booking.place.address}
        </AddressLink> 
        <div className='bg-gray-200 p-6 my-6 rounded-2xl md:max-w-lg w-full flex justify-between items-center'>
          <div>
             <h2 className='text-xl mb-4'>Your booking information : </h2>
                  <div  className='gap-2 pr-3 grow px-2 md:px-0'>
                      <div className='flex items-center gap-2 '>
                        <div className='flex items-center gap-2'>
                        <HiCalendar />
                        {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                        </div>
                        &rarr;
                        <div className='flex items-center gap-2'>
                        <HiCalendar />
                        {format(new Date(booking.checkOut), 'yyyy-MM-dd')} 
                        </div>
                      </div>
                  </div>
          </div>
          <div className='p-4 text-white bg-primary rounded-3xl'>
            <div>total price</div>
            <div className='text-3xl'>{booking.price}</div>
          </div>
          
        </div>

        <PlaceGallery place={booking.place }/>
        </div>
    </section>
    
  )
}
