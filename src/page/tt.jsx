import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const tt = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://190.92.220.17:7000/api/booking');
       console.log(response.data);
        

        setData(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name}<br />
            <strong>Check In:</strong> {item.check_in}<br />
            <strong>Check Out:</strong> {item.check_out}<br />
            <strong>Mail:</strong> {item.mail}<br />
            <strong>Phone:</strong> {item.phone}<br />
            <strong>Room Style:</strong> {item.roomstyle}<br />
            <strong>User ID:</strong> {item.userId}<br />
            <strong>Branch:</strong> {item.branch}<br />
            <strong>Room:</strong> {item.room}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default tt;