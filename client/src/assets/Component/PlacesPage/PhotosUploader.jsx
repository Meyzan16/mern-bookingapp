import React from 'react'
import { HiCloudArrowUp } from "react-icons/hi2";
import { HiOutlineTrash, HiOutlineStar, HiStar } from "react-icons/hi2";
import { useState } from 'react';
import axios from "axios";
import { Image } from '../../Image';

export const PhotosUploader = ({addedPhoto, onChange}) => {

    //atau cara lain kasih parameter {addedPhotos, onChange} 
    const[photoLink,setphotoLink] = useState('');
    

    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-photo-by-link', {link:photoLink})
            onChange(prev => {
                return[...prev,filename];
            });
        setphotoLink('');
    }

    const uploadPhoto =  (ev) => {
        ev.preventDefault();
        const files = ev.target.files;
        const data = new FormData();
        for(let i = 0; i< files.length; i++){
            data.append('photos', files[i]);
        }

        axios.post('/upload-photo', data, {
            headers:{'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filename} = response;
            onChange(prev => {
                return[...prev, ...filename];
            });
        })
    }

    const removePhoto = (ev,filename) => {
        ev.preventDefault();
        onChange([...addedPhoto.filter(photo => photo !== filename)]);
        
    }

    //select photo thumbnail
    const selectAsMainPhoto = (ev,filename) => {
        ev.preventDefault();
        onChange([filename, ...addedPhoto.filter(photo => photo !== filename)]);
    }

  return (
    <>    
                            <div className='flex gap-4'>
                                    <input  value={photoLink} onChange={ev => setphotoLink(ev.target.value)} type="text" placeholder={'Add using a link ... jpg'} />
                                    <button onClick={addPhotoByLink} className='bg-gray-200 grow px-3 rounded-2xl text-sm'>Add&nbsp;Photo</button>
                            </div>
                            

                            <div className='mt-2 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 '>
                                {
                                    addedPhoto.length > 0 && addedPhoto.map(link =>(
                                        <div className='flex h-32 relative' key={link}> 
                                           <Image className='rounded-2xl w-full object-cover' src={link}  />
                                           <button onClick={(ev) => removePhoto(ev,link)} className='cursor-pointer absolute text-xl bottom-1  right-2 bg-black text-white p-1 rounded-2xl'>
                                                <HiOutlineTrash />
                                           </button>
                                           <button onClick={(ev) => selectAsMainPhoto(ev,link)} className='cursor-pointer absolute text-xl bottom-1  left-2 bg-black text-white p-1 rounded-2xl'>
                                                {link === addedPhoto[0] && (
                                                    <HiStar />
                                                )}
                                                {link !== addedPhoto[0] && (
                                                    <HiOutlineStar />
                                                )}
                                           </button>
                                        </div>
                                    ))
                                }
                                <label className='h-32 cursor-pointer border text-2xl text-gray-600 bg-transparent p-8 rounded-2xl w-full  flex items-center justify-center gap-3'>
                                    <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
                                    <HiCloudArrowUp className='text-2xl'/>
                                    Upload 
                                </label>
                            </div>
    </>
  )
}
