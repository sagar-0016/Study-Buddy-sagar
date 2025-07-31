
import { db } from './firebase';
import { collection, doc, getDoc, setDoc, query, where, getDocs, Timestamp, orderBy, limit } from 'firebase/firestore';
import type { DayType, Schedule } from './types';

// Helper to get the start of the current day as a string 'YYYY-MM-DD'
const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Determines if the current day is a holiday, coaching day, or unknown.
 * - Sunday is always a holiday.
 * - Checks holidayRanges collection in Firestore.
 * - Checks dailyScheduleTypes collection for a user-set choice.
 * @returns {Promise<DayType | null>} 'coaching', 'holiday', or null if unknown.
 */
export const getDayType = async (): Promise<DayType | null> => {
    const today = new Date();
    const todayString = getTodayString();

    // 1. Check if it's Sunday
    if (today.getDay() === 0) {
        return 'holiday';
    }

    // 2. Check for a user-set choice for the day
    const dailyTypeDocRef = doc(db, 'dailyScheduleTypes', todayString);
    const dailyTypeDocSnap = await getDoc(dailyTypeDocRef);
    if (dailyTypeDocSnap.exists()) {
        return dailyTypeDocSnap.data().type as DayType;
    }

    // 3. Check for a predefined holiday range
    const holidayRangesRef = collection(db, 'holidayRanges');
    const q = query(
        holidayRangesRef,
        where('startDate', '<=', today),
    );
    const querySnapshot = await getDocs(q);

    for (const docSnap of querySnapshot.docs) {
        const range = docSnap.data();
        const endDate = (range.endDate as Timestamp).toDate();
        if (today <= endDate) {
            return 'holiday';
        }
    }
    
    // 4. If nothing is found, the type is unknown
    return null;
}


/**
 * Saves the user's choice for the day's schedule type.
 * @param {DayType} type - The type of day ('coaching' or 'holiday').
 */
export const setDayType = async (type: DayType): Promise<void> => {
    const todayString = getTodayString();
    const dailyTypeDocRef = doc(db, 'dailyScheduleTypes', todayString);
    await setDoc(dailyTypeDocRef, { type, date: new Date() });
}

/**
 * Fetches the schedule for a given day type.
 * @param {DayType} type - The type of schedule to fetch.
 * @returns {Promise<Schedule | null>} The schedule object or null if not found.
 */
export const getSchedule = async (type: DayType): Promise<Schedule | null> => {
    const scheduleDocRef = doc(db, 'schedules', type);
    const scheduleDocSnap = await getDoc(scheduleDocRef);

    if (scheduleDocSnap.exists()) {
        return scheduleDocSnap.data() as Schedule;
    } else {
        console.warn(`Schedule for type "${type}" not found in Firestore.`);
        return null;
    }
}

/**
 * Fetches a random message from one of the late-night message collections.
 * @param {'12amto2am' | '2amto5am' | '5amto6am'} collectionName - The name of the collection to fetch from.
 * @returns {Promise<string>} A message string.
 */
export const getLateNightMessage = async (collectionName: '12amto2am' | '2amto5am' | '5amto6am'): Promise<string> => {
    try {
        const messagesRef = collection(db, collectionName);
        const q = query(messagesRef, limit(20)); // Fetch up to 20 messages
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return "It's getting late. Time to wind down and get some rest for a productive day tomorrow!";
        }

        const messages = querySnapshot.docs.map(doc => doc.data().message);
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex] || "Time to sleep!";
    } catch (error) {
        console.error(`Error fetching from ${collectionName}:`, error);
        return "A quiet moment to reflect on your day's hard work. Rest is part of the process.";
    }
}


/**
 * Fetches all messages from the 'discipline' collection.
 * @returns {Promise<string[]>} An array of discipline messages.
 */
export const getDisciplineMessages = async (): Promise<string[]> => {
    try {
        const messagesRef = collection(db, 'discipline');
        const querySnapshot = await getDocs(messagesRef);

        if (querySnapshot.empty) {
            return ["Before you change your path, reflect on your goal. Is this change necessary?"];
        }

        return querySnapshot.docs.map(doc => doc.data().text as string);
    } catch (error) {
        console.error("Error fetching discipline messages:", error);
        return ["There was an error fetching reflection questions. Please proceed with intention."];
    }
};

/**
 * Checks if the developer has enabled direct edit mode.
 * @returns {Promise<boolean>} True if direct editing is enabled, false otherwise.
 */
export const isDirectEditModeEnabled = async (): Promise<boolean> => {
    try {
        const settingDocRef = doc(db, 'settings', 'edit_mode');
        const docSnap = await getDoc(settingDocRef);
        if (docSnap.exists() && docSnap.data().directEditEnabled === true) {
            return true;
        }
        return false; 
    } catch (error) {
        console.error("Error fetching direct edit mode setting:", error);
        // Default to safer option (showing dialog) if there's an error.
        return false;
    }
};
