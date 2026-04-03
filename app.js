const schedules = {
    regular: [
        { name: "Period 0", start: "07:15", end: "08:15", duration: 60 },
        { name: "Community Meeting", start: "08:20", end: "08:30", duration: 10 },
        { name: "Period 1", start: "08:30", end: "09:27", duration: 57 },
        { name: "Period 2", start: "09:29", end: "10:26", duration: 57 },
        { name: "Period 3", start: "10:28", end: "11:25", duration: 57 },
        { name: "Period 4", start: "11:27", end: "12:24", duration: 57 },
        { name: "Period 5 (Lunch)", start: "12:26", end: "13:11", duration: 45 },
        { name: "Period 6", start: "13:13", end: "14:10", duration: 57 },
        { name: "Period 7", start: "14:12", end: "15:11", duration: 59 }
    ],
    wednesday: [
        { name: "Period 0", start: "07:15", end: "08:15", duration: 60 },
        { name: "Community Meeting", start: "08:20", end: "08:30", duration: 10 },
        { name: "Period 1", start: "08:30", end: "09:16", duration: 46 },
        { name: "Period 2", start: "09:18", end: "10:04", duration: 46 },
        { name: "Period 3", start: "10:06", end: "10:52", duration: 46 },
        { name: "Period 4 (Lunch)", start: "10:54", end: "11:39", duration: 45 },
        { name: "Period 5", start: "11:41", end: "12:27", duration: 46 },
        { name: "Period 6", start: "12:29", end: "13:15", duration: 46 },
        { name: "Period 7", start: "13:17", end: "14:05", duration: 48 }
    ]
};

function timeToMinutes(timeStr) {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
}

function update() {
    const now = new Date();
    const day = now.getDay(); // 3 = Wednesday
    const currentDayType = (day === 3) ? 'wednesday' : 'regular';
    
    document.getElementById('dayDisplay').textContent = (day === 3) ? "Wednesday Schedule Active" : "Regular Day Schedule Active";

    const currentMins = now.getHours() * 60 + now.getMinutes();
    const currentSecs = now.getSeconds();
    const schedule = schedules[currentDayType];
    
    let activeIdx = -1;
    const body = document.getElementById('scheduleBody');
    body.innerHTML = '';

    schedule.forEach((p, i) => {
        const start = timeToMinutes(p.start);
        const end = timeToMinutes(p.end);
        let status = "⏳ Wait";
        let rowClass = "";

        if (currentMins >= start && currentMins < end) {
            status = "🔵 Active";
            rowClass = "active-row";
            activeIdx = i;
        } else if (currentMins >= end) {
            status = "✅ Ended";
        }

        body.innerHTML += `<tr class="${rowClass}">
            <td>${p.name}</td>
            <td>${p.start}-${p.end}</td>
            <td>${p.duration}m</td>
            <td>${status}</td>
        </tr>`;
    });

    if (activeIdx !== -1) {
        const p = schedule[activeIdx];
        const start = timeToMinutes(p.start);
        const end = timeToMinutes(p.end);
        const remaining = end - (currentMins + currentSecs/60);
        const prog = ((currentMins + currentSecs/60 - start) / (end - start)) * 100;
        
        document.getElementById('currentPeriod').textContent = p.name;
        document.getElementById('timer').textContent = `${Math.floor(remaining)}:${Math.floor((remaining%1)*60).toString().padStart(2,'0')}`;
        document.getElementById('progress').style.width = prog + "%";
        document.getElementById('status').textContent = "Time remaining in class";
    } else {
        document.getElementById('currentPeriod').textContent = "No Class Active";
        document.getElementById('timer').textContent = "00:00";
        document.getElementById('progress').style.width = "0%";
        document.getElementById('status').textContent = "School is out or in break";
    }
}

setInterval(update, 1000);
update();
