const TimeConverter = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedDate = `${day} ${monthNames[monthIndex]}`;

    return `${formattedTime}, ${formattedDate}`;
};

export default TimeConverter;
