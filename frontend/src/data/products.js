import wheeledShvanaVideo from "@/assets/ProductVideos/Shvana_Wheeled+Shoe.mp4";
import rakshakVideo from "@/assets/ProductVideos/Rakshak_Stereo1.mp4";
import prabalVideo from "@/assets/ProductVideos/DM90&DM70.mp4";
import vrishabhVideo from "@/assets/Vrishabh_Video.mp4";

import wheeledShvanaImg from "@/assets/products/wheeled-shvana.png";
import rakshakImg from "@/assets/products/rakshak.png";
import prabalImg from "@/assets/products/prabal-qdds.png";
import vrishabhImg from "@/assets/products/vrishabh.png";
import vrishabhSideImg from "@/assets/products/Vrishabh/SideView.png";
import vrishabhTopImg from "@/assets/products/Vrishabh/TopView.png";
import vrishabh4kImg from "@/assets/products/Vrishabh/Vrishabh_4k.png";

import vrishabhBrochure from "@/assets/Vrishabh_Combat_UGV_Flyer.pdf";

export const categories = [
  {
    id: "robotic-platforms",
    name: "Robotic Platforms",
    products: ["vrishabh", "wheeled-shvana", "rakshak", "prabal-qdds"],
  },
];

export const products = [
  {
    id: "vrishabh",
    name: "Vrishabh",
    category: "robotic-platforms",
    categoryName: "Robotic Platforms",
    subCategory: "Combat UGV",
    tagline: "Combat Unmanned Ground Vehicle",
    description:
      "Vrishabh Combat UGV is a rugged, mission-adaptive unmanned ground platform engineered for high-risk battlefield operations. Designed for precision, endurance, and versatility, it seamlessly supports combat, logistics, and casualty evacuation roles. With multi-mode operational capability, Vrishabh enhances force protection while extending operational reach in complex environments.",
    applications:
      "Built for defence and homeland security, Vrishabh supports frontline combat missions, border patrol, explosive ordnance disposal, tactical supply logistics, and casualty evacuation in contested environments.",
    features: [
      {
        title: "Multi-Mode Operation",
        description: "Manual, semi-autonomous & fully autonomous modes",
      },
      {
        title: "Combat-Ready Platform",
        description: "Integrated weapons support (MMG, LMG, AGS-30, NSVT)",
      },
      {
        title: "Rugged Mobility",
        description: "All-terrain chassis with independent suspension",
      },
      {
        title: "Mission Adaptive",
        description: "Modular payload bay for sensors, weapons, or medevac pods",
      },
    ],
    video: vrishabhVideo,
    views: [
      { label: "Front View", image: vrishabhImg },
      { label: "Side View", image: vrishabhSideImg },
      { label: "Top View", image: vrishabhTopImg },
      { label: "Action View", image: vrishabh4kImg },
    ],
    brochure: vrishabhBrochure,
    brochureName: "Vrishabh_Combat_UGV_Flyer.pdf",
    activeSpecTab: "performance",
    specTabs: {
      performance: [
        { label: "Maximum Speed", value: "Approximately 50 km/h" },
        { label: "Acceleration (0-50 km/h)", value: "4 Seconds" },
        { label: "Range", value: "~100 km" },
        { label: "Endurance", value: "6 hours" },
        { label: "Payload Capacity", value: "150 kg" },
        { label: "Towing Capacity", value: "300 kg (level ground)" },
        { label: "Steering", value: "Dual Ackermann" },
      ],
      power: [
        { label: "Power", value: "50 HP" },
        { label: "Battery", value: "11/16 kWh" },
      ],
      dimensions: [
        { label: "L x W x H", value: "Approximately 2250 x 1250 x 1420 mm" },
        { label: "Weight", value: "Approximately 400 kg" },
      ],
      weapons: [
        { label: "Stabilization Platform", value: "2 Axis Stabilization" },
        { label: "Supported Weapons", value: "MMG, LMG, NSVT, AGS 30" },
      ],
    },
  },
  {
    id: "rakshak",
    name: "Rakshak",
    category: "robotic-platforms",
    categoryName: "Robotic Platforms",
    subCategory: "Autonomous Weapon Station",
    tagline: "Transforms MMGs and assault rifles into autonomous weapon stations",
    description:
      "Rakshak transforms MMGs and assault rifles into autonomous weapon stations. It is fully compatible with standard MAG 2A1 MMG and assault rifles of various makes. Rakshak combines long-range stereo vision, advanced autonomy, precision, and modularity, with significant advantages over remote controlled weapon stations.",
    applications:
      "Rakshak AWS units are compact and lightweight for fixed locations such as bunkers or watch towers, as well as mobile platforms like armored vehicles, legged robots, UGVs, and USVs. A network of Rakshak AWS can provide an invisible yet highly effective defense shield across vast areas.",
    features: [
      {
        title: "Stereo Vision System",
        description: "Integrated day and night camera with long-range stereo vision",
      },
      {
        title: "Modular Design",
        description: "Highly modular with mission-specific custom optics",
      },
      {
        title: "Human-in-the-Loop",
        description: "Optional human-in-the-loop capability for controlled engagement",
      },
      {
        title: "Networked Deployment",
        description: "Multi-unit coordination for large-area protection",
      },
    ],
    video: rakshakVideo,
    views: [
      { label: "Front View", image: rakshakImg },
    ],
    activeSpecTab: "specifications",
    specTabs: {
      specifications: [
        { label: "Vision System", value: "Long range stereo vision" },
        { label: "Effective Range", value: "1800 m" },
        { label: "Human Detection", value: "Day: ~2 km, Night: ~1 km" },
        { label: "Weight", value: "~50 kg" },
        { label: "Ballistic Correction", value: "In-built ballistic correction" },
        { label: "Target Engagement", value: "Tracks and engages moving targets" },
        { label: "Operation Modes", value: "Autonomous / Semi-autonomous / Manual" },
      ],
    },
  },
  {
    id: "wheeled-shvana",
    name: "Shvana",
    category: "robotic-platforms",
    categoryName: "Robotic Platforms",
    subCategory: "Advanced Quadruped Robot Platform",
    tagline: "Bharat's first armed quadruped platform",
    description:
      "It is packed with a suite of sensors that act like eyes and ears, augmenting situational awareness for users. Vision-based detection and recognition, industrial-grade audio perception capabilities, and advanced DSP help measure, isolate, and identify sounds in real time. Reinforcement learning algorithms and onboard computational power help the platform quickly adapt to new surroundings.",
    applications:
      "Built for defence, homeland security, and industrial environments, the platform supports strategic area monitoring, border patrol and surveillance, tactical situations, explosive detection, search and rescue operations, and hazardous or confined-area inspection.",
    features: [
      {
        title: "Vision-based Detection",
        description: "Advanced recognition and classification systems",
      },
      {
        title: "Industrial-grade Audio",
        description: "Advanced DSP for real-time sound isolation and identification",
      },
      {
        title: "Adaptive Intelligence",
        description: "Reinforcement learning for rapid environmental adaptation",
      },
      {
        title: "Modular Payloads",
        description: "Supports EW payloads, munitions, RGB/thermal cameras, and robotic arms",
      },
    ],
    video: wheeledShvanaVideo,
    views: [
      { label: "Front View", image: wheeledShvanaImg },
    ],
    activeSpecTab: "performance",
    specTabs: {
      performance: [
        { label: "Speed", value: "~2-5 m/sec" },
        { label: "Payload", value: "10 kg" },
        { label: "Weight", value: "25 kg (minus payload)" },
        { label: "Range", value: "8-10 km" },
        { label: "Communication", value: "LTE, RF" },
        { label: "Endurance", value: "~120 mins" },
      ],
    },
  },
  {
    id: "prabal-qdds",
    name: "Prabal QDD's",
    category: "robotic-platforms",
    categoryName: "Robotic Platforms",
    subCategory: "Quasi Direct Drive Actuator Series",
    tagline: "Compact, responsive high-torque drives for advanced robotic systems",
    description:
      "Quasi Direct Drives blend the strength of geared systems with the speed and precision of direct drives. The Prabal QDD's series is designed, developed, and manufactured in India to cater to the demand for high-torque actuators.",
    applications:
      "Prabal QDD's can be customized with required gear ratios and encoders as per mission requirements. The series is intended for robotic actuators, unmanned vehicles and weapon systems, tracking systems, exoskeletons, and applications with high torque requirements.",
    features: [
      {
        title: "QDD Architecture",
        description: "Strength, speed, and precision in a compact form factor",
      },
      {
        title: "Made in India",
        description: "Designed, developed, and manufactured in India",
      },
      {
        title: "Customisable",
        description: "Gear ratios and encoders configurable per mission requirements",
      },
      {
        title: "Versatile Platform",
        description: "Robots, weapon systems, trackers, exoskeletons, and high-torque applications",
      },
    ],
    video: prabalVideo,
    views: [
      { label: "Front View", image: prabalImg },
    ],
    activeSpecTab: "specifications",
    specTabs: {
      specifications: [
        { label: "Drive Type", value: "Quasi Direct Drive (QDD)" },
        { label: "Prabal 24", value: "Peak torque 24 Nm" },
        { label: "Prabal 160", value: "Peak torque 160 Nm" },
        { label: "Ingress Protection", value: "IP 64" },
        { label: "Manufacturing", value: "Designed, developed, and manufactured in India" },
      ],
    },
  },
];
