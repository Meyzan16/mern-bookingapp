//mengecek jika sudah login maka ambil seluruh data nya

import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children})
{
    const [user,setUser] = useState(null);

    // set ready digunakan untuk halaman loading
    const [ready,setReady] = useState(false);

    useEffect(() => {
        //jika user tidak kosong, jalankan script berikut
        if(!user){
            axios.get('/profile').then(({data})=> {
                setUser(data);
                setReady(true);
            });
        }
    },[]); 

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
        
    );
}