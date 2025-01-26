document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date-input');
    const calendarButton = document.getElementById('calendar-button');
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    const datesContainer = document.getElementById('dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        currentMonthElement.textContent = `${getMonthName(month)} ${year}`;

        datesContainer.innerHTML = '';

        for (let i = 0; i < startingDay; i++) {
            const emptyDate = document.createElement('div');
            emptyDate.classList.add('date');
            datesContainer.appendChild(emptyDate);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = i;
            dateElement.addEventListener('click', () => selectDate(new Date(year, month, i)));
            datesContainer.appendChild(dateElement);
        }

        highlightSelectedDate();
    }

    function selectDate(date) {
        selectedDate = date;
        dateInput.value = formatDate(date);
        calendar.style.display = 'none';
        highlightSelectedDate();
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day} / ${month} / ${year}`;
    }

    function getMonthName(monthIndex) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthIndex];
    }

    function highlightSelectedDate() {
        const dates = document.querySelectorAll('.date');
        dates.forEach(date => {
            date.classList.remove('selected');
            if (selectedDate && date.textContent == selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) {
                date.classList.add('selected');
            }
        });
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    calendarButton.addEventListener('click', () => {
        calendar.style.display = calendar.style.display === 'block' ? 'none' : 'block';
    });

    renderCalendar(currentDate);
});