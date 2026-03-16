import vrishabhVideo from "@/assets/ProductVideos/Vrishabh.mp4";
import wheeledShvanaVideo from "@/assets/ProductVideos/Shvana_Wheeled+Shoe.mp4";
import DhruvVideo from "@/assets/ProductVideos/Dhruv.mp4";
import prabalVideo from "@/assets/ProductVideos/DM90&DM70.mp4";
import rakshakVideo from "@/assets/ProductVideos/Rakshak_Stereo1.mp4";

export const products = [
  {
    id: "vrishabh",
    name: "Vrishabh",
    category: "Heavy-duty Unmanned Ground Vehicle",
    description: "Heavy-duty autonomous robotic platform engineered for logistics and tactical mobility in challenging terrains.",
    features: [
      "High payload capacity for logistics",
      "Autonomous navigation & obstacle avoidance",
      "All-terrain mobility",
      "Modular mission payloads"
    ],
    video: vrishabhVideo,
  },
  {
    id: "wheeled-shvana",
    name: "Shvana (श्वान)",
    category: "Armed Quadruped",
    description: "Bharat’s first armed quadruped designed for high-stakes reconnaissance and tactical operations.",
    features: [
      "AI-powered vision & audio perception",
      "Reinforcement learning for terrain adaptation",
      "Advanced DSP for sound isolation",
      "Compact and agile footprint"
    ],
    video: wheeledShvanaVideo,
  },
  {
    id: "Dhruv",
    name: "Dhruv",
    category: "Powered Exoskeleton",
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
    id: "prabal-qdds",
    name: "Prabal QDDs",
    category: "High-performance Drive Modules",
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
    id: "rakshak",
    name: "Rakshak",
    category: "Autonomous Weapon Station",
    description: "Autonomous weapon station that transforms standard firearms into precision robotic defense units.",
    features: [
      "Long-range stereo vision autonomy",
      "Multi-firearm compatibility (MMG/Assault)",
      "Enhanced precision & modularity",
      "Superior to remote controlled stations"
    ],
    video: rakshakVideo,
  },
];
