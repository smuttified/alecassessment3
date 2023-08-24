import ReactDOM from 'react-dom/client';
import "./assets/css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import Booking from './pages/Booking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Logout from './pages/Logout';
import VehicleForm from './pages/VehicleForm';
import QRCodeGenerator from './pages/QRCodeGenerator';
import BookingRecords from './pages/BookingRecords';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/book/:type" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/bookings" element={<BookingRecords />} />
      <Route path="/admin/rentables/:id" element={<VehicleForm />} />
      <Route path="/qrcode" element={<QRCodeGenerator />} />
    </Routes>
  </BrowserRouter>
);