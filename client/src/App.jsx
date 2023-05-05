
import "./App.css"
import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./Layout";
import { RegisterPage } from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import { PlacesPage } from "./pages/PlacesPage";
import { PlacesForm } from "./assets/Component/PlacesPage/PlacesForm";
import { Placedetail } from "./pages/Placedetail";
import { BookingsPage } from "./pages/BookingsPage";
import { BookingDetail } from "./pages/BookingDetail";


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.baseURL = "http://localhost:4000";

// untuk cookie
axios.defaults.withCredentials = true;

// console.log(import.meta.env.VITE_API_BASE_URL);

function App() {

  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={ <Layout />}> 
            <Route index element={ <IndexPage />} />
            <Route path="/login" element={ <LoginPage />} />
            <Route path="/register" element={ <RegisterPage />} />

            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesForm />} />
            <Route path="/account/places/:id" element={<PlacesForm />} />
            <Route path="/place/:id" element={<Placedetail />}/>

            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route path="/account/bookings/:id" element={<BookingDetail />} />
          </Route>
      </Routes>
    </UserContextProvider>
  )
  
}

export default App
