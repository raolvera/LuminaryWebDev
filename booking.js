let currentMonth = new Date().getMonth();
let currentYear = 2026;
let selectedDate = null;
let selectedTime = null;

// Simulated booked dates and times
const bookedDates = ['2026-02-15', '2026-02-20'];
const bookedTimes = {
  '2026-02-10': ['18:00', '19:00'],
  '2026-02-12': ['20:00']
};

const availableTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

function convertTo12Hour(time24) {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Open date picker
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('dateInput').addEventListener('click', openDatePicker);
  document.getElementById('timeInput').addEventListener('click', openTimePicker);
  renderCalendar();
});

function openDatePicker() {
  document.getElementById('datePickerModal').style.display = 'flex';
  renderCalendar();
}

function closeDatePicker() {
  document.getElementById('datePickerModal').style.display = 'none';
}

function openTimePicker() {
  if (!selectedDate) {
    alert('Please select a date first');
    return;
  }
  document.getElementById('timePickerModal').style.display = 'flex';
  renderTimeSlots();
}

function closeTimePicker() {
  document.getElementById('timePickerModal').style.display = 'none';
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function renderCalendar() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date();
  
  document.getElementById('monthYear').textContent = `${monthNames[currentMonth]} ${currentYear}`;
  
  let calendarHTML = '<div class="calendar-grid">';
  calendarHTML += '<div class="day-header">Sun</div><div class="day-header">Mon</div><div class="day-header">Tue</div>';
  calendarHTML += '<div class="day-header">Wed</div><div class="day-header">Thu</div><div class="day-header">Fri</div><div class="day-header">Sat</div>';
  
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<div class="day empty"></div>';
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    const isBooked = bookedDates.includes(dateStr);
    const isPast = new Date(dateStr) < today.setHours(0,0,0,0);
    
    let className = 'day';
    if (isToday) className += ' today';
    if (isBooked || isPast) className += ' booked';
    if (selectedDate === dateStr && !isBooked && !isPast) className += ' selected';
    
    calendarHTML += `<div class="${className}" onclick="selectDate('${dateStr}', ${isBooked || isPast})">${day}</div>`;
  }
  
  calendarHTML += '</div>';
  document.getElementById('calendar').innerHTML = calendarHTML;
}

function selectDate(dateStr, isBooked) {
  if (isBooked) return;
  selectedDate = dateStr;
  renderCalendar();
}

function confirmDate() {
  if (!selectedDate) {
    alert('Please select a date');
    return;
  }
  const date = new Date(selectedDate);
  document.getElementById('dateInput').value = date.toLocaleDateString('en-US', { 
    month: 'long', day: 'numeric', year: 'numeric' 
  });
  closeDatePicker();
}

function renderTimeSlots() {
  const bookedTimesForDate = bookedTimes[selectedDate] || [];
  let timeSlotsHTML = '<div class="time-grid">';
  
  availableTimes.forEach(time => {
    const isBooked = bookedTimesForDate.includes(time);
    const className = isBooked ? 'time-slot booked' : 'time-slot';
    const onclick = isBooked ? '' : `onclick="selectTime('${time}')"`;
    const displayTime = convertTo12Hour(time);
    timeSlotsHTML += `<div class="${className}" ${onclick}>${displayTime}</div>`;
  });
  
  timeSlotsHTML += '</div>';
  document.getElementById('timeSlots').innerHTML = timeSlotsHTML;
}

function selectTime(time) {
  selectedTime = time;
  document.getElementById('timeInput').value = convertTo12Hour(time);
  closeTimePicker();
}

function nextStep() {
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2').classList.remove('hidden');
  document.getElementById('stepIndicator').textContent = 'Step 2 of 2';
  document.getElementById('stepTitle').textContent = 'Contact Information';
}

function prevStep() {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('stepIndicator').textContent = 'Step 1 of 2';
  document.getElementById('stepTitle').textContent = 'Booking Information';
}
