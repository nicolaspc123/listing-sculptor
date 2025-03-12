
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="bg-postco/5 border border-postco/20 rounded-lg p-6 mb-8 animate-fadeIn">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-postco flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium">Welcome to PostCo Reseller Dashboard</h2>
                <p className="text-foreground/70">
                  Manage your listings and track your resale performance
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer animate-slideIn" onClick={() => navigate('/manage-listings')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <PackageCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Manage Listings</h3>
                    <p className="text-foreground/70 text-sm">
                      View and manage all your current listings
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-foreground/40" />
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-medium">15 total listings</div>
                  <div className="text-xs text-foreground/60">10 pending · 5 active</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-status-confirmed/10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-status-confirmed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22V8" />
                        <path d="m19 15-7 7-7-7" />
                        <rect x="5" y="2" width="14" height="6" rx="2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Sales Overview</h3>
                    <p className="text-foreground/70 text-sm">
                      Monitor your resale performance
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm font-medium">$0.00 total revenue</div>
                  <div className="text-xs text-foreground/60">0 sales this month</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-full bg-status-listed/10 flex items-center justify-center mb-4">
                      <svg className="h-5 w-5 text-status-listed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                        <path d="M2 7h20" />
                        <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                        <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Store Settings</h3>
                    <p className="text-foreground/70 text-sm">
                      Customize your reseller store
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex">
                  <Button variant="outline" size="sm" className="mr-2">
                    Customize
                  </Button>
                  <Button size="sm" variant="ghost">
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-12 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => navigate('/manage-listings')} 
              className="px-8"
            >
              Go to Manage Listings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
