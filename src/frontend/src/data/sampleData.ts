import type {
  DisciplineRecord,
  ExamResult,
  FeeRecord,
  LeaveRecord,
  NewsItem,
  Person,
  SportRecord,
  StrengthRecord,
} from "../backend";

export const sampleStudents: Person[] = [
  {
    id: 1n,
    name: "Arjun Singh Thakur",
    student_class: "10",
    section: "A",
    rollNumber: 1042n,
    email: "parent.arjun@example.com",
    dateOfBirth: "2009-04-15",
    address: "Village Thathri, Doda, J&K",
    photo: "",
    parentName: "Subedar Vikram Singh Thakur",
  },
  {
    id: 2n,
    name: "Priya Sharma",
    student_class: "8",
    section: "B",
    rollNumber: 842n,
    email: "parent.priya@example.com",
    dateOfBirth: "2011-08-22",
    address: "Sector 3, Thathri, Doda, J&K",
    photo: "",
    parentName: "Havildar Rajan Sharma",
  },
];

export const sampleResults: ExamResult[] = [
  {
    id: 1n,
    studentId: 1n,
    subject: "Mathematics",
    marks: 92n,
    maxMarks: 100n,
    grade: "A+",
    examType: "Mid-Term",
    year: 2025n,
  },
  {
    id: 2n,
    studentId: 1n,
    subject: "Science",
    marks: 88n,
    maxMarks: 100n,
    grade: "A",
    examType: "Mid-Term",
    year: 2025n,
  },
  {
    id: 3n,
    studentId: 1n,
    subject: "English",
    marks: 79n,
    maxMarks: 100n,
    grade: "B+",
    examType: "Mid-Term",
    year: 2025n,
  },
  {
    id: 4n,
    studentId: 1n,
    subject: "Hindi",
    marks: 85n,
    maxMarks: 100n,
    grade: "A",
    examType: "Mid-Term",
    year: 2025n,
  },
  {
    id: 5n,
    studentId: 1n,
    subject: "Social Science",
    marks: 91n,
    maxMarks: 100n,
    grade: "A+",
    examType: "Mid-Term",
    year: 2025n,
  },
  {
    id: 6n,
    studentId: 1n,
    subject: "Mathematics",
    marks: 95n,
    maxMarks: 100n,
    grade: "A+",
    examType: "Annual",
    year: 2024n,
  },
  {
    id: 7n,
    studentId: 1n,
    subject: "Science",
    marks: 90n,
    maxMarks: 100n,
    grade: "A+",
    examType: "Annual",
    year: 2024n,
  },
  {
    id: 8n,
    studentId: 1n,
    subject: "English",
    marks: 82n,
    maxMarks: 100n,
    grade: "A",
    examType: "Annual",
    year: 2024n,
  },
];

export const sampleFees: FeeRecord[] = [
  {
    id: 1n,
    studentId: 1n,
    description: "Annual Tuition Fee - Q1 2025",
    amount: 4500n,
    totalAmount: 4500n,
    lateFee: 0n,
    paid: true,
    dueDate: "2025-04-01",
    paidDate: "2025-03-28",
    transactionId: "TXN-2025-001",
  },
  {
    id: 2n,
    studentId: 1n,
    description: "Annual Tuition Fee - Q2 2025",
    amount: 4500n,
    totalAmount: 4500n,
    lateFee: 0n,
    paid: true,
    dueDate: "2025-07-01",
    paidDate: "2025-06-29",
    transactionId: "TXN-2025-048",
  },
  {
    id: 3n,
    studentId: 1n,
    description: "Annual Tuition Fee - Q3 2025",
    amount: 4500n,
    totalAmount: 4700n,
    lateFee: 200n,
    paid: false,
    dueDate: "2025-10-01",
  },
  {
    id: 4n,
    studentId: 1n,
    description: "Sports & Activity Fee 2025",
    amount: 800n,
    totalAmount: 800n,
    lateFee: 0n,
    paid: false,
    dueDate: "2025-11-15",
  },
  {
    id: 5n,
    studentId: 1n,
    description: "Library Fee 2025",
    amount: 300n,
    totalAmount: 300n,
    lateFee: 0n,
    paid: true,
    dueDate: "2025-04-01",
    paidDate: "2025-03-28",
    transactionId: "TXN-2025-002",
  },
];

