import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Smartphone, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PhoneShowcaseSection = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [blocksRemoved, setBlocksRemoved] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const phoneRef = useRef<HTMLDivElement>(null);

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

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleBlockClick = () => {
    setBlocksRemoved(prev => prev + 1);
    setGameScore(prev => prev + Math.floor(Math.random() * 50) + 10);
  };

  const resetGame = () => {
    setGameScore(0);
    setBlocksRemoved(0);
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
            <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl border-4 border-zinc-700">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-2xl z-10" />
              
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-b from-sky-400 to-sky-600 rounded-[2.5rem] overflow-hidden relative">
                {/* Game UI */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Game Header */}
                  <div className="bg-black/30 backdrop-blur-sm p-3 flex justify-between items-center">
                    <div className="text-white font-bold text-sm">
                      🎮 Minecraft Jenga
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white/80 hover:text-white"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className="flex justify-around p-2 bg-black/20">
                    <div className="text-center">
                      <div className="text-yellow-300 text-xs">SCORE</div>
                      <div className="text-white font-bold">{gameScore}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-300 text-xs">BLOCOS</div>
                      <div className="text-white font-bold">{blocksRemoved}</div>
                    </div>
                  </div>

                  {/* Game Area */}
                  <div className="flex-1 relative flex items-center justify-center p-4">
                    {/* Mini Jenga Tower */}
                    <div className="relative">
                      {/* Tower Blocks */}
                      {[...Array(Math.max(0, 8 - Math.floor(blocksRemoved / 3)))].map((_, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex gap-1 mb-1"
                          style={{
                            transform: rowIndex % 2 === 0 ? "rotate(0deg)" : "rotate(90deg)",
                          }}
                        >
                          {[...Array(3)].map((_, blockIndex) => (
                            <motion.button
                              key={blockIndex}
                              whileHover={{ scale: 1.1, x: blockIndex === 1 ? 0 : blockIndex === 0 ? -5 : 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleBlockClick}
                              className={`w-8 h-4 rounded-sm cursor-pointer transition-colors ${
                                rowIndex % 3 === 0
                                  ? "bg-amber-600 hover:bg-amber-500"
                                  : rowIndex % 3 === 1
                                  ? "bg-gray-500 hover:bg-gray-400"
                                  : "bg-green-600 hover:bg-green-500"
                              }`}
                              style={{
                                boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.3)",
                              }}
                            />
                          ))}
                        </div>
                      ))}
                      
                      {/* Base */}
                      <div className="w-28 h-6 bg-red-700 rounded mx-auto mt-2 shadow-lg" 
                        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)" }}
                      />
                    </div>

                    {/* Effect Indicator */}
                    {blocksRemoved > 0 && blocksRemoved % 5 === 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold"
                      >
                        COMBO! +50
                      </motion.div>
                    )}
                  </div>

                  {/* Game Controls */}
                  <div className="bg-black/40 backdrop-blur-sm p-4">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={resetGame}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                      >
                        🔄 Reiniciar
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                        ⚡ Efeito
                      </button>
                    </div>
                    <p className="text-white/60 text-[10px] text-center mt-2">
                      Toque nos blocos para remover
                    </p>
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
              Controles Intuitivos
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="bg-primary/20 p-2 rounded-lg">👆</span>
                <div>
                  <strong className="text-foreground">Toque para Remover</strong>
                  <p className="text-sm">Selecione blocos tocando na tela</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary/20 p-2 rounded-lg">📱</span>
                <div>
                  <strong className="text-foreground">Gire o Dispositivo</strong>
                  <p className="text-sm">Mova o celular para ver todos os ângulos</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-primary/20 p-2 rounded-lg">⚡</span>
                <div>
                  <strong className="text-foreground">Efeitos Especiais</strong>
                  <p className="text-sm">A base Redstone reage às suas ações</p>
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
