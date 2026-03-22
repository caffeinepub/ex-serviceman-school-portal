import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Share2,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { ExamResult } from "../backend";
import Footer from "../components/Footer";
import SchoolHeader from "../components/SchoolHeader";
import {
  sampleDiscipline,
  sampleFees,
  sampleLeave,
  sampleNews,
  sampleResults,
  sampleSports,
  sampleStrengths,
  sampleStudents,
} from "../data/sampleData";
import {
  useGetAllNews,
  useGetDisciplineRecords,
  useGetExamResults,
  useGetFeeRecords,
  useGetLeaveRecords,
  useGetPersonsByClass,
  useGetSportRecords,
  useGetStrengthRecords,
} from "../hooks/useQueries";

function gradeColor(grade: string) {
  if (grade.startsWith("A")) return "bg-green-100 text-green-800";
  if (grade.startsWith("B")) return "bg-blue-100 text-blue-800";
  if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

function sportLevelBadge(level: string) {
  const map: Record<string, string> = {
    School: "bg-blue-100 text-blue-800",
    District: "bg-orange-100 text-orange-800",
    State: "bg-green-100 text-green-800",
    National: "bg-yellow-100 text-yellow-900",
  };
  return map[level] ?? "bg-muted text-muted-foreground";
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { cls: string; icon: React.ReactNode; label: string }
  > = {
    approved: {
      cls: "bg-green-100 text-green-800",
      icon: <CheckCircle className="w-3 h-3 inline mr-1" />,
      label: "Approved",
    },
    pending: {
      cls: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="w-3 h-3 inline mr-1" />,
      label: "Pending",
    },
    rejected: {
      cls: "bg-red-100 text-red-800",
      icon: <XCircle className="w-3 h-3 inline mr-1" />,
      label: "Rejected",
    },
  };
  const entry = map[status.toLowerCase()] ?? {
    cls: "bg-muted text-muted-foreground",
    icon: null,
    label: status,
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${entry.cls}`}
    >
      {entry.icon}
      {entry.label}
    </span>
  );
}

function categoryBadgeColor(cat: string) {
  const m: Record<string, string> = {
    Events: "bg-purple-100 text-purple-800",
    Academics: "bg-blue-100 text-blue-800",
    Notice: "bg-yellow-100 text-yellow-800",
    Achievement: "bg-green-100 text-green-800",
    Sports: "bg-orange-100 text-orange-800",
  };
  return m[cat] ?? "bg-muted text-muted-foreground";
}

export default function DashboardPage() {
  const search = useSearch({ from: "/dashboard" }) as {
    roll?: string;
    cls?: string;
    sec?: string;
  };
  const rollNum = search.roll ?? "";
  const cls = search.cls ?? "10";
  const sec = search.sec ?? "A";

  const { data: studentsInClass, isLoading: loadingStudents } =
    useGetPersonsByClass(cls, sec);

  const student =
    studentsInClass?.find((s) => s.rollNumber.toString() === rollNum) ??
    sampleStudents[0];

  const studentId = student?.id ?? 1n;

  const {
    data: results = sampleResults.filter((r) => r.studentId === studentId),
  } = useGetExamResults(studentId);
  const { data: fees = sampleFees.filter((r) => r.studentId === studentId) } =
    useGetFeeRecords(studentId);
  const {
    data: discipline = sampleDiscipline.filter(
      (r) => r.studentId === studentId,
    ),
  } = useGetDisciplineRecords(studentId);
  const {
    data: sports = sampleSports.filter((r) => r.studentId === studentId),
  } = useGetSportRecords(studentId);
  const {
    data: strengths = sampleStrengths.filter((r) => r.studentId === studentId),
  } = useGetStrengthRecords(studentId);
  const { data: leave = sampleLeave.filter((r) => r.studentId === studentId) } =
    useGetLeaveRecords(studentId);
  const { data: news = sampleNews } = useGetAllNews();

  const pendingFees = fees.filter((f) => !f.paid);
  const totalPending = pendingFees.reduce(
    (acc, f) => acc + Number(f.totalAmount),
    0,
  );
  const latestResults = results.filter(
    (r) => r.examType === (results[0]?.examType ?? ""),
  );
  const avgMarks = latestResults.length
    ? latestResults.reduce(
        (a, r) => a + (Number(r.marks) / Number(r.maxMarks)) * 100,
        0,
      ) / latestResults.length
    : 0;

  // Group results by exam type
  const resultsByExam: Record<string, ExamResult[]> = {};
  for (const r of results) {
    const key = `${r.examType} ${r.year}`;
    if (!resultsByExam[key]) resultsByExam[key] = [];
    resultsByExam[key].push(r);
  }

  async function handleShare() {
    const studentName = student?.name ?? "Student";
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${studentName} - Student Portal`,
          text: `View student dashboard for ${studentName}`,
          url,
        });
      } catch {
        // User cancelled or error — do nothing
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SchoolHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Student Card */}
        {loadingStudents ? (
          <Skeleton
            className="h-32 w-full mb-8 rounded-xl"
            data-ocid="dashboard.loading_state"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="school-badge text-primary-foreground rounded-xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <Avatar className="w-16 h-16 border-4 border-accent">
              <AvatarFallback className="bg-accent text-accent-foreground text-xl font-display font-bold">
                {student?.name?.charAt(0) ?? "S"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold">
                {student?.name ?? "Student Name"}
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Class {student?.student_class ?? cls} · Section{" "}
                {student?.section ?? sec} · Roll No.{" "}
                {student?.rollNumber?.toString() ?? rollNum}
              </p>
              <p className="text-accent text-sm font-medium mt-0.5">
                Parent: {student?.parentName ?? "Parent"}
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground">
                  Active Student
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8 p-0"
                  title="Share student dashboard"
                  data-ocid="dashboard.share_button"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60">
                {student?.dateOfBirth ?? ""}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList
            className="flex flex-wrap h-auto gap-1 mb-6 bg-secondary p-1 rounded-lg"
            data-ocid="dashboard.tab"
          >
            {[
              "overview",
              "results",
              "fees",
              "discipline",
              "sports",
              "strengths",
              "leave",
              "news",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-ocid={`dashboard.${tab}.tab`}
              >
                {tab === "overview"
                  ? "📋 Overview"
                  : tab === "results"
                    ? "📊 Results"
                    : tab === "fees"
                      ? "💰 Fees"
                      : tab === "discipline"
                        ? "⚖️ Discipline"
                        : tab === "sports"
                          ? "🏏 Sports"
                          : tab === "strengths"
                            ? "⭐ Strengths"
                            : tab === "leave"
                              ? "📅 Leave"
                              : "📰 News"}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" data-ocid="dashboard.overview.panel">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-display text-3xl font-bold text-primary">
                    {avgMarks.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {results[0]?.examType} {results[0]?.year?.toString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Pending Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-display text-3xl font-bold text-destructive">
                    {pendingFees.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{totalPending.toLocaleString()} outstanding
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Sports & Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-display text-3xl font-bold text-amber-600">
                    {sports.length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {sports[0]
                      ? `${sports[0].sportName} — ${sports[0].level}`
                      : "No records"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Results */}
          <TabsContent value="results" data-ocid="dashboard.results.panel">
            {Object.entries(resultsByExam).map(([examKey, examResults]) => (
              <div key={examKey} className="mb-6">
                <h3 className="font-display font-semibold text-primary mb-3 text-lg">
                  {examKey}
                </h3>
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary">
                        <TableHead>Subject</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Max Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {examResults.map((r, i) => (
                        <TableRow
                          key={r.id.toString()}
                          data-ocid={`results.item.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {r.subject}
                          </TableCell>
                          <TableCell>{r.marks.toString()}</TableCell>
                          <TableCell>{r.maxMarks.toString()}</TableCell>
                          <TableCell>
                            {(
                              (Number(r.marks) / Number(r.maxMarks)) *
                              100
                            ).toFixed(1)}
                            %
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${gradeColor(r.grade)}`}
                            >
                              {r.grade}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            ))}
          </TabsContent>

          {/* Fees */}
          <TabsContent value="fees" data-ocid="dashboard.fees.panel">
            {pendingFees.length > 0 && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-semibold text-red-800 text-sm">
                    Outstanding Dues: ₹{totalPending.toLocaleString()}
                  </p>
                  <p className="text-red-600 text-xs">
                    Please clear pending fees to avoid late charges.
                  </p>
                </div>
              </div>
            )}
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((f, i) => (
                    <TableRow
                      key={f.id.toString()}
                      data-ocid={`fees.item.${i + 1}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {f.description}
                      </TableCell>
                      <TableCell>
                        ₹{Number(f.totalAmount).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{f.dueDate}</TableCell>
                      <TableCell>
                        {f.paid ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {f.paidDate ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Discipline */}
          <TabsContent
            value="discipline"
            data-ocid="dashboard.discipline.panel"
          >
            {discipline.length === 0 ? (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="discipline.empty_state"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p className="font-semibold">
                  Excellent conduct! No discipline records.
                </p>
                <p className="text-sm">
                  Your child maintains exemplary behaviour.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {discipline.map((d, i) => (
                  <motion.div
                    key={d.id.toString()}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    data-ocid={`discipline.item.${i + 1}`}
                  >
                    <Card className="border-l-4 border-l-amber-400">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                {d.date}
                              </span>
                              <Badge
                                variant={
                                  d.resolvedStatus ? "outline" : "destructive"
                                }
                                className={
                                  d.resolvedStatus
                                    ? "border-green-500 text-green-700"
                                    : ""
                                }
                              >
                                {d.resolvedStatus ? "Resolved" : "Ongoing"}
                              </Badge>
                            </div>
                            <p className="font-semibold text-sm text-foreground mb-1">
                              Incident: {d.incident}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Action taken:</span>{" "}
                              {d.action}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sports */}
          <TabsContent value="sports" data-ocid="dashboard.sports.panel">
            {sports.length === 0 ? (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="sports.empty_state"
              >
                <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p>No sports records yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sports.map((s, i) => (
                  <motion.div
                    key={s.id.toString()}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    data-ocid={`sports.item.${i + 1}`}
                  >
                    <Card className="h-full hover:shadow-navy transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-amber-600" />
                            <h3 className="font-display font-bold text-primary text-lg">
                              {s.sportName}
                            </h3>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${sportLevelBadge(s.level)}`}
                          >
                            {s.level} Level
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {s.achievements}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Strengths */}
          <TabsContent value="strengths" data-ocid="dashboard.strengths.panel">
            {/* Dear Parent card */}
            <Card className="mb-6 border-accent border-2 bg-gradient-to-r from-amber-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                  <h3 className="font-display font-bold text-primary text-lg">
                    Dear Parent,
                  </h3>
                </div>
                <p className="text-foreground leading-relaxed">
                  Your child{" "}
                  <span className="font-bold text-primary">
                    {student?.name ?? "your child"}
                  </span>{" "}
                  shows remarkable strengths in the following areas, as
                  identified and celebrated by their teachers. We encourage you
                  to nurture and support these natural talents at home as well.
                </p>
              </CardContent>
            </Card>

            {strengths.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="strengths.empty_state"
              >
                <Star className="w-12 h-12 mx-auto mb-3" />
                <p>No strengths recorded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strengths.map((s, i) => (
                  <motion.div
                    key={s.id.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    data-ocid={`strengths.item.${i + 1}`}
                  >
                    <Card className="h-full border-l-4 border-l-accent">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-amber-500" />
                          <h4 className="font-semibold text-primary">
                            {s.subject}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {s.description}
                        </p>
                        <div className="mt-3 text-xs text-accent font-semibold">
                          "I am good in {s.subject}"
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Leave */}
          <TabsContent value="leave" data-ocid="dashboard.leave.panel">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leave.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground py-8"
                        data-ocid="leave.empty_state"
                      >
                        No leave records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    leave.map((l, i) => (
                      <TableRow
                        key={l.id.toString()}
                        data-ocid={`leave.item.${i + 1}`}
                      >
                        <TableCell className="text-sm">{l.fromDate}</TableCell>
                        <TableCell className="text-sm">{l.toDate}</TableCell>
                        <TableCell className="text-sm max-w-xs">
                          {l.reason}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={l.status} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* News */}
          <TabsContent value="news" data-ocid="dashboard.news.panel">
            <div className="space-y-4">
              {news
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((n, i) => (
                  <motion.div
                    key={n.id.toString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    data-ocid={`news.item.${i + 1}`}
                  >
                    <Card className="hover:shadow-navy transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${categoryBadgeColor(n.category)}`}
                          >
                            {n.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {n.date}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-primary text-base mb-2">
                          {n.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {n.content}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