export const sampleDiscipline: DisciplineRecord[] = [
  {
    id: 1n,
    studentId: 1n,
    date: "2025-09-12",
    incident: "Minor disruption during assembly",
    action:
      "Verbal warning issued by class teacher. Parents informed via letter.",
    resolvedStatus: true,
  },
];

export const sampleSports: SportRecord[] = [
  {
    id: 1n,
    studentId: 1n,
    sportName: "Cricket",
    level: "District",
    achievements:
      "Selected for Doda District Under-17 cricket team. Scored 56 runs in the inter-district tournament finals. Best batsman in school team for 2024-25 season.",
  },
  {
    id: 2n,
    studentId: 1n,
    sportName: "Athletics - Long Jump",
    level: "School",
    achievements:
      "School champion in Long Jump (Under-17 category). Recorded personal best of 4.8 meters at Annual Sports Day 2025.",
  },
];

export const sampleStrengths: StrengthRecord[] = [
  {
    id: 1n,
    studentId: 1n,
    subject: "Mathematics",
    description:
      "Exceptional analytical and problem-solving skills. Consistently achieves top marks. Demonstrates ability to grasp advanced concepts quickly. The teacher recommends exploring competitive mathematics.",
  },
  {
    id: 2n,
    studentId: 1n,
    subject: "Science",
    description:
      "Strong curiosity and practical understanding of scientific concepts. Actively participates in lab experiments and shows initiative in project work. Recommended for science olympiad participation.",
  },
  {
    id: 3n,
    studentId: 1n,
    subject: "Leadership & Teamwork",
    description:
      "Elected as Class Monitor. Shows maturity in resolving peer conflicts. A natural team leader who motivates classmates during group activities and sports.",
  },
];

export const sampleLeave: LeaveRecord[] = [
  {
    id: 1n,
    studentId: 1n,
    fromDate: "2025-08-14",
    toDate: "2025-08-15",
    reason: "Family function - sister's wedding ceremony",
    status: "approved",
  },
  {
    id: 2n,
    studentId: 1n,
    fromDate: "2025-10-02",
    toDate: "2025-10-02",
    reason: "Medical checkup at District Hospital Doda",
    status: "approved",
  },
  {
    id: 3n,
    studentId: 1n,
    fromDate: "2025-11-20",
    toDate: "2025-11-22",
    reason: "Participation in District Cricket Tournament at Bhaderwah",
    status: "approved",
  },
  {
    id: 4n,
    studentId: 1n,
    fromDate: "2025-12-10",
    toDate: "2025-12-12",
    reason: "Fever and illness - medical certificate attached",
    status: "pending",
  },
];

export const sampleNews: NewsItem[] = [
  {
    id: 1n,
    title: "Annual Sports Day 2025 — A Day of Champions!",
    content:
      "The 26th Annual Sports Day was held on November 5th, 2025. Over 800 students participated in 35 events. Chief Guest was Brig. (Retd.) R.K. Sharma. Arjun Singh Thakur was awarded Best Athlete of the Year. Parents and guardians are requested to congratulate all participants.",
    date: "2025-11-06",
    category: "Events",
  },
  {
    id: 2n,
    title: "JKBOSE Class 10 & 12 Examination Schedule Released",
    content:
      "The J&K Board of School Education has released the examination timetable for Class 10 (Regular) and Class 12 (Annual) examinations. Class 10 exams begin March 3, 2026. Class 12 exams begin February 25, 2026. Students are advised to collect admit cards from the school office. All fee dues must be cleared before admit card issuance.",
    date: "2025-10-20",
    category: "Academics",
  },
  {
    id: 3n,
    title: "Winter Vacation Notice — School Closed December 20 to January 10",
    content:
      "As per Government of J&K Education Department directives, the school will remain closed for winter vacation from December 20, 2025 to January 10, 2026. School will reopen on January 11, 2026. Students are advised to complete their holiday homework. Special doubt-clearing sessions for Class 10 and 12 students will be held on January 8 and 9, 2026.",
    date: "2025-12-01",
    category: "Notice",
  },
  {
    id: 4n,
    title: "District Science Olympiad — 3 Students Qualify for State Level",
    content:
      "We are proud to announce that three students from our school have qualified for the J&K State Science Olympiad. Congratulations to Arjun Singh Thakur (Class 10A), Priya Sharma (Class 8B), and Rahul Verma (Class 11C). The state-level competition will be held in Jammu on January 25, 2026. We wish them the very best!",
    date: "2025-09-18",
    category: "Achievement",
  },
];
