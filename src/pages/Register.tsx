
import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Book, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate registration
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Registration successful", {
          description: "Your account has been created. You can now log in.",
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setAcceptTerms(false);
        
        // Redirect to login
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="animate-scale-in">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <Link to="/" className="flex items-center gap-2">
                    <Book className="h-8 w-8 text-primary" />
                    <span className="text-xl font-display font-medium">NovelJourney</span>
                  </Link>
                </div>
                
                <CardTitle className="text-2xl font-medium text-center">
                  Create an account
                </CardTitle>
                <CardDescription className="text-center">
                  Sign up to access your account and start shopping
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      Full Name
                      {errors.fullName && (
                        <span className="text-destructive text-xs ml-auto flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.fullName}
                        </span>
                      )}
                    </Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={cn(errors.fullName && "border-destructive")}
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      Email
                      {errors.email && (
                        <span className="text-destructive text-xs ml-auto flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </span>
                      )}
                    </Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(errors.email && "border-destructive")}
                    />
                  </div>
                  
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-1">
                      Password
                      {errors.password && (
                        <span className="text-destructive text-xs ml-auto flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.password}
                        </span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={cn(errors.password && "border-destructive")}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Password must be at least 8 characters
                    </div>
                  </div>
                  
                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-1">
                      Confirm Password
                      {errors.confirmPassword && (
                        <span className="text-destructive text-xs ml-auto flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.confirmPassword}
                        </span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={cn(errors.confirmPassword && "border-destructive")}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => {
                        setAcceptTerms(checked as boolean);
                        if (errors.terms) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.terms;
                            return newErrors;
                          });
                        }
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link 
                          to="/terms"
                          className="text-primary hover:text-primary/90 hover:underline"
                        >
                          terms of service
                        </Link>
                        {" "}and{" "}
                        <Link 
                          to="/privacy"
                          className="text-primary hover:text-primary/90 hover:underline"
                        >
                          privacy policy
                        </Link>
                      </label>
                      {errors.terms && (
                        <p className="text-destructive text-xs flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>
                
                <div className="mt-4">
                  <ul className="space-y-2">
                    <PasswordRequirement 
                      text="At least 8 characters" 
                      satisfied={formData.password.length >= 8}
                    />
                    <PasswordRequirement 
                      text="Contains letters" 
                      satisfied={/[a-zA-Z]/.test(formData.password)}
                    />
                    <PasswordRequirement 
                      text="Contains numbers" 
                      satisfied={/\d/.test(formData.password)}
                    />
                    <PasswordRequirement 
                      text="Passwords match" 
                      satisfied={
                        formData.password === formData.confirmPassword && 
                        formData.password.length > 0
                      }
                    />
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/90 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Password Requirement component
const PasswordRequirement = ({ 
  text, 
  satisfied 
}: { 
  text: string; 
  satisfied: boolean;
}) => {
  return (
    <li className="text-xs flex items-center gap-2">
      {satisfied ? (
        <Check className="h-3 w-3 text-green-600" />
      ) : (
        <div className="h-3 w-3 rounded-full border border-muted-foreground" />
      )}
      <span className={cn(
        "text-muted-foreground",
        satisfied && "text-green-600"
      )}>
        {text}
      </span>
    </li>
  );
};

export default Register;
