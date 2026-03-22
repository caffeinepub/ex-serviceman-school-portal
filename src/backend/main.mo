import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  /////////////////////
  // Module: Person  //
  /////////////////////
  type Person = {
    id : Nat;
    name : Text;
    rollNumber : Nat;
    student_class : Text;
    section : Text;
    email : Text;
    parentName : Text;
    dateOfBirth : Text;
    address : Text;
    photo : Text;
  };

  module Person {
    func compare(person1 : Person, person2 : Person) : Order.Order {
      Nat.compare(person1.id, person2.id);
    };

    public func compareByClass(person1 : Person, person2 : Person) : Order.Order {
      switch (Text.compare(person1.student_class, person2.student_class)) {
        case (#equal) { Text.compare(person1.section, person2.section) };
        case (order) { order };
      };
    };

    public func compareByRollNumber(person1 : Person, person2 : Person) : Order.Order {
      Nat.compare(person1.rollNumber, person2.rollNumber);
    };
  };

  // Fees system
  type FeeRecord = {
    id : Nat;
    studentId : Nat;
    amount : Nat;
    description : Text;
    dueDate : Text;
    paid : Bool;
    paidDate : ?Text;
    // New field for transaction ID
    transactionId : ?Text;
    // New fields for late fee
    lateFee : Nat;
    totalAmount : Nat;
  };

  module FeeRecord {
    public func compare(fee1 : FeeRecord, fee2 : FeeRecord) : Order.Order {
      Nat.compare(fee1.id, fee2.id);
    };

    public func compareByDueDate(fee1 : FeeRecord, fee2 : FeeRecord) : Order.Order {
      Text.compare(fee1.dueDate, fee2.dueDate);
    };
  };

  type FeeSummary = {
    totalPaid : Nat;
    totalDue : Nat;
    outstandingAmount : Nat;
  };

  type AdditionalFee = {
    studentId : Nat;
    amount : Nat;
    description : Text;
    dueDate : Text;
  };

  // Exam results system
  type ExamResult = {
    id : Nat;
    studentId : Nat;
    subject : Text;
    marks : Nat;
    maxMarks : Nat;
    grade : Text;
    examType : Text; // midterm or annual
    year : Nat;
  };

  module ExamResult {
    public func compare(result1 : ExamResult, result2 : ExamResult) : Order.Order {
      Nat.compare(result1.id, result2.id);
    };

    public func compareBySubject(result1 : ExamResult, result2 : ExamResult) : Order.Order {
      Text.compare(result1.subject, result2.subject);
    };
  };

  type GradeSummary = {
    averageMarks : Float;
    gradeDistribution : [(Text, Nat)];
  };

  // Discipline records system
  type DisciplineRecord = {
    id : Nat;
    studentId : Nat;
    date : Text;
    incident : Text;
    action : Text;
    resolvedStatus : Bool;
  };

  module DisciplineRecord {
    public func compare(record1 : DisciplineRecord, record2 : DisciplineRecord) : Order.Order {
      Nat.compare(record1.id, record2.id);
    };

    public func compareByDate(record1 : DisciplineRecord, record2 : DisciplineRecord) : Order.Order {
      Text.compare(record1.date, record2.date);
    };
  };

  // Leave records system
  type LeaveRecord = {
    id : Nat;
    studentId : Nat;
    fromDate : Text;
    toDate : Text;
    reason : Text;
    status : Text; // approved/pending/rejected
  };

  module LeaveRecord {
    public func compare(record1 : LeaveRecord, record2 : LeaveRecord) : Order.Order {
      Nat.compare(record1.id, record2.id);
    };

    public func compareByFromDate(record1 : LeaveRecord, record2 : LeaveRecord) : Order.Order {
      Text.compare(record1.fromDate, record2.fromDate);
    };
  };

  // Applications system
  type Application = {
    id : Nat;
    studentId : Nat;
    applicationType : Text;
    description : Text;
    date : Text;
    status : Text;
  };

  module Application {
    public func compare(app1 : Application, app2 : Application) : Order.Order {
      Nat.compare(app1.id, app2.id);
    };

    public func compareByDate(app1 : Application, app2 : Application) : Order.Order {
      Text.compare(app1.date, app2.date);
    };
  };

  // Sports system
  type SportRecord = {
    id : Nat;
    studentId : Nat;
    sportName : Text;
    level : Text; // school/district/state/national
    achievements : Text;
  };

  module SportRecord {
    public func compare(record1 : SportRecord, record2 : SportRecord) : Order.Order {
      Nat.compare(record1.id, record2.id);
    };

    public func compareBySportName(record1 : SportRecord, record2 : SportRecord) : Order.Order {
      Text.compare(record1.sportName, record2.sportName);
    };
  };

  // Strengths system
  type StrengthRecord = {
    id : Nat;
    studentId : Nat;
    subject : Text;
    description : Text;
  };

  module StrengthRecord {
    public func compare(record1 : StrengthRecord, record2 : StrengthRecord) : Order.Order {
      Nat.compare(record1.id, record2.id);
    };

    public func compareBySubject(record1 : StrengthRecord, record2 : StrengthRecord) : Order.Order {
      Text.compare(record1.subject, record2.subject);
    };
  };

  // News system
  type NewsItem = {
    id : Nat;
    title : Text;
    content : Text;
    date : Text;
    category : Text;
  };

  module NewsItem {
    public func compare(news1 : NewsItem, news2 : NewsItem) : Order.Order {
      Nat.compare(news1.id, news2.id);
    };

    public func compareByDate(news1 : NewsItem, news2 : NewsItem) : Order.Order {
      Text.compare(news1.date, news2.date);
    };
  };

  // Student access credentials
  type StudentAccess = {
    id : Nat;
    studentId : Nat;
    username : Text;
    password : Text;
  };

  // Fee structure for classes
  type FeeStructure = {
    className : Text;
    annualFee : Nat;
    tuitionFee : Nat;
    examFee : Nat;
    miscellaneousFee : Nat;
  };

  module FeeStructure {
    public func compare(struct1 : FeeStructure, struct2 : FeeStructure) : Order.Order {
      Text.compare(struct1.className, struct2.className);
    };
  };

  // Budget management
  type BudgetAllocation = {
    academicExpenditure : Nat;
    administrativeExpenditure : Nat;
    infrastructureExpenditure : Nat;
    libraryExpenditure : Nat;
    labExpenditure : Nat;
    sportsExpenditure : Nat;
    culturalExpenditure : Nat;
  };

  // Access control state and user profiles
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    userId : Nat;
    name : Text;
    email : Text;
    contactNumber : Text;
    address : Text;
    userType : Text; // admin or parent
    studentId : ?Nat; // For parents, links to their child
  };

  // Internal persistent state
  var nextId = 1001;
  var nextNewsId = 1001;

  let persons = Map.empty<Nat, Person>();
  let feeRecords = Map.empty<Nat, FeeRecord>();
  let examResults = Map.empty<Nat, ExamResult>();
  let disciplineRecords = Map.empty<Nat, DisciplineRecord>();
  let leaveRecords = Map.empty<Nat, LeaveRecord>();
  let applications = Map.empty<Nat, Application>();
  let sportRecords = Map.empty<Nat, SportRecord>();
  let strengthRecords = Map.empty<Nat, StrengthRecord>();
  let newsItems = Map.empty<Nat, NewsItem>();
  let studentAccess = Map.empty<Nat, StudentAccess>();
  let feeStructures = Map.empty<Text, FeeStructure>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let budgetAllocation = Map.empty<Text, BudgetAllocation>();

  // Helper function to check if caller is authorized to access student data
  func canAccessStudent(caller : Principal, studentId : Nat) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    // Check if caller is the parent of this student
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        switch (profile.studentId) {
          case (null) { false };
          case (?sid) { sid == studentId };
        };
      };
    };
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // News Management - Public can read, only admin can write
  public shared ({ caller }) func addNews(title : Text, content : Text, date : Text, category : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add news");
    };

    let id = nextNewsId;
    nextNewsId += 1;

    let newsItem : NewsItem = {
      id;
      title;
      content;
      date;
      category;
    };

    newsItems.add(id, newsItem);

    id;
  };

  public shared ({ caller }) func updateNews(id : Nat, title : Text, content : Text, date : Text, category : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update news");
    };

    switch (newsItems.get(id)) {
      case (null) { Runtime.trap("News item not found") };
      case (?existing) {
        let updated : NewsItem = {
          id;
          title;
          content;
          date;
          category;
        };
        newsItems.add(id, updated);
      };
    };
  };

  // Public can read news (no authorization check)
  public query ({ caller }) func getNewsById(newsId : Nat) : async NewsItem {
    switch (newsItems.get(newsId)) {
      case (null) { Runtime.trap("News item not found") };
      case (?news) { news };
    };
  };

  public query ({ caller }) func getAllNews() : async [NewsItem] {
    newsItems.values().toArray().sort(NewsItem.compareByDate);
  };

  public query ({ caller }) func getNewsByCategory(category : Text) : async [NewsItem] {
    newsItems.values().toArray().sort().filter(
      func(newsItem) { newsItem.category == category }
    );
  };

  // Person Management - Admin only for write, admin or parent for read
  public shared ({ caller }) func addPerson(person : Person) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add persons");
    };

    let id = nextId;
    nextId += 1;

    let newPerson : Person = {
      id;
      name = person.name;
      rollNumber = person.rollNumber;
      student_class = person.student_class;
      section = person.section;
      email = person.email;
      parentName = person.parentName;
      dateOfBirth = person.dateOfBirth;
      address = person.address;
      photo = person.photo;
    };

    persons.add(id, newPerson);

    id;
  };

  public shared ({ caller }) func updatePerson(personId : Nat, person : Person) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update persons");
    };

    switch (persons.get(personId)) {
      case (null) { Runtime.trap("Person not found") };
      case (?existing) {
        let updated : Person = {
          person with id = personId
        };
        persons.add(personId, updated);
      };
    };
  };

  public shared ({ caller }) func deletePerson(personId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete persons");
    };

    if (not persons.containsKey(personId)) {
      Runtime.trap("Person not found");
    };

    persons.remove(personId);
  };

  public query ({ caller }) func getPersonById(personId : Nat) : async Person {
    if (not canAccessStudent(caller, personId)) {
      Runtime.trap("Unauthorized: You can only view your own child's data");
    };

    switch (persons.get(personId)) {
      case (null) { Runtime.trap("Person not found") };
      case (?person) { person };
    };
  };

  public query ({ caller }) func getAllPersons() : async [Person] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all persons");
    };

    persons.values().toArray().sort(Person.compareByClass);
  };

  public query ({ caller }) func getPersonsByClass(className : Text, section : Text) : async [Person] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view persons by class");
    };

    persons.values().toArray().sort(Person.compareByClass).filter(
      func(person) { person.student_class == className and person.section == section }
    );
  };

  // Exam Results Management - Admin only for write, admin or parent for read
  public shared ({ caller }) func addExamResult(result : ExamResult) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add exam results");
    };

    let id = nextId;
    nextId += 1;

    let newResult : ExamResult = {
      id;
      studentId = result.studentId;
      subject = result.subject;
      marks = result.marks;
      maxMarks = result.maxMarks;
      grade = result.grade;
      examType = result.examType;
      year = result.year;
    };

    examResults.add(id, newResult);

    id;
  };

  public shared ({ caller }) func updateExamResult(resultId : Nat, result : ExamResult) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update exam results");
    };

    switch (examResults.get(resultId)) {
      case (null) { Runtime.trap("Exam result not found") };
      case (?existing) {
        let updated : ExamResult = {
          result with id = resultId
        };
        examResults.add(resultId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteExamResult(resultId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete exam results");
    };

    if (not examResults.containsKey(resultId)) {
      Runtime.trap("Exam result not found");
    };

    examResults.remove(resultId);
  };

  public query ({ caller }) func getExamResultsByStudent(studentId : Nat) : async [ExamResult] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's exam results");
    };

    examResults.values().toArray().sort().filter(
      func(result) { result.studentId == studentId }
    );
  };

  // Fee Management - Admin only for write, admin or parent for read
  public shared ({ caller }) func addFeeRecord(feeRecord : FeeRecord) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add fee records");
    };

    let id = nextId;
    nextId += 1;

    let newRecord : FeeRecord = {
      feeRecord with id;
    };

    feeRecords.add(id, newRecord);

    id;
  };

  public shared ({ caller }) func updateFeeRecord(recordId : Nat, feeRecord : FeeRecord) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update fee records");
    };

    switch (feeRecords.get(recordId)) {
      case (null) { Runtime.trap("Fee record not found") };
      case (?existing) {
        let updated : FeeRecord = {
          feeRecord with id = recordId
        };
        feeRecords.add(recordId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteFeeRecord(recordId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete fee records");
    };

    if (not feeRecords.containsKey(recordId)) {
      Runtime.trap("Fee record not found");
    };

    feeRecords.remove(recordId);
  };

  public query ({ caller }) func getFeeRecordsByStudent(studentId : Nat) : async [FeeRecord] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's fee records");
    };

    feeRecords.values().toArray().sort().filter(
      func(record) { record.studentId == studentId }
    );
  };

  // Discipline Records - Admin only for write, admin or parent for read
  public shared ({ caller }) func addDisciplineRecord(record : DisciplineRecord) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add discipline records");
    };

    let id = nextId;
    nextId += 1;

    let newRecord : DisciplineRecord = {
      record with id;
    };

    disciplineRecords.add(id, newRecord);

    id;
  };

  public shared ({ caller }) func updateDisciplineRecord(recordId : Nat, record : DisciplineRecord) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update discipline records");
    };

    switch (disciplineRecords.get(recordId)) {
      case (null) { Runtime.trap("Discipline record not found") };
      case (?existing) {
        let updated : DisciplineRecord = {
          record with id = recordId
        };
        disciplineRecords.add(recordId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteDisciplineRecord(recordId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete discipline records");
    };

    if (not disciplineRecords.containsKey(recordId)) {
      Runtime.trap("Discipline record not found");
    };

    disciplineRecords.remove(recordId);
  };

  public query ({ caller }) func getDisciplineRecordsByStudent(studentId : Nat) : async [DisciplineRecord] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's discipline records");
    };

    disciplineRecords.values().toArray().sort().filter(
      func(record) { record.studentId == studentId }
    );
  };

  // Leave Records - Admin only for write, admin or parent for read
  public shared ({ caller }) func addLeaveRecord(record : LeaveRecord) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add leave records");
    };

    let id = nextId;
    nextId += 1;

    let newRecord : LeaveRecord = {
      record with id;
    };

    leaveRecords.add(id, newRecord);

    id;
  };

  public shared ({ caller }) func updateLeaveRecord(recordId : Nat, record : LeaveRecord) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update leave records");
    };

    switch (leaveRecords.get(recordId)) {
      case (null) { Runtime.trap("Leave record not found") };
      case (?existing) {
        let updated : LeaveRecord = {
          record with id = recordId
        };
        leaveRecords.add(recordId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteLeaveRecord(recordId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete leave records");
    };

    if (not leaveRecords.containsKey(recordId)) {
      Runtime.trap("Leave record not found");
    };

    leaveRecords.remove(recordId);
  };

  public query ({ caller }) func getLeaveRecordsByStudent(studentId : Nat) : async [LeaveRecord] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's leave records");
    };

    leaveRecords.values().toArray().sort().filter(
      func(record) { record.studentId == studentId }
    );
  };

  // Applications - Admin only for write, admin or parent for read
  public shared ({ caller }) func addApplication(application : Application) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add applications");
    };

    let id = nextId;
    nextId += 1;

    let newApplication : Application = {
      application with id;
    };

    applications.add(id, newApplication);

    id;
  };

  public shared ({ caller }) func updateApplication(applicationId : Nat, application : Application) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update applications");
    };

    switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?existing) {
        let updated : Application = {
          application with id = applicationId
        };
        applications.add(applicationId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteApplication(applicationId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete applications");
    };

    if (not applications.containsKey(applicationId)) {
      Runtime.trap("Application not found");
    };

    applications.remove(applicationId);
  };

  public query ({ caller }) func getApplicationsByStudent(studentId : Nat) : async [Application] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's applications");
    };

    applications.values().toArray().sort().filter(
      func(application) { application.studentId == studentId }
    );
  };

  // Sport Records - Admin only for write, admin or parent for read
  public shared ({ caller }) func addSportRecord(record : SportRecord) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add sport records");
    };

    let id = nextId;
    nextId += 1;

    let newRecord : SportRecord = {
      record with id;
    };

    sportRecords.add(id, newRecord);

    id;
  };

  public shared ({ caller }) func updateSportRecord(recordId : Nat, record : SportRecord) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update sport records");
    };

    switch (sportRecords.get(recordId)) {
      case (null) { Runtime.trap("Sport record not found") };
      case (?existing) {
        let updated : SportRecord = {
          record with id = recordId
        };
        sportRecords.add(recordId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteSportRecord(recordId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete sport records");
    };

    if (not sportRecords.containsKey(recordId)) {
      Runtime.trap("Sport record not found");
    };

    sportRecords.remove(recordId);
  };

  public query ({ caller }) func getSportRecordsByStudent(studentId : Nat) : async [SportRecord] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's sport records");
    };

    sportRecords.values().toArray().sort().filter(
      func(record) { record.studentId == studentId }
    );
  };

  // Strength Records - Admin only for write, admin or parent for read
  public shared ({ caller }) func addStrengthRecord(record : StrengthRecord) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add strength records");
    };

    let id = nextId;
    nextId += 1;

    let newRecord : StrengthRecord = {
      record with id;
    };

    strengthRecords.add(id, newRecord);

    id;
  };

  public shared ({ caller }) func updateStrengthRecord(recordId : Nat, record : StrengthRecord) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update strength records");
    };

    switch (strengthRecords.get(recordId)) {
      case (null) { Runtime.trap("Strength record not found") };
      case (?existing) {
        let updated : StrengthRecord = {
          record with id = recordId
        };
        strengthRecords.add(recordId, updated);
      };
    };
  };

  public shared ({ caller }) func deleteStrengthRecord(recordId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete strength records");
    };

    if (not strengthRecords.containsKey(recordId)) {
      Runtime.trap("Strength record not found");
    };

    strengthRecords.remove(recordId);
  };

  public query ({ caller }) func getStrengthRecordsByStudent(studentId : Nat) : async [StrengthRecord] {
    if (not canAccessStudent(caller, studentId)) {
      Runtime.trap("Unauthorized: You can only view your own child's strength records");
    };

    strengthRecords.values().toArray().sort().filter(
      func(record) { record.studentId == studentId }
    );
  };
};
