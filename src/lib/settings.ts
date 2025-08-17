
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Checks if direct editing for schedules is enabled in Firestore.
 * @returns {Promise<boolean>} True if direct editing is enabled, false otherwise.
 */
export const isDirectEditEnabled = async (): Promise<boolean> => {
    try {
        const settingDocRef = doc(db, 'settings', 'edit_mode');
        const docSnap = await getDoc(settingDocRef);

        if (docSnap.exists() && docSnap.data().directEditEnabled === true) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error checking direct edit setting:", error);
        return false; // Safely default to false in case of an error
    }
};
