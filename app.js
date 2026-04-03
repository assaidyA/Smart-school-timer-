const schedule = {
    "Monday": [
        { name: "pd 0 (Community) 👥", start: "07:15", end: "08:15" },
        { name: "Community Meeting 🤝", start: "08:20", end: "08:30" },
        { name: "1st pd (Math) 📐", start: "08:30", end: "09:27" },
        { name: "2nd pd (English) 📚", start: "09:29", end: "10:26" },
        { name: "3rd pd (Science) 🧪", start: "10:28", end: "11:25" },
        { name: "4th pd (History) 🌍", start: "11:27", end: "12:24" },
        { name: "5th pd (Lunch) 🍱", start: "12:26", end: "13:11" },
        { name: "6th pd (Art) 🎨", start: "13:13", end: "14:10" },
        { name: "7th pd (PE) ⚽", start: "14:12", end: "15:11" }
    ],
    "Wednesday": [
        { name: "0 pd 👥", start: "07:15", end: "08:15" },
        { name: "1st pd 📚", start: "08:30", end: "09:16" },
        { name: "2nd pd 📐", start: "09:18", end: "10:04" },
        { name: "3rd pd 🧪", start: "10:06", end: "10:52" },
        { name: "Lunch 🍱", start: "10:54", end: "11:39" },
        { name: "5th pd 🌍", start: "11:41", end: "12:27" },
        { name: "6th pd 🎨", start: "12:29", end: "13:15" },
        { name: "7th pd ⚽", start: "13:17", end: "14:05" }
    ]
    // أضف الثلاثاء والخميس والجمعة بنفس النمط...
};

let bellPlayed = false;

function update() {
    const now = new Date();
    // تحريك الساعة الرومانية
    const s = now.getSeconds() * 6, m = now.getMinutes() * 6, h = (now.getHours() % 12) * 30 + m / 12;
    document.querySelector('.sec-hand').style.transform = `translateX(-50%) rotate(${s}deg)`;
    document.querySelector('.min-hand').style.transform = `translateX(-50%) rotate(${m}deg)`;
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${h}deg)`;

    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentM = now.getHours() * 60 + now.getMinutes();
    const today = schedule[day] || [];
    
    document.getElementById('day-display').innerText = now.toLocaleDateString('ar-SA', {weekday:'long'});
    let html = "", activeFound = false;

    for (let i = 0; i < today.length; i++) {
        const p = today[i];
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const sT = sH * 60 + sM, eT = eH * 60 + eM;

        // التحقق من "الاستراحة" (Break)
        if (i > 0) {
            const prevE = today[i-1].end.split(":").map(Number);
            const prevET = prevE[0] * 60 + prevE[1];
            if (currentM >= prevET && currentM < sT) {
                activeFound = true;
                document.getElementById('active-period-name').innerText = "BREAK ☕";
                updateTimer(sT);
            }
        }

        let rowClass = "";
        if (currentM >= sT && currentM < eT) {
            rowClass = "active-row"; activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            updateTimer(eT);
            
            // صوت الجرس عند آخر دقيقة
            const remaining = (eT * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
            if (remaining <= 5 && !bellPlayed) {
                document.getElementById('bell-sound').play();
                bellPlayed = true;
            }
        } else if (currentM >= eT && activeFound) {
            bellPlayed = false; 
        }

        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${currentM >= eT ? "✅" : (rowClass ? "🟢" : "⏳")}</td></tr>`;
    }
    document.getElementById('schedule-body').innerHTML = html;
}

function updateTimer(targetM) {
    const now = new Date();
    const diff = (targetM * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), s = diff % 60;
    document.getElementById('timer').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

const langs = {
    ar: { title: "الحصة القادمة", lang: "اللغة" },
    en: { title: "Next Period", lang: "Language" },
    es: { title: "Próximo Período", lang: "Idioma" }
};

function changeLang(l) {
    document.getElementById('lang-text').innerText = langs[l].lang;
    document.getElementById('status-label').innerText = langs[l].title;
    document.documentElement.dir = (l === 'ar' ? 'rtl' : 'ltr');
}

setInterval(update, 1000);
update();
