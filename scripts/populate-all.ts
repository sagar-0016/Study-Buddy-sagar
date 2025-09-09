
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: npm run populate-all

import './populateSyllabus';
import './populateSchedules';
import './populateFlashcards';
import './populateQuestions';
import './populateTrickyQuestions';
import './populateRevisions';
import './populateBrainstorming';
import './populateLectures';
import './populateDoubts';
import './populateTechnicalHelp';
import './populateTips';
import './populateOneLiners';
import './populateMotivation';
import './populateFormalMotivation';
import './populateTinkeringMessages';
import './populateThreateningMessages';
import './populateWorriedMessages';
import './populateWorriedStreakMessages';
import './populateFeatures';
import './populateMessages';
import './populateReadStatus';

console.log("\n\n✅✅✅ All data population scripts have been executed. ✅✅✅");
console.log("Your Firestore database should now be populated with sample data.");

// The individual scripts will log their own success or error messages.
// This script just ensures they are all called.
// Note: The scripts run asynchronously, but they are imported and executed sequentially here.
// For a more robust solution in a real-world scenario, you might want to chain promises.
// For this project's purpose, this approach is sufficient.
