import React, { useEffect } from 'react';
import { Perkslabels } from './Perkslabels';
import { PhotosUploader } from './PhotosUploader';
import { Link, Navigate, useParams } from 'react-router-dom';
// import Perks from '../assets/data/Perks.Js';
import { useState } from 'react';
import axios from "axios";
import { AccountNav } from '../AccountNav/AccountNav';

export const PlacesForm = () => {

    //ambil params id
    const {id} = useParams();
    // console.log(id);

     // const [getPerks, setPerks] = useState(Perks);
     const[title,setTitle] = useState('');
     const[address,setaddress] = useState('');
     const[addedPhoto,setaddedPhoto] = useState([]);
     
     const[description,setdescription] = useState('');
     const[perks,setperks] = useState([]);
     const[extraInfo,setextraInfo] = useState('');
     const[checkIn,setcheckIn] = useState('');
     const[checkOut,setcheckOut] = useState('');
     const[maxGuests,setmaxGuests] = useState(1);
     const[price,setprice] = useState(100);

      //  //redirect ketika selesai submit
    const[redirect, setredirect] = useState('');

    // jalankan useEffect ketika id yang dipanggil
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setaddress(data.address);
            setaddress(data.address);
            setaddedPhoto(data.photos);
            setdescription(data.description);
            setperks(data.perks);
            setextraInfo(data.extraInfo);
            setcheckIn(data.checkIn);
            setcheckOut(data.checkOut);
            setmaxGuests(data.maxGuests);
            setprice(data.price);
        })
    }, [id]);

    const inputHeader = (text) => {
        return (
            <h2 className='text-lg mt-1'>{text}</h2>
        )
    } 

    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm leading-relaxed'>
                {text}
            </p>
        )
    } 

    const preInput = (header,description) => {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    }  
    
    const savePlace = async (ev) =>
    {
        ev.preventDefault();

        const placeData = {
                title, 
                address, addedPhoto, description, perks,
                extraInfo, checkIn, checkOut, 
                maxGuests, price
        };
        
        if(id){
            // jika ada id nya maka update data
            await axios.put('/places', {
                id, ...placeData
            });
            setredirect('/account/places');
        }else{
            // jika tidak ada id maka add data baru
            //addnewPlace
            await axios.post('/places', placeData);
            // end addNewPlace
            setredirect('/account/places');
        }
    }

    if(redirect){
         return <Navigate to={redirect} />
    }

    const cancel =  () => {
        setredirect('/account/places');
    }


  return (
    <section>
        <div className="mx-auto w-full md:max-w-3xl   xl:max-w-6xl">
            <AccountNav />
            <div className='flex justify-center my-2'>
                <button onClick={cancel} className='bg-primary text-white py-2 px-4 rounded-full' >Cancel</button>
            </div>
            
            <div> 
                        <form onSubmit={savePlace}>
                            <div>
                                {preInput('Title', 'title your place. should be short and catchy as in advertisment')}
                                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title for example: My Lovly Apt'/>
                            </div>

                            <div>
                                {preInput('Address', 'Address to this place')}
                                <input type="text" value={address} onChange={ev => setaddress(ev.target.value)}  placeholder='address'/>
                            </div>

                            <div>
                                {preInput('Photos', 'Address to this place')}
                                {/* disini kasih nilai parameter mmasing masing */}
                                <PhotosUploader addedPhoto={addedPhoto} onChange={setaddedPhoto}/>
                            </div>     

                            <div>
                                {preInput('Description', 'desription of the place')}
                                <textarea value={description} onChange={ev => setdescription(ev.target.value)}/>
                            </div>

                            <div>
                                {preInput('Perks', 'select all the perks of your place')}
                                <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 mx-auto'>
                                    <Perkslabels selected={perks} onChange={setperks}/>
                                </div>
                            </div>

                            <div>
                                {preInput('Extra Info', 'house rules, etc')}
                                <textarea value={extraInfo} onChange={ev => setextraInfo(ev.target.value)}/>
                            </div>

                            <div>
                                {preInput('Check in&out times', 'add check in and out times, remember to have so time window for clearning the room between guests')}
                                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                                    <div>
                                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                                        <input type="text" value={checkIn} onChange={ev =>   setcheckIn(ev.target.value)} placeholder='14' />
                                    </div>
                                    <div>
                                         <h3 className='mt-2 -mb-1'>Check out time</h3>
                                        <input type="text" value={checkOut} onChange={ev =>   setcheckOut(ev.target.value)} placeholder='11' />
                                    </div>
                                    <div>
                                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                        <input type="number" value={maxGuests} onChange={ev =>  setmaxGuests(ev.target.value)}  />
                                    </div>
                                    <div>
                                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                                        <input type="number" value={price} onChange={ev =>  setprice(ev.target.value)}  />
                                    </div>
                                </div>
                            </div>

                            <div className='my-4'>
                                <button className='primary'>
                                    Save
                                </button>
                            </div>
                        </form>
            </div>
        </div>
    </section>

  )
}
