import vrishabhVideo from "@/assets/Vrishabh_WhiteBG.mp4";
import masterShvanaShoeVideo from "@/assets/ProductVideos/MasterShvana_Shoe.mp4";
import masterShvanaWheeledVideo from "@/assets/ProductVideos/MasterShvanaWheeled.mp4";
import DhruvVideo from "@/assets/ProductVideos/Dhruv_WhiteBG.mp4";
import prabalVideo from "@/assets/ProductVideos/DM90&DM70.mp4";
import rakshakVideo from "@/assets/ProductVideos/Rakshak_Stereo1.mp4";
import yugmaVideo from "@/assets/ProductVideos/Yugma_360view.mp4";
import satelliteTrackerVideo from "@/assets/ProductVideos/Satellite_Tracker.mp4";
import twoDofVideo from "@/assets/ProductVideos/2DOF_360View.mp4";

export const categories = [
  {
    id: "quadruped",
    name: "Quadruped Robots",
    products: ["vrishabh", "shvana", "wheeled-shvana"]
  },
  {
    id: "defense",
    name: "Defense Robots",
    products: ["rakshak"]
  },
  {
    id: "stabilization",
    name: "Stabilization Platforms",
    products: ["dhruv", "2dof"]
  },
  {
    id: "vision",
    name: "Vision Systems",
    products: ["yugma"]
  },
  {
    id: "aquaters",
    name: "Aquaters",
    products: ["prabal-qdds"]
  },
  {
    id: "tracking",
    name: "Tracking Systems",
    products: ["satellite-tracker"]
  }
];

