import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, ShieldOff, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { NewsItem, Person } from "../backend";
import Footer from "../components/Footer";
import SchoolHeader from "../components/SchoolHeader";
import { sampleNews, sampleStudents } from "../data/sampleData";
import {
  useAddNews,
  useAddPerson,
  useDeletePerson,
  useGetAllNews,
  useGetAllPersons,
  useIsCallerAdmin,
  useUpdateNews,
} from "../hooks/useQueries";

type AdminSection =
  | "students"
  | "results"
  | "fees"
  | "discipline"
  | "sports"
  | "strengths"
  | "leave"
  | "news";

const NAV_SECTIONS: { id: AdminSection; label: string; icon: string }[] = [
  { id: "students", label: "Students", icon: "👨‍🎓" },
  { id: "results", label: "Results", icon: "📊" },
  { id: "fees", label: "Fees", icon: "💰" },
  { id: "discipline", label: "Discipline", icon: "⚖️" },
  { id: "sports", label: "Sports", icon: "🏏" },
  { id: "strengths", label: "Strengths", icon: "⭐" },
  { id: "leave", label: "Leave", icon: "📅" },
  { id: "news", label: "News", icon: "📰" },
];

function StudentForm({
  onSave,
  onCancel,
  initial,
}: {
  onSave: (p: Person) => void;
  onCancel: () => void;
  initial?: Partial<Person>;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    student_class: initial?.student_class ?? "",
    section: initial?.section ?? "",
    rollNumber: initial?.rollNumber?.toString() ?? "",
    email: initial?.email ?? "",
    dateOfBirth: initial?.dateOfBirth ?? "",
    address: initial?.address ?? "",
    parentName: initial?.parentName ?? "",
  });

  const handleSave = () => {
    onSave({
      id: initial?.id ?? 0n,
      name: form.name,
      student_class: form.student_class,
      section: form.section,
      rollNumber: BigInt(form.rollNumber || 0),
      email: form.email,
      dateOfBirth: form.dateOfBirth,
      address: form.address,
      parentName: form.parentName,
      photo: initial?.photo ?? "",
    });
  };

  const fields = [
    "name",
    "student_class",
    "section",
    "rollNumber",
    "email",
    "dateOfBirth",
    "address",
    "parentName",
  ] as const;

  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div key={field}>
          <Label className="capitalize text-xs">
            {field.replace("_", " ")}
          </Label>
          <Input
            value={form[field]}
            onChange={(e) =>
              setForm((p) => ({ ...p, [field]: e.target.value }))
            }
            className="mt-1"
            data-ocid={`admin.${field}.input`}
          />
        </div>
      ))}
      <DialogFooter className="pt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground"
          data-ocid="admin.save_button"
        >
          Save Student
        </Button>
      </DialogFooter>
    </div>
  );
}

function NewsForm({
  onSave,
  onCancel,
  initial,
}: {
  onSave: (n: Omit<NewsItem, "id">) => void;
  onCancel: () => void;
  initial?: Partial<NewsItem>;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    content: initial?.content ?? "",
    date: initial?.date ?? new Date().toISOString().split("T")[0],
    category: initial?.category ?? "Notice",
  });

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs">Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="mt-1"
          data-ocid="admin.news.title.input"
        />
      </div>
      <div>
        <Label className="text-xs">Category</Label>
        <Input
          value={form.category}
          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
          className="mt-1"
          data-ocid="admin.news.category.input"
        />
      </div>
      <div>
        <Label className="text-xs">Date</Label>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          className="mt-1"
          data-ocid="admin.news.date.input"
        />
      </div>
      <div>
        <Label className="text-xs">Content</Label>
        <Textarea
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          className="mt-1"
          rows={4}
          data-ocid="admin.news.textarea"
        />
      </div>
      <DialogFooter className="pt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          data-ocid="admin.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(form)}
          className="bg-primary text-primary-foreground"
          data-ocid="admin.save_button"
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  );
}

