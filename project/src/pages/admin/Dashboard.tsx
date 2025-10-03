import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Code, BookOpen, Mail, LogOut, Eye, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function Dashboard({ onLogout, onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    totalJournals: 0,
    unreadMessages: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsResult, projectsResult, journalsResult, messagesResult, analyticsResult] = await Promise.all([
        supabase.from('blogs').select('*', { count: 'exact' }),
        supabase.from('projects').select('*', { count: 'exact' }),
        supabase.from('journals').select('*', { count: 'exact' }),
        supabase.from('contact_messages').select('*', { count: 'exact' }).eq('is_read', false),
        supabase.from('page_analytics').select('visit_count'),
      ]);

      const publishedBlogs = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      const totalViews = analyticsResult.data?.reduce((sum, item) => sum + item.visit_count, 0) || 0;

      setStats({
        totalBlogs: blogsResult.count || 0,
        publishedBlogs: publishedBlogs.count || 0,
        totalProjects: projectsResult.count || 0,
        totalJournals: journalsResult.count || 0,
        unreadMessages: messagesResult.count || 0,
        totalViews,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      subtitle: `${stats.publishedBlogs} published`,
      icon: FileText,
      color: 'pink',
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      icon: Code,
      color: 'pink',
    },
    {
      title: 'Journal Entries',
      value: stats.totalJournals,
      icon: BookOpen,
      color: 'pink',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'pink',
    },
    {
      title: 'Total Page Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'pink',
    },
  ];

  const quickActions = [
    { label: 'New Blog Post', action: 'manage-blogs', icon: Plus },
    { label: 'Add Project', action: 'manage-projects', icon: Plus },
    { label: 'New Journal', action: 'manage-journals', icon: Plus },
    { label: 'View Messages', action: 'manage-messages', icon: Mail },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink border-r-transparent mb-4"></div>
          <p className="text-beige text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-dark">
      <header className="bg-grey border-b border-grey-light sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="text-pink" size={24} />
              <h1 className="text-xl font-bold text-beige">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="text-beige hover:text-pink transition-smooth font-medium"
              >
                View Site
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-grey-dark rounded-lg">
                <div className="w-2 h-2 bg-pink rounded-full"></div>
                <span className="text-beige text-sm">{user?.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-pink text-white rounded-lg hover:bg-pink-dark transition-smooth font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-beige mb-2">
            Welcome back, <span className="text-pink">Admin</span>!
          </h2>
          <p className="text-beige/70">Here's what's happening with your site</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-grey rounded-xl p-6 hover-lift border border-grey-light"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${card.color}/20 rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className={`text-${card.color}`} />
                  </div>
                  <TrendingUp size={20} className="text-beige/50" />
                </div>
                <h3 className="text-beige/70 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-beige mb-1">{card.value}</p>
                {card.subtitle && (
                  <p className="text-beige/50 text-sm">{card.subtitle}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-grey rounded-xl p-6 border border-grey-light">
            <h3 className="text-xl font-bold text-beige mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.action)}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-grey-dark rounded-lg hover:bg-pink/10 hover:border-pink border border-transparent transition-smooth text-left group"
                  >
                    <Icon size={20} className="text-pink" />
                    <span className="text-beige group-hover:text-pink transition-smooth">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-grey rounded-xl p-6 border border-grey-light">
            <h3 className="text-xl font-bold text-beige mb-4">Content Management</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('manage-blogs')}
                className="w-full flex items-center justify-between px-4 py-3 bg-grey-dark rounded-lg hover:bg-pink/10 hover:border-pink border border-transparent transition-smooth group"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-pink" />
                  <span className="text-beige group-hover:text-pink transition-smooth">Manage Blogs</span>
                </div>
                <span className="text-beige/50">{stats.totalBlogs}</span>
              </button>

              <button
                onClick={() => onNavigate('manage-projects')}
                className="w-full flex items-center justify-between px-4 py-3 bg-grey-dark rounded-lg hover:bg-pink/10 hover:border-pink border border-transparent transition-smooth group"
              >
                <div className="flex items-center gap-3">
                  <Code size={20} className="text-pink" />
                  <span className="text-beige group-hover:text-pink transition-smooth">Manage Projects</span>
                </div>
                <span className="text-beige/50">{stats.totalProjects}</span>
              </button>

              <button
                onClick={() => onNavigate('manage-journals')}
                className="w-full flex items-center justify-between px-4 py-3 bg-grey-dark rounded-lg hover:bg-pink/10 hover:border-pink border border-transparent transition-smooth group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={20} className="text-pink" />
                  <span className="text-beige group-hover:text-pink transition-smooth">Manage Journals</span>
                </div>
                <span className="text-beige/50">{stats.totalJournals}</span>
              </button>

              <button
                onClick={() => onNavigate('manage-messages')}
                className="w-full flex items-center justify-between px-4 py-3 bg-grey-dark rounded-lg hover:bg-pink/10 hover:border-pink border border-transparent transition-smooth group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-pink" />
                  <span className="text-beige group-hover:text-pink transition-smooth">View Messages</span>
                </div>
                <span className="bg-pink text-white text-xs px-2 py-1 rounded-full">
                  {stats.unreadMessages}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
