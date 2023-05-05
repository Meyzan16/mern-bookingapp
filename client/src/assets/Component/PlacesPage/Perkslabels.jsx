import React from 'react'
import { HiOutlineWifi } from "react-icons/hi";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiOutlineTv } from "react-icons/hi2";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { HiOutlineTruck } from "react-icons/hi2";

export const Perkslabels = ({selected, onChange}) => {

    function handleClick(ev){
        const {checked,name} = ev.target;
        // console.log(ev.target.name);
        if(checked){
            onChange([...selected,name])
        }else{
            onChange([...selected.filter(selectedName => selectedName  !== name)]);

        }
    }

  return (
    <>
                                    <label className='border border-solid p-4 rounded-lg flex gap-2 items-center justify-center text-sm cursor-pointer'>
                                        <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handleClick} />
                                        <HiOutlineWifi className='text-xl'/>
                                        <span>Wifi</span>
                                    </label>
                                    <label className='border border-solid p-4 rounded-lg flex gap-2 items-center justify-center text-sm cursor-pointer'>
                                        <input type="checkbox"  checked={selected.includes('parking')} name='parking' onChange={handleClick} />
                                        <HiOutlineTruck className='text-xl'/>
                                        <span>Free parkir spot </span>
                                    </label>
                                    <label className='border border-solid p-4 rounded-lg flex gap-2 items-center justify-center text-sm cursor-pointer'>
                                        <input type="checkbox"  checked={selected.includes('tv')} name='tv' onChange={handleClick} />
                                        <HiOutlineTv className='text-xl'/>
                                        <span>TV</span>
                                    </label>

                                    <label className='border border-solid p-4 rounded-lg flex gap-2 items-center justify-center text-sm cursor-pointer'>
                                        <input type="checkbox"  checked={selected.includes('pets')} name='pets' onChange={handleClick} />
                                        <HiOutlineHandThumbUp className='text-xl'/>
                                        <span>Pets</span>
                                    </label>
                                    <label className='border border-solid p-4 rounded-lg flex gap-2 items-center justify-center text-sm cursor-pointer'>
                                        <input type="checkbox"  checked={selected.includes('entrance')} name='entrance' onChange={handleClick} />
                                        <HiArrowLeftOnRectangle className='text-xl'/>
                                        <span>Private entrance</span>
                                    </label>
    </>
  )
}
