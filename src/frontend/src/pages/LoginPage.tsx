import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Footer from "../components/Footer";
import SchoolHeader from "../components/SchoolHeader";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, identity, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();
  const navigate = useNavigate();
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [formError, setFormError] = useState("");

  const isAuth = !!identity;

  const handleProceed = () => {
    if (!rollNumber || !studentClass || !section) {
      setFormError("Please fill in all fields to locate your child's profile.");
      return;
    }
    setFormError("");
    navigate({
      to: "/dashboard",
      search: { roll: rollNumber, cls: studentClass, sec: section },
    });
  };

  const handleLogin = () => {
    setFormError("");
    login();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SchoolHeader />
      <main className="flex-1 flex items-center justify-center bg-secondary px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <img
              src="/assets/generated/school-logo-transparent.dim_400x400.png"
              alt="School Logo"
              className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-primary shadow-navy"
            />
            <h1 className="font-display text-2xl font-bold text-primary">
              Parent Login
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Ex-Servicemen Public H.S. School, Thathri
            </p>
          </div>

          <Card className="shadow-navy border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary text-lg font-display">
                Access Child's Profile
              </CardTitle>
              <CardDescription>
                Step 1: Verify your identity · Step 2: Enter student details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Step 1: Identity */}
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Step 1: Verify Identity
                  </span>
                </div>
                {!isAuth ? (
                  <Button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-ocid="login.primary_button"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" /> Login with
                        Internet Identity
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Identity verified successfully
                  </div>
                )}
                {isLoginError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription className="text-xs">
                      {loginError?.message ?? "Login failed"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Step 2: Student Details */}
              <div
                className={`space-y-4 transition-opacity ${isAuth ? "opacity-100" : "opacity-50 pointer-events-none"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Step 2: Enter Student Details
                  </span>
                </div>

                <div>
                  <Label htmlFor="rollNumber" className="text-sm">
                    Roll Number
                  </Label>
                  <Input
                    id="rollNumber"
                    type="number"
                    placeholder="e.g. 1042"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="mt-1"
                    data-ocid="login.input"
                  />
                </div>

                <div>
                  <Label className="text-sm">Class</Label>
                  <Select value={studentClass} onValueChange={setStudentClass}>
                    <SelectTrigger className="mt-1" data-ocid="login.select">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                        <SelectItem key={cls} value={String(cls)}>
                          Class {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="section" className="text-sm">
                    Section
                  </Label>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger className="mt-1" data-ocid="login.select">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D", "E", "F"].map((s) => (
                        <SelectItem key={s} value={s}>
                          Section {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formError && (
                  <Alert variant="destructive" data-ocid="login.error_state">
                    <AlertDescription className="text-xs">
                      {formError}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleProceed}
                  disabled={!isAuth}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  data-ocid="login.submit_button"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  View My Child's Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Your data is secure and private. Only you can access your child's
            information.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
