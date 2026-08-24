import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Users, Target, Eye, Cpu } from "lucide-react";
import mohanraj from "../assets/team/mohanraj.png";
import rama from "../assets/team/rama.jpg";
import kishore from "../assets/team/kishore.jpeg";
import shravanth from "../assets/team/shravanth.jpeg";

const team = [
  {
    name: "MohanRaj Gangadharan",
    role: "Director - Lead Design and Manufacturing",
    description: "Mohan has 25+ years of experience in design and manufacturing of numerous products for defense industry including hydraulic systems, launchers, small gas turbines.",
    image: mohanraj
  },
  {
    name: "Ramakrishna Commuri",
    role: "Founder & Director - Technical",
    description: "Rama has 25+ years of experience in various fields of engineering including commissioning, O&M, thermal modelling, data analysis of gas turbines and building drones for armed forces.",
    image: rama
  },
  {
    name: "Ravi Kishore",
    role: "Chief R&D Officer",
    description: "Ravi Kishore has decades of experience in research and development of advanced robotic systems. He spearheads innovation and R&D strategy at Bhairav Robotics, driving technical excellence across all projects.",
    image: kishore
  },
  {
    name: "Sai Shravanth O",
    role: "Lead - Controls & Automation",
    description: "Shravanth heads simulation, controls and automation team. He has hands on experience in Gazebo simulation, flight controls, Matlab, ROS and field testing.",
    image: shravanth
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pt-24 lg:pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary font-heading font-semibold mb-3 block">
              Our Identity
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              About <span className="text-gradient">Bhairav Robotics</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body">
              Leading the evolution of tactical robotics and autonomous systems for mission-critical operations.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="container mx-auto px-6 mb-28">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 p-8 lg:p-10 rounded-lg shadow-glow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={80} className="text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-4 flex items-center gap-3">
                <Target className="text-primary" size={24} />
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                &ldquo;Our mission is to create innovative robotic solutions that enhance efficiency, safety, and productivity across various sectors and transform the way we work and live.&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 p-8 lg:p-10 rounded-lg shadow-glow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={80} className="text-primary" />
              </div>
              <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-4 flex items-center gap-3">
                <Eye className="text-primary" size={24} />
                Our <span className="text-primary">Vision</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-body">
                &ldquo;We envision a world where our robotic solutions seamlessly integrate into everyday life from defense, manufacturing to education.&rdquo;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="bg-muted/30 py-20 mb-28 border-y border-border/40">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                  <Cpu size={32} />
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
                  Our Expertise in <span className="text-gradient">Engineering and Innovation</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-body">
                  <p>
                    We are a team of diverse group of engineers with experience in design, manufacturing, simulation & analytics of mechanical systems, product development and program management in various industries including defense.
                  </p>
                  <p>
                    Our experience includes working with gas turbines, aerial drones (fixed wing and multirotor), robots and various other automation related sub-systems.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Meet Our <span className="text-gradient">Leadership</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              A collective of veterans and innovators driving the future of robotics.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-lg overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <div className="aspect-[4/5] bg-secondary overflow-hidden relative flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <Users size={64} className="text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs tracking-[0.1em] uppercase text-primary font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
