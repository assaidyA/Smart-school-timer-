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
    en: { h_period: "Period", h_time: "Time", h_dur: "Dur", h_stat: "Status", weekend: "Happy Weekend! 🌴", current: "Current Period", over: "Day Ended" },
    ar: { h_period: "الحصة", h_time: "الوقت", h_dur: "المدة", h_stat: "الحالة", weekend: "عطلة سعيدة! 🌴", current: "الحصة الحالية", over: "انتهى اليوم" },
    es: { h_period: "Periodo", h_time: "Hora", h_dur: "Dur", h_stat: "Estado", weekend: "¡Buen Finde! 🌴", current: "Periodo Actual", over: "Día Terminado" }
};

let currentLang = 'ar';

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    document.getElementById('theme-btn').innerText = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const t = translations[lang];
    document.getElementById('table-head').innerHTML = `<th>${t.h_period}</th><th>${t.h_time}</th><th>${t.h_dur}</th><th>${t.h_stat}</th>`;
    document.getElementById('active-period-label').innerText = t.current;
    update();
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
        document.getElementById('schedule-body').innerHTML = `<tr><td colspan="4" style="text-align:center; padding:50px; font-size:1.5rem;">${t.weekend}</td></tr>`;
        return;
    }

    const todayData = weekSchedule[dayName] || [];
    let html = "";
    let activeFound = false;

    todayData.forEach(p => {
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const startT = sH * 60 + sM;
        const endT = eH * 60 + eM;

        let status = "⏳", rowClass = "";

        if (currentTime >= startT && currentTime < endT) {
            status = "🟢 Active"; rowClass = "active-row"; activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            const remMin = endT - currentTime - 1;
            document.getElementById('timer').innerText = `00:${String(remMin).padStart(2,'0')}:${String(60-now.getSeconds()).padStart(2,'0')}`;
            document.getElementById('progress-bar').style.width = ((currentTime - startT) / (endT - startT) * 100) + "%";
        } else if (currentTime >= endT) {
            status = "✅ Ended";
        } else {
            status = "⏳ Wait";
        }

        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${endT-startT}m</td><td>${status}</td></tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html;
    if (!activeFound) {
        document.getElementById('active-period-name').innerText = t.over;
        document.getElementById('timer').innerText = "00:00:00";
        document.getElementById('progress-bar').style.width = "0%";
    }
}

setInterval(update, 1000);
setLanguage('ar');
