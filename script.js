document.addEventListener('DOMContentLoaded', function() {
    // Set initial color
    document.documentElement.style.setProperty('--clock-color', getRandomColor());
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Change color every 5 seconds
    setInterval(changeColor, 5000);
});

function updateTime() {
    const now = new Date();
    
    // Update time in 12-hour format
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const hoursStr = hours.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('hours').textContent = hoursStr;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Add AM/PM indicator - make sure you have an element with id 'ampm' in your HTML
    if (document.getElementById('ampm')) {
        document.getElementById('ampm').textContent = ampm;
    } else {
        // If the element doesn't exist, create it after the seconds element
        const secondsElement = document.getElementById('seconds');
        const ampmElement = document.createElement('div');
        ampmElement.id = 'ampm';
        ampmElement.className = 'ampm';
        ampmElement.textContent = ampm;
        secondsElement.parentNode.appendChild(ampmElement);
    }
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = dateString;
    
    // Add animation to the changing digit
    animateDigitChange('seconds', seconds);
    if (seconds === '00') animateDigitChange('minutes', minutes);
    if (seconds === '00' && minutes === '00') animateDigitChange('hours', hoursStr);
}

function animateDigitChange(elementId, newValue) {
    const element = document.getElementById(elementId);
    element.classList.add('changing');
    
    setTimeout(() => {
        element.classList.remove('changing');
    }, 500);
}

function changeColor() {
    const newColor = getRandomColor();
    document.documentElement.style.setProperty('--clock-color', newColor);
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}