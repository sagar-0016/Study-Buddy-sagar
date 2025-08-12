# Prompt for "JEE PrepTrack" Admin Dashboard App

## 1. High-Level Goal

Build a comprehensive, secure, and user-friendly web application to serve as an admin dashboard for the "JEE PrepTrack" app. The primary purpose of this admin panel is to allow an administrator to manage all dynamic content, view user-submitted data, and monitor user activity without directly interacting with the Firebase console.

The application should be built using Next.js, React, ShadCN UI components, and Tailwind CSS. It will connect to the same Firestore database as the main "JEE PrepTrack" app.

---

## 2. Core Features

### 2.1. Dashboard Overview
A homepage that provides a quick-glance summary of key metrics and recent activity.
- **Key Stats Cards:** Display total counts for: Syllabus Topics, Flashcard Decks, Practice Questions, Revision Topics, User Doubts, and Help Requests.
- **Recent Activity Feed:** A list of the 5 most recent user submissions (Doubts, Help Requests, Brainstorming submissions).

### 2.2. Content Management (Full CRUD)
Create dedicated sections for managing all the educational content within the app. Each section should provide a table or list view with options to **Add New**, **Edit**, and **Delete** entries.

- **Syllabus Manager:**
  - View all subjects (Physics, Chemistry, Maths).
  - Edit chapter titles and topic names.
  - Update the `jeeMainWeightage` and `jeeAdvancedWeightage` for each topic (using a dropdown from 1-5).
- **Flashcard Manager:**
  - View all flashcard decks.
  - Edit deck properties (title, description, icon, status, difficulty).
  - **Crucially:** Be able to click into a deck to view, add, edit, and delete the individual flashcards (question/answer pairs) within that deck's nested `cards` collection.
- **Question Banks:**
  - A unified interface, perhaps with tabs, to manage both "Practice Questions" and "Tricky Questions".
  - Add/Edit/Delete questions, including their text, type (multiple choice/text), options, correct answer, and subject.
  - Support for uploading an image for a question.
- **Revision Topics Manager:**
  - Add, edit, and delete the topics that appear in the Revision Centre. Fields to manage: `subject`, `chapterName`, `topicName`, `hints`, and an optional `hintsImageURL`.
- **Brainstorming Manager:**
  - Add, edit, and delete the brainstorming questions and their associated guidelines.
- **Lecture Library Manager:**
  - Add, edit, and delete lecture videos. Fields to manage: `title`, `description`, `subject`, `videoUrl`, `thumbnailUrl`, `channel`, and `duration`.
- **Motivational Content Manager:**
  - Use tabs or separate pages to manage:
    - **Tips:** (from the `tips` collection)
    - **One-Liners:** (from the `one-liners` collection)
    - **Mood-Based Messages:** (from `motivation-motivated`, `motivation-focused`, `motivation-worried` collections)
    - **Discipline Messages:** (from the `discipline` collection)

### 2.3. User Interaction Management
Provide interfaces to review and act upon user submissions.

- **Doubt Centre:**
  - View a list of all submitted doubts, sorted by date.
  - See the question, subject, and any attached image.
  - **Provide a text area to write a `responseText`.**
  - A button to **"Mark as Addressed"**, which sets the `isAddressed` boolean to `true` in Firestore. This signals to the user in the main app that their doubt has been seen.
- **Technical Help Desk:**
  - Similar to the Doubt Centre, view all technical help requests.
  - **Provide a text area to write a `responseText`.**
  - A button to **"Mark as Addressed"** to update the `isAddressed` flag.
- **Brainstorming Submissions:**
  - View all submissions from the `brainstorming-submissions` collection.
  - Display the original question and the user's submitted thoughts.

---

## 3. Firestore Database Schema Reference

This section details the Firestore collections the admin panel will need to interact with.

- **`syllabus`**:
  - **Documents:** `physics`, `chemistry`, `maths`.
  - **Purpose:** Stores the entire course structure.
  - **Fields:** `label` (string), `chapters` (array of objects, where each object has `title` and a `topics` array). Each topic has `name`, `jeeMainWeightage`, and `jeeAdvancedWeightage`.
  - **Admin Action:** Full CRUD on topics and their weightages.

- **`flashcardDecks`**:
  - **Documents:** Each document is a deck (e.g., `kinematics`, `goc`).
  - **Purpose:** Stores metadata for each flashcard deck.
  - **Fields:** `title`, `description`, `category`, `icon`, `status`, `href`, `difficulty`.
  - **Admin Action:** Full CRUD on decks.
  - **Nested Collection:** Each deck document has a sub-collection named `cards`.
    - **`cards` Sub-collection Documents:** Each document is a flashcard.
    - **Fields:** `question` (string), `answer` (string).
    - **Admin Action:** Full CRUD on cards within a deck.

- **`questions`** & **`tricky-questions`**:
  - **Documents:** Auto-ID documents for each question.
  - **Purpose:** Stores practice questions.
  - **Fields:** `questionText`, `answerType` ('options' or 'text'), `options` (array), `correctAnswer`, `subject`.
  - **Admin Action:** Full CRUD.

- **`revisions`**:
  - **Documents:** Auto-ID documents for each revision topic.
  - **Purpose:** Stores topics for the spaced repetition/recall feature.
  - **Fields:** `subject`, `chapterName`, `topicName`, `hints`, `hintsImageURL`.
  - **Admin Action:** Full CRUD.

- **`brainstorming`**:
  - **Documents:** Auto-ID documents for each brainstorming prompt.
  - **Purpose:** Stores prompts for the brainstorming tool.
  - **Fields:** `subject`, `question`, `guideline`.
  - **Admin Action:** Full CRUD.

- **`lectures`**:
  - **Documents:** Auto-ID documents for each lecture.
  - **Purpose:** Stores video lecture metadata.
  - **Fields:** `title`, `description`, `subject`, `videoUrl`, `thumbnailUrl`, `channel`, `duration`.
  - **Admin Action:** Full CRUD.

- **`doubts`**, **`technical-help`**:
  - **Documents:** Auto-ID documents for each user submission.
  - **Purpose:** Stores user-submitted issues.
  - **Fields:** `text`, `subject`/`category`, `imageUrl`, `createdAt`, `isAddressed` (boolean), `isCleared` (boolean), `responseText` (string, optional).
  - **Admin Action:** Read-only for content, but can **update** the `isAddressed` field from `false` to `true` and **add/edit** the `responseText` field.

- **`brainstorming-submissions`**:
  - **Documents:** Auto-ID documents.
  - **Purpose:** Stores user responses to brainstorming prompts.
  - **Fields:** `topicId`, `topicQuestion`, `thoughts`, `submittedAt`.
  - **Admin Action:** Read-only.

- **Motivational Collections**:
  - **Collections:** `tips`, `one-liners`, `discipline`, `motivation-motivated`, `motivation-focused`, `motivation-worried`, `tinkering-messages`, `threatening-messages`.
  - **Documents:** Auto-ID documents in each.
  - **Fields:** `text` or `message` (string).
  - **Admin Action:** Full CRUD on the messages within these collections.
