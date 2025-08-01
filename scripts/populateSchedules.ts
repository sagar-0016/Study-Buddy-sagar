
// To run this script:
// 1. Make sure you have ts-node installed: npm install -g ts-node
// 2. Run from the root of your project: ts-node ./scripts/populateSchedules.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch, addDoc, collection, getDocs } from 'firebase/firestore';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.appspot.com",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

// --- DATA TO POPULATE ---

const holiday_schedule = {
    "06:00": "Wake up + Fresh ho jaao (Take your time!) 🌅",
    "06:30": "Light exercise/stretching – max 10 mins 🧘‍♀️",
    "06:40": "Chemistry – Inorganic + Organic (1 hr 50 mins) 🧪⚗️",
    "08:30": "Breakfast 🍳",
    "09:00": "Physicssssssss (Poora aaj NEWToNNN ko rula dena haiii) – 3 hrs 📘",
    "12:00": "Short break (Max 5 mins – hydration/stretching) 🧃",
    "12:05": "Chemistry – Physical (Lectures) /Notes Revision (1 hr) ⚗️📚",
    "13:05": "Lunchhh, Chalo Chalo Ab hoda khaana kha lo 🍽️",
    "13:35": "Maths Time Babyyy -(1.5hrs)😏",
    "15:05": "Power nap (Flexible timing – rest when needed) 🛌",
    "16:30": "Bath + Fresh ho jaao 🚿",
    "17:00": "Mathematics – Calculus>>Coordinate>>Trigo>>Algebra (1 hr) 📊",
    "18:00": "Break (Max 15 mins) Buckle up for some questions babeee 🌿",
    "18:05": "PYQ Time: (~1.5 hrs)\n• Physics (5–7 questions) 📘\n• Mathematics (5–7 questions) 📗\n• Chemistry (Organic: 5, Inorganic: 5, Physical: 3–5 flexible) ⚗️🧪🔬",
    "19:35": "Reviewing the weak points in the PYQs, Revising the missed concepts, ",
    "20:30": "Free Subject Slot – Choose based on coaching/weak areas (45 mins) [flexible with your dinner time or TMKOC] 🎯",
    "21:15": "Dinner 🍽️",
    "22:00": "Revision – Notes/Modules (IOC>>OC>>PC>>History(only for ~30min)) (1 hr) 📚",
    "23:00": "Quick NCERT – IOC and OC focus (30 mins) 📘",
    "23:30": "Prepare for sleep 🌙",
    "23:45": "Its been a long day| Good night :) \nYou’ve earned it💫",
};

const coaching_schedule = {
    "06:00": "Wake up + Fresh ho jaao 🌅",
    "06:30": "Quick revision of previous day's notes (Recall-kal ka IOC and OC) + glance at today's topics (15–20 mins) 📖🧠",
    "06:50": "Breakfast + Coaching ke liye tayyari 🍳",
    "07:30": "Coaching time (Focus mode ON!) 🏫, Dhyaan Rakhna, Mann lga ke padhna",
    "13:00": "Welcome home! Aurr Mele Babu ne Thana Thaya? 🍽️",
    "13:15": "Study time babe- Subject based on coaching topic of the day (Physics/Chemistry/Maths), NOTES REVISION specially (don't forget Integration revision) – 1 hr 📚",
    "14:15": "Power nap/ Day Planning or start with your best subject [Maths ✖️➕➖➗🟰] (Flexible – Take rest agr battery low hai!🪫) 🛌",
    "15:00": "Bath + Fresh ho jaao 🚿",
    "15:30": "Physics pdhne ka Timeeeeeee (1.5 hrs) 📚",
    "17:00": "Meths Time-(30 mins)",
    "17:30": "Break + Snacks [yewamm Mathematics pe soch vichaar with litle little bites] (Max 15 mins) 🥪",
    "17:45": "Self-study – Pending topics or Homewok (Maths>>Physics>>Chemistry) (from Coaching) (1 hrs) 💪",
    "18:45": "Physical Chemistry (lectures) or problem solving (Physical Chemistry)",
    "19:45": "PYQs (1.5 hrs):\n- Physics (5–7 questions) ~25min📐\n- Maths (5–7 questions) ~25min📊\n- Chemistry Organic (5 questions) ~13min🧪\n- Chemistry Inorganic (5 questions) ~13min🧪\n- Chemistry Physical (3–5 questions) ~14min⚗️",
    "21:15": "Dinnerrrrrrrrr 🍽️",
    "21:45": "OCcccccccccc (45 mins) 🎯",
    "22:30": "Revision + NCERT (IOC only – 30 mins) 📘",
    "23:00": "Little unwinding up + Prepare for next day (Thoda moda aur Chemistry dekh loooo IOC/OC) 🧪⚗️",
    "23:45": "Good night! Sweet dreams! 💫",
};

