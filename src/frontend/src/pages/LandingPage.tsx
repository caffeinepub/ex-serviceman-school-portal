import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  GraduationCap,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import SchoolHeader from "../components/SchoolHeader";

const galleryImages = [
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.56-AM-2.jpeg",
    alt: "School Building",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.54-AM-1--1.jpeg",
    alt: "Students with Flags",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.55-AM-1--3.jpeg",
    alt: "Students on Steps",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.54-AM-4.jpeg",
    alt: "School Courtyard",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.55-AM-2--5.jpeg",
    alt: "Aerial View",
  },
  {
    src: "/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.55-AM-6.jpeg",
    alt: "School with Principal",
  },
];

const stats = [
  { icon: Calendar, label: "Established", value: "1999" },
  { icon: Users, label: "Strength", value: "1200+ Students" },
  { icon: BookOpen, label: "Classes", value: "1st to 12th" },
  { icon: Award, label: "Streams", value: "Arts · Science · Commerce" },
];

const features = [
  {
    icon: "📊",
    title: "Academic Results",
    desc: "View subject-wise exam results, grades, and performance trends across all examinations.",
  },
  {
    icon: "💰",
    title: "Fee Status",
    desc: "Track paid and pending fees, due dates, and transaction history at a glance.",
  },
  {
    icon: "⚖️",
    title: "Discipline Record",
    desc: "Stay informed about your child's conduct with transparent incident and action records.",
  },
  {
    icon: "🏏",
    title: "Sports Achievement",
    desc: "Celebrate your child's sporting journey — from school level to national competitions.",
  },
  {
    icon: "⭐",
    title: "Strengths & Talents",
    desc: "Discover what your child excels at, as identified and celebrated by their teachers.",
  },
  {
    icon: "📅",
    title: "Leave Records",
    desc: "Track approved leaves, pending applications, and attendance-related information.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SchoolHeader />

      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/assets/uploads/WhatsApp-Image-2026-03-22-at-1.30.56-AM-2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img
              src="/assets/generated/school-logo-transparent.dim_400x400.png"
              alt="School Logo"
              className="w-28 h-28 mx-auto rounded-full bg-white/10 p-1 border-4 border-accent shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="bg-accent text-accent-foreground mb-4 text-xs tracking-widest uppercase">
              Recognised by Government of J&K | Affiliated to JKBOSE
            </Badge>
            <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-3 drop-shadow-lg">
              Ex-Servicemen Public
              <br />
              Higher Secondary School
            </h1>
            <p className="text-lg text-white/90 mb-2">
              Thathri, District Doda — Jammu &amp; Kashmir
            </p>
            <p className="text-sm text-accent font-semibold mb-8 tracking-wide">
              Excellence in Education Since 1999
            </p>

            <Link to="/login">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 shadow-xl"
                data-ocid="hero.primary_button"
              >
                <GraduationCap className="mr-2 w-5 h-5" />
                Parent Login — View Child's Profile
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <stat.icon className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/60">
                    {stat.label}
                  </div>
                  <div className="font-semibold text-sm">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="container mx-auto px-4 py-14 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            A Message to Parents
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded" />
          <p className="text-muted-foreground leading-relaxed text-base">
            Welcome to the Ex-Servicemen Public Higher Secondary School Parent
            Portal. This secure digital platform is your window into your
            child's academic journey, discipline, co-curricular achievements,
            and overall growth. Our school, founded by proud ex-servicemen of
            the Indian Armed Forces, stands committed to nurturing disciplined,
            learned, and patriotic citizens.
          </p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-3xl font-bold text-primary mb-2">
              Our School
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg aspect-video"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-primary mb-2">
            Parent Portal Features
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border hover:shadow-navy transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-display font-semibold text-primary text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/login">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="features.primary_button"
            >
              Access Your Child's Profile
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
