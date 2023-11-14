import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [selectedRoomFormat, setSelectedRoomFormat] = useState("Standard");
  const [roomData, setRoomData] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // เพิ่ม state สำหรับเก็บอีเวนต์ที่ถูกเลือก
  const [modalOpen, setModalOpen] = useState(false);

  const editBooking = (bookingId, status) => {
    // ดำเนินการตามตรรกะการยืนยันการจองของคุณที่นี่
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('http://190.92.220.17:7000/api/booking', {
          params: {
            roomFormat: selectedRoomFormat,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          console.log(response.data);
          setRoomData(data);
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการจอง", error);
      }
    };

    fetchBookingData();
  }, [selectedRoomFormat]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <>
      <Sidebar />
      <div className="calendar-container">
        <div className="calendar-heading">ปฏิทิน</div>
        <div className="filters">
          <label>
            รูปแบบห้อง:
            <select
              value={selectedRoomFormat}
              onChange={(e) => setSelectedRoomFormat(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Middle">Middle</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>
        <div className="Calendar">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh', width: '70vw' }}
          events={roomData.map((booking) => ({
            start: new Date(booking.check_in),
            end: new Date(booking.check_out),
            title: `${booking.name} (${moment(booking.check_in).format('MMM D, YYYY')} - ${moment(booking.check_out).format('MMM D, YYYY')})`,
            roomstyle: booking.roomstyle,
            phone: booking.phone,
            bookingId: booking.booking_id,

          }))}
          onSelectEvent={handleEventClick}
        />
      </div>

      <div className="App">
        {selectedEvent && (
          <Modal show={modalOpen} onHide={() => setModalOpen(false)} dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>ข้อมูลการจอง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEvent && (
                <div>
                  <p>ชื่อ: {selectedEvent.title}</p>
                  <p>เริ่มต้น: {moment(selectedEvent.start).format('MMM D, YYYY')}</p>
                  <p>สิ้นสุด: {moment(selectedEvent.end).format('MMM D, YYYY')}</p>
                  <p>roomstyle: {selectedEvent.roomstyle}</p>
                  <p>phone: {selectedEvent.phone}</p>
                  <p>Booking ID: {selectedEvent.bookingId}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                ปิด
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      </div>
    </>
  );
};

export default MyCalendar;