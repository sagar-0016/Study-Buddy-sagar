
export type LiveArticle = {
  headline: string;
  summary: string;
  fullContent: string;
  source: string;
  imageKeywords?: string;
  category: 'General News' | 'JEE News' | 'UPSC News' | 'UPSC Articles' | 'Literature';
};

export const sampleNewsData: LiveArticle[] = [
  // JEE News
  {
    category: 'JEE News',
    headline: "JEE Advanced 2024 Counselling Dates Announced, JoSAA Portal to Open June 10",
    summary: "The Joint Seat Allocation Authority (JoSAA) has officially announced the counselling schedule for admissions to IITs, NITs, and other government-funded technical institutes.",
    fullContent: "The Joint Seat Allocation Authority (JoSAA) has released the much-awaited schedule for the 2024 counselling process. According to the official notification, the portal for registration and choice filling will open on June 10th, shortly after the declaration of JEE Advanced results. The counselling will be conducted in multiple rounds to ensure optimal seat allocation for all qualified candidates.\n\nStudents are advised to carefully review the business rules on the JoSAA website and prepare their documents in advance. Experts recommend that candidates research their preferred institutes and branches thoroughly to make informed decisions during the choice-filling process. The entire process will be conducted online.",
    source: "The Indian Express",
    imageKeywords: "examination student"
  },
  {
    category: 'JEE News',
    headline: "NTA Considers Normalization Process for JEE Main 2025 Amidst Multi-Session Papers",
    summary: "The National Testing Agency (NTA) is reviewing its normalization process for JEE Main to ensure fairness across different exam sessions and difficulty levels.",
    fullContent: "In response to feedback from students and educators regarding variations in difficulty across different sessions of the JEE Main exam, the National Testing Agency (NTA) is actively considering a revised normalization formula for the 2025 examination cycle. The goal is to create a more equitable system that accurately reflects student performance irrespective of the session they appeared in. A committee of experts has been formed to analyze statistical models and suggest a robust, transparent method for score normalization. The final decision is expected to be announced before the release of the official 2025 information bulletin.",
    source: "Times of India",
    imageKeywords: "education analytics"
  },
  // UPSC News
  {
    category: 'UPSC News',
    headline: "UPSC Civil Services Prelims 2024 Sees High Attendance, Paper Analysis Indicates Moderate Difficulty",
    summary: "The UPSC Civil Services Preliminary Examination 2024 was conducted successfully across the country with a high turnout of aspirants. Initial analysis suggests a balanced paper with a focus on conceptual understanding.",
    fullContent: "The Union Public Service Commission (UPSC) conducted the Civil Services (Preliminary) Examination 2024 on Sunday, with reports of high attendance from centers nationwide. Subject matter experts have provided initial analysis, describing the General Studies Paper 1 as 'moderately difficult' with a good mix of questions from polity, economy, history, and environmental science. The paper emphasized conceptual clarity over rote memorization. The CSAT paper was reported to be on par with previous years, testing the analytical and comprehension skills of the candidates. Aspirants are now eagerly awaiting the official answer key and results.",
    source: "The Hindu",
    imageKeywords: "indian parliament"
  },
  // UPSC Articles
  {
    category: 'UPSC Articles',
    headline: "Understanding India's Digital Personal Data Protection Act, 2023",
    summary: "A deep dive into the key provisions of the DPDP Act, its implications for citizens' privacy, and the compliance requirements for data fiduciaries.",
    fullContent: "The Digital Personal Data Protection (DPDP) Act, 2023, marks a watershed moment for data privacy regulation in India. The Act establishes a comprehensive framework for the processing of digital personal data, balancing the right to privacy of individuals with the need for lawful data processing. Key provisions include the requirement for explicit consent from data principals, the establishment of a Data Protection Board of India for grievance redressal, and significant penalties for non-compliance. The article explores the seven core principles of the Act, its impact on big tech companies, and the new set of rights it grants to Indian citizens in the digital age. For UPSC aspirants, understanding its nuances is critical for both Polity and Governance as well as Science and Technology sections.",
    source: "PIB India",
    imageKeywords: "data privacy"
  },
  // Literature
  {
    category: 'Literature',
    headline: "Jnanpith Award 2023 Conferred to Renowned Author for Contribution to Indian Literature",
    summary: "The 58th Jnanpith Award was recently awarded, celebrating a lifetime of outstanding contributions to literature and recognizing the author's profound impact on contemporary writing.",
    fullContent: "In a ceremony celebrating India's rich literary heritage, the prestigious Jnanpith Award for 2023 was conferred upon a celebrated author whose work has spanned decades and genres. The selection committee lauded the author's ability to weave intricate narratives that explore the complexities of human relationships and societal structures. Their novels and short stories have been translated into multiple languages, bringing a unique regional voice to a global audience. The award, which includes a cash prize and a bronze replica of Vagdevi (Saraswati), is considered the highest literary honor in India.",
    source: "The Literary Review",
    imageKeywords: "classic book"
  },
  // General News
  {
    category: 'General News',
    headline: "ISRO Successfully Launches New Earth Observation Satellite 'MET-SAT-3'",
    summary: "The Indian Space Research Organisation (ISRO) added another feather to its cap with the successful launch of its latest meteorological satellite from Sriharikota.",
    fullContent: "The Indian Space Research Organisation (ISRO) successfully launched the 'MET-SAT-3' satellite aboard its reliable Polar Satellite Launch Vehicle (PSLV). The satellite is designed to provide advanced weather forecasting, cyclone prediction, and climate monitoring services. It is equipped with state-of-the-art imagers and sounders that will deliver higher resolution data, significantly improving the accuracy of meteorological predictions. This launch further strengthens India's capabilities in space-based earth observation and disaster management.",
    source: "Livemint",
    imageKeywords: "earth space"
  }
];
