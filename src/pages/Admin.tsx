import { useState } from "react";
import { Lock, Eye, Users, Star, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  // Sample data - in real implementation this would come from Supabase
  const stats = {
    totalWorks: 156,
    totalTestimonials: 8,
    totalContacts: 23,
    favoriteCount: 45
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication - in real app this would use Supabase Auth
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use 'admin' / 'admin123' for demo.",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-8">
          <Card className="card-elegant w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="heading-secondary">Admin Login</CardTitle>
              <p className="text-muted-foreground">
                Access the admin dashboard to manage your website content
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <Button type="submit" className="btn-primary w-full">
                  Login to Dashboard
                </Button>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Demo credentials: admin / admin123
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="heading-primary">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your website content and view analytics</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Works</p>
                    <p className="text-2xl font-bold">{stats.totalWorks}</p>
                  </div>
                  <Eye className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Testimonials</p>
                    <p className="text-2xl font-bold">{stats.totalTestimonials}</p>
                  </div>
                  <Star className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Requests</p>
                    <p className="text-2xl font-bold">{stats.totalContacts}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                    <p className="text-2xl font-bold">{stats.favoriteCount}</p>
                  </div>
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">Manage Gallery</h3>
                <p className="text-muted-foreground mb-4">
                  Add, edit, or remove work samples from your gallery
                </p>
                <Button className="btn-primary w-full">
                  Manage Works
                </Button>
              </CardContent>
            </Card>

            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">Manage Testimonials</h3>
                <p className="text-muted-foreground mb-4">
                  Add new customer reviews and manage existing ones
                </p>
                <Button className="btn-primary w-full">
                  Manage Reviews
                </Button>
              </CardContent>
            </Card>

            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">Contact Requests</h3>
                <p className="text-muted-foreground mb-4">
                  View and respond to customer inquiries
                </p>
                <Button className="btn-primary w-full">
                  View Contacts
                </Button>
              </CardContent>
            </Card>

            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage user accounts and favorites
                </p>
                <Button className="btn-primary w-full">
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <Settings className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">Site Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Update shop information and settings
                </p>
                <Button className="btn-primary w-full">
                  Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="card-featured hover-lift">
              <CardContent className="p-6 text-center">
                <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="heading-tertiary mb-2">Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  View website traffic and user engagement
                </p>
                <Button className="btn-primary w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Setup Instructions */}
          <Card className="card-elegant mt-8">
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🔐 Authentication Setup</h4>
                  <p className="text-muted-foreground">
                    To enable real authentication, connect this project to Supabase and configure the auth system. 
                    Replace the demo login with Supabase Auth.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🗄️ Database Connection</h4>
                  <p className="text-muted-foreground">
                    Connect to Supabase to enable CRUD operations for works, testimonials, and contacts. 
                    The current implementation shows static data.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📊 File Management</h4>
                  <p className="text-muted-foreground">
                    Set up Supabase Storage for image uploads and management in the gallery section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;