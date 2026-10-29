"use client";

import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../lib/redux/authSlice";

export default function LoginForm() {
  const { loading } = useAuth();
  const router = useRouter();
  // const router = useRouter()
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
  });

  console.log("🚀 ~ LoginForm ~ dispatch:", dispatch);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue shopping
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* ⭐ FORM NOW HANDLED BY FORMIK */}
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                console.log("🚀 ~ LoginForm ~ values:", values);
                // ✅ agar already submit chal raha hai, dobara kuch mat karo
                if (isSubmitting) return;

                setError("");
                setIsSubmitting(true);
                try {
                  const res = await login(values.email, values.password);
                  console.log("🚀 ~ LoginForm ~ res:", res);

                  // 🔹 yeh assume kar rahe: backend se kuch aisa aa raha:
                  // { status: "success", token: "...", user: { name, email, role } }
                  const payload = res?.data ?? res;
                  console.log("🚀 ~ LoginForm ~ payload:", payload);
                  const user = payload?.user ?? payload?.data ?? null;
                  console.log("🚀 ~ LoginForm ~ user:", user);
                  const token = payload?.token ?? null;
                  console.log("🚀 ~ LoginForm ~ token:", token);
                  const role = user?.role ?? "user"; // admin/user backend se set hota hai
                  console.log("🚀 ~ LoginForm ~ role:", role);

                  // 🔹 Redux me save
                  dispatch(
                    setCredentials({
                      user,
                      token,
                      email: values.email,
                      role,
                    })
                  );
                  
                  // 🔹 localStorage me bhi save (taake APIs use kar saken)
                  if (typeof window !== "undefined" && token) {
                    localStorage.setItem("authToken", token); // <-- same key as above
                    localStorage.setItem(
                      "authUser",
                      JSON.stringify(user || {})
                    );
                  }
                  toast.success("🎉 Account logged in successfully!");


                  // 🔹 YAHAN ROLE-BASED REDIRECT
                  if (role === "admin") {
                    router.push("/admin/categories"); // admin dashboard route
                  } else {
                    router.push("/account"); // normal user route
                  }
                } catch (err) {
                  toast.error(err.message || "Login failed!");
                  setError(err.message || "Login failed!");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {({ errors, touched, handleChange, values, isValid, dirty }) => (
                <Form className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* ---- EMAIL ---- */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  {/* ---- PASSWORD ---- */}
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={values.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                    {touched.password && errors.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>
                  <Button
                    disabled={!(isValid && dirty) || loading || isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {/* {loading ? "Login" : "Login"} */}
                    {isSubmitting
                      ? "Logging in..."
                      : loading
                      ? "Checking auth..."
                      : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Demo: Use any email and password to sign in
          </p>
        </div>
      </div>
    </div>
  );
}
