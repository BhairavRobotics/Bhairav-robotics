import vrishabhVideo from "@/assets/ProductVideos/Vrishabh.mp4";
import wheeledShvanaVideo from "@/assets/ProductVideos/Shvana_Wheeled+Shoe.mp4";
import DhruvVideo from "@/assets/ProductVideos/Dhruv.mp4";
import prabalVideo from "@/assets/ProductVideos/DM90&DM70.mp4";
import rakshakVideo from "@/assets/ProductVideos/Rakshak_Stereo1.mp4";

export const categories = [
  {
    id: "quadruped",
    name: "Quadruped Robots",
    products: ["vrishabh", "shvana", "wheeled-shvana", "mini-shvana"]
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
    subCategory: "Heavy-duty Unmanned Ground Vehicle",
    description: "Heavy-duty autonomous robotic platform engineered for logistics and tactical mobility in challenging terrains.",
    features: [
      "High payload capacity for logistics",
      "Autonomous navigation & obstacle avoidance",
      "All-terrain mobility",
      "Modular mission payloads"
    ],
    video: vrishabhVideo,
    specs: {
      mobility: [
        { label: "Max Speed", value: "40 km/h" },
        { label: "Gradient Capability", value: "45°" }
      ],
      power: [
        { label: "Battery Type", value: "Li-Ion 48V" },
        { label: "Runtime", value: "12 Hours" }
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
    video: wheeledShvanaVideo, // Placeholder
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
    video: wheeledShvanaVideo,
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
    id: "mini-shvana",
    name: "Mini Shvana",
    category: "quadruped",
    subCategory: "Compact Quadruped",
    description: "Compact and portable quadruped robot for rapid deployment and indoor/tight-space operations.",
    features: [
      "Speed: ~2-5 m/sec",
      "Payload: 10 kg",
      "Weight: 25 kg (minus payload)",
      "Range: 8-10 km",
      "Communication: LTE, RF",
      "Endurance: ~120 mins."
    ],
    video: wheeledShvanaVideo, // Placeholder
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
    video: DhruvVideo, // Placeholder
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
    video: rakshakVideo, // Placeholder
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
    video: prabalVideo, // Placeholder
  },
];
