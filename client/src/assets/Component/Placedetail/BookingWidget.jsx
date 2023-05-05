import React, { useContext, useEffect, useState } from 'react';
import {differenceInCalendarDays} from "date-fns";
import {Link, Navigate, useParams} from 'react-router-dom';
import axios from "axios";
import {UserContext} from "../../../UserContext";

export const BookingWidget = ({place}) => {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberMaxGuests,setnumberMaxGuests] = useState('');
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=> {
        if(user){
            setName(user.name);
        }
    })

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }


    const saveBooking = async () => {
       
        if(checkIn){
            const response = await axios.post('/bookings', 
                {
                checkIn,checkOut,numberMaxGuests,name,mobile,place:place._id,
                price:numberOfNights * place.price
            }
            );
            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        }else{
            alert('data kosong');
        }
        
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

  return (
    <>

        <div className='bg-white shadow shadow-slate-400  rounded-2xl px-4 py-6 '>
                    <span className='font-bold text-2xl text-black text-center'>
                        ${place.price}
                    </span> night

                    <div className='border rounded-xl px-2 py-2 mt-2 '>
                        <div className='flex'>
                            <div className='py-3 px-4  '>
                                <label>Check in :</label>
                                <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} required/>
                            </div>

                            <div className='py-3 px-4 border-l'>
                                <label>Check out :</label>
                                <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} required/>
                            </div>
                        </div>
                        <div>
                            <div className='py-3 px-4 border-t'>
                                <label>Number of guest :</label>
                                <input type="number" value={numberMaxGuests} onChange={ev => setnumberMaxGuests(ev.target.value)} required/>
                            </div>
                        </div>
                        {
                            numberOfNights > 0 && (
                                    <div className='py-3 px-4 border-t'>
                                        <label>Your full name :</label>
                                        <input type="text" value={name} onChange={ev => setName(ev.target.value)} required/>
                                        <label>Phone number:</label>
                                        <input type="tel" value={mobile} onChange={ev => setMobile(ev.target.value)} required/>
                                    </div>
                            )
                        }
                    </div>

                    <button onClick={saveBooking} className='mt-4 w-full px-2 py-4 rounded-xl bg-gradient-to-r
                            from-rose-500 to-red-500 text-white'>
                        <span className='mr-2'>
                            RESERVE
                        </span> 
                        {
                            numberOfNights > 0 && (
                                <span>
                                     ${numberOfNights * place.price}
                                </span>
                            )
                        }
                    </button>

        </div>
    </>
  )
}
