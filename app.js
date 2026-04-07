let currentLang = 'ar';
let btnColorIdx = 0;
let fullThemeIdx = 0;
let score = 0;

const btnColors = ['btn-default', 'btn-green', 'btn-red', 'btn-gold'];
const fullThemes = ['bg-default', 'bg-dark-blue', 'bg-dark-green', 'bg-dark-red'];

// القاموس الشامل لكل الكلمات في الصفحة
const dictionary = {
    ar: {
        title: "نيكسيت بيريود",
        tagline: "مؤقت الجرس الذكي",
        p: "الحصة", s: "المادة", tr: "المعلم", t: "الوقت", d: "المدة", st: "الحالة",
        weekend: "عطلة سعيدة! استمتع بوقتك ✨",
        game: "اصطاد الإيموجي!",
        score: "النقاط: ",
        footer: "تحديث تلقائي كل ثانية",
        nextSchool: "المتبقي للمدرسة: ",
        now: "الحالية: ",
        loading: "جاري التحميل...",
        ended: "انتهت ✅",
        active: "جارية 🟢",
        wait: "انتظار ⏳",
        lunch: "غداء",
        noTeacher: "بدون معلم"
    },
    en: {
        title: "NextPeriod",
        tagline: "Smart Bell Schedule Countdown",
        p: "Period", s: "Subject", tr: "Teacher", t: "Time", d: "Dur", st: "Status",
        weekend: "Happy Weekend! Enjoy ✨",
        game: "Tap the Emoji!",
        score: "Score: ",
        footer: "Auto-updates every second",
        nextSchool: "Next School in: ",
        now: "Current: ",
        loading: "Loading...",
        ended: "Ended ✅",
        active: "Active 🟢",
        wait: "Wait ⏳",
        lunch: "Lunch",
        noTeacher: "No Teacher"
    }
};

const bellTimes = [
    { start: "08:30", end: "09:27", dur: "57m" },
    { start: "09:29", end: "10:26", dur: "57m" },
    { start: "10:28", end: "11:25", dur: "57m" },
    { start: "11:27", end: "12:24", dur: "57m" },
    { start: "12:26", end: "13:11", dur: "45m" },
    { start: "13:13", end: "14:10", dur: "57m" },
    { start: "14:12", end: "15:11", dur: "59m" }
];

