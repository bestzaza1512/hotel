// utils.ts

export const setDatasets = (data) => {
    // ตรวจสอบให้แน่ใจว่า data ไม่ใช่ undefined
    if (!data) {
      return [];
    }
  
    // ทำการ map บน data
    return data.map((item) => {
      // ปรับปรุงข้อมูลอย่างเหมาะสม
      return {
        // ทำสิ่งที่คุณต้องการกับข้อมูล item
      };
    });
  };
  
  export const cloneData = (data) => {
    // ตรวจสอบให้แน่ใจว่า data ไม่ใช่ undefined
    if (!data) {
      return [];
    }
  
    // ทำการ map บน data
    return data.map((item) => {
      // ปรับปรุงข้อมูลอย่างเหมาะสม
      return {
        // ทำสิ่งที่คุณต้องการกับข้อมูล item
      };
    });
  };
  