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
    // يطبق نفس النظام لبقية الأيام...
};

function updateClockHands() {
    const now = new Date();
    const s = now.getSeconds() * 6, m = now.getMinutes() * 6, h = (now.getHours() % 12) * 30 + m / 12;
    document.querySelector('.sec-hand').style.transform = `translateX(-50%) rotate(${s}deg)`;
    document.querySelector('.min-hand').style.transform = `translateX(-50%) rotate(${m}deg)`;
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${h}deg)`;
}

function update() {
    updateClockHands();
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentM = now.getHours() * 60 + now.getMinutes();
    const today = schedule[day] || [];
    
    let html = "", activeFound = false;

    for (let i = 0; i < today.length; i++) {
        const p = today[i];
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const sT = sH * 60 + sM, eT = eH * 60 + eM;

        // التحقق من وجود استراحة (Break) قبل هذه الحصة
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
        }

        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start}-${p.end}</td><td>${statusIcon(currentM, sT, eT)}</td></tr>`;
    }
    document.getElementById('schedule-body').innerHTML = html;
}

function updateTimer(targetMinutes) {
    const now = new Date();
    const diff = (targetMinutes * 60) - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
    const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), s = diff % 60;
    document.getElementById('timer').innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function statusIcon(curr, s, e) { return curr >= e ? "✅" : (curr >= s ? "🟢" : "⏳"); }
function changeLang(l) { /* إضافة منطق الترجمة هنا */ alert("تم تغيير اللغة إلى: " + l); }

setInterval(update, 1000);
update();
