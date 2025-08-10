
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import type { PyqProgress } from './types';

type ExamType = 'jeeMain' | 'jeeAdvanced';

/**
 * Updates the completion status for a specific chapter's PYQs in Firestore.
 * @param chapterKey - A unique identifier for the chapter (e.g., 'Physics-Mechanics-Kinematics').
 * @param completed - A boolean indicating if the PYQs are completed.
 * @param examType - The exam type to update progress for.
 */
export const updatePyqStatus = async (
  chapterKey: string,
  completed: boolean,
  examType: ExamType
): Promise<void> => {
  try {
    const collectionName = `pyq-progress-${examType}`;
    const progressDocRef = doc(db, collectionName, chapterKey);
    await setDoc(
      progressDocRef,
      {
        completed,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`Error updating PYQ progress for ${chapterKey} in ${examType}:`, error);
  }
};

/**
 * Fetches all PYQ progress data from the relevant collection.
 * @param examType - The exam type to fetch progress for.
 * @returns {Promise<PyqProgress[]>} An array of progress data for all chapters.
 */
export const getPyqProgress = async (examType: ExamType): Promise<PyqProgress[]> => {
  try {
    const collectionName = `pyq-progress-${examType}`;
    const progressCollectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(progressCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        completed: doc.data().completed,
    }));

  } catch (error) {
    console.error(`Error fetching PYQ progress data for ${examType}:`, error);
    return [];
  }
};


/**
 * Calculates the number of completed PYQ chapters and the total number of chapters.
 * @param {number} totalTopics - The total number of topics from the syllabus data.
 * @returns {Promise<{ completed: number, total: number }>} An object with completed and total counts.
 */
export const getPyqProgressStats = async (totalTopics: number): Promise<{ completed: number, total: number }> => {
    try {
        // This function now might need to be adapted or called for a specific exam type
        // For now, let's assume it checks JEE Main by default for the dashboard
        const progressData = await getPyqProgress('jeeMain');
        const completedCount = progressData.filter(p => p.completed).length;
        return { completed: completedCount, total: totalTopics };
    } catch (error) {
        console.error("Error fetching PYQ progress stats:", error);
        return { completed: 0, total: 0 };
    }
};
