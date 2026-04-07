let currentLang = 'ar';
let btnColorIdx = 0;
let fullThemeIdx = 0;

const btnColors = ['btn-default', 'btn-green', 'btn-red', 'btn-gold'];
const fullThemes = ['bg-default', 'bg-dark-blue', 'bg-dark-green', 'bg-dark-red'];

const dictionary = {
    ar: {
        title: "نيكسيت بيريود", tagline: "مؤقت الجرس الذكي", p: "الحصة", s: "المادة", tr: "المعلم", t: "الوقت", d: "المدة", st: "الحالة",
        now: "الحالية: ", next: "القادمة: ", ended: "انتهت ✅", active: "جارية 🟢", wait: "انتظار ⏳", schoolStart: "بداية الدوام 🔔",
        footer: "NextPeriod ©️ - تحديث تلقائي كل ثانية"
    },
    en: {
        title: "NextPeriod", tagline: "Smart Bell Schedule Countdown", p: "Period", s: "Subject", tr: "Teacher", t: "Time", d: "Dur", st: "Status",
        now: "Current: ", next: "Next: ", ended: "Ended ✅", active: "Active 🟢", wait: "Wait ⏳", schoolStart: "School Starts 🔔",
        footer: "NextPeriod ©️ - Auto-updates every second"
    }
};

const bellTimes = [
    { start: "07:15", end: "08:15", dur: "60m" },
    { start: "08:20", end: "08:30", dur: "10m" },
    { start: "08:30", end: "09:27", dur: "57m" },
    { start: "09:29", end: "10:26", dur: "57m" },
    { start: "10:28", end: "11:25", dur: "57m" },
    { start: "11:27", end: "12:24", dur: "57m" },
    { start: "12:26", end: "13:11", dur: "45m" },
    { start: "13:13", end: "14:10", dur: "57m" },
    { start: "14:12", end: "15:11", dur: "59m" }
];

const schedule = {
    "Tuesday": [
        { ar: {s:"فطور 🍳", tr:"CAF"}, en: {s:"Breakfast 🍳", tr:"CAF"} },
        { ar: {s:"اجتماع مجتمعي 🤝", tr:"IST"}, en: {s:"Community Mtg 🤝", tr:"IST"} },
        { ar: {s:"جبر 2 📐", tr:"Lam | 276"}, en: {s:"Algebra 2 📐", tr:"Lam | 276"} },
        { ar: {s:"تعليم موجه 🎯", tr:"Irizarry | 179"}, en: {s:"Targeted 🎯", tr:"Irizarry | 179"} },
        { ar: {s:"إرشاد 📋", tr:"Sterner | 178"}, en: {s:"Advisory 📋", tr:"Sterner | 178"} },
        { ar: {s:"أمريكا والعالم 🌎", tr:"Brodowski | 273"}, en: {s:"US World 🌎", tr:"Brodowski | 273"} },
        { ar: {s:"غداء 🍱", tr:"CAF"}, en: {s:"Lunch 🍱", tr:"CAF"} },
        { ar: {s:"AP Eng Lang 3 📚", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3 📚", tr:"Rice | 272"} },
        { ar: {s:"علوم الأرض 🌋", tr:"McMurray | 271"}, en: {s:"Earth Sci 🌋", tr:"McMurray | 271"} }
    ]
};

function update() {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTotalSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const d = dictionary[currentLang];
    
    document.getElementById('current-day-display').innerText = now.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long' });

    let lessons = schedule[dayName] || [];
    let html = "";
    let targetSec = null;
    let targetTitle = "";

    for (let i = 0; i < bellTimes.length; i++) {
        const slot = bellTimes[i];
        const lesson = lessons[i] || { ar: {s:"--", tr:"--"}, en: {s:"--", tr:"--"} };
        
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        const sSec = sh * 3600 + sm * 60;
        const eSec = eh * 3600 + em * 60;

        if (currentTotalSec >= sSec && currentTotalSec < eSec) {
            targetSec = eSec - currentTotalSec;
            targetTitle = d.now + lesson[currentLang].s;
            document.getElementById('fill-bar').style.width = ((currentTotalSec - sSec) / (eSec - sSec) * 100) + "%";
        } 
        else if (currentTotalSec < sSec && targetSec === null) {
            targetSec = sSec - currentTotalSec;
            targetTitle = d.next + lesson[currentLang].s;
            document.getElementById('fill-bar').style.width = "0%";
        }

        let status = currentTotalSec >= eSec ? d.ended : (currentTotalSec >= sSec ? d.active : d.wait);
        let pLabel = i === 0 ? "0" : (i === 1 ? "Mtg" : i-1);
        
        html += `<div class="period-card" style="${currentTotalSec >= sSec && currentTotalSec < eSec ? 'border: 2px solid var(--accent);' : ''}">
            <span style="color:var(--accent); font-weight:bold;">${pLabel}</span>
            <span style="font-weight:600;">${lesson[currentLang].s}</span>
            <span>${lesson[currentLang].tr}</span>
            <span style="direction:ltr;">${slot.start}-${slot.end}</span>
            <span>${slot.dur}</span>
            <span>${status}</span>
        </div>`;
    }

    if (targetSec === null) {
        const firstStart = bellTimes[0].start.split(":");
        const schoolStartSec = (parseInt(firstStart[0]) * 3600) + (parseInt(firstStart[1]) * 60);
        targetSec = (86400 - currentTotalSec) + schoolStartSec;
        targetTitle = d.schoolStart;
        document.getElementById('fill-bar').style.width = "100%";
    }

    const h = Math.floor(targetSec / 3600);
    const m = Math.floor((targetSec % 3600) / 60);
    const s = targetSec % 60;
    
    document.getElementById('active-p-title').innerText = targetTitle;
    document.getElementById('live-counter').innerText = 
        `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

    document.getElementById('schedule-list').innerHTML = html;
}

// أصلحنا هنا دوال الألوان لتعمل فوراً
function nextBtnColor() { 
    document.body.classList.remove(...btnColors);
    btnColorIdx = (btnColorIdx + 1) % btnColors.length;
    document.body.classList.add(btnColors[btnColorIdx]);
}

function nextFullTheme() {
    document.body.classList.remove(...fullThemes);
    fullThemeIdx = (fullThemeIdx + 1) % fullThemes.length;
    document.body.classList.add(fullThemes[fullThemeIdx]);
}

function toggleNightMode() { 
    document.body.classList.toggle('light-mode'); 
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const d = dictionary[currentLang];
    document.getElementById('nav-title').innerText = d.title;
    document.getElementById('nav-tagline').innerText = d.tagline;
    document.getElementById('lbl-p').innerText = d.p;
    document.getElementById('lbl-s').innerText = d.s;
    document.getElementById('lbl-tr').innerText = d.tr;
    document.getElementById('lbl-t').innerText = d.t;
    document.getElementById('lbl-d').innerText = d.d;
    document.getElementById('lbl-st').innerText = d.st;
    document.getElementById('footer-text').innerText = d.footer;
    update();
}

setInterval(update, 1000);
update();
