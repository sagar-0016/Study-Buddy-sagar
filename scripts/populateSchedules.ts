
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateSchedules.ts

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

// --- DATA TO POPULATE ---

const holiday_schedule = {
    "06:00": { informal: "Wake up + Fresh ho jaao (Take your time!) 🌅", formal: "Wake up and freshen up" },
    "06:30": { informal: "Light exercise/stretching – max 10 mins 🧘‍♀️", formal: "Light exercise/stretching (max 10 minutes)" },
    "06:40": { informal: "Chemistry – Inorganic + Organic (1 hr 50 mins) 🧪⚗️", formal: "Chemistry – Inorganic + Organic (1 hour 50 minutes)" },
    "08:30": { informal: "Breakfast 🍳", formal: "Breakfast" },
    "09:00": { informal: "Physicssssssss (Poora aaj NEWToNNN ko rula dena haiii) – 3 hrs 📘", formal: "Physics – Focus topic (e.g., Mechanics) (3 hours)" },
    "12:00": { informal: "Short break (Max 5 mins – hydration/stretching) 🧃", formal: "Short break (max 5 minutes)" },
    "12:05": { informal: "Chemistry – Physical (Lectures) /Notes Revision (1 hr) ⚗️📚", formal: "Chemistry – Physical (Lecture or Notes Revision) (1 hour)" },
    "13:05": { informal: "Lunchhh, Chalo Chalo Ab hoda khaana kha lo 🍽️", formal: "Lunch" },
    "13:35": { informal: "Maths Time Babyyy -(1.5hrs)😏", formal: "Mathematics – Primary practice session (1.5 hours)" },
    "15:05": { informal: "Power nap (Flexible timing – rest when needed) 🛌", formal: "Power nap (optional and flexible)" },
    "16:30": { informal: "Bath + Fresh ho jaao 🚿", formal: "Bath and refresh" },
    "17:00": { informal: "Mathematics – Calculus>>Coordinate>>Trigo>>Algebra (1 hr) 📊", formal: "Mathematics – Secondary session (Calculus, etc.) (1 hour)" },
    "18:00": { informal: "Break (Max 15 mins) Buckle up for some questions babeee 🌿", formal: "Short break (max 15 minutes)" },
    "18:05": { informal: "PYQ Time: (~1.5 hrs)\n• Physics (5–7)\n• Maths (5–7)\n• Chemistry (15-20) ⚗️", formal: "PYQ Practice (~1.5 hours): Physics, Maths, Chemistry" },
    "19:35": { informal: "Reviewing the weak points in the PYQs, Revising the missed concepts", formal: "Review PYQs – Focus on weak areas and missed concepts" },
    "20:30": { informal: "Free Subject Slot – Choose based on coaching/weak areas (45 mins) [flexible with your dinner time or TMKOC] 🎯", formal: "Free subject slot – Based on weak areas (45 minutes)" },
    "21:15": { informal: "Dinner 🍽️", formal: "Dinner" },
    "22:00": { informal: "Revision – Notes/Modules (IOC>>OC>>PC>>History(only for ~30min)) (1 hr) 📚", formal: "Revision – Notes/Modules (1 hour)" },
    "23:00": { informal: "Quick NCERT – IOC and OC focus (30 mins) 📘", formal: "Quick NCERT – IOC and OC focused revision (30 minutes)" },
    "23:30": { informal: "Prepare for sleep 🌙", formal: "Prepare for sleep" },
    "23:45": { informal: "Its been a long day| Good night :) \nYou’ve earned it💫", formal: "End of day – Good night!" }
};

const coaching_schedule = {
    "06:00": { informal: "Wake up + Fresh ho jaao 🌅", formal: "Wake up and freshen up" },
    "06:30": { informal: "Quick revision of previous day's notes (Recall-kal ka IOC and OC) + glance at today's topics (15–20 mins) 📖🧠", formal: "Quick revision of previous day’s notes (15–20 minutes)" },
    "06:50": { informal: "Breakfast + Coaching ke liye tayyari 🍳", formal: "Breakfast and preparation for coaching" },
    "07:30": { informal: "Coaching time (Focus mode ON!) 🏫, Dhyaan Rakhna, Mann lga ke padhna", formal: "Coaching time" },
    "13:00": { informal: "Welcome home! Aurr Mele Babu ne Thana Thaya? 🍽️", formal: "Return home and lunch" },
    "13:15": { informal: "Study time babe- Subject based on coaching topic of the day (Physics/Chemistry/Maths), NOTES REVISION specially (don't forget Integration revision) – 1 hr 📚", formal: "Post-coaching study – Based on today’s subject (1 hour)" },
    "14:15": { informal: "Power nap/ Day Planning or start with your best subject [Maths ✖️➕➖➗🟰] (Flexible – Take rest agr battery low hai!🪫) 🛌", formal: "Power nap or planning session (optional and flexible)" },
    "15:00": { informal: "Bath + Fresh ho jaao 🚿", formal: "Bath and refresh" },
    "15:30": { informal: "Physics pdhne ka Timeeeeeee (1.5 hrs) 📚", formal: "Physics study session (1.5 hours)" },
    "17:00": { informal: "Meths Time-(30 mins)", formal: "Mathematics practice (30 mins)" },
    "17:30": { informal: "Break + Snacks [yewamm Mathematics pe soch vichaar with litle little bites] (Max 15 mins) 🥪", formal: "Short break and snacks (max 15 minutes)" },
    "17:45": { informal: "Self-study – Pending topics or Homewok (Maths>>Physics>>Chemistry) (from Coaching) (1 hrs) 💪", formal: "Self-study – Pending topics or homework (1 hour)" },
    "18:45": { informal: "Physical Chemistry (lectures) or problem solving (Physical Chemistry)", formal: "Physical Chemistry – Lecture or problem-solving" },
    "19:45": { informal: "PYQs (1.5 hrs):\n- Physics (5–7)\n- Maths (5–7)\n- Chemistry (15-20) ⚗️", formal: "PYQ Practice (~1.5 hours): Physics, Maths, Chemistry" },
    "21:15": { informal: "Dinnerrrrrrrrr 🍽️", formal: "Dinner" },
    "21:45": { informal: "OCcccccccccc (45 mins) 🎯", formal: "Organic Chemistry – Revision or practice (45 minutes)" },
    "22:30": { informal: "Revision + NCERT (IOC only – 30 mins) 📘", formal: "NCERT – IOC focused revision (30 minutes)" },
    "23:00": { informal: "Little unwinding up + Prepare for next day (Thoda moda aur Chemistry dekh loooo IOC/OC) 🧪⚗️", formal: "Light review and preparation for next day" },
    "23:45": { informal: "Good night! Sweet dreams! 💫", formal: "End of day – Good night!" }
};


const main = async () => {
    try {
        console.log("Starting to populate Firestore with new schedule structure...");

        // 1. Holiday Schedule
        const holidayDocRef = doc(db, 'schedules', 'holiday');
        const holidayData = {
            type: 'holiday',
            tasks: holiday_schedule,
        };
        await setDoc(holidayDocRef, holidayData);
        console.log("✅ Successfully populated holiday schedule.");

        // 2. Coaching Schedule
        const coachingDocRef = doc(db, 'schedules', 'coaching');
        const coachingData = {
            type: 'coaching',
            tasks: coaching_schedule,
        };
        await setDoc(coachingDocRef, coachingData);
        console.log("✅ Successfully populated coaching schedule.");
        
        console.log("\nAll data populated successfully. You can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
