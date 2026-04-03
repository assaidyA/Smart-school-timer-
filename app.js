const scheduleData = {
    "Monday": [
        { name: "0 pd (Community) 👥", start: "07:15", end: "08:15" },
        { name: "1st pd (Math) 📐", start: "08:30", end: "09:27" },
        { name: "2nd pd (English) 📚", start: "09:29", end: "10:26" },
        { name: "3rd pd (Science) 🧪", start: "10:28", end: "11:25" },
        { name: "4th pd (History) 🌍", start: "11:27", end: "12:24" },
        { name: "5th pd (Lunch) 🍱", start: "12:26", end: "13:11" },
        { name: "6th pd (Art) 🎨", start: "13:13", end: "14:10" },
        { name: "7th pd (PE) ⚽", start: "14:12", end: "15:11" }
    ],
    "Wednesday": [ // جدول الأربعاء القصير
        { name: "0 pd 👥", start: "07:15", end: "08:15" },
        { name: "1st pd 📚", start: "08:30", end: "09:16" },
        { name: "2nd pd 📐", start: "09:18", end: "10:04" },
        { name: "3rd pd 🧪", start: "10:06", end: "10:52" },
        { name: "Lunch 🍱", start: "10:54", end: "11:39" },
        { name: "5th pd 🌍", start: "11:41", end: "12:27" },
        { name: "6th pd 🎨", start: "12:29", end: "13:15" },
        { name: "7th pd ⚽", start: "13:17", end: "14:05" }
    ]
    // كرر نفس إيموجيات الاثنين لبقية الأيام (الثلاثاء، الخميس، الجمعة)...
};

let bellPlayed = false;

function update() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const timeInMinutes = now.getHours() * 60 + now.getMinutes();
    const today = scheduleData[day] || [];
    
    document.getElementById('day-display').innerText = now.toLocaleDateString('ar-SA', {weekday:'long'});
    let html = "";
    let activeFound = false;

    today.forEach(p => {
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const startT = sH * 60 + sM;
        const endT = eH * 60 + eM;
        let status = "⏳";
        let rowClass = "";

        if (timeInMinutes >= startT && timeInMinutes < endT) {
            status = "🟢"; rowClass = "active-row"; activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            
            // حساب المؤقت
            const remainingSec = (endT * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
            const m = Math.floor(remainingSec / 60), s = remainingSec % 60;
            document.getElementById('timer').innerText = `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
            document.getElementById('progress-bar').style.width = ((timeInMinutes - startT) / (endT - startT) * 100) + "%";

            // تشغيل الجرس عند آخر 5 ثوانٍ
            if (remainingSec <= 1 && !bellPlayed) {
                document.getElementById('bell-sound').play();
                bellPlayed = true;
            }
        } else if (timeInMinutes >= endT) {
            status = "✅";
            if (activeFound) bellPlayed = false; // إعادة ضبط الجرس للحصة القادمة
        }

        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${endT-startT}m</td><td>${status}</td></tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html;
}

setInterval(update, 1000);
function changeTheme(v) { document.body.className = v; }
function toggleMode() { document.body.classList.toggle('light-mode'); }
update();
