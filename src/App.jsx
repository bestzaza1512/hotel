import React from "react";
import { Link,useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Usermanage from "./page/Usermanage";
import Roommanage from './page/Roommanage';
import Calendar from "./page/Calendar"
import RoomStatus from "./page/RoomStatus";
import tt from "./page/tt";
import Login from "./page/Login"; // เพิ่มการนำเข้าคอมโพเนนต์ Login
import Dash from "./page/Dash";
import { Modal } from "./page/Modal"

function App() {
  return (
    <>
      <div>
      
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/usermanage" element={<Usermanage />} />
        <Route path="/roommanage" element={<Roommanage />} />
        <Route path="/calendar" element={<Calendar />} /> 
        <Route path="/roomstatus" element={<RoomStatus />} />
        <Route path="/dash" element={<Dash/>} />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/tt" element={<tt/>}/>
        <Route path="/login" element={<Login />} /> {/* เพิ่มเส้นทางสำหรับหน้า Login */}
      </Routes>
    </>
  );
}

export default App;