export default function AdminPage() {
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();
  const [activeSection, setActiveSection] = useState<AdminSection>("students");
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  const { data: persons = sampleStudents } = useGetAllPersons();
  const { data: news = sampleNews } = useGetAllNews();

  const addPerson = useAddPerson();
  const deletePerson = useDeletePerson();
  const addNews = useAddNews();
  const updateNews = useUpdateNews();

  const handleAddStudent = (p: Person) => {
    addPerson.mutate(p, {
      onSuccess: () => {
        toast.success("Student added!");
        setStudentDialogOpen(false);
      },
      onError: () => toast.error("Failed to add student"),
    });
  };

  const handleDeleteStudent = (id: bigint) => {
    deletePerson.mutate(id, {
      onSuccess: () => toast.success("Student deleted"),
      onError: () => toast.error("Failed to delete"),
    });
  };

  const handleSaveNews = (n: Omit<NewsItem, "id">) => {
    if (editingNews) {
      updateNews.mutate(
        { id: editingNews.id, ...n },
        {
          onSuccess: () => {
            toast.success("News updated!");
            setNewsDialogOpen(false);
            setEditingNews(null);
          },
          onError: () => toast.error("Failed to update news"),
        },
      );
    } else {
      addNews.mutate(n, {
        onSuccess: () => {
          toast.success("News published!");
          setNewsDialogOpen(false);
        },
        onError: () => toast.error("Failed to publish news"),
      });
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <SchoolHeader />
        <div
          className="flex-1 flex items-center justify-center"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <SchoolHeader />
        <main className="flex-1 flex items-center justify-center bg-secondary">
          <div className="text-center p-8" data-ocid="admin.error_state">
            <ShieldOff className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold text-primary mb-2">
              Access Restricted
            </h2>
            <p className="text-muted-foreground">
              You need admin privileges to access this panel.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Please login with an admin account.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SchoolHeader />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-primary text-primary-foreground flex-shrink-0 hidden md:flex flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <h2 className="font-display font-bold text-sm">Admin Panel</h2>
            <p className="text-xs text-primary-foreground/60">
              School Management
            </p>
          </div>
          <nav className="flex-1 p-2 space-y-1" data-ocid="admin.panel">
            {NAV_SECTIONS.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                  activeSection === s.id
                    ? "bg-sidebar-accent text-primary-foreground font-semibold"
                    : "hover:bg-sidebar-accent/50"
                }`}
                data-ocid={`admin.${s.id}.tab`}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden bg-primary text-primary-foreground w-full flex overflow-x-auto border-b border-sidebar-border">
          {NAV_SECTIONS.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex-shrink-0 px-4 py-3 text-xs font-medium ${
                activeSection === s.id
                  ? "border-b-2 border-accent text-accent"
                  : "text-primary-foreground/70"
              }`}
              data-ocid={`admin.${s.id}.tab`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === "students" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-primary">
                    Students
                  </h2>
                  <Dialog
                    open={studentDialogOpen}
                    onOpenChange={setStudentDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="bg-primary text-primary-foreground"
                        data-ocid="admin.open_modal_button"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-lg"
                      data-ocid="admin.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle className="font-display">
                          Add New Student
                        </DialogTitle>
                      </DialogHeader>
                      <StudentForm
                        onSave={handleAddStudent}
                        onCancel={() => setStudentDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary">
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {persons.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-muted-foreground py-8"
                            data-ocid="students.empty_state"
                          >
                            No students found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        persons.map((p, i) => (
                          <TableRow
                            key={p.id.toString()}
                            data-ocid={`students.item.${i + 1}`}
                          >
                            <TableCell className="font-mono">
                              {p.rollNumber.toString()}
                            </TableCell>
                            <TableCell className="font-medium">
                              {p.name}
                            </TableCell>
                            <TableCell>Class {p.student_class}</TableCell>
                            <TableCell>
                              <Badge variant="outline">Sec {p.section}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {p.parentName}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  data-ocid={`students.edit_button.${i + 1}`}
                                >
                                  <Pencil className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleDeleteStudent(p.id)}
                                  data-ocid={`students.delete_button.${i + 1}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {activeSection === "news" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-primary">
                    School News
                  </h2>
                  <Dialog
                    open={newsDialogOpen}
                    onOpenChange={setNewsDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="bg-primary text-primary-foreground"
                        onClick={() => setEditingNews(null)}
                        data-ocid="admin.news.open_modal_button"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add News
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-lg"
                      data-ocid="admin.news.dialog"
                    >
                      <DialogHeader>
                        <DialogTitle className="font-display">
                          {editingNews ? "Edit News" : "Add News Item"}
                        </DialogTitle>
                      </DialogHeader>
                      <NewsForm
                        initial={editingNews ?? undefined}
                        onSave={handleSaveNews}
                        onCancel={() => {
                          setNewsDialogOpen(false);
                          setEditingNews(null);
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {news.map((n, i) => (
                    <Card
                      key={n.id.toString()}
                      data-ocid={`news.item.${i + 1}`}
                    >
                      <CardContent className="p-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {n.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {n.date}
                            </span>
                          </div>
                          <p className="font-semibold text-sm text-primary">
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {n.content}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setEditingNews(n);
                              setNewsDialogOpen(true);
                            }}
                            data-ocid={`news.edit_button.${i + 1}`}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {[
              "results",
              "fees",
              "discipline",
              "sports",
              "strengths",
              "leave",
            ].includes(activeSection) && (
              <div>
                <h2 className="font-display text-2xl font-bold text-primary mb-4 capitalize">
                  {activeSection}
                </h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">
                      Select a student from the Students section to manage their{" "}
                      {activeSection} records.
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This section allows you to manage individual student
                      records. Navigate to Students first, then use the action
                      buttons to manage records per student.
                    </p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {persons.slice(0, 4).map((p, i) => (
                        <div
                          key={p.id.toString()}
                          className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                          data-ocid={`admin.${activeSection}.item.${i + 1}`}
                        >
                          <div>
                            <p className="font-medium text-sm">{p.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Class {p.student_class} · Sec {p.section} · Roll{" "}
                              {p.rollNumber.toString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            data-ocid={`admin.${activeSection}.edit_button.${i + 1}`}
                          >
                            Manage
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
