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

function update() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();
    
    let activeFound = false;
    let html = "";

    scheduleData.forEach((p) => {
        const [sH, sM] = p.start.split(":").map(Number);
        const [eH, eM] = p.end.split(":").map(Number);
        const startTotal = sH * 60 + sM;
        const endTotal = eH * 60 + eM;

        let status = "⏳ Wait";
        let rowClass = "";

        if (currentTime >= startTotal && currentTime < endTotal) {
            status = "🔔 Active";
            rowClass = "active-row";
            activeFound = true;
            document.getElementById('active-period-name').innerText = p.name;
            
            const remainingMinutes = endTotal - currentTime - 1;
            const remainingSeconds = 60 - currentSeconds;
            document.getElementById('timer').innerText = 
                `00:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            
            const duration = endTotal - startTotal;
            const elapsed = currentTime - startTotal;
            const percent = (elapsed / duration) * 100;
            document.getElementById('progress-bar').style.width = percent + "%";

        } else if (currentTime >= endTotal) {
            status = "✅ Ended";
            rowClass = "ended-row";
        }

        html += `<tr class="${rowClass}">
            <td>${p.name}</td>
            <td>${p.start} - ${p.end}</td>
            <td>${status}</td>
        </tr>`;
    });

    document.getElementById('schedule-body').innerHTML = html;

    if (!activeFound) {
        document.getElementById('active-period-name').innerText = "خارج وقت الدوام";
        document.getElementById('progress-bar').style.width = "0%";
        
        const firstHole = scheduleData[0].start.split(":");
        const target = new Date();
        target.setHours(parseInt(firstHole[0]), parseInt(firstHole[1]), 0);
        
        if (now > target) target.setDate(target.getDate() + 1);
        
        const diff = target - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        
        document.getElementById('timer').innerText = 
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
}

setInterval(update, 1000);
update();
