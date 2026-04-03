const weekSchedule = {
    "Monday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "US and the World", start: "08:20", end: "09:27" },
        { name: "AP Eng Lang 3", start: "09:29", end: "10:26" },
        { name: "Algebra 2 Term", start: "10:28", end: "11:25" },
        { name: "Lunch (4-day)", start: "11:27", end: "12:24" },
        { name: "Earth and Space", start: "12:26", end: "13:11" },
        { name: "Physical Education", start: "13:13", end: "14:10" }
    ],
    "Tuesday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "Algebra 2 Term", start: "08:20", end: "09:27" },
        { name: "Advisory 11", start: "09:29", end: "10:26" },
        { name: "US and the World", start: "10:28", end: "11:25" },
        { name: "Lunch (4-day)", start: "11:27", end: "12:24" },
        { name: "AP Eng Lang 3", start: "12:26", end: "13:11" },
        { name: "Earth and Space", start: "13:13", end: "14:10" }
    ],
    "Wednesday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "AP Eng Lang 3", start: "08:20", end: "09:27" },
        { name: "US and the World", start: "09:29", end: "10:26" },
        { name: "Junior Prep Seminar", start: "10:28", end: "11:25" },
        { name: "Earth and Space", start: "11:27", end: "12:24" },
        { name: "Targeted Instruct", start: "12:26", end: "13:11" },
        { name: "Algebra 2 Term", start: "13:13", end: "14:10" }
    ],
    "Thursday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "Targeted Instruct", start: "08:20", end: "09:27" },
        { name: "Algebra 2 Term", start: "09:29", end: "10:26" },
        { name: "AP Eng Lang 3", start: "10:28", end: "11:25" },
        { name: "US and the World", start: "11:27", end: "12:24" },
        { name: "Lunch (4-day)", start: "12:26", end: "13:11" },
        { name: "Earth and Space", start: "13:13", end: "14:10" }
    ],
    "Friday": [
        { name: "Community Meet", start: "07:15", end: "08:15" },
        { name: "US and the World", start: "08:20", end: "09:27" },
        { name: "Algebra 2 Term", start: "09:29", end: "10:26" },
        { name: "Targeted Instruct", start: "10:28", end: "11:25" },
        { name: "Advisory 11", start: "11:27", end: "12:24" },
        { name: "Lunch (4-day)", start: "12:26", end: "13:11" },
        { name: "AP Eng Lang 3", start: "13:13", end: "14:10" }
    ]
};

const translations = {
    en: { h_p: "Period", h_t: "Time", h_d: "Dur", h_s: "Status", week: "Happy Weekend! 🌴", cur: "Now", over: "Day Ended" },
    ar: { h_p: "الحصة", h_t: "الوقت", h_d: "المدة", h_s: "الحالة", week: "عطلة سعيدة! 🌴", cur: "الحصة الحالية", over: "انتهى اليوم" },
    es: { h_p: "Periodo", h_t: "Hora", h_d: "Dur", h_s: "Estado", week: "¡Buen Finde! 🌴", cur: "Actual", over: "Terminado" }
};

let currentLang = 'ar';

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.getElementById('theme-btn').innerText = document.body.classList.contains('light-mode') ? "🌙 Dark Mode" : "☀️ Light Mode";
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const t = translations[lang];
    document.getElementById('table-head').innerHTML = `<th>${t.h_p}</th><th>${t.h_t}</th><th>${t.h_d}</th><th>${t.h_s}</th>`;
    document.getElementById('active-period-label').innerText = t.cur;
    update();
}

function updateAnalogClock() {
    const now = new Date();
    const s = now.getSeconds(), m = now.getMinutes(), h = now.getHours();
    document.getElementById('sec').style.transform = `translateX(-50%) rotate(${(s/60)*360}deg)`;
    document.getElementById('min').style.transform = `translateX(-50%) rotate(${(m/60)*360+(s/60)*6}deg)`;
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${(h%12/12)*360+(m/60)*30}deg)`;
}

function update() {
    const t = translations[currentLang];
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    document.getElementById('day-display').innerText = now.toLocaleDateString(currentLang === 'ar'?'ar-SA':'en-US', {weekday:'long'});

    if (dayName === "Saturday" || dayName === "Sunday") {
        document.getElementById('active-period-name').innerText = "🌴";
        document.getElementById('timer').innerText = "OFF";
        document.getElementById('schedule-body').innerHTML = `<tr><td colspan="4" style="text-align:center; padding:40px;">${t.week}</td></tr>`;
        return;
    }

    const todayData = weekSchedule[dayName] || [];
    let html = "", activeFound = false;

    todayData.forEach(p => {
        const [sH, sM] = p.start.split(":").map(Number), [eH, eM] = p.end.split(":").map(Number);
        const startT = sH * 60 + sM, endT = eH * 60 + eM;
        let status = "⏳", rowClass = "";

        if (currentTime >= startT && currentTime < endT) {
            status = "🟢 Active"; rowClass = "active-row"; activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            const remMin = endT - currentTime - 1;
            document.getElementById('timer').innerText = `00:${String(remMin).padStart(2,'0')}:${String(60-now.getSeconds()).padStart(2,'0')}`;
            document.getElementById('progress-bar').style.width = ((currentTime - startT) / (endT - startT) * 100) + "%";
        } else if (currentTime >= endT) { status = "✅ Ended"; }
        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${endT-startT}m</td><td>${status}</td></tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html;
    if (!activeFound) { 
        document.getElementById('active-period-name').innerText = t.over; 
        document.getElementById('timer').innerText = "00:00:00"; 
        document.getElementById('progress-bar').style.width = "0%";
    }
}

setInterval(() => { update(); updateAnalogClock(); }, 1000);
setLanguage('ar');
