import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Clock, Laptop, MapPin, Plus } from "lucide-react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

interface LoginData {
  username: string;
  timestamp: string;
  device: {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    timezone: string;
  };
  geolocation: {
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(0);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
      return;
    }

    const storedLoginData = localStorage.getItem("loginData");
    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginData");
    navigate("/");
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!loginData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome, {loginData.username}
            </h1>
            <p className="text-muted-foreground mt-1">Manage your weekly tasks efficiently</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Login Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Login Information
              </CardTitle>
              <CardDescription>Session details captured on login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Timestamp</p>
                <p className="text-sm text-muted-foreground">{formatDate(loginData.timestamp)}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Timezone</p>
                <p className="text-sm text-muted-foreground">{loginData.device.timezone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Device Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-primary" />
                Device Details
              </CardTitle>
              <CardDescription>Your current device information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Platform</p>
                <p className="text-sm text-muted-foreground">{loginData.device.platform}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Screen Resolution</p>
                <p className="text-sm text-muted-foreground">{loginData.device.screenResolution}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Language</p>
                <p className="text-sm text-muted-foreground">{loginData.device.language}</p>
              </div>
            </CardContent>
          </Card>

          {/* Geolocation */}
          {loginData.geolocation && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Geolocation Data
                </CardTitle>
                <CardDescription>Location captured during login</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Latitude</p>
                  <p className="text-sm text-muted-foreground">{loginData.geolocation.latitude.toFixed(6)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Longitude</p>
                  <p className="text-sm text-muted-foreground">{loginData.geolocation.longitude.toFixed(6)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Accuracy</p>
                  <p className="text-sm text-muted-foreground">{loginData.geolocation.accuracy.toFixed(2)} meters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Tasks</CardTitle>
                <CardDescription>Track and manage your weekly progress</CardDescription>
              </div>
              <Button 
                onClick={() => setShowTaskForm(!showTaskForm)}
                variant="gradient"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {showTaskForm ? "Cancel" : "Add Task"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showTaskForm && (
              <div className="mb-6">
                <TaskForm 
                  onTaskAdded={() => {
                    setShowTaskForm(false);
                    setRefreshTasks(prev => prev + 1);
                  }}
                />
              </div>
            )}
            <TaskList key={refreshTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
