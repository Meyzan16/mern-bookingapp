import axios from "axios";
import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import { Image } from "../assets/Image";

export const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(()=> {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, []);
  return (
    <section>
        <div className="mt-10  grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
          {
            places.length > 0 && places.map(place => (
              <div key={place._id}> 
                <Link  to={'/place/'+place._id}> 
                  <div className="bg-gray-500 rounded-2xl flex mb-4">
                    <Image className="aspect-square rounded-2xl object-cover" src={place.photos?.[0]} alt="" />
                  </div>
                
                  
                  <h2 className="text-bold text-md">
                    {place.address}
                  </h2>

                  <h3 className="text-md text-gray-500 truncate">
                    {place.title}
                  </h3>

                  <div className="mt-2 text-gray-500 text-base">
                    <span className="font-bold text-black">
                      $ {place.price}  
                    </span> per night
                  </div>

                </Link>
              </div>
            ))
          }
        </div>
    </section>
  )
}
