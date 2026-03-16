import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, RefreshCw, Calendar, Phone, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load applications. Is the backend running?",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
        >
          <div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-2">
              <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage and review incoming job applications.</p>
          </div>
          <Button onClick={fetchApplications} variant="outline" className="flex gap-2">
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={48} className="animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Fetching applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20 bg-card/50 border border-dashed border-border rounded-lg">
            <User size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-xl font-semibold mb-2">No Applications Found</h3>
            <p className="text-muted-foreground">When people apply, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-glow">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[200px] uppercase text-[10px] tracking-widest font-bold">Applicant</TableHead>
                    <TableHead className="uppercase text-[10px] tracking-widest font-bold">Contact</TableHead>
                    <TableHead className="uppercase text-[10px] tracking-widest font-bold">Role & Field</TableHead>
                    <TableHead className="uppercase text-[10px] tracking-widest font-bold">Applied On</TableHead>
                    <TableHead className="text-right uppercase text-[10px] tracking-widest font-bold">Resume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {app.fullName.charAt(0).toUpperCase()}
                          </div>
                          {app.fullName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <Mail size={12} /> {app.email}
                          </span>
                          <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <Phone size={12} /> {app.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit capitalize text-[10px]">
                            {app.type.replace("-", " ")}
                          </Badge>
                          <Badge variant="secondary" className="w-fit capitalize text-[10px] bg-primary/10 text-primary border-none">
                            {app.field}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {formatDate(app.appliedAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:bg-primary/10 transition-all group"
                          asChild
                        >
                          <a 
                            href={`http://localhost:3001/api/applications/${app._id}/resume`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FileText size={16} className="group-hover:scale-110 transition-transform" />
                            View PDF
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
