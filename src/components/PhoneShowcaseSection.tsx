import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Smartphone, RotateCcw, Pickaxe, Timer, Bomb, Heart, Gem, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogMessage {
  id: number;
  text: string;
  type: "action" | "system" | "reward";
}

export const PhoneShowcaseSection = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [pp, setPp] = useState(10);
  const [health, setHealth] = useState(5);
  const [logs, setLogs] = useState<LogMessage[]>([
    { id: 1, text: "Jogo iniciado!", type: "system" },
    { id: 2, text: "Sua vez de jogar", type: "system" },
  ]);
  const phoneRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(3);

  const addLog = (text: string, type: LogMessage["type"]) => {
    setLogs(prev => [...prev.slice(-4), { id: logIdRef.current++, text, type }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / rect.width) * 30;
    const rotateX = ((centerY - e.clientY) / rect.height) * 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !phoneRef.current) return;
    const touch = e.touches[0];
    const rect = phoneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((touch.clientX - centerX) / rect.width) * 30;
    const rotateX = ((centerY - touch.clientY) / rect.height) * 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => setRotation({ x: 0, y: 0 });

  const useAction = (action: string, cost: number) => {
    if (pp < cost) {
      addLog(`PP insuficiente para ${action}!`, "system");
      return;
    }
    setPp(prev => prev - cost);
    
    if (action === "Mineração") {
      addLog("⛏️ Bloco minerado com cuidado!", "action");
      setPp(prev => prev + 2);
      addLog("+2 PP de bônus!", "reward");
    } else if (action === "Corrida") {
      addLog("⏱️ Tempo extra ativado!", "action");
      setHealth(prev => Math.min(prev + 1, 5));
      addLog("❤️ +1 vida restaurada!", "reward");
    } else if (action === "TNT") {
      addLog("💥 BOOM! Explosão ativada!", "action");
      setHealth(prev => Math.max(prev - 1, 0));
      setPp(prev => prev + 5);
      addLog("+5 PP ganhos com risco!", "reward");
    }
  };

  const resetGame = () => {
    setPp(10);
    setHealth(5);
    setLogs([
      { id: 1, text: "Jogo reiniciado!", type: "system" },
      { id: 2, text: "Sua vez de jogar", type: "system" },
    ]);
    logIdRef.current = 3;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-minecraft-dirt to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
            <Smartphone className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Experiência Mobile</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Jogue em Qualquer Lugar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Arraste o celular para ver de diferentes ângulos e interaja com a prévia do jogo
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Phone Mockup */}
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative perspective-1000 cursor-grab active:cursor-grabbing"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: "preserve-3d",
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {/* Phone Frame */}
            <div className="relative w-[300px] h-[600px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl border-4 border-zinc-700">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-2xl z-10" />
              
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 rounded-[2.5rem] overflow-hidden relative">
                {/* Pixel Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "8px 8px"
                  }}
                />

                <div className="absolute inset-0 flex flex-col p-4">
                  {/* Header - Torch & Health */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Redstone Torch */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded shadow-lg shadow-red-500/50 flex items-center justify-center animate-pulse">
                        <div className="w-2 h-4 bg-yellow-400 rounded-t shadow-lg shadow-yellow-400/50" />
                      </div>
                    </div>

                    {/* Health Hearts */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`w-6 h-6 transition-all ${
                            i < health 
                              ? "text-red-500 fill-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]" 
                              : "text-zinc-700 fill-zinc-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center - Diamond PP Display */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative"
                    >
                      <Gem className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-cyan-400/20 rounded-lg blur-xl" />
                      </div>
                    </motion.div>
                    <div className="mt-4 text-center">
                      <span className="text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                        {pp}
                      </span>
                      <span className="text-2xl font-bold text-cyan-400 ml-2">PP</span>
                    </div>
                    <p className="text-cyan-200/60 text-sm mt-1">Pontos de Poder</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* Mineração Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => useAction("Mineração", 1)}
                      className="flex flex-col items-center p-3 bg-gradient-to-b from-stone-600 to-stone-800 rounded-xl border-2 border-stone-500 shadow-lg hover:from-stone-500 hover:to-stone-700 transition-all"
                    >
                      <Pickaxe className="w-8 h-8 text-stone-300 mb-1" />
                      <span className="text-xs font-bold text-stone-200">1 PP</span>
                    </motion.button>

                    {/* Corrida Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => useAction("Corrida", 2)}
                      className="flex flex-col items-center p-3 bg-gradient-to-b from-amber-600 to-amber-800 rounded-xl border-2 border-amber-500 shadow-lg hover:from-amber-500 hover:to-amber-700 transition-all"
                    >
                      <Timer className="w-8 h-8 text-amber-200 mb-1" />
                      <span className="text-xs font-bold text-amber-100">2 PP</span>
                    </motion.button>

                    {/* TNT Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => useAction("TNT", 3)}
                      className="flex flex-col items-center p-3 bg-gradient-to-b from-red-600 to-red-800 rounded-xl border-2 border-red-500 shadow-lg hover:from-red-500 hover:to-red-700 transition-all"
                    >
                      <Bomb className="w-8 h-8 text-red-200 mb-1" />
                      <span className="text-xs font-bold text-red-100">3 PP</span>
                    </motion.button>
                  </div>

                  {/* Chat Log */}
                  <div className="bg-black/40 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300">Log do Jogo</span>
                      <button 
                        onClick={resetGame}
                        className="ml-auto text-[10px] bg-red-600/80 hover:bg-red-500 px-2 py-1 rounded text-white font-bold"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {logs.map((log) => (
                        <motion.p
                          key={log.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`text-[10px] ${
                            log.type === "action" 
                              ? "text-yellow-300" 
                              : log.type === "reward" 
                              ? "text-emerald-400" 
                              : "text-white/70"
                          }`}
                        >
                          {log.text}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Reflection */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] pointer-events-none"
              style={{ transform: "translateZ(1px)" }}
            />
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Sistema de Pontos de Poder
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="bg-cyan-500/20 p-2 rounded-lg">💎</span>
                <div>
                  <strong className="text-foreground">Pontos de Poder (PP)</strong>
                  <p className="text-sm">Use PP para ativar habilidades especiais</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-stone-500/20 p-2 rounded-lg">⛏️</span>
                <div>
                  <strong className="text-foreground">Mineração (1 PP)</strong>
                  <p className="text-sm">Remove bloco com precisão e ganha bônus</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-amber-500/20 p-2 rounded-lg">⏱️</span>
                <div>
                  <strong className="text-foreground">Corrida (2 PP)</strong>
                  <p className="text-sm">Tempo extra e restaura vida da torre</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-red-500/20 p-2 rounded-lg">💣</span>
                <div>
                  <strong className="text-foreground">TNT (3 PP)</strong>
                  <p className="text-sm">Alto risco, alta recompensa!</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              <Button onClick={resetRotation} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetar Visão
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
