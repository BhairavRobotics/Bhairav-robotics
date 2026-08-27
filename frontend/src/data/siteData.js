export const stats = [
  { value: "150", unit: "kg", label: "Payload" },
  { value: "6", unit: "Hours", label: "Endurance" },
  { value: "100", unit: "km", label: "Operational Range" },
  { value: "MMG,LMG, AGS-30", unit: "", label: "Weapon Compatibility" },
  { value: "Semi-Autonomous & Autonomous", unit: "", label: "Control" },
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
    { label: "Maximum Speed", value: "50 km/h" },
    { label: "Acceleration (0-50)", value: "4 Seconds" },
    { label: "Gross Weight", value: "400 kg" },
  ],
  power: [
    { label: "Max Power", value: "60 HP" },
    { label: "Battery Capacity", value: "16 kWh" },
    { label: "Operational Endurance", value: "6 Hours" },
    { label: "Operational Range", value: "100 km" },
    { label: "Battery Chemistry", value: "High-Density Li-Ion" },
  ],
  control: [
    { label: "Operational Modes", value: "Semi-Autonomous & Autonomous" },
    { label: "Stabilization", value: "2 Axis Gyro Stabilization" },
    { label: "Weapons Platform", value: "MMG,LMG, AGS-30" },
    { label: "Weapon Station", value: "Rakshak Weapon Station Compatible" },
    { label: "Communication", value: "Encrypted Long-Range Mesh" },
  ],
  dimensions: [
    { label: "Length", value: "2,250 mm" },
    { label: "Width", value: "1,250 mm" },
    { label: "Height", value: "1,420 mm" },
    { label: "Payload Capacity", value: "150 kg" },
    { label: "Ground Clearance", value: "320 mm" },
  ],
};
