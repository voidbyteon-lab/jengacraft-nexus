import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Smartphone, Zap, Trophy, Users, Volume2, Sparkles } from "lucide-react";

export const AppDemoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  const appFeatures = [
    {
      icon: Zap,
      title: "Status em Tempo Real",
      description: "Acompanhe a estabilidade da torre com indicadores visuais e alertas de tensão.",
      color: "minecraft-redstone",
    },
    {
      icon: Volume2,
      title: "Efeitos Sonoros",
      description: "Sons autênticos do Minecraft que se intensificam conforme a torre fica instável.",
      color: "minecraft-grass",
    },
    {
      icon: Trophy,
      title: "Modo Competitivo",
      description: "Rankings, pontuações e desafios especiais para tornar cada partida única.",
      color: "minecraft-gold",
    },
    {
      icon: Users,
      title: "Multiplayer",
      description: "Conecte até 8 jogadores e compartilhe estatísticas em tempo real.",
      color: "minecraft-diamond",
    },
    {
      icon: Sparkles,
      title: "Temas Personalizáveis",
      description: "Biomas do Minecraft: Floresta, Deserto, Nether e mais para customizar sua experiência.",
      color: "minecraft-wood",
    },
  ];

  return (
    <section
      id="app"
      className="py-20 bg-gradient-to-b from-background to-minecraft-stone/10 relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-pixel text-4xl md:text-5xl mb-4">
            JENGACRAFT APP
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            A Experiência Digital que Conecta Tudo
          </p>
          <div className="inline-block bg-accent/20 border-2 border-accent px-6 py-2 rounded-lg">
            <p className="text-pixel text-sm">DISPONÍVEL PARA iOS & ANDROID</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                
                {/* Screen */}
                <div className="relative w-full h-full bg-minecraft-obsidian rounded-[2.5rem] overflow-hidden">
                  {/* App Interface */}
                  <div className="h-full flex flex-col p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-pixel text-xs text-white">JENGACRAFT</div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 bg-minecraft-grass/30 rounded border border-minecraft-grass" />
                        <div className="w-6 h-6 bg-minecraft-redstone/30 rounded border border-minecraft-redstone" />
                      </div>
                    </div>

                    {/* Tower Status */}
                    <motion.div
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-4 border border-minecraft-redstone/30"
                      animate={{
                        borderColor: ["rgba(255, 0, 0, 0.3)", "rgba(255, 0, 0, 0.6)", "rgba(255, 0, 0, 0.3)"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="text-pixel text-[10px] text-white mb-2">ESTABILIDADE DA TORRE</div>
                      <div className="relative h-2 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-minecraft-grass via-minecraft-gold to-minecraft-redstone rounded-full"
                          animate={{ width: ["70%", "50%", "70%"] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <div className="text-[8px] text-minecraft-redstone mt-1 text-pixel">ATENÇÃO: ZONA DE PERIGO</div>
                    </motion.div>

                    {/* Game Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
                        <div className="text-[8px] text-gray-400 text-pixel">BLOCOS</div>
                        <div className="text-pixel text-sm text-white">24</div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
                        <div className="text-[8px] text-gray-400 text-pixel">TEMPO</div>
                        <div className="text-pixel text-sm text-white">08:42</div>
                      </div>
                    </div>

                    {/* Players */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex-1">
                      <div className="text-pixel text-[8px] text-white mb-3">JOGADORES (4)</div>
                      <div className="space-y-2">
                        {["Steve", "Alex", "Creeper", "Enderman"].map((player, i) => (
                          <div key={player} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${i === 0 ? 'bg-minecraft-grass' : 'bg-white/20'} border border-white/30`} />
                            <div className="text-[10px] text-white flex-1">{player}</div>
                            <div className="text-[10px] text-minecraft-gold text-pixel">{100 - i * 15}pts</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="w-full mt-4 bg-accent hover:bg-accent/80 text-white text-pixel text-xs py-3 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      SUA VEZ!
                    </motion.button>
                  </div>

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 bg-minecraft-redstone/10 rounded-[2.5rem]"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-2xl -z-10" />
            </div>
          </motion.div>

          {/* Features List */}
          <div className="space-y-4">
            {appFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-card backdrop-blur-sm p-6 rounded-lg border-2 transition-all cursor-pointer hover-lift ${
                    activeFeature === index
                      ? "border-accent shadow-lg shadow-accent/20"
                      : "border-border hover:border-accent/50"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-pixel text-xs mb-2 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex gap-4">
            <motion.button
              className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-bold hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-5 h-5" />
              <span>App Store</span>
            </motion.button>
            <motion.button
              className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-bold hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone className="w-5 h-5" />
              <span>Google Play</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