export const products = [
  {
    id: "vrishabh",
    name: "Vrishabh",
    category: "quadruped",
    subCategory: "Combat Unmanned Ground Vehicle",
    description: "High-performance autonomous robotic platform engineered for tactical mobility, weapons deployment, and heavy-duty operations.",
    features: [
      "Weapons platform support (MMG, LMG, NSVT, AGS 30)",
      "2 Axis Stabilization system",
      "High torque: 1000 Nm at wheels",
      "0-50 kmph in just 4 seconds",
      "Towing capacity: 300 kg (level ground)"
    ],
    video: vrishabhVideo,
    specs: {
      performance: [
        { label: "Max Speed", value: "50 km/h" },
        { label: "Acceleration (0-50)", value: "4 Seconds" },
        { label: "Payload Capacity", value: "150 kg" },
        { label: "Weight", value: "400 kg" },
        { label: "Torque", value: "1000 Nm (at wheels)" }
      ],
      power: [
        { label: "Max Power", value: "60 HP" },
        { label: "Battery", value: "16 kWh" },
        { label: "Endurance", value: "6 Hours" },
        { label: "Range", value: "~100 km" }
      ],
      dimensions: [
        { label: "Dimensions (LxWxH)", value: "2250 x 1250 x 1420 mm" },
        { label: "Towing (Level Ground)", value: "300 kg" },
        { label: "Stabilization", value: "2 Axis" }
      ]
    }
  },
  {
    id: "shvana",
    name: "Shvana",
    category: "quadruped",
    subCategory: "Advanced Quadruped",
    description: "High-agility quadruped robot designed for versatile mission profiles and complex terrain navigation.",
    features: [
      "Speed: ~2-5 m/sec",
      "Payload: 10 kg",
      "Weight: 25 kg (minus payload)",
      "Range: 8-10 km",
      "Communication: LTE, RF",
      "Endurance: ~120 mins."
    ],
    video: masterShvanaShoeVideo,
    specs: {
      performance: [
        { label: "Max Speed", value: "~2-5 m/sec" },
        { label: "Payload Capacity", value: "10 kg" },
        { label: "Weight", value: "25 kg (excluding payload)" },
        { label: "Endurance", value: "~120 mins" }
      ],
      comms: [
        { label: "Range", value: "8-10 km" },
        { label: "Communication", value: "LTE, RF" }
      ]
    }
  },
  {
    id: "wheeled-shvana",
    name: "Wheeled Shvana",
    category: "quadruped",
    subCategory: "Armed Quadruped",
    description: "Bharat’s first armed quadruped designed for high-stakes reconnaissance and tactical operations.",
    features: [
      "Speed: ~2-5 m/sec",
      "Payload: 10 kg",
      "Weight: 25 kg (minus payload)",
      "Range: 8-10 km",
      "Communication: LTE, RF",
      "Endurance: ~120 mins."
    ],
    video: masterShvanaWheeledVideo,
    specs: {
      performance: [
        { label: "Max Speed", value: "~2-5 m/sec" },
        { label: "Payload Capacity", value: "10 kg" },
        { label: "Weight", value: "25 kg (excluding payload)" },
        { label: "Endurance", value: "~120 mins" }
      ],
      comms: [
        { label: "Range", value: "8-10 km" },
        { label: "Communication", value: "LTE, RF" }
      ]
    }
  },
  {
    id: "rakshak",
    name: "Rakshak",
    category: "defense",
    subCategory: "Autonomous Weapon Station",
    description: "Autonomous weapon station that transforms standard firearms into precision robotic defense units.",
    features: [
      "Integrated day and night camera with long range stereo vision",
      "Effective range : 1800 m",
      "Human recognition : Day – 2 km, Night – 1 km",
      "Weighs less than 45 kg",
      "In built ballistic correction"
    ],
    video: rakshakVideo,
    specs: {
      vision: [
        { label: "Camera Type", value: "Day/Night Integrated" },
        { label: "Vision System", value: "Long Range Stereo Vision" },
        { label: "Human Recognition (Day)", value: "2 km" },
        { label: "Human Recognition (Night)", value: "1 km" }
      ],
      ballistics: [
        { label: "Effective Range", value: "1800 m" },
        { label: "Ballistic Correction", value: "In-built Automatic" },
        { label: "Weight", value: "< 45 kg" }
      ]
    }
  },
  {
    id: "dhruv",
    name: "Dhruv",
    category: "stabilization",
    subCategory: "Powered Exoskeleton",
    description: "Advanced powered exoskeleton designed to enhance human strength and endurance in demanding field operations.",
    features: [
      "Ergonomic load-bearing support",
      "High-torque joint mechanisms",
      "Reduces muscular strain & fatigue",
      "Enhanced mobility on uneven terrain"
    ],
    video: DhruvVideo,
  },
  {
    id: "2dof",
    name: "2DOF",
    category: "stabilization",
    subCategory: "Stabilization Platform",
    description: "Two-degree-of-freedom stabilization platform for precision instrument mounting and vibration compensation.",
    features: [
      "High-precision stabilization",
      "Fast response time",
      "Compact integration",
      "Ruggedized for field use"
    ],
    video: twoDofVideo,
  },
  {
    id: "yugma",
    name: "Yugma",
    category: "vision",
    subCategory: "Vision System",
    description: "Advanced multi-spectral vision system for enhanced situational awareness and target identification.",
    features: [
      "Multi-spectral imaging",
      "Real-time target tracking",
      "Low-light capability",
      "AI-based object classification"
    ],
    video: yugmaVideo,
  },
  {
    id: "prabal-qdds",
    name: "Prabal QDDs",
    category: "aquaters",
    subCategory: "High-performance Drive Modules",
    description: "High-performance Quasi Direct Drives combining geared strength with direct-drive precision.",
    features: [
      "High torque density & responsiveness",
      "Compact and lightweight design",
      "Indigenous Indian engineering",
      "Precise motion control for robotics"
    ],
    video: prabalVideo,
  },
  {
    id: "satellite-tracker",
    name: "Satellite Tracker",
    category: "tracking",
    subCategory: "Tracking System",
    description: "High-precision satellite tracking system for reliable communication and data transmission in motion.",
    features: [
      "Auto-acquisition capability",
      "High-accuracy pointing",
      "Continuous tracking in motion",
      "Weather-resistant design"
    ],
    video: satelliteTrackerVideo,
  },
];
