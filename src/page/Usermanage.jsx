import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { Link } from 'react-router-dom'; // นำเข้า Link จาก React Router
import './Usermanage.css';

const Usermanage = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://190.92.220.17:7000/api/booking');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // ดึงข้อมูลเริ่มต้น

    const interval = setInterval(() => {
      fetchData(); // ดึงข้อมูลทุก 5 วินาที
    }, 5000);

    return () => {
      clearInterval(interval); // ล้างตัวจับเวลาเมื่อคอมโพเนนต์ถูก unmount
    }
  }, []);

  return (
    <>
      <Sidebar />
      <div className="user-manage-container">
        <h1 className="user-manage-heading">ผู้จอง</h1>
        <p className="total-customers">จำนวนลูกค้าทั้งหมด: {data.length}</p>
        <ul className="user-list">
          {data.map((item, index) => (
            <li key={index} className="user-item">
              <strong className="user-info">Name:</strong> {item.name}<br />
              <strong className="user-info">Check In:</strong> {item.check_in}<br />
              <strong className="user-info">Check Out:</strong> {item.check_out}<br />
              <strong className="user-info">Email:</strong> {item.mail}<br />
              <strong className="user-info">Phone:</strong> {item.phone}<br />
              <strong className="user-info">Room Style:</strong> {item.roomstyle}<br />
              <strong className="user-info">User ID:</strong> {item.userId}<br />
              <strong className="user-info">สาขา:</strong> {item.branch}<br />
              <strong className="user-info">จำนวนห้อง:</strong> {item.room}<br />
              <strong className={`user-info ${item.status_booking === 0 ? 'unconfirmed' : 'confirmed'}`}>
                สถานะ: {item.status_booking === 0 ? 'รอยืนยัน' : 'ยืนยัน'}
              </strong><br />
            </li>
          ))}
        </ul>
        <Link className="back-link" to="/home">Home</Link>
      </div>
    </>
  );
};

export default Usermanage;
