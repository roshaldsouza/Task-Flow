import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn, Laptop, MapPin, Clock } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const getGeolocation = (): Promise<GeolocationPosition | null> => {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => {
            console.error("Geolocation error:", error);
            resolve(null);
          }
        );
      } else {
        resolve(null);
      }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setIsLoading(true);

    try {
      const position = await getGeolocation();
      const deviceInfo = getDeviceInfo();
      const loginTimestamp = new Date().toISOString();

      const loginData = {
        username: username.trim(),
        timestamp: loginTimestamp,
        device: deviceInfo,
        geolocation: position
          ? {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            }
          : null,
      };

      // Store login data
      localStorage.setItem("loginData", JSON.stringify(loginData));
      localStorage.setItem("currentUser", username.trim());

      toast.success("Login successful!");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mb-4 shadow-[var(--shadow-elegant)]">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            TaskFlow
          </h1>
          <p className="text-muted-foreground">Track your weekly progress with ease</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your username to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                variant="gradient"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t space-y-2">
              <p className="text-sm text-muted-foreground mb-3">On login, we capture:</p>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Login timestamp</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Laptop className="w-4 h-4 text-primary" />
                  <span>Device information</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Geolocation data</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
