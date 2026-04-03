const scheduleData = [
    { name: "Period 0", start: "07:15", end: "08:15" },
    { name: "Community Meeting", start: "08:20", end: "08:30" },
    { name: "Period 1", start: "08:30", end: "09:27" },
    { name: "Period 2", start: "09:29", end: "10:26" },
    { name: "Period 3", start: "10:28", end: "11:25" },
    { name: "Period 4", start: "11:27", end: "12:24" },
    { name: "Period 5 (Lunch)", start: "12:26", end: "13:11" },
    { name: "Period 6", start: "13:13", end: "14:10" },
    { name: "Period 7", start: "14:12", end: "15:09" }
];

const translations = {
    en: {
        dir: "ltr", dayStatus: "School Day Schedule", waiting: "Waiting for School...",
        over: "School Day Over", weekend: "Happy Weekend! 🌴", rest: "Rest Time",
        noClasses: "No classes today. See you Monday!", h_period: "Period",
        h_time: "Time", h_status: "Status", s_wait: "Wait", s_active: "Active", s_ended: "Ended", cur: "Current: "
    },
    ar: {
        dir: "rtl", dayStatus: "جدول اليوم الدراسي", waiting: "بانتظار بداية الدوام...",
        over: "انتهى اليوم الدراسي", weekend: "إجازة سعيدة! 🌴", rest: "وقت الراحة",
        noClasses: "لا توجد حصص اليوم.. نراك الاثنين!", h_period: "الحصة",
        h_time: "الوقت", h_status: "الحالة", s_wait: "انتظار", s_active: "نشطة", s_ended: "انتهت", cur: "الحالية: "
    },
    es: {
        dir: "ltr", dayStatus: "Horario Escolar", waiting: "Esperando el inicio...",
        over: "Fin de las clases", weekend: "¡Feliz Fin de Semana! 🌴", rest: "Descanso",
        noClasses: "No hay clases hoy. ¡Nos vemos el lunes!", h_period: "Periodo",
        h_time: "Hora", h_status: "Estado", s_wait: "Espera", s_active: "Activo", s_ended: "Terminado", cur: "Actual: "
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = translations[lang].dir;
    
    // تحديث عناوين الجدول
    const t = translations[lang];
    document.getElementById('table-head').innerHTML = `<th>${t.h_period}</th><th>${t.h_time}</th><th>${t.h_status}</th>`;
    update();
}

function update() {
    const t = translations[currentLang];
    const now = new Date();
    const day = now.getDay(); 
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();

    if (day === 6 || day === 0) {
        document.getElementById('current-day-status').innerText = t.weekend;
        document.getElementById('active-period-name').innerText = t.rest;
        document.getElementById('timer').innerText = "OFF";
        document.getElementById('schedule-body').innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 40px;">${t.noClasses}</td></tr>`;
        return;
    }

    document.getElementById('current-day-status').innerText = t.dayStatus;
    let activeFound = false;
    let html = "";

    scheduleData.forEach((p) => {
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const startTotal = sH * 60 + sM;
        const endTotal = eH * 60 + eM;

        let status = t.s_wait;
        let rowClass = "";

        if (currentTime >= startTotal && currentTime < endTotal) {
            status = t.s_active;
            rowClass = "active-row";
            activeFound = true;
            document.getElementById('active-period-name').innerText = t.cur + p.name;
            const remMin = endTotal - currentTime - 1;
            document.getElementById('timer').innerText = `00:${String(remMin).padStart(2, '0')}:${String(60 - currentSeconds).padStart(2, '0')}`;
            document.getElementById('progress-bar').style.width = ((currentTime - startTotal) / (endTotal - startTotal) * 100) + "%";
        } else if (currentTime >= endTotal) {
            status = t.s_ended;
            rowClass = "ended-row";
        }
        html += `<tr class="${rowClass}"><td>${p.name}</td><td>${p.start} - ${p.end}</td><td>${status}</td></tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html;

    if (!activeFound) {
        const startFirst = parseInt(scheduleData[0].start.split(":")[0]) * 60 + parseInt(scheduleData[0].start.split(":")[1]);
        if (currentTime < startFirst) {
            document.getElementById('active-period-name').innerText = t.waiting;
            const diffMin = startFirst - currentTime - 1;
            document.getElementById('timer').innerText = `${String(Math.floor(diffMin/60)).padStart(2, '0')}:${String(diffMin%60).padStart(2, '0')}:${String(60-currentSeconds).padStart(2, '0')}`;
        } else {
            document.getElementById('active-period-name').innerText = t.over;
            document.getElementById('timer').innerText = "00:00:00";
        }
    }
}

setInterval(update, 1000);
setLanguage('en'); // اللغة الافتراضية عند الفتح
