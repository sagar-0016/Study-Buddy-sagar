
import { db } from './firebase';
import { collection, getDocs, query, limit, doc, getDoc } from 'firebase/firestore';


/**
 * Fetches a random tip from the 'tips' collection.
 * @returns A random tip string from the collection.
 */
export const getRandomTip = async (): Promise<string> => {
    try {
        const tipsRef = collection(db, 'tips');
        const q = query(tipsRef, limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return "Take regular breaks to stay fresh and focused.";
        }

        const tips = querySnapshot.docs.map(doc => doc.data().text as string);
        const randomIndex = Math.floor(Math.random() * tips.length);
        return tips[randomIndex];
    } catch (error) {
        console.error(`Error fetching tips:`, error);
        return "Always double-check your calculations to avoid simple mistakes.";
    }
};

/**
 * Fetches a random one-liner motivation from the 'one-liners' collection.
 * @returns A random one-liner string from the collection.
 */
export const getRandomOneLiner = async (): Promise<string> => {
    try {
        const oneLinersRef = collection(db, 'one-liners');
        const q = query(oneLinersRef, limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return "Your hard work will pay off. Keep going!";
        }

        const liners = querySnapshot.docs.map(doc => doc.data().text as string);
        const randomIndex = Math.floor(Math.random() * liners.length);
        return liners[randomIndex];
    } catch (error) {
        console.error(`Error fetching one-liners:`, error);
        return "Believe in your potential.";
    }
};

/**
 * Fetches the banner image URL from the 'homepage' collection.
 * @returns The image URL string, or a placeholder if not found.
 */
export const getBannerImageUrl = async (): Promise<string> => {
    try {
        const bannerDocRef = doc(db, 'homepage', 'banner');
        const docSnap = await getDoc(bannerDocRef);

        if (docSnap.exists() && docSnap.data().imageUrl) {
            return docSnap.data().imageUrl;
        } else {
            console.warn("Banner document not found in 'homepage' collection.");
            return "https://placehold.co/1000x800.png";
        }
    } catch (error) {
        console.error("Error fetching banner image URL:", error);
        return "https://placehold.co/1000x800.png";
    }
};
