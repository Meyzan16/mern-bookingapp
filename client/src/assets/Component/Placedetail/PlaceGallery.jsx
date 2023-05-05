
import React, { useEffect, useState } from 'react'
import { HiPhoto } from "react-icons/hi2";
import { Image } from '../../Image';

export const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos){
        return (
          <div className=' absolute inset-0 bg-black text-white min-h-screen '>
            <div className='bg-black p-8 grid gap-4 '>
                <div>
                    <h2 className='text-3xl text-center'>Photos of {place.title}</h2>
                    <button onClick={()=> setShowAllPhotos(false)} className='fixed bg-primary text-white py-2 px-4 rounded-lg'>
                        Close Photos
                    </button>

                </div>
                <div className=' grid mt-10  mx-auto gap-4 md:32  lg:px-64  justify-center mb-12'>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex flex-1 flex-col">
                                <img className="object-cover h-full md:h-96"     src={'http://localhost:4000/uploads/'+place.photos[0]} />
                            </div>
                            <div className=" md:flex flex-1 flex-row gap-2">
                                <div className="flex flex-1 flex-col">
                                    <img className="object-cover h-full md:h-64"     src={'http://localhost:4000/uploads/'+place.photos[1]} />
                                </div>
                                <div className=" md:flex flex-1 flex-col">
                                    <img className="object-cover h-full md:h-64"      src={'http://localhost:4000/uploads/'+place.photos[2]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="flex flex-1 flex-col">
                       
                                <img className="object-cover h-full md:h-96"     src={'http://localhost:4000/uploads/'+place.photos[3]} />
                            </div>
                            <div className=" md:flex flex-1 flex-row gap-2">
                                <div className="flex flex-1 flex-col">
                                    <img className="object-cover h-full md:h-64"     src={'http://localhost:4000/uploads/'+place.photos[4]} />
                                </div>
                                <div className=" md:flex flex-1 flex-col">
                                    <img className="object-cover h-full md:h-64"      src={'http://localhost:4000/uploads/'+place.photos[4]} />
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
          </div>
   
        );
    }


  return (
    <>
        <div className=" mt-6  mx-auto  relative bg-white">
                <div className="flex flex-col md:flex-row gap-2 rounded-2xl overflow-hidden">

                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-1 flex-col">
                          
                            {place.photos?.[0] && (
                                    <Image onClick={() => setShowAllPhotos(true)} className='object-cover h-full cursor-pointer' 
                                    src={place.photos[0]} alt="" />
                            )}
                           
                        </div>
                    </div>

                    <div className="flex flex-1">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                {place.photos?.[1] && (
                                    <Image onClick={() => setShowAllPhotos(true)}  className='h-full object-cover object-center cursor-pointer '  src={place.photos[1]} alt="" />
                                )}

                            </div>
                            <div>
                                        
                                {place.photos?.[2] && (
                                    <Image onClick={() => setShowAllPhotos(true)} className='h-full object-cover object-center cursor-pointer'  src={place.photos[2]} alt="" />
                                )}
                            </div>
                            <div>
                            
                                {place.photos?.[3] && (
                                    <Image onClick={() => setShowAllPhotos(true)} className='h-full object-cover object-center cursor-pointer'  src={place.photos[3]} alt="" />
                                )}
                            </div>
                            <div>
                              
                                {place.photos?.[4] && (
                                    <Image onClick={() => setShowAllPhotos(true)} className='h-full object-cover object-center cursor-pointer'  src={place.photos[4]} alt="" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} 
                    className='cursor-pointer flex items-center 
                    gap-2 absolute bottom-2 right-2 py-2 px-4 bg-slate-100 
                    rounded-2xl shadow-md shadow-gray-500'>
                                <HiPhoto /> Show all
                </button>
        </div>
    </>
  )
}
