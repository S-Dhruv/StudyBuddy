import { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "@/store/userAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  Plus,
  Trash,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    grade: "",
    subjects: [],
    score: 0,
    total: 0,
  });
  const [subjectInput, setSubjectInput] = useState("");
  const nav = useNavigate();
  // Grade Options
  const grades = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "Undergraduate 1st Year",
    "Undergraduate 2nd Year",
    "Undergraduate 3rd Year",
    "Undergraduate Final Year",
  ];

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!formData.age || isNaN(formData.age) || formData.age < 5)
      return toast.error("Valid age is required");
    if (!formData.grade) return toast.error("Grade selection is required");
    if (formData.subjects.length === 0)
      return toast.error("At least one subject is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nav("/quiz", { state: { formData } });
  };
  const handleAddSubject = () => {
    if (subjectInput.trim() === "") return;
    if (formData.subjects.includes(subjectInput)) {
      toast.error("Subject already added");
      return;
    }
    setFormData({
      ...formData,
      subjects: [...formData.subjects, subjectInput],
    });
    setSubjectInput(""); // Clear input
  };

  const handleRemoveSubject = (subject) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute inset-y-0 left-3 size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Age</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>

            {/* Grade */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Grade</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
              >
                <option value="" disabled>
                  Select your grade
                </option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            {/* Subjects */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Subjects</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter a subject"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddSubject}
                >
                  <Plus className="size-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="badge badge-primary flex items-center"
                  >
                    {subject}{" "}
                    <Trash
                      className="size-4 ml-1 cursor-pointer"
                      onClick={() => handleRemoveSubject(subject)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Create Account
            </button>
          </form>
        </div>
      </div>
      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect and learn together!"
      />
    </div>
  );
}
