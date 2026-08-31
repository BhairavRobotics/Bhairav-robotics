import Header from "../components/Header";
import Footer from "../sections/Footer";
import { motion } from "framer-motion";
import { Users, Target, Eye, Cpu } from "lucide-react";
import mohanRajImage from "../assets/team/MohanRaj Gangadharan.jpeg";
import ramakrishnaImage from "../assets/team/Ramakrishna Commuri.jpeg";
import raviKishoreImage from "../assets/team/Ravi Kishore.jpeg";
import saiShravanthImage from "../assets/team/Sai Shravanth.jpeg";

const team = [
  {
    name: "MohanRaj Gangadharan",
    role: "Director - Lead Design and Manufacturing",
    description: "Mohan has 25+ years of experience in design and manufacturing of numerous products for defense industry including hydraulic systems, launchers, small gas turbines.",
    image: mohanRajImage
  },
  {
    name: "Ramakrishna Commuri",
    role: "Founder & Director - Technical",
    description: "Rama has 25+ years of experience in various fields of engineering including commissioning, O&M, thermal modelling, data analysis of gas turbines and building drones for armed forces.",
    image: ramakrishnaImage
  },
  {
    name: "Ravi Kishore",
    role: "Chief R&D Officer",
    description: "Ravi Kishore has decades of experience in research and development of advanced robotic systems. He spearheads innovation and R&D strategy at Bhairav Robotics, driving technical excellence across all projects.",
    image: raviKishoreImage
  },
  {
    name: "Sai Shravanth O",
    role: "Lead - Controls & Automation",
    description: "Shravanth heads simulation, controls and automation team. He has hands on experience in Gazebo simulation, flight controls, Matlab, ROS and field testing.",
    image: saiShravanthImage
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="pb-16 pt-24 sm:pb-20 lg:pt-32">
        {/* Hero Section */}
        <section className="responsive-container mb-14 text-center sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="safe-break mb-5 font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
              About <span className="text-gradient">Bhairav Robotics</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body">
              Leading the evolution of autonomous systems for mission-critical operations.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="responsive-container mb-20 sm:mb-28">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card p-5 shadow-glow sm:p-8 lg:p-10"
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
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card p-5 shadow-glow sm:p-8 lg:p-10"
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
        <section className="mb-20 border-y border-border/40 bg-muted/30 py-14 sm:mb-28 sm:py-20">
          <div className="responsive-container">
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
        <section className="responsive-container">
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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-lg overflow-hidden group hover:border-primary/40 transition-colors"
              >
                <figure className="aspect-[4/5] bg-secondary overflow-hidden relative flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <Users size={64} className="text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <figcaption className="sr-only">{member.name}</figcaption>
                </figure>
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
