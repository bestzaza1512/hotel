import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import './home.css';
import { filterData } from './filterUtils';
import Dash from "./Dash";


function Home() {
  // State variables
  const [dailyBookings, setDailyBookings] = useState([]);
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedRoomStyle, setSelectedRoomStyle] = useState('all');
  const [timestamps, setTimestamps] = useState([]); 

  // Fetch data from the API and set state variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://190.92.220.17:7000/api/booking');
        const data = response.data;
        setData(data);

        // Extract timestamps
        const timestamps = data.map(item => new Date(item.timestamp).getTime());
        setTimestamps(timestamps);

        const nameCounts = {};
        data.forEach(item => {
          if (nameCounts[item.name]) {
            nameCounts[item.name] += 1;
          } else {
            nameCounts[item.name] = 1;
          }
        });
        setDailyBookings(nameCounts);

        const currentDate = new Date();
        const weeklyData = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - i);
          const dateString = `${date.getMonth() + 1}/${date.getDate()}${currentDate.getFullYear()}`;
          const customers = nameCounts[dateString] || 0;
          weeklyData.unshift({ date: dateString, customers });
        }

        const monthlyResponse = await axios.get('http://190.92.220.17:7000/api/booking/timestamp-name');
        const monthlyData = monthlyResponse.data.map(item => {
          const date = new Date(item.timestamp);
          return {
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            customers: item.customers,
            // Add other data you need for the chart
          };
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle filter changes
  useEffect(() => {
    const filteredData = filterData(data, selectedStatus, selectedBranch, selectedRoomStyle);

    const nameCounts = {};
    filteredData.forEach(item => {
      if (nameCounts[item.name]) {
        nameCounts[item.name] += 1;
      } else {
        nameCounts[item.name] = 1;
      }
    });
    setDailyBookings(nameCounts);
  }, [data, selectedStatus, selectedBranch, selectedRoomStyle]);

  // Calculate the number of daily and monthly bookings
  const calculateDailyBookings = () => {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentTimestamp = currentDate.setHours(0, 0, 0, 0);

    const dailyData = data.filter(item => {
      const itemTimestamp = new Date(item.timestamp).getTime();
      return itemTimestamp >= currentTimestamp && itemTimestamp < currentTimestamp + 24 * 60 * 60 * 1000;
    });

    const monthlyData = data.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
    });

    const numberOfBookingsToday = dailyData.length;
    const numberOfBookingsThisMonth = monthlyData.length;

    return { today: numberOfBookingsToday, thisMonth: numberOfBookingsThisMonth };
  };

  // Filter data based on selected criteria
  const filteredData = filterData(data, selectedStatus, selectedBranch, selectedRoomStyle);

  

  return (
    <>
      <Sidebar />
      <div className="container">
        <div className="row">
          <h1 className="dashboard-heading">Dashboard</h1>
          <div className="card">
            <h2>จำนวนผู้จองในวันนี้: {calculateDailyBookings().today}</h2>
          </div>
          <div className="card">
            <Dash/>
          </div>
          <div className="card mt-3">
            <div className="filter-container">
              <label>สถานะ:</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="all">ทั้งหมด</option>
                <option value="confirmed">ยืนยัน</option>
                <option value="unconfirmed">รอยืนยัน</option>
              </select>
              <label>สาขา:</label>
              <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                <option value="all">ทั้งหมด</option>
                <option value="1">สาขา 1</option>
                <option value="2">สาขา 2</option>
                {/* Add other branch options */}
              </select>
              <label>รูปแบบห้อง:</label>
              <select value={selectedRoomStyle} onChange={(e) => setSelectedRoomStyle(e.target.value)}>
                <option value="all">ทั้งหมด</option>
                <option value="Standard">Standard</option>
                <option value="Middle">Middle</option>
                <option value="High">High</option>
                {/* Add other room style options */}
              </select>
            </div>
            
            <table className="booking-table">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">สาขา</th>
                  <th className="table-header">Room Style</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="table-data">{item.name}</td>
                    <td className="table-data">{item.branch}</td>
                    <td className="table-data">{item.roomstyle}</td>
                    <td className="table-data">{item.phone}</td>
                    <td className={`table-data ${item.status_booking === 0 ? 'unconfirmed' : 'confirmed'}`}>
                      {item.status_booking === 0 ? 'รอยืนยัน' : 'ยืนยัน'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
