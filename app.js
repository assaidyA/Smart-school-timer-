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
        en: { p: "Period", s: "Subject", t: "Time", d: "Dur", st: "Status" },
        ar: { p: "الحصة", s: "المادة", t: "الوقت", d: "المدة", st: "الحالة" }
    };
    document.getElementById('lbl-p').innerText = labels[currentLang].p;
    document.getElementById('lbl-s').innerText = labels[currentLang].s;
    document.getElementById('lbl-t').innerText = labels[currentLang].t;
    document.getElementById('lbl-d').innerText = labels[currentLang].d;
    document.getElementById('lbl-st').innerText = labels[currentLang].st;
    updateLive();
}

const schedule = [
    { period: "0 pd", sub: "Community Meet 🤝", start: "07:15", end: "08:15", dur: "60m" },
    { period: "Meet", sub: "Community Meeting 👥", start: "08:20", end: "08:30", dur: "10m" },
    { period: "1st pd", sub: "US and the World 🌍", start: "08:30", end: "09:27", dur: "57m" },
    { period: "2nd pd", sub: "AP Eng Lang 3 📚", start: "09:29", end: "10:26", dur: "57m" },
    { period: "3rd pd", sub: "Algebra 2 Term 📐", start: "10:28", end: "11:25", dur: "57m" },
    { period: "4th pd", sub: "Targeted Instru 🎯", start: "11:27", end: "12:24", dur: "57m" },
    { period: "5th pd", sub: "Lunch 🍱", start: "12:26", end: "13:11", dur: "45m" },
    { period: "6th pd", sub: "Earth and Space 🚀", start: "13:13", end: "14:10", dur: "57m" },
    { period: "7th pd", sub: "Physical Educat ⚽", start: "14:12", end: "15:11", dur: "59m" }
];

function updateLive() {
    const now = new Date();
    const curTotalMin = now.getHours() * 60 + now.getMinutes();
    const curSec = now.getSeconds();
    
    document.getElementById('current-day-display').innerText = now.toLocaleDateString(currentLang, { weekday: 'long' });

    let html = "";
    let activeFound = false;

    schedule.forEach((p) => {
        const [sh, sm] = p.start.split(":").map(Number);
        const [eh, em] = p.end.split(":").map(Number);
        const sT = sh * 60 + sm;
        const eT = eh * 60 + em;

        if (curTotalMin >= sT && curTotalMin < eT) {
            activeFound = true;
            const remMin = eT - curTotalMin - 1;
            const remSec = 60 - curSec;
            document.getElementById('active-p-title').innerText = `${p.period.toUpperCase()}: ${p.sub.toUpperCase()}`;
            document.getElementById('live-counter').innerText = `${String(remMin).padStart(2, '0')}:${String(remSec === 60 ? 0 : remSec).padStart(2, '0')}`;
            document.getElementById('fill-bar').style.width = ((curTotalMin - sT) / (eT - sT) * 100) + "%";
            document.getElementById('p-time-info').innerText = `Ends at ${p.end}`;
        }

        let status = curTotalMin >= eT ? "Ended ✅" : (curTotalMin >= sT ? "Active 🟢" : "Wait ⏳");
        html += `<div class="period-card" style="${status.includes('Active') ? 'border-left: 5px solid var(--accent);' : ''}">
            <span style="font-weight:bold; color: var(--accent);">${p.period}</span>
            <span>${p.sub}</span>
            <span style="color:var(--text-dim)">${p.start} - ${p.end}</span>
            <span>${p.dur}</span>
            <span style="color:${status.includes('Active') ? 'var(--accent)' : (status.includes('✅') ? '#4ade80' : 'var(--white)')}">${status}</span>
        </div>`;
    });

    if (!activeFound) {
        document.getElementById('live-counter').innerText = "00:00";
        document.getElementById('active-p-title').innerText = "SCHOOL ENDED";
    }
    document.getElementById('schedule-list').innerHTML = html;
}

setInterval(updateLive, 1000);
updateLive();
