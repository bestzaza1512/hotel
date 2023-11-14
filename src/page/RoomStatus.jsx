import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import './RoomStatus.css';

const RoomStatus = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://190.92.220.17:7000/api/booking');
      setData(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const editBooking = (id, status_booking, check_out, mail, phone, check_in, name, roomstyle, userId, branch, room) => {
    const updatedData = {
      booking_id: id,
      check_out: check_out,
      mail: mail,
      phone: phone,
      status_booking: status_booking === 0 ? 1 : 0,
      check_in: check_in,
      name: name,
      roomstyle: roomstyle,
      userId: userId,
      branch: branch,
      room: room
    };

    axios.post("http://190.92.220.17:7000/api/booking/", updatedData)
      .then((response) => {
        if (response) {
          console.log('อัปเดตสถานะเรียบร้อย', response);
          // อัปเดตข้อมูลในสถานะ
          fetchData();
        }
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ:', error);
      });
  };

  const filterData = () => {
    let filteredData = data;

    if (selectedStatus !== 'all') {
      filteredData = filteredData.filter((item) => item.status_booking === (selectedStatus === 'confirmed' ? 1 : 0));
    }

    if (selectedBranch !== 'all') {
      filteredData = filteredData.filter((item) => item.branch === parseInt(selectedBranch));
    }

    return filteredData;
  };

  return (
    <>
      <Sidebar />
      <div className="room-status-container">
        <h1 className="status-heading">ข้อมูลการจองของลูกค้า</h1>
        <label className="status-label">สถานะการจอง:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-select"
        >
          <option value="all">รวม</option>
          <option value="confirmed">ยืนยัน</option>
          <option value="unconfirmed">รอยืนยัน</option>
        </select>
        <label className="branch-label">สาขา:</label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="branch-select"
        >
          <option value="all">รวม</option>
          <option value="1">สาขา 1</option>
          <option value="2">สาขา 2</option>
          {/* เพิ่มตามจำนวนสาขาที่คุณมี */}
        </select>
        <div className="room-List">
        <ul className="room-list">
          {filterData().map((item, index) => (
            <li key={index} className="room-item">
              <strong className="room-info">ชื่อ:</strong> {item.name}<br />
              <strong className="room-info">สาขา:</strong> {item.branch}<br />
              <strong className="room-info">จำนวนห้อง:</strong> {item.room}<br />
              <strong className="room-info">Room Style:</strong> {item.roomstyle}<br />
              <strong className="room-info">Check In:</strong> {item.check_in}<br />
              <strong className="room-info">Check out:</strong> {item.check_out}<br />

              <strong className="room-info">สถานะ:</strong>
              <strong className={`room-status ${item.status === 0 ? 'awaiting-confirmation' : 'confirmed'}`}>
                {item.status_booking === 0 ? 'รอยืนยัน' : 'ยืนยัน'}
              </strong><br />
              <button
                onClick={() => editBooking(item.booking_id, item.status_booking, item.check_out, item.mail, item.phone, item.check_in, item.name, item.roomstyle, item.userId, item.branch, item.room)}
                className={item.status_booking === 0 ? 'confirm-button' : 'cancel-button'}
              >
                {item.status_booking === 0 ? 'ยืนยัน' : 'ยกเลิก'}
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </>
  );
};

export default RoomStatus;
