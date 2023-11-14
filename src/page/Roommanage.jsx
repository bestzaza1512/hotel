import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import './Roommanage.css';

const localizer = momentLocalizer(moment);

const Roommanage = () => {
  const [selectedRoomFormat, setSelectedRoomFormat] = useState("Standard");
  const [roomData, setRoomData] = useState({
    Standard: 5,
    Middle: 5,
    High: 5,
  });
  const [roomAvailability, setRoomAvailability] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const generateEvents = () => {
      const startDate = moment().startOf('month');
      const endDate = moment().endOf('month');
      const daysInMonth = endDate.diff(startDate, 'days') + 1;

      const generatedEvents = [];

      for (let i = 0; i < daysInMonth; i++) {
        const currentDate = startDate.clone().add(i, 'days');
        const roomCount = roomAvailability[currentDate.format('YYYY-MM-DD')] || 0;

        generatedEvents.push({
          start: currentDate.toDate(),
          end: currentDate.toDate(),
          title: `${roomCount} ห้องว่าง`,
        });
      }

      setEvents(generatedEvents);
    };

    generateEvents();
  }, [roomAvailability]);

  const handleRoomFormatChange = (e) => {
    const format = e.target.value;
    setSelectedRoomFormat(format);
    // ทำการดึงข้อมูลห้องว่างจาก API หรือที่เก็บข้อมูล
    // แล้ว setRoomAvailability ตามรูปแบบและข้อมูลที่ดึงมา
  };

  const handleEventClick = (event, e) => {
    const newRoomCount = prompt("กรุณาใส่จำนวนห้องที่ต้องการเพิ่ม:");
    if (newRoomCount !== null) {
      const updatedRoomAvailability = {
        ...roomAvailability,
        [moment(event.start).format("YYYY-MM-DD")]: parseInt(newRoomCount, 10) || 0,
      };

      setRoomAvailability(updatedRoomAvailability);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="calendar-container">
        <div className="Roommanage-heading">Room</div>

        <div className="filters">
          <label>
            รูปแบบห้อง:
            <select value={selectedRoomFormat} onChange={handleRoomFormatChange}>
              <option value="Standard">Standard</option>
              <option value="Middle">Middle</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        <div className="Roommanage-Calendar">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={events}
            style={{ height: '80vh', width: '70vw' }}
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>
    </>
  );
};

export default Roommanage;
