
import { db } from './firebase';
import { collection, doc, getDoc, setDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
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
