
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, serverTimestamp, onSnapshot, Unsubscribe } from 'firebase/firestore';
import type { SyllabusTopic, Syllabus, SyllabusTopicWithTimestamp } from './types';

/**
 * Updates the completion status for a specific syllabus topic in Firestore.
 * If the document doesn't exist, it will be created.
 * @param topicKey - A unique identifier for the topic (e.g., 'Physics-Mechanics-Kinematics').
 * @param completed - A boolean indicating if the topic is completed.
 */
export const updateSyllabusTopicStatus = async (
  topicKey: string,
  completed: boolean
): Promise<void> => {
  try {
    const progressDocRef = doc(db, 'syllabus-progress', topicKey);
    await setDoc(
      progressDocRef,
      {
        completed,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`Error updating syllabus progress for ${topicKey}:`, error);
  }
};

/**
 * Fetches all syllabus progress data from the 'syllabus-progress' collection.
 * This is a one-time fetch.
 * @returns {Promise<SyllabusTopic[]>} An array of progress data for all topics.
 */
export const getSyllabusProgress = async (): Promise<SyllabusTopic[]> => {
  try {
    const progressCollectionRef = collection(db, 'syllabus-progress');
    const querySnapshot = await getDocs(progressCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        completed: doc.data().completed,
    }));

  } catch (error) {
    console.error("Error fetching syllabus progress data:", error);
    return [];
  }
};


/**
 * Sets up a real-time listener for syllabus progress.
 * @param callback - A function to be called with the progress data whenever it changes.
 * @returns {Unsubscribe} A function to unsubscribe from the listener.
 */
export const listenToSyllabusProgress = (callback: (progress: SyllabusTopic[]) => void): Unsubscribe => {
    const progressCollectionRef = collection(db, 'syllabus-progress');
    
    const unsubscribe = onSnapshot(progressCollectionRef, (querySnapshot) => {
        const progressData: SyllabusTopic[] = [];
        querySnapshot.forEach((doc) => {
            progressData.push({
                id: doc.id,
                completed: doc.data().completed,
            });
        });
        callback(progressData);
    }, (error) => {
        console.error("Error listening to syllabus progress:", error);
    });

    return unsubscribe;
}


/**
 * Fetches all syllabus progress data along with their lastUpdated timestamps.
 * @returns {Promise<SyllabusTopicWithTimestamp[]>} An array of progress data with timestamps.
 */
export const getSyllabusProgressWithTimestamps = async (): Promise<SyllabusTopicWithTimestamp[]> => {
  try {
    const progressCollectionRef = collection(db, 'syllabus-progress');
    const querySnapshot = await getDocs(progressCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }
    
    // Use filter to ensure that items without a lastUpdated field are excluded
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            completed: data.completed,
            lastUpdated: data.lastUpdated,
        }
    }).filter(item => item.lastUpdated); // This ensures only items with a timestamp are returned

  } catch (error) {
    console.error("Error fetching syllabus progress data with timestamps:", error);
    return [];
  }
};


/**
 * Fetches the entire syllabus structure from Firestore.
 * @returns {Promise<Syllabus | null>} The complete syllabus data object, or null on error.
 */
export const getSyllabusData = async (): Promise<Syllabus | null> => {
    try {
        const syllabusRef = collection(db, 'syllabus');
        const querySnapshot = await getDocs(syllabusRef);

        if (querySnapshot.empty) {
            console.warn("Syllabus collection is empty in Firestore. Please run the population script.");
            return null;
        }

        const syllabusData: Partial<Syllabus> = {};
        querySnapshot.forEach(doc => {
            syllabusData[doc.id as keyof Syllabus] = doc.data() as any;
        });

        return syllabusData as Syllabus;
    } catch (error) {
        console.error("Error fetching syllabus data from Firestore:", error);
        return null;
    }
}
