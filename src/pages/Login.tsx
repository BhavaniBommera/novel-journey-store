
import { useState } from "react";
import { Link } from "react-router-dom";
import { Book, Eye, EyeOff, Facebook, Github, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Form validation
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }
    
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }
    
    // Simulate login
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, simulate login failure
      if (email !== "demo@example.com" || password !== "password") {
        setErrorMessage("Invalid email or password");
      } else {
        // Login successful, redirect to home
        window.location.href = "/";
      }
    }, 1500);
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
                  Welcome back
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to sign in to your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Error message */}
                {errorMessage && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2 animate-shake">
                    <X className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link 
                          to="/forgot-password"
                          className="text-xs text-primary hover:text-primary/90 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </div>
                </form>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-background text-xs text-muted-foreground">
                      or continue with
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" type="button">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    For demo, use: <span className="font-medium text-foreground">demo@example.com</span> / <span className="font-medium text-foreground">password</span>
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    className="text-primary hover:text-primary/90 hover:underline"
                  >
                    Sign up
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

export default Login;
