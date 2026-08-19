import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Video, 
  MessageSquare, 
  Settings, 
  X, 
  Activity, 
  Crosshair, 
  Shield, 
  AlertTriangle, 
  Target,
  Maximize2,
  Navigation,
  Clock,
  MapPin,
  Power
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const T72Mockup = () => {
  const [activeTab, setActiveTab] = useState('Fire Control');
  const [mode, setMode] = useState('Auto');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [zoom, setZoom] = useState([50]);
  const [isFiring, setIsFiring] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const targets = [
    { id: 'T1', x: 25, y: 45, label: 'Human T1', dist: '25m', active: false },
    { id: 'T2', x: 50, y: 55, label: 'Human T2', dist: '18m', active: true },
    { id: 'T3', x: 75, y: 48, label: 'Human T3', dist: '32m', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0a] flex items-center justify-center p-4 font-heading overflow-hidden">
      {/* Rugged Tablet Frame */}
      <div className="relative w-full max-w-[1280px] aspect-video bg-[#1a1c1a] rounded-[40px] border-[12px] border-[#2a2c2a] shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden ring-offset-4 ring-offset-black ring-4 ring-[#151715]">
        
        {/* Hardware Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-10" />
        
        {/* Bezel Screws */}
        <div className="absolute top-4 left-1/4 w-2 h-2 rounded-full bg-[#111] shadow-inner z-20 border border-white/5" />
        <div className="absolute top-4 right-1/4 w-2 h-2 rounded-full bg-[#111] shadow-inner z-20 border border-white/5" />
        <div className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-[#111] shadow-inner z-20 border border-white/5" />
        <div className="absolute bottom-4 right-1/4 w-2 h-2 rounded-full bg-[#111] shadow-inner z-20 border border-white/5" />

        {/* Physical Side Buttons (Left) */}
        <div className="absolute left-[-10px] top-1/4 flex flex-col gap-4 z-20">
          <div className="w-[8px] h-12 bg-[#3a3c3a] rounded-l-md border-y border-l border-[#4a4c4a]" />
          <div className="w-[8px] h-12 bg-[#3a3c3a] rounded-l-md border-y border-l border-[#4a4c4a]" />
        </div>

        {/* Physical Side Buttons (Right) */}
        <div className="absolute right-[-10px] top-1/3 flex flex-col gap-6 z-20">
          <div className="w-[8px] h-16 bg-[#3a3c3a] rounded-r-md border-y border-r border-[#4a4c4a]" />
          <div className="w-[8px] h-8 bg-[#3a3c3a] rounded-r-md border-y border-r border-[#4a4c4a]" />
        </div>

        {/* Main Interface Content */}
        <div className="relative w-full h-full bg-[#050705] flex flex-col select-none">
          
          {/* Top Navigation Bar */}
          <div className="h-16 bg-[#121412]/90 border-b border-[#2a2c2a] flex items-center px-6 gap-4 z-30">
            <div className="flex items-center gap-3 mr-8">
              <Shield className="text-emerald-500 w-6 h-6 animate-pulse" />
              <h1 className="text-xl font-bold tracking-wider text-emerald-50 text-shadow-glow uppercase">
                T72 Autonomous Operations Suite
              </h1>
            </div>

            <nav className="flex items-center gap-1 h-full">
              {['Live View', 'Health', 'Calibration', 'Alerts', 'Mission', 'Fire Control'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 h-full text-sm font-semibold tracking-widest transition-all uppercase border-b-2",
                    activeTab === tab 
                      ? tab === 'Fire Control' ? "border-orange-500 text-orange-500 bg-orange-500/10" : "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                      : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">OBC: NOMINAL</span>
              </div>
              <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Main Viewport */}
          <div className="flex-1 relative overflow-hidden bg-black">
            
            {/* Live Camera Feed (Background Placeholder) */}
            <div className="absolute inset-0 z-0 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2000" 
                alt="Battlefield" 
                className="w-full h-full object-cover grayscale brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
            </div>

            {/* Left Vertical Icon Panel */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
              {[
                { icon: Camera, label: 'CAM' },
                { icon: Video, label: 'REC', color: 'text-red-500' },
                { icon: MessageSquare, label: 'COM' }
              ].map((item, idx) => (
                <button key={idx} className="group flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/20 transition-all">
                    <item.icon className={cn("w-6 h-6 text-white/70 group-hover:text-white", item.color)} />
                  </div>
                  <span className="text-[10px] font-bold text-white/50 tracking-tighter uppercase">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Zoom Slider */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20 h-64">
              <span className="text-[10px] font-bold text-white/50 tracking-tighter uppercase">Zoom</span>
              <div className="relative h-full py-4">
                <Slider 
                  orientation="vertical" 
                  defaultValue={[50]} 
                  max={100} 
                  step={1} 
                  className="h-full" 
                  value={zoom}
                  onValueChange={setZoom}
                />
                {/* Ticks */}
                <div className="absolute left-full ml-2 top-0 h-full flex flex-col justify-between py-4 text-[8px] text-white/20 font-bold">
                  {[10, 8, 6, 4, 2, 0].map(t => <span key={t}>x{t}</span>)}
                </div>
              </div>
            </div>

            {/* Target Overlays */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {targets.map((tgt) => (
                <motion.div
                  key={tgt.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ left: `${tgt.x}%`, top: `${tgt.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className={cn(
                    "relative border-2 transition-all duration-300",
                    tgt.active ? "border-red-500 w-32 h-48" : "border-emerald-500/50 w-24 h-36"
                  )}>
                    {/* Corners */}
                    <div className={cn("absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4", tgt.active ? "border-red-500" : "border-emerald-500")} />
                    <div className={cn("absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4", tgt.active ? "border-red-500" : "border-emerald-500")} />
                    <div className={cn("absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4", tgt.active ? "border-red-500" : "border-emerald-500")} />
                    <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4", tgt.active ? "border-red-500" : "border-emerald-500")} />
                    
                    {/* Labels */}
                    <div className={cn(
                      "absolute -top-8 left-0 flex flex-col gap-0.5",
                      tgt.active ? "text-red-500" : "text-emerald-500"
                    )}>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-black/80 px-1">{tgt.label}</span>
                      <span className="text-[9px] font-bold bg-black/80 px-1 w-fit">DIST: {tgt.dist}</span>
                    </div>

                    {/* Fire Button for Active Target */}
                    {tgt.active && (
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsFiring(true)}
                          className={cn(
                            "px-8 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-md shadow-[0_0_20px_rgba(220,38,38,0.5)] border-2 border-red-400 transition-all uppercase tracking-[0.2em]",
                            isFiring && "animate-ping"
                          )}
                        >
                          FIRE
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Central Crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-1 h-12 bg-emerald-500/30 absolute top-0" />
                <div className="w-1 h-12 bg-emerald-500/30 absolute bottom-0" />
                <div className="w-12 h-1 bg-emerald-500/30 absolute left-0" />
                <div className="w-12 h-1 bg-emerald-500/30 absolute right-0" />
                <div className="w-8 h-8 border-2 border-emerald-500/20 rounded-full" />
                <div className="w-1 h-1 bg-red-500 rounded-full" />
              </div>
            </div>

            {/* Bottom Left Joystick */}
            <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-2 items-center">
              <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center relative shadow-inner">
                <div className="absolute inset-4 border border-white/5 rounded-full" />
                <motion.div 
                  drag
                  dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                  dragElastic={0.1}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-white/20 shadow-2xl cursor-grab active:cursor-grabbing z-30" 
                />
                {/* Direction Arrows */}
                <div className="absolute top-2 text-white/20 text-[8px] font-bold">FWD</div>
                <div className="absolute bottom-2 text-white/20 text-[8px] font-bold">REV</div>
                <div className="absolute left-2 text-white/20 text-[8px] font-bold -rotate-90">LEFT</div>
                <div className="absolute right-2 text-white/20 text-[8px] font-bold rotate-90">RGHT</div>
              </div>
              <span className="text-[10px] font-bold text-white/30 tracking-tighter uppercase">Movement Control</span>
            </div>

            {/* Firing Overlay Effect */}
            <AnimatePresence>
              {isFiring && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={() => setIsFiring(false)}
                  className="absolute inset-0 bg-red-500/20 z-50 pointer-events-none flex items-center justify-center"
                >
                  <div className="text-6xl font-black text-red-500 animate-pulse tracking-[1em]">ENGAGING TARGET</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-14 bg-[#121412]/90 border-t border-[#2a2c2a] flex items-center px-6 gap-8 z-30">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold text-emerald-100 tracking-wider">
                  34°03'N 118°15'W
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold text-emerald-100 tracking-wider">
                  {time}
                </span>
              </div>
            </div>

            <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
              {['Manual', 'Auto'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded transition-all",
                    mode === m ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Signal</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={cn("w-1 h-3 rounded-full", i <= 4 ? "bg-emerald-500" : "bg-gray-700")} />
                    ))}
                  </div>
                </div>
                <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">Latency: 24ms</span>
              </div>
              
              <button className="px-6 h-10 bg-red-900/40 border border-red-600/50 hover:bg-red-800/60 transition-all text-red-500 font-black text-sm uppercase tracking-[0.2em] rounded flex items-center gap-2 group">
                <Power className="w-4 h-4 group-hover:animate-pulse" />
                STOP
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
};

export default T72Mockup;
