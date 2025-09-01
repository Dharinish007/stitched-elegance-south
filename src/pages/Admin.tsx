import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, Users, Star, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import AdminWorksManager from "@/components/AdminWorksManager";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalWorks: 0,
    totalTestimonials: 0,
    totalContacts: 0,
    favoriteCount: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && !isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You need admin privileges to access this page',
        variant: 'destructive'
      });
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  const fetchStats = async () => {
    try {
      const [worksRes, favoritesRes] = await Promise.all([
        supabase.from('works').select('id', { count: 'exact' }),
        supabase.from('favorites').select('id', { count: 'exact' })
      ]);

      setStats({
        totalWorks: worksRes.count || 0,
        totalTestimonials: 0, // Will implement testimonials later
        totalContacts: 0, // Will implement contacts later
        favoriteCount: favoritesRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect in useEffect
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
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
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

          {/* Admin Tabs */}
          <div className="mb-8">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("works")}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === "works"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Manage Works
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-featured hover-lift">
                <CardContent className="p-6 text-center">
                  <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="heading-tertiary mb-2">Manage Gallery</h3>
                  <p className="text-muted-foreground mb-4">
                    Add, edit, or remove work samples from your gallery
                  </p>
                  <Button 
                    className="btn-primary w-full"
                    onClick={() => setActiveTab("works")}
                  >
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
                  <Button className="btn-primary w-full" disabled>
                    Coming Soon
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
                  <Button className="btn-primary w-full" disabled>
                    Coming Soon
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
                  <Button className="btn-primary w-full" disabled>
                    Coming Soon
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
                  <Button className="btn-primary w-full" disabled>
                    Coming Soon
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
                  <Button className="btn-primary w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "works" && <AdminWorksManager />}

          {activeTab === "overview" && (
            <Card className="card-elegant mt-8">
              <CardHeader>
                <CardTitle>Admin Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">✅ Database Connected</h4>
                    <p className="text-muted-foreground">
                      Your Supabase database is connected and ready. You can now manage works, favorites, and user data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">✅ Authentication Enabled</h4>
                    <p className="text-muted-foreground">
                      User authentication is working with role-based access control. Only admin users can access this dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">✅ File Storage Ready</h4>
                    <p className="text-muted-foreground">
                      Supabase Storage is configured for image uploads in the works management section.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;