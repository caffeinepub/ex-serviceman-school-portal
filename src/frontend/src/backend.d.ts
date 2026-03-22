import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DisciplineRecord {
    id: bigint;
    resolvedStatus: boolean;
    action: string;
    studentId: bigint;
    date: string;
    incident: string;
}
export interface SportRecord {
    id: bigint;
    studentId: bigint;
    sportName: string;
    level: string;
    achievements: string;
}
export interface FeeRecord {
    id: bigint;
    studentId: bigint;
    paid: boolean;
    dueDate: string;
    description: string;
    lateFee: bigint;
    paidDate?: string;
    totalAmount: bigint;
    amount: bigint;
    transactionId?: string;
}
export interface Application {
    id: bigint;
    status: string;
    studentId: bigint;
    date: string;
    description: string;
    applicationType: string;
}
export interface StrengthRecord {
    id: bigint;
    studentId: bigint;
    subject: string;
    description: string;
}
export interface LeaveRecord {
    id: bigint;
    status: string;
    studentId: bigint;
    toDate: string;
    fromDate: string;
    reason: string;
}
export interface ExamResult {
    id: bigint;
    marks: bigint;
    studentId: bigint;
    subject: string;
    year: bigint;
    grade: string;
    maxMarks: bigint;
    examType: string;
}
export interface NewsItem {
    id: bigint;
    title: string;
    content: string;
    date: string;
    category: string;
}
export interface Person {
    id: bigint;
    student_class: string;
    dateOfBirth: string;
    name: string;
    section: string;
    email: string;
    rollNumber: bigint;
    address: string;
    photo: string;
    parentName: string;
}
export interface UserProfile {
    userType: string;
    studentId?: bigint;
    userId: bigint;
    name: string;
    email: string;
    address: string;
    contactNumber: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addApplication(application: Application): Promise<bigint>;
    addDisciplineRecord(record: DisciplineRecord): Promise<bigint>;
    addExamResult(result: ExamResult): Promise<bigint>;
    addFeeRecord(feeRecord: FeeRecord): Promise<bigint>;
    addLeaveRecord(record: LeaveRecord): Promise<bigint>;
    addNews(title: string, content: string, date: string, category: string): Promise<bigint>;
    addPerson(person: Person): Promise<bigint>;
    addSportRecord(record: SportRecord): Promise<bigint>;
    addStrengthRecord(record: StrengthRecord): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteApplication(applicationId: bigint): Promise<void>;
    deleteDisciplineRecord(recordId: bigint): Promise<void>;
    deleteExamResult(resultId: bigint): Promise<void>;
    deleteFeeRecord(recordId: bigint): Promise<void>;
    deleteLeaveRecord(recordId: bigint): Promise<void>;
    deletePerson(personId: bigint): Promise<void>;
    deleteSportRecord(recordId: bigint): Promise<void>;
    deleteStrengthRecord(recordId: bigint): Promise<void>;
    getAllNews(): Promise<Array<NewsItem>>;
    getAllPersons(): Promise<Array<Person>>;
    getApplicationsByStudent(studentId: bigint): Promise<Array<Application>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDisciplineRecordsByStudent(studentId: bigint): Promise<Array<DisciplineRecord>>;
    getExamResultsByStudent(studentId: bigint): Promise<Array<ExamResult>>;
    getFeeRecordsByStudent(studentId: bigint): Promise<Array<FeeRecord>>;
    getLeaveRecordsByStudent(studentId: bigint): Promise<Array<LeaveRecord>>;
    getNewsByCategory(category: string): Promise<Array<NewsItem>>;
    getNewsById(newsId: bigint): Promise<NewsItem>;
    getPersonById(personId: bigint): Promise<Person>;
    getPersonsByClass(className: string, section: string): Promise<Array<Person>>;
    getSportRecordsByStudent(studentId: bigint): Promise<Array<SportRecord>>;
    getStrengthRecordsByStudent(studentId: bigint): Promise<Array<StrengthRecord>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateApplication(applicationId: bigint, application: Application): Promise<void>;
    updateDisciplineRecord(recordId: bigint, record: DisciplineRecord): Promise<void>;
    updateExamResult(resultId: bigint, result: ExamResult): Promise<void>;
    updateFeeRecord(recordId: bigint, feeRecord: FeeRecord): Promise<void>;
    updateLeaveRecord(recordId: bigint, record: LeaveRecord): Promise<void>;
    updateNews(id: bigint, title: string, content: string, date: string, category: string): Promise<void>;
    updatePerson(personId: bigint, person: Person): Promise<void>;
    updateSportRecord(recordId: bigint, record: SportRecord): Promise<void>;
    updateStrengthRecord(recordId: bigint, record: StrengthRecord): Promise<void>;
}
