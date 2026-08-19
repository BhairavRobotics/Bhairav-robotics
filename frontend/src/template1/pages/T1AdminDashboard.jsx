import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, RefreshCw, Calendar, Phone, Mail, User, Download, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import T1Header from "@/template1/sections/T1Header";
import T1Footer from "@/template1/sections/T1Footer";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [brochureRequests, setBrochureRequests] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [appRes, brochureRes, contactRes] = await Promise.all([
        fetch("http://localhost:3001/api/applications"),
        fetch("http://localhost:3001/api/brochure-requests"),
        fetch("http://localhost:3001/api/contact-messages")
      ]);

      if (!appRes.ok || !brochureRes.ok || !contactRes.ok) {
        throw new Error("Failed to fetch some data");
      }

      const [appData, brochureData, contactData] = await Promise.all([
        appRes.json(),
        brochureRes.json(),
        contactRes.json()
      ]);

      setApplications(appData);
      setBrochureRequests(brochureData);
      setContactMessages(contactData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load data. Is the backend running?",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      <T1Header />
      
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
            <p className="text-muted-foreground">Manage job applications, brochure requests, and contact messages.</p>
          </div>
          <Button onClick={fetchData} variant="outline" className="flex gap-2">
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </Button>
        </motion.div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="applications" className="flex gap-2">
              <FileText size={16} />
              Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="brochures" className="flex gap-2">
              <Download size={16} />
              Brochures ({brochureRequests.length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex gap-2">
              <MessageSquare size={16} />
              Messages ({contactMessages.length})
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={48} className="animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse">Fetching data...</p>
            </div>
          ) : (
            <>
              <TabsContent value="applications">
                {applications.length === 0 ? (
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
              </TabsContent>

              <TabsContent value="brochures">
                {brochureRequests.length === 0 ? (
                  <div className="text-center py-20 bg-card/50 border border-dashed border-border rounded-lg">
                    <Download size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-xl font-semibold mb-2">No Brochure Requests</h3>
                    <p className="text-muted-foreground">Requests for product brochures will appear here.</p>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg overflow-hidden shadow-glow">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Name</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Email</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Product ID</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Requested On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {brochureRequests.map((req) => (
                            <TableRow key={req._id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-medium">{req.name}</TableCell>
                              <TableCell>
                                <span className="flex items-center gap-2 text-muted-foreground">
                                  <Mail size={12} /> {req.email}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] uppercase">
                                  {req.productId}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  {formatDate(req.requestedAt)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="messages">
                {contactMessages.length === 0 ? (
                  <div className="text-center py-20 bg-card/50 border border-dashed border-border rounded-lg">
                    <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground opacity-20" />
                    <h3 className="text-xl font-semibold mb-2">No Messages Found</h3>
                    <p className="text-muted-foreground">Direct messages from the contact form will appear here.</p>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg overflow-hidden shadow-glow">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">From</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Subject</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Message</TableHead>
                            <TableHead className="uppercase text-[10px] tracking-widest font-bold">Received On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactMessages.map((msg) => (
                            <TableRow key={msg._id} className="hover:bg-muted/30 transition-colors">
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium">{msg.name}</span>
                                  <span className="text-xs text-muted-foreground">{msg.email}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-primary text-sm">{msg.subject}</TableCell>
                              <TableCell className="max-w-md">
                                <p className="text-sm text-muted-foreground line-clamp-2 hover:line-clamp-none cursor-help transition-all">
                                  {msg.message}
                                </p>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  {formatDate(msg.submittedAt || msg.requestedAt)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>

      <T1Footer />
    </div>
  );
};

export default AdminDashboard;
