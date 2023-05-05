import React from 'react';
import { HiMapPin } from "react-icons/hi2";

export const AddressLink = ({children}) => {
  return (
    <>
        <div>
            
            <a className='flex items-center my-2 gap-2 text-lg font-semibold underline' target='_blank' 
            href={'https://maps.google.com/?q='+children}>
                <HiMapPin />
                {children}</a>
        </div>
    </>
  )
}
