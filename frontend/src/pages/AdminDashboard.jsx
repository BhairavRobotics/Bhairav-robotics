import { FileText, Mail, ShieldCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="responsive-container pb-16 pt-24 sm:pb-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-2">
            <span className="safe-break text-gradient">Admin Dashboard</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Database-backed application storage has been removed. Career submissions are delivered directly to HR by email with resumes attached.
          </p>
        </motion.div>

        <section className="grid gap-5 md:grid-cols-2 md:gap-6">
          <div className="rounded-lg border border-border bg-card p-5 shadow-glow sm:p-8">
            <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6">
              <Mail size={24} />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3">Email Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              New career applications are sent to akhila.ganji@bhairavrobotics.in immediately. Candidate details are included in the email body and the uploaded resume is attached directly.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-glow sm:p-8">
            <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6">
              <FileText size={24} />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3">No Stored Resumes</h2>
            <p className="text-muted-foreground leading-relaxed">
              The backend no longer exposes application listing or resume download endpoints because resumes are handled only as temporary upload buffers while the email is sent.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-glow sm:p-8 md:col-span-2">
            <div className="p-3 bg-primary/10 rounded-full text-primary w-fit mb-6">
              <ShieldCheck size={24} />
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3">Operations Note</h2>
            <p className="text-muted-foreground leading-relaxed">
              Use the mailbox to review, archive, and respond to submissions. SMTP credentials are configured through backend environment variables, not frontend code.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
