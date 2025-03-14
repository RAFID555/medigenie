
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { User, LogIn } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFullName, setRegisterFullName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        toast({
          title: "লগইন ব্যর্থ হয়েছে",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "সফলভাবে লগইন হয়েছে",
          description: "আপনি সফলভাবে লগইন করেছেন।",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "একটি ত্রুটি ঘটেছে",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerFullName,
            phone: registerPhone,
          },
        },
      });
      
      if (error) {
        toast({
          title: "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে",
          description: "দয়া করে আপনার ইমেইলে ভেরিফিকেশন লিঙ্ক দেখুন।",
        });
        // Navigate to login tab after successful registration
        document.querySelector('[data-state="inactive"][data-value="login"]')?.click();
      }
    } catch (error: any) {
      toast({
        title: "একটি ত্রুটি ঘটেছে",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bangla">মেডিজিনি</h1>
          <p className="text-muted-foreground mt-2 bangla">আপনার ঔষধ বুঝতে সাহায্য করি</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="bangla">লগইন</TabsTrigger>
            <TabsTrigger value="register" className="bangla">রেজিস্ট্রেশন</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <div className="bg-card p-6 rounded-lg shadow-md border">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="bangla">ইমেইল</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="আপনার ইমেইল"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="bangla">পাসওয়ার্ড</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="আপনার পাসওয়ার্ড"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="bangla">লোড হচ্ছে...</span>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      <span className="bangla">লগইন করুন</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <div className="bg-card p-6 rounded-lg shadow-md border">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="bangla">পূর্ণ নাম</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="আপনার পুরো নাম"
                    value={registerFullName}
                    onChange={(e) => setRegisterFullName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registerEmail" className="bangla">ইমেইল</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="আপনার ইমেইল"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="bangla">ফোন নাম্বার</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="আপনার ফোন নাম্বার"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registerPassword" className="bangla">পাসওয়ার্ড</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="আপনার পাসওয়ার্ড"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="bangla">লোড হচ্ছে...</span>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      <span className="bangla">রেজিস্ট্রেশন করুন</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