const holiday_schedule_formal = [
    "06:00: Wake up and freshen up",
    "06:10: Light exercise/stretching (max 10 minutes)",
    "06:40: Chemistry – Inorganic + Organic (1 hour 50 minutes)",
    "08:30: Breakfast",
    "09:00: Physics – Focus topic (e.g., Mechanics, Waves, Optics) (3 hours)",
    "12:00: Short break (max 5 minutes)",
    "12:05: Chemistry – Physical (Lecture or Notes Revision) (1 hour)",
    "13:05: Lunch",
    "13:35: Mathematics – Primary practice session (1.5 hours)",
    "15:05: Power nap (optional and flexible)",
    "16:30: Bath and refresh",
    "17:00: Mathematics – Secondary session (Calculus, Coordinate, Trigonometry, Algebra) (1 hour)",
    "18:00: Short break (max 5 minutes)",
    "18:05: PYQ Practice (~1.5 hours): Physics (5–7), Maths (5–7), Chemistry (Organic: 5, Inorganic: 5, Physical: 3–5)",
    "19:35: Review PYQs – Focus on weak areas and missed concepts",
    "20:30: Free subject slot – Based on coaching or personal weak areas (45 minutes)",
    "21:15: Dinner",
    "22:00: Revision – Notes/Modules (IOC → OC → PC → History if preferred) (1 hour)",
    "23:00: Quick NCERT – IOC and OC focused revision (30 minutes)",
    "23:30: Prepare for sleep",
    "23:45: End of day – Good night!",
];

const coaching_schedule_formal = [
    "07:00: Breakfast and preparation for coaching",
    "06:00: Wake up and freshen up",
    "06:30: Quick revision of previous day’s notes + glance at today’s topics (15–20 minutes)",
    "07:30: Coaching time",
    "13:00: Return home and lunch",
    "13:15: Post-coaching study – Based on today’s subject (1 hour)",
    "14:15: Power nap or planning session (optional and flexible)",
    "15:00: Bath and refresh",
    "15:30: Revise coaching topics using notes/modules/internet (2 hours)",
    "17:30: Short break and snacks (max 5 minutes)",
    "17:35: Self-study – Pending or weak topics (1 hour)",
    "18:35: Physical Chemistry – Lecture or problem-solving (1 hour)",
    "19:35: PYQ Practice (~1.5 hours): Physics (5–7), Maths (5–7), Chemistry (Organic: 5, Inorganic: 5, Physical: 3–5)",
    "21:05: Dinner",
    "21:35: Organic Chemistry – Revision or practice (45 minutes)",
    "22:20: NCERT – IOC focused revision (30 minutes)",
    "22:50: Light review and preparation for next day",
    "23:30: End of day – Good night!",
];

const lateNightMessages = {
    '12amto2am': "The world is quiet, but your ambition is loud. A little more effort now will make tomorrow's success even sweeter. You've got this!",
    '2amto5am': "The quietest hours are for the most dedicated minds. While others sleep, you're building your dream. Rest soon, champion.",
    '5amto6am': "The sun is almost up, and so are you. This dedication is what separates the good from the great. Finish strong and then greet the day!"
};

const disciplineMessages = [
    { text: "Before you change your path, ask yourself: Is this change a step forward or a step back from my ultimate goal?" },
    { text: "Discipline is choosing between what you want now and what you want most. Are your edits aligned with what you want most?" },
    { text: "A schedule is a map. Are you redrawing it to find a better route, or to avoid a difficult climb?" },
    { text: "Reflect on why the original plan isn't working. Is the plan flawed, or is the execution faltering?" },
    { text: "Consistency is the key that unlocks potential. How will this new schedule enhance your consistency?" },
];


// --- SCRIPT LOGIC ---

// Helper function to convert schedule object to sorted array of tasks
const formatSchedule = (scheduleObj: Record<string, string>) => {
  return Object.entries(scheduleObj)
    .map(([time, task]) => ({ time, task }))
    .sort((a, b) => a.time.localeCompare(b.time)); // Sort by time
};

const main = async () => {
    try {
        console.log("Starting to populate Firestore...");

        const batch = writeBatch(db);
        
        // 1. Holiday Schedule
        const holidayDocRef = doc(db, 'schedules', 'holiday');
        const holidayData = {
            type: 'holiday',
            tasks: formatSchedule(holiday_schedule),
            formalTasks: holiday_schedule_formal.sort((a,b) => a.localeCompare(b)),
        };
        batch.set(holidayDocRef, holidayData);
        console.log("Prepared holiday schedule for batch write.");

        // 2. Coaching Schedule
        const coachingDocRef = doc(db, 'schedules', 'coaching');
        const coachingData = {
            type: 'coaching',
            tasks: formatSchedule(coaching_schedule),
            formalTasks: coaching_schedule_formal.sort((a,b) => a.localeCompare(b)),
        };
        batch.set(coachingDocRef, coachingData);
        console.log("Prepared coaching schedule for batch write.");

        // Commit the batch
        await batch.commit();
        
        console.log("\n✅ Successfully populated 'schedules' collection in Firestore!");

        // 3. Late Night Messages
        console.log("\nPopulating late night messages...");
        await addDoc(collection(db, '12amto2am'), { message: lateNightMessages['12amto2am'] });
        await addDoc(collection(db, '2amto5am'), { message: lateNightMessages['2amto5am'] });
        await addDoc(collection(db, '5amto6am'), { message: lateNightMessages['5amto6am'] });
        console.log("✅ Successfully populated late night message collections!");

        // 4. Discipline Messages
        console.log("\nPopulating discipline messages...");
        const disciplineCollectionRef = collection(db, 'discipline');
        const existingDisciplineDocs = await getDocs(disciplineCollectionRef);
        if (existingDisciplineDocs.empty) {
            for (const msg of disciplineMessages) {
                await addDoc(disciplineCollectionRef, { text: msg.text });
            }
            console.log("✅ Successfully populated 'discipline' collection!");
        } else {
            console.log("Skipping 'discipline' collection population as it already contains data.");
        }


        console.log("\nAll data populated successfully. You can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
