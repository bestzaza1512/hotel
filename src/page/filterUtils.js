// filterUtils.js

export const filterData = (data, selectedStatus, selectedBranch, selectedRoomStyle) => {
    let filteredData = data;
  
    if (selectedStatus !== 'all') {
      filteredData = filteredData.filter((item) => item.status_booking === (selectedStatus === 'confirmed' ? 1 : 0));
    }
  
    if (selectedBranch !== 'all') {
      filteredData = filteredData.filter((item) => item.branch === parseInt(selectedBranch));
    }
  
    if (selectedRoomStyle !== 'all') {
      filteredData = filteredData.filter((item) => item.roomstyle === selectedRoomStyle);
    }
  
    return filteredData;
  };
 