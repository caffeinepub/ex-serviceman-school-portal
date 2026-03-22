import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useActor } from "./useActor";

export function useGetAllPersons() {
  const { actor, isFetching } = useActor();
  return useQuery<Person[]>({
    queryKey: ["persons"],
    queryFn: async () => {
      if (!actor) return sampleStudents;
      try {
        const result = await actor.getAllPersons();
        return result.length ? result : sampleStudents;
      } catch {
        return sampleStudents;
      }
    },
    enabled: !isFetching,
  });
}

export function useGetPersonById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Person | null>({
    queryKey: ["person", id?.toString()],
    queryFn: async () => {
      if (!id) return null;
      if (!actor) return sampleStudents.find((s) => s.id === id) ?? null;
      try {
        return await actor.getPersonById(id);
      } catch {
        return sampleStudents.find((s) => s.id === id) ?? null;
      }
    },
    enabled: !isFetching && id !== null,
  });
}

export function useGetExamResults(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<ExamResult[]>({
    queryKey: ["examResults", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor) return sampleResults.filter((r) => r.studentId === studentId);
      try {
        return await actor.getExamResultsByStudent(studentId);
      } catch {
        return sampleResults.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetFeeRecords(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<FeeRecord[]>({
    queryKey: ["fees", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor) return sampleFees.filter((r) => r.studentId === studentId);
      try {
        return await actor.getFeeRecordsByStudent(studentId);
      } catch {
        return sampleFees.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetDisciplineRecords(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<DisciplineRecord[]>({
    queryKey: ["discipline", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor)
        return sampleDiscipline.filter((r) => r.studentId === studentId);
      try {
        return await actor.getDisciplineRecordsByStudent(studentId);
      } catch {
        return sampleDiscipline.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetSportRecords(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<SportRecord[]>({
    queryKey: ["sports", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor) return sampleSports.filter((r) => r.studentId === studentId);
      try {
        return await actor.getSportRecordsByStudent(studentId);
      } catch {
        return sampleSports.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetStrengthRecords(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<StrengthRecord[]>({
    queryKey: ["strengths", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor)
        return sampleStrengths.filter((r) => r.studentId === studentId);
      try {
        return await actor.getStrengthRecordsByStudent(studentId);
      } catch {
        return sampleStrengths.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetLeaveRecords(studentId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<LeaveRecord[]>({
    queryKey: ["leave", studentId?.toString()],
    queryFn: async () => {
      if (!studentId) return [];
      if (!actor) return sampleLeave.filter((r) => r.studentId === studentId);
      try {
        return await actor.getLeaveRecordsByStudent(studentId);
      } catch {
        return sampleLeave.filter((r) => r.studentId === studentId);
      }
    },
    enabled: !isFetching && studentId !== null,
  });
}

export function useGetAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return sampleNews;
      try {
        const result = await actor.getAllNews();
        return result.length ? result : sampleNews;
      } catch {
        return sampleNews;
      }
    },
    enabled: !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !isFetching,
  });
}

export function useAddPerson() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (person: Person) => actor!.addPerson(person),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["persons"] }),
  });
}

export function useUpdatePerson() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, person }: { id: bigint; person: Person }) =>
      actor!.updatePerson(id, person),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["persons"] }),
  });
}

export function useDeletePerson() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deletePerson(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["persons"] }),
  });
}

export function useAddExamResult() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (result: ExamResult) => actor!.addExamResult(result),
    onSuccess: (_, v) =>
      qc.invalidateQueries({
        queryKey: ["examResults", v.studentId.toString()],
      }),
  });
}

export function useDeleteExamResult() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteExamResult(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["examResults"] }),
  });
}

export function useAddFeeRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: FeeRecord) => actor!.addFeeRecord(record),
    onSuccess: (_, v) =>
      qc.invalidateQueries({ queryKey: ["fees", v.studentId.toString()] }),
  });
}

export function useUpdateFeeRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, record }: { id: bigint; record: FeeRecord }) =>
      actor!.updateFeeRecord(id, record),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fees"] }),
  });
}

export function useDeleteFeeRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteFeeRecord(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fees"] }),
  });
}

export function useAddDisciplineRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: DisciplineRecord) =>
      actor!.addDisciplineRecord(record),
    onSuccess: (_, v) =>
      qc.invalidateQueries({
        queryKey: ["discipline", v.studentId.toString()],
      }),
  });
}

export function useUpdateDisciplineRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, record }: { id: bigint; record: DisciplineRecord }) =>
      actor!.updateDisciplineRecord(id, record),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["discipline"] }),
  });
}

export function useAddSportRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: SportRecord) => actor!.addSportRecord(record),
    onSuccess: (_, v) =>
      qc.invalidateQueries({ queryKey: ["sports", v.studentId.toString()] }),
  });
}

export function useAddStrengthRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: StrengthRecord) => actor!.addStrengthRecord(record),
    onSuccess: (_, v) =>
      qc.invalidateQueries({ queryKey: ["strengths", v.studentId.toString()] }),
  });
}

export function useUpdateLeaveRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, record }: { id: bigint; record: LeaveRecord }) =>
      actor!.updateLeaveRecord(id, record),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leave"] }),
  });
}

export function useAddLeaveRecord() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (record: LeaveRecord) => actor!.addLeaveRecord(record),
    onSuccess: (_, v) =>
      qc.invalidateQueries({ queryKey: ["leave", v.studentId.toString()] }),
  });
}

export function useAddNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      content,
      date,
      category,
    }: { title: string; content: string; date: string; category: string }) =>
      actor!.addNews(title, content, date, category),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useUpdateNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      title,
      content,
      date,
      category,
    }: {
      id: bigint;
      title: string;
      content: string;
      date: string;
      category: string;
    }) => actor!.updateNews(id, title, content, date, category),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useGetPersonsByClass(className: string, section: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Person[]>({
    queryKey: ["personsByClass", className, section],
    queryFn: async () => {
      if (!actor)
        return sampleStudents.filter(
          (s) => s.student_class === className && s.section === section,
        );
      try {
        return await actor.getPersonsByClass(className, section);
      } catch {
        return sampleStudents.filter(
          (s) => s.student_class === className && s.section === section,
        );
      }
    },
    enabled: !isFetching && !!className && !!section,
  });
}
