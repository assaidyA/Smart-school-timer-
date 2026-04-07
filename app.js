// القاموس المحدث ليشمل الغرف والحصة 0
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

// مواعيد الجرس الدقيقة (بما فيها الحصة 0 وحصة الاجتماع)
const bellTimes = [
    { start: "07:15", end: "08:15", dur: "60m" }, // 0 pd
    { start: "08:20", end: "08:30", dur: "10m" }, // Community Meeting
    { start: "08:30", end: "09:27", dur: "57m" }, // 1st
    { start: "09:29", end: "10:26", dur: "57m" }, // 2nd
    { start: "10:28", end: "11:25", dur: "57m" }, // 3rd
    { start: "11:27", end: "12:24", dur: "57m" }, // 4th
    { start: "12:26", end: "13:11", dur: "45m" }, // 5th (Lunch)
    { start: "13:13", end: "14:10", dur: "57m" }, // 6th
    { start: "14:12", end: "15:11", dur: "59m" }  // 7th
];

[span_1](start_span)// الجدول الدراسي مع أرقام الغرف والحصة 0[span_1](end_span)
const schedule = {
    "Monday": [
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} },
        { ar: {s:"اجتماع مجتمعي", tr:"IST"}, en: {s:"Community Mtg", tr:"IST"} }, // 0 & Comm
        { ar: {s:"أمريكا والعالم", tr:"Brodowski | 273"}, en: {s:"US World", tr:"Brodowski | 273"} },
        { ar: {s:"AP Eng Lang 3", tr:"Rice | 272"}, en: {s:"AP Eng Lang 3", tr:"Rice | 272"} },
        { ar: {s:"جبر 2", tr:"Lam | 276"}, en: {s:"Algebra 2", tr:"Lam | 276"} },
        { ar: {s:"تعليم موجه", tr:"Irizarry | 179"}, en: {s:"Targeted", tr:"Irizarry | 179"} },
        { ar: {s:"غداء", tr:"CAF"}, en: {s:"Lunch", tr:"CAF"} },
        { ar: {s:"علوم الأرض", tr:"McMurray | 271"}, en: {s:"Earth Sci", tr:"McMurray | 271"} },
        { ar: {s:"تربية بدنية", tr:"SHEHATA | 183G"}, en: {s:"PE", tr:"SHEHATA | 183G"} }
    ],
    [span_2](start_span)// يتم تكرار النمط لبقية الأيام مع مراعاة الحصة 0 و Comm Meeting دائمًا في البداية[span_2](end_span)
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

// تابع دالة update وبقية الدوال من الكود السابق مع استخدام الحصة 0
