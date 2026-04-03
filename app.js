const weekSchedule = {
    "Monday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "US and the World", start: "08:20", end: "09:27" },
        { name: "AP Eng Lang 3", start: "09:29", end: "10:26" },
        { name: "Algebra 2 Term", start: "10:28", end: "11:25" },
        { name: "Lunch", start: "11:27", end: "12:24" },
        { name: "Earth and Space", start: "12:26", end: "13:11" },
        { name: "Targeted Instruct", start: "13:13", end: "14:10" },
        { name: "Physical Education", start: "14:12", end: "15:11" } // الحصة الثامنة
    ],
    "Tuesday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "Algebra 2 Term", start: "08:20", end: "09:27" },
        { name: "Advisory 11", start: "09:29", end: "10:26" },
        { name: "US and the World", start: "10:28", end: "11:25" },
        { name: "Lunch", start: "11:27", end: "12:24" },
        { name: "AP Eng Lang 3", start: "12:26", end: "13:11" },
        { name: "Earth and Space", start: "13:13", end: "14:10" }
    ],
    "Wednesday": [ // جدول الأربعاء القصير
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "AP Eng Lang 3", start: "08:30", end: "09:16" },
        { name: "US and the World", start: "09:18", end: "10:04" },
        { name: "Junior Prep Seminar", start: "10:06", end: "10:52" },
        { name: "Lunch", start: "10:54", end: "11:39" },
        { name: "Earth and Space", start: "11:41", end: "12:27" },
        { name: "Targeted Instruct", start: "12:29", end: "1:15" },
        { name: "Algebra 2 Term", start: "13:17", end: "14:05" }
    ],
    "Thursday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "Targeted Instruct", start: "08:20", end: "09:27" },
        { name: "Algebra 2 Term", start: "09:29", end: "10:26" },
        { name: "AP Eng Lang 3", start: "10:28", end: "11:25" },
        { name: "US and the World", start: "11:27", end: "12:24" },
        { name: "Lunch", start: "12:26", end: "13:11" },
        { name: "Earth and Space", start: "13:13", end: "14:10" },
        { name: "Physical Education", start: "14:12", end: "15:11" } // الحصة الثامنة
    ],
    "Friday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "US and the World", start: "08:20", end: "09:27" },
        { name: "Algebra 2 Term", start: "09:29", end: "10:26" },
        { name: "Targeted Instruct", start: "10:28", end: "11:25" },
        { name: "Advisory 11", start: "11:27", end: "12:24" },
        { name: "Lunch", start: "12:26", end: "13:11" },
        { name: "AP Eng Lang 3", start: "13:13", end: "14:10" }
    ]
};

function changeTheme(val) { document.body.className = val + (document.body.classList.contains('light-mode') ? ' light-mode' : ''); }
function toggleMode() { document.body.classList.toggle('light-mode'); }

function update() {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    document.getElementById('day-display').innerText = now.toLocaleDateString('ar-SA', {weekday:'long'});

    const todayData = weekSchedule[dayName] || [];
    let html = "", activeFound = false;

    todayData.forEach(p => {
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const startT = sH * 60 + sM, endT = eH * 60 + eM;
        let rowClass = "";

        if (currentTime >= startT && currentTime < endT) {
            rowClass = "active-row"; activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            const diff = (endT * 60) - (now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds());
            const h = Math.floor(diff/3600), m = Math.floor((diff%3600)/60), s = diff%60;
            document.getElementById('timer').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
            document.getElementById('progress-bar').style.width = ((currentTime - startT) / (endT - startT) * 100) + "%";
        }
        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${endT-startT}m</td><td>${currentTime >= endT ? "✅" : (rowClass ? "🟢" : "⏳")}</td></tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html || '<tr><td colspan="4">عطلة نهاية الأسبوع 🌴</td></tr>';
    if (!activeFound) { document.getElementById('active-period-name').innerText = "انتهى اليوم الدراسي"; document.getElementById('timer').innerText = "00:00:00"; }
}

setInterval(update, 1000);
update();
