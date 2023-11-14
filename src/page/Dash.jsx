import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';




  
const Dash = () => {
  const [data, setData] = useState([]);




  const countCustomersPerDay = () => {
    if (data && data.length > 0) {
      // ให้ใช้ reduce เพื่อนับจำนวนลูกค้า
      const customerCountPerDay = data.reduce((acc, entry) => {
        // ตรวจสอบว่ามี timestamp และ name ในข้อมูลหรือไม่
        if (entry.timestamp && entry.name) {
          // แปลง timestamp เป็นวันที่เพื่อเปรียบเทียบ
          const entryDate = new Date(entry.timestamp);
          const entryDay = entryDate.toISOString().split('T')[0];

          // ตรวจสอบว่าวันที่นับมีในผลลัพธ์หรือยัง
          if (!acc[entryDay]) {
            acc[entryDay] = 0;
          }

          // นับจำนวนลูกค้าตามวัน
          acc[entryDay]++;
        }
        return acc;
      }, {});

      // พิมพ์ผลลัพธ์ใน console
      console.log('จำนวนลูกค้าที่มีในแต่ละวัน:', customerCountPerDay);

      // สามารถนำผลลัพธ์ไปใช้งานต่อได้ตามต้องการ
      return customerCountPerDay;
    }
  };


  useEffect(() => {
    asyncFetch();
    
  }, []);

  const asyncFetch = () => {
    fetch('http://190.92.220.17:7000/api/booking/timestamp-name')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        // ดูข้อมูลที่ได้จาก API ใน console
        //console.log(json);
        setData(json);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:', error);
      });
  };

  const config = {
    data,
    padding: 'auto',
    xField: 'timestamp',
    yField: 'name',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return (
    <div>
      <Line {...config} />
    </div>
  );
};

export default Dash ;