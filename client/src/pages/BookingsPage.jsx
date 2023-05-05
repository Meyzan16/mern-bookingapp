import React, { useEffect, useState } from 'react'
import { AccountNav } from '../assets/Component/AccountNav/AccountNav'
import axios from 'axios';
import {format} from 'date-fns';
import {differenceInCalendarDays} from "date-fns";
import { HiCalendar } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { Image } from '../assets/Image';

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    })
  }, []);
  return (
    <section>
          <AccountNav />
          <div className=" md:max-w-3xl   xl:max-w-6xl mt-12 gap-5 mx-auto ">
              {bookings?.length > 0 && bookings.map(booking => (
              <div key={booking._id}> 
                <Link  to={'/account/bookings/'+booking._id} key={booking} className='mb-4 w-full md:flex block gap-4
                 bg-gray-200  rounded-2xl md:overflow-hidden'>
                    <div className='md:w-52'>
                      {booking.place.photos.length > 0 && (
                                    <Image className='object-cover rounded-lg' src={booking.place.photos[0]} alt="" />
                      )}
                    </div>

                    <div className='py-4 gap-2 pr-3 grow px-2 md:px-0'>
                      <h2 className='text-xl'>{booking.place.title}</h2>

                      <div className='border-t border-gray-300 mt-2 py-2 flex items-center gap-2'>
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
                      <div className='text-xl'>
                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights |
                        Total price : {booking.price}
                      </div>
                    </div>

                  
                </Link>
              </div>
              ))}

          </div>
    </section>
  )
}
