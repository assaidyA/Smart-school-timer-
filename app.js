let currentLang = 'en';
let themeIndex = 0;
const themeNames = ['default', 'green', 'pink', 'gold', 'cyan'];

function nextTheme() {
    themeIndex = (themeIndex + 1) % themeNames.length;
    document.body.removeAttribute('data-theme');
    if (themeNames[themeIndex] !== 'default') {
        document.body.setAttribute('data-theme', themeNames[themeIndex]);
    }
}

function toggleNightMode() {
    document.body.classList.toggle('light-mode');
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const labels = {
        en: { p: "Period", s: "Subject", tr: "Teacher & Room", t: "Time", d: "Dur", st: "Status" },
        ar: { p: "الحصة", s: "المادة", tr: "الأستاذ والغرفة", t: "الوقت", d: "المدة", st: "الحالة" }
    };
    document.getElementById('lbl-p').innerText = labels[currentLang].p;
    document.getElementById('lbl-s').innerText = labels[currentLang].s;
    document.getElementById('lbl-tr').innerText = labels[currentLang].tr;
    document.getElementById('lbl-t').innerText = labels[currentLang].t;
    document.getElementById('lbl-d').innerText = labels[currentLang].d;
    document.getElementById('lbl-st').innerText = labels[currentLang].st;
    updateLive();
}

const timeSlots = [
    { start: "08:20", end: "08:30", dur: "10m" }, // 0
    { start: "08:30", end: "09:27", dur: "57m" }, // 1
    { start: "09:29", end: "10:26", dur: "57m" }, // 2
    { start: "10:28", end: "11:25", dur: "57m" }, // 3
    { start: "11:27", end: "12:24", dur: "57m" }, // 4
    { start: "12:26", end: "13:11", dur: "45m" }, // 5
    { start: "13:13", end: "14:10", dur: "57m" }, // 6
    { start: "14:12", end: "15:11", dur: "59m" }  // 7
];

const fullSchedule = {
    "Monday": [
        {s: "Community Meeting", tr: "No Teacher | RM 1ST"}, {s: "US and the World", tr: "Brodowski | RM 273"},
        {s: "AP Eng Lang 3", tr: "Rice | RM 272"}, {s: "Algebra 2", tr: "Lam | RM 276"},
        {s: "Targeted Instru", tr: "Irizarry | RM 179"}, {s: "Lunch", tr: "No Teacher | CAF"},
        {s: "Earth and Space", tr: "McMurray | RM 271"}, {s: "Physical Educat", tr: "Shehata | RM 183G"}
    ],
    "Tuesday": [
        {s: "Community Meeting", tr: "No Teacher | RM 1ST"}, {s: "Algebra 2", tr: "Lam | RM 276"},
        {s: "Targeted Instru", tr: "Irizarry | RM 179"}, {s: "Advisory 11", tr: "Sterner | RM 178"},
        {s: "US and the World", tr: "Brodowski | RM 273"}, {s: "Lunch", tr: "No Teacher | CAF"},
        {s: "AP Eng Lang 3", tr: "Rice | RM 272"}, {s: "Earth and Space", tr: "McMurray | RM 271"}
    ],
    "Wednesday": [
        {s: "Community Meeting", tr: "No Teacher | RM 1ST"}, {s: "AP Eng Lang 3", tr: "Rice | RM 272"},
        {s: "US and the World", tr: "Brodowski | RM 273"}, {s: "Junior Post Sec", tr: "Valentine | RM 267"},
        {s: "Lunch", tr: "No Teacher | CAF"}, {s: "Earth & Space Lab", tr: "McMurray | RM 179"},
        {s: "Targeted Instru", tr: "Irizarry | RM 276"}, {s: "Algebra 2", tr: "Lam | RM 271"}
    ],
    "Thursday": [
        {s: "Community Meeting", tr: "No Teacher | RM 1ST"}, {s: "Targeted Instru", tr: "Irizarry | RM 179"},
        {s: "Algebra 2", tr: "Lam | RM 276"}, {s: "AP Eng Lang 3", tr: "Rice | RM 272"},
        {s: "US and the World", tr: "Brodowski | RM 273"}, {s: "Lunch", tr: "No Teacher | CAF"},
        {s: "Earth and Space", tr: "McMurray | RM 271"}, {s: "Physical Educat", tr: "Shehata | RM 183G"}
    ],
    "Friday": [
        {s: "Community Meeting", tr: "No Teacher | RM 1ST"}, {s: "US and the World", tr: "Brodowski | RM 273"},
        {s: "Algebra 2", tr: "Lam | RM 276"}, {s: "Targeted Instru", tr: "Irizarry | RM 179"},
        {s: "Advisory 11", tr: "Sterner | RM 178"}, {s: "Lunch", tr: "No Teacher | CAF"},
        {s: "Earth and Space", tr: "McMurray | RM 271"}, {s: "AP Eng Lang 3", tr: "Rice | RM 272"}
    ]
};

function updateLive() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[now.getDay()];
    const curTotalMin = now.getHours() * 60 + now.getMinutes();
    const curSec = now.getSeconds();
    
    document.getElementById('current-day-display').innerText = now.toLocaleDateString(currentLang, { weekday: 'long' });

    if (dayName === "Saturday" || dayName === "Sunday") {
        document.getElementById('active-p-title').innerText = "WEEKEND";
        document.getElementById('live-counter').innerText = "OFF";
        document.getElementById('schedule-list').innerHTML = "<p style='text-align:center; padding:40px; opacity:0.5;'>Enjoy your weekend! ☕</p>";
        return;
    }

    const todayLessons = fullSchedule[dayName];
    let html = "";
    let activeFound = false;

    todayLessons.forEach((lesson, index) => {
        const slot = timeSlots[index];
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        const sT = sh * 60 + sm;
        const eT = eh * 60 + em;

        let status = curTotalMin >= eT ? "Ended ✅" : (curTotalMin >= sT ? "Active 🟢" : "Wait ⏳");
        
        if (status === "Active 🟢") {
            activeFound = true;
            const remMin = eT - curTotalMin - 1;
            const remSec = 60 - curSec;
            document.getElementById('active-p-title').innerText = `${index} PD: ${lesson.s.toUpperCase()}`;
            document.getElementById('live-counter').innerText = `${String(remMin).padStart(2, '0')}:${String(remSec === 60 ? 0 : remSec).padStart(2, '0')}`;
            document.getElementById('fill-bar').style.width = ((curTotalMin - sT) / (eT - sT) * 100) + "%";
            document.getElementById('p-time-info').innerText = `Ends at ${slot.end}`;
        }

        html += `<div class="period-card" style="${status === 'Active 🟢' ? 'border-left: 5px solid var(--accent); transform: scale(1.02);' : ''}">
            <span style="font-weight:bold; color: var(--accent);">${index} pd</span>
            <span>${lesson.s}</span>
            <span class="teacher-info">${lesson.tr}</span>
            <span style="color:var(--text-dim)">${slot.start} - ${slot.end}</span>
            <span>${slot.dur}</span>
            <span style="color:${status === 'Active 🟢' ? 'var(--accent)' : (status === 'Ended ✅' ? '#4ade80' : 'var(--white)')}">${status}</span>
        </div>`;
    });

    if (!activeFound) {
        document.getElementById('live-counter').innerText = "00:00";
        document.getElementById('active-p-title').innerText = curTotalMin < (8*60+20) ? "BEFORE SCHOOL" : "SCHOOL ENDED";
        document.getElementById('fill-bar').style.width = "0%";
    }
    document.getElementById('schedule-list').innerHTML = html;
}

setInterval(updateLive, 1000);
updateLive();
