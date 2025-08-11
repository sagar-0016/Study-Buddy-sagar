
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import type { PyqProgress, PyqProgressWithTimestamp } from './types';

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
 * Calculates the number of completed PYQ chapters and the total number of chapters for a specific exam.
 * @param {number} totalTopics - The total number of topics from the syllabus data.
 * @returns {Promise<{ completed: number, total: number }>} An object with completed and total counts.
 */
export const getPyqProgressStats = async (examType: ExamType, totalTopics: number): Promise<{ completed: number, total: number }> => {
    try {
        const progressData = await getPyqProgress(examType);
        const completedCount = progressData.filter(p => p.completed).length;
        return { completed: completedCount, total: totalTopics };
    } catch (error)
 {
        console.error(`Error fetching PYQ progress stats for ${examType}:`, error);
        return { completed: 0, total: 0 };
    }
};

/**
 * Calculates the total number of unique completed PYQ topics across all exam types.
 * @returns {Promise<number>} The total count of completed PYQ topics.
 */
export const getTotalPyqCompleted = async (): Promise<number> => {
    try {
        const [mainProgress, advancedProgress] = await Promise.all([
            getPyqProgress('jeeMain'),
            getPyqProgress('jeeAdvanced')
        ]);
        
        const completedIds = new Set<string>();

        mainProgress.forEach(item => {
            if (item.completed) {
                completedIds.add(item.id);
            }
        });

        advancedProgress.forEach(item => {
            if (item.completed) {
                completedIds.add(item.id);
            }
        });

        return completedIds.size;
    } catch (error) {
        console.error("Error fetching total PYQ completed count:", error);
        return 0;
    }
};

/**
 * Fetches all PYQ progress data along with timestamps.
 * @param examType - The exam type to fetch progress for.
 * @returns {Promise<PyqProgressWithTimestamp[]>} An array of progress data with timestamps.
 */
export const getPyqProgressWithTimestamps = async (examType: ExamType): Promise<PyqProgressWithTimestamp[]> => {
  try {
    const collectionName = `pyq-progress-${examType}`;
    const progressCollectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(progressCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }
    
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            completed: data.completed,
            lastUpdated: data.lastUpdated,
        }
    }).filter(item => item.lastUpdated); // Filter out items without a timestamp

  } catch (error) {
    console.error(`Error fetching PYQ progress data with timestamps for ${examType}:`, error);
    return [];
  }
};
