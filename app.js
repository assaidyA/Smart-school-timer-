let currentLang = 'ar';
let btnColorIdx = 0;
let fullThemeIdx = 0;
let score = 0;

const btnColors = ['btn-default', 'btn-green', 'btn-red', 'btn-gold'];
const fullThemes = ['bg-default', 'bg-dark-blue', 'bg-dark-green', 'bg-dark-red'];

const dictionary = {
    ar: {
        title: "نيكسيت بيريود", tagline: "مؤقت الجرس الذكي", p: "الحصة", s: "المادة", tr: "المعلم والقاعة", t: "الوقت", d: "المدة", st: "الحالة",
        weekend: "عطلة سعيدة! ✨", game: "اصطاد الإيموجي!", score: "النقاط: ", footer: "تحديث تلقائي كل ثانية", 
        nextSchool: "المتبقي للمدرسة: ", now: "الحالية: ", ended: "انتهت ✅", active: "جارية 🟢", wait: "انتظار ⏳"
    },
    en: {
        title: "NextPeriod", tagline: "Smart Bell Schedule Countdown", p: "Period", s: "Subject", tr: "Teacher & Room", t: "Time", d: "Dur", st: "Status",
        weekend: "Happy Weekend! ✨", game: "Tap the Emoji!", score: "Score: ", footer: "Auto-updates every second", 
        nextSchool: "Next School in: ", now: "Current: ", ended: "Ended ✅", active: "Active 🟢", wait: "Wait ⏳"
    }
};

// مواعيد الجرس الدقيقة تشمل الحصة 0 والاجتماع
const bellTimes = [
    { start: "07:15", end: "08:15", dur: "60m" }, // 0 pd
    { start: "08:20", end: "08:30", dur: "10m" }, // Community Meeting
    { start: "08:30", end: "09:27", dur: "57m" }, // 1st pd
    { start: "09:29", end: "10:26", dur: "57m" }, // 2nd pd
    { start: "10:28", end: "11:25", dur: "57m" }, // 3rd pd
    { start: "11:27", end: "12:24", dur: "57m" }, // 4th pd
    { start: "12:26", end: "13:11", dur: "45m" }, // 5th pd
    { start: "13:13", end: "14:10", dur: "57m" }, // 6th pd
    { start: "14:12", end: "15:11", dur: "59m" }  // 7th pd
];

[span_0](start_span)// الجدول الدراسي مع الغرف[span_0](end_span)
const schedule = {
    "Monday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"غداء", tr:"CAF"}, en: {s:"Lunch", tr:"CAF"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} },
        { ar: {s:"تربية بدنية", tr:"SHEHATA | 183G"}, en: {s:"PE", tr:"SHEHATA | 183G"} }
    ],
    "Tuesday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"إرشاد", tr:"Sterner | 178"}, en: {s:"Advisory", tr:"Sterner | 178"} },
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"غداء", tr:"CAF"}, en: {s:"Lunch", tr:"CAF"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} }
    ],
    "Wednesday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} },
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"Junior Post Sec", tr:"Valentine | 267"}, en: {s:"Junior Post Sec", tr:"Valentine | 267"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | CAF"}, en: {s:"Earth Sci", tr:"McMurray | CAF"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} }
    ],
    "Thursday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} },
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"غداء", tr:"CAF"}, en: {s:"Lunch", tr:"CAF"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} },
        { ar: {s:"تربية بدنية", tr:"SHEHATA | 183G"}, en: {s:"PE", tr:"SHEHATA | 183G"} }
    ],
    "Friday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"إرشاد", tr:"Sterner | 178"}, en: {s:"Advisory", tr:"Sterner | 178"} },
        { ar: {s:"غداء", tr:"CAF"}, en: {s:"Lunch", tr:"CAF"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} }
    ]
};

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
    document.getElementById('weekend-msg').innerText = d.weekend;
    document.getElementById('game-instruction').innerText = d.game;
    document.getElementById('footer-text').innerText = d.footer;
    update();
}

function update() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const totalMin = now.getHours() * 60 + now.getMinutes();
    const sec = now.getSeconds();
    const d = dictionary[currentLang];

    const isWeekend = (day === "Saturday" || day === "Sunday");
    document.getElementById('schedule-section').style.display = isWeekend ? 'none' : 'block';
    document.getElementById('weekend-section').style.display = isWeekend ? 'block' : 'none';

    document.getElementById('current-day-display').innerText = now.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long' });

    let activeFound = false;
    const lessons = schedule[day] || [];
    let html = "";

    lessons.forEach((lesson, i) => {
        const slot = bellTimes[i]; if(!slot) return;
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        const sT = sh*60+sm; const eT = eh*60+em;

        const subjectName = lesson[currentLang].s;
        const teacherName = lesson[currentLang].tr;
        let status = totalMin >= eT ? d.ended : (totalMin >= sT ? d.active : d.wait);

        if (totalMin >= sT && totalMin < eT) {
            activeFound = true;
            const rMin = eT - totalMin - 1;
            document.getElementById('active-p-title').innerText = d.now + subjectName;
            document.getElementById('live-counter').innerText = `${String(rMin).padStart(2,'0')}:${String(60-sec).padStart(2,'0')}`;
            document.getElementById('fill-bar').style.width = `${((totalMin-sT)/(eT-sT))*100}%`;
        }
        html += `<div class="period-card" style="${totalMin >= sT && totalMin < eT ? 'border: 2px solid var(--accent);' : ''}">
            <span>${i === 0 ? '0' : (i === 1 ? 'Mtg' : i-1)}</span><span>${subjectName}</span><span>${teacherName}</span><span>${slot.start}</span><span>${slot.dur}</span><span>${status}</span>
        </div>`;
    });

    if (!activeFound) {
        let nextStart = new Date(); nextStart.setHours(7,15,0);
        if (totalMin >= (15*60+11) || isWeekend) {
            if(day === "Friday") nextStart.setDate(now.getDate()+3);
            else if(day === "Saturday") nextStart.setDate(now.getDate()+2);
            else nextStart.setDate(now.getDate()+1);
        }
        const diff = nextStart - now;
        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        document.getElementById('active-p-title').innerText = d.nextSchool;
        document.getElementById('live-counter').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        document.getElementById('fill-bar').style.width = "0%";
    }
    document.getElementById('schedule-list').innerHTML = html;
}

function nextBtnColor() { document.body.classList.remove(...btnColors); btnColorIdx = (btnColorIdx + 1) % btnColors.length; document.body.classList.add(btnColors[btnColorIdx]); }
function nextFullTheme() { document.body.classList.remove(...fullThemes); fullThemeIdx = (fullThemeIdx + 1) % fullThemes.length; document.body.classList.add(fullThemes[fullThemeIdx]); }
function toggleNightMode() { document.body.classList.toggle('light-mode'); }
function scorePoint() { score++; document.getElementById('score-val').innerText = dictionary[currentLang].score + score; }

setInterval(update, 1000);
update();
