export const stats = [
  { value: "500+", unit: "kg", label: "Payload Capacity" },
  { value: "50", unit: "km", label: "Operational Range" },
  { value: "12", unit: "Hours", label: "Endurance" },
  { value: "4x4", unit: "", label: "All-Terrain" },
  { value: "L4", unit: "", label: "AI Autonomous" },
];

export const technologies = [
  { title: "AI Vision Systems", description: "Multi-spectral sensing with deep learning-based object detection and classification.", icon: "Eye" },
  { title: "Autonomous Navigation", description: "GPS-denied SLAM navigation with real-time obstacle avoidance.", icon: "Navigation" },
  { title: "Secure Communication", description: "Military-grade encrypted mesh networking for reliable C2 links.", icon: "Shield" },
  { title: "Embedded Systems", description: "Ruggedized edge computing hardware designed for extreme environments.", icon: "Cpu" },
  { title: "Edge Computing", description: "On-board AI inference for low-latency decision making.", icon: "Zap" },
  { title: "Defense-grade Controls", description: "Redundant control architectures meeting MIL-STD specifications.", icon: "Settings" },
];

export const techSpecs = {
  mobility: [
    { label: "Max Speed", value: "50 km/h" },
    { label: "Acceleration (0-50)", value: "4 Seconds" },
    { label: "Torque", value: "1000 Nm" },
    { label: "Towing (Level Ground)", value: "300 kg" },
    { label: "Gross Weight", value: "400 kg" },
  ],
  power: [
    { label: "Max Power", value: "60 HP" },
    { label: "Battery Capacity", value: "16 kWh" },
    { label: "Operational Endurance", value: "6 Hours" },
    { label: "Operational Range", value: "~100 km" },
    { label: "Battery Type", value: "High-Density Li-Ion" },
  ],
  control: [
    { label: "Stabilization", value: "2 Axis" },
    { label: "Weapons Platform", value: "Integrated Support" },
    { label: "Weapon Systems", value: "MMG, LMG, NSVT, AGS 30" },
    { label: "Autonomy Level", value: "Level 4" },
    { label: "Communication", value: "Encrypted Mesh" },
  ],
  dimensions: [
    { label: "Length", value: "2,250 mm" },
    { label: "Width", value: "1,250 mm" },
    { label: "Height", value: "1,420 mm" },
    { label: "Payload Capacity", value: "150 kg" },
    { label: "Ground Clearance", value: "320 mm" },
  ],
};

export const testimonials = [
  {
    text: "Bhairav Robotics has redefined our understanding of autonomous defense platforms. Their Vrishabh UGV exceeded every operational benchmark we set during field trials.",
    name: "Col. R. Sharma (Retd.)",
    role: "Defense Consultant",
  },
  {
    text: "The Shvana surveillance platform delivered exceptional performance in our security operations. The AI-driven threat detection is remarkably accurate.",
    name: "Dr. Anand Mehta",
    role: "Security Director, Apex Corp",
  },
  {
    text: "Prabal QDDs represent a leap forward in quadruped locomotion. The precision engineering and terrain adaptability are unmatched in the industry.",
    name: "Prof. S. Iyer",
    role: "Robotics Researcher, IIT",
  },
];

export const news = [
  {
    title: "Bhairav Robotics Unveils Next-Gen UGV at DefExpo 2026",
    excerpt: "The company showcased its latest autonomous ground vehicle with enhanced AI capabilities and extended operational range.",
    date: "Feb 2026",
    image: "defense-expo",
  },
  {
    title: "Strategic Partnership with Indian Army for Border Surveillance",
    excerpt: "A landmark contract to deploy Shvana surveillance robots across high-altitude border posts for continuous monitoring.",
    date: "Jan 2026",
    image: "partnership",
  },
  {
    title: "Prabal QDDs Win Innovation Award at DRDO Summit",
    excerpt: "The quadruped drive system was recognized for its breakthrough contribution to robotic mobility in extreme terrains.",
    date: "Dec 2025",
    image: "award",
  },
];

export const partnerLogos = [
  "DRDO", "Indian Army", "HAL", "BEL", "ISRO", "Tata Advanced", "L&T Defence",
];