// الجدول مع ترجمة المواد والأساتذة
const schedule = {
    "Monday": [
        { ar: {s:"أمريكا والعالم", tr:"برودوسكي"}, en: {s:"US World", tr:"Brodowski"} },
        { ar: {s:"اللغة الإنجليزية AP", tr:"رايس"}, en: {s:"AP Eng", tr:"Rice"} },
        { ar: {s:"جبر 2", tr:"لام"}, en: {s:"Algebra 2", tr:"Lam"} },
        { ar: {s:"تعليم موجه", tr:"إيريزاري"}, en: {s:"Targeted", tr:"Irizarry"} },
        { ar: {s:"غداء", tr:"طاقم العمل"}, en: {s:"Lunch", tr:"Staff"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} },
        { ar: {s:"تربية بدنية", tr:"شحاتة"}, en: {s:"PE", tr:"Shehata"} }
    ],
    "Tuesday": [
        { ar: {s:"جبر 2", tr:"لام"}, en: {s:"Algebra 2", tr:"Lam"} },
        { ar: {s:"تعليم موجه", tr:"إيريزاري"}, en: {s:"Targeted", tr:"Irizarry"} },
        { ar: {s:"إرشاد", tr:"ستيرنر"}, en: {s:"Advisory", tr:"Sterner"} },
        { ar: {s:"أمريكا والعالم", tr:"برودوسكي"}, en: {s:"US World", tr:"Brodowski"} },
        { ar: {s:"غداء", tr:"طاقم العمل"}, en: {s:"Lunch", tr:"Staff"} },
        { ar: {s:"اللغة الإنجليزية AP", tr:"رايس"}, en: {s:"AP Eng", tr:"Rice"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} }
    ],
    "Wednesday": [
        { ar: {s:"اللغة الإنجليزية AP", tr:"رايس"}, en: {s:"AP Eng", tr:"Rice"} },
        { ar: {s:"أمريكا والعالم", tr:"برودوسكي"}, en: {s:"US World", tr:"Brodowski"} },
        { ar: {s:"توجيه مهني", tr:"فالانتاين"}, en: {s:"Junior Post", tr:"Valentine"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} },
        { ar: {s:"تعليم موجه", tr:"إيريزاري"}, en: {s:"Targeted", tr:"Irizarry"} },
        { ar: {s:"جبر 2", tr:"لام"}, en: {s:"Algebra 2", tr:"Lam"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} }
    ],
    "Thursday": [
        { ar: {s:"تعليم موجه", tr:"إيريزاري"}, en: {s:"Targeted", tr:"Irizarry"} },
        { ar: {s:"جبر 2", tr:"لام"}, en: {s:"Algebra 2", tr:"Lam"} },
        { ar: {s:"اللغة الإنجليزية AP", tr:"رايس"}, en: {s:"AP Eng", tr:"Rice"} },
        { ar: {s:"أمريكا والعالم", tr:"برودوسكي"}, en: {s:"US World", tr:"Brodowski"} },
        { ar: {s:"غداء", tr:"طاقم العمل"}, en: {s:"Lunch", tr:"Staff"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} },
        { ar: {s:"تربية بدنية", tr:"شحاتة"}, en: {s:"PE", tr:"Shehata"} }
    ],
    "Friday": [
        { ar: {s:"أمريكا والعالم", tr:"برودوسكي"}, en: {s:"US World", tr:"Brodowski"} },
        { ar: {s:"جبر 2", tr:"لام"}, en: {s:"Algebra 2", tr:"Lam"} },
        { ar: {s:"تعليم موجه", tr:"إيريزاري"}, en: {s:"Targeted", tr:"Irizarry"} },
        { ar: {s:"إرشاد", tr:"ستيرنر"}, en: {s:"Advisory", tr:"Sterner"} },
        { ar: {s:"غداء", tr:"طاقم العمل"}, en: {s:"Lunch", tr:"Staff"} },
        { ar: {s:"علوم الأرض", tr:"ماكموري"}, en: {s:"Earth Sci", tr:"McMurray"} },
        { ar: {s:"اللغة الإنجليزية AP", tr:"رايس"}, en: {s:"AP Eng", tr:"Rice"} }
    ]
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const d = dictionary[currentLang];
    
    // تحديث النصوص الثابتة
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
    document.getElementById('score-val').innerText = d.score + score;

    update(); // تحديث الجدول فوراً باللغة الجديدة
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

    document.getElementById('current-day-display').innerText = 
        now.toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long' });

    let activeFound = false;
    const lessons = schedule[day] || [];
    let html = "";

    lessons.forEach((lesson, i) => {
        const slot = bellTimes[i]; if(!slot) return;
        const [sh, sm] = slot.start.split(":").map(Number);
        const [eh, em] = slot.end.split(":").map(Number);
        const sT = sh*60+sm; const eT = eh*60+em;

        // اختيار اسم المادة والمعلم حسب اللغة
        const subjectName = lesson[currentLang].s;
        const teacherName = lesson[currentLang].tr;

        let status = totalMin >= eT ? d.ended : (totalMin >= sT ? d.active : d.wait);

        if (totalMin >= sT && totalMin < eT) {
            activeFound = true;
            const rMin = eT - totalMin - 1;
            document.getElementById('active-p-title').innerText = d.now + subjectName;
            document.getElementById('live-counter').innerText = `${String(rMin).padStart(2,'0')}:${String(60-sec).padStart(2,'0')}`;
            document.getElementById('fill-bar').style.width = `${((totalMin-sT)/(eT-sT))*100}%`;
            document.getElementById('p-time-info').innerText = (currentLang === 'ar' ? "تنتهي في " : "Ends at ") + slot.end;
        }
        html += `<div class="period-card" style="${totalMin >= sT && totalMin < eT ? 'border: 2px solid var(--accent);' : ''}">
            <span>${i+1}</span><span>${subjectName}</span><span>${teacherName}</span><span>${slot.start}</span><span>${slot.dur}</span><span>${status}</span>
        </div>`;
    });

    if (!activeFound) {
        let nextStart = new Date(); nextStart.setHours(8,30,0);
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
        document.getElementById('p-time-info').innerText = "";
    }
    document.getElementById('schedule-list').innerHTML = html;
}

// ألوان الأزرار والموقع
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
function toggleNightMode() { document.body.classList.toggle('light-mode'); }
function scorePoint() {
    score++;
    document.getElementById('score-val').innerText = dictionary[currentLang].score + score;
    document.getElementById('emoji-target').style.transform = `scale(1.4) rotate(${Math.random()*20-10}deg)`;
    setTimeout(()=> document.getElementById('emoji-target').style.transform = "scale(1)", 100);
}

setInterval(update, 1000);
update();
