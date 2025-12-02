import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bomb, Pickaxe, Timer } from "lucide-react";

export const BaseEffectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const effects = [
    {
      icon: Bomb,
      title: "TNT",
      description: "Um único tremor explosivo e muito forte na base",
      color: "minecraft-redstone",
      gradient: "from-red-600 to-orange-600",
      intensity: "MÁXIMA",
      particles: "💥",
    },
    {
      icon: Pickaxe,
      title: "MINERAÇÃO",
      description: "Tremores contínuos e leves na base durante 3 segundos",
      color: "minecraft-stone",
      gradient: "from-gray-600 to-gray-800",
      intensity: "LEVE",
      particles: "⛏️",
    },
    {
      icon: Timer,
      title: "CORRIDA",
      description: "O adversário deve tirar uma peça o mais rápido possível sem derrubar o Jenga",
      color: "minecraft-gold",
      gradient: "from-yellow-500 to-yellow-700",
      intensity: "URGENTE",
      particles: "⚡",
    },
  ];

  return (
    <section
      id="effects"
      className="py-20 bg-gradient-to-b from-minecraft-obsidian to-black text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-minecraft-redstone/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
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
          <h2 className="text-pixel text-4xl md:text-5xl mb-4">EFEITOS ESPECIAIS</h2>
          <p className="text-xl text-gray-300 mb-4">Poderes da Base Redstone</p>
          <div className="inline-block px-4 py-2 bg-minecraft-redstone/20 border-2 border-minecraft-redstone rounded-lg">
            <p className="text-pixel text-sm">ATIVE VIA APP JENGACRAFT</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {effects.map((effect, index) => {
            const Icon = effect.icon;
            return (
              <motion.div
                key={effect.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/10 hover:border-white/30 transition-all duration-300 hover-lift relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${effect.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Particle emoji */}
                  <motion.div
                    className="absolute top-4 right-4 text-4xl opacity-20"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {effect.particles}
                  </motion.div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      className={`w-20 h-20 bg-${effect.color}/20 rounded-2xl flex items-center justify-center border-2 border-${effect.color}/50 group-hover:border-${effect.color} transition-colors`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className={`w-10 h-10 text-${effect.color}`} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-pixel text-2xl mb-4 text-center">{effect.title}</h3>

                  {/* Intensity badge */}
                  <div className="flex justify-center mb-4">
                    <div className={`inline-block px-4 py-1 bg-${effect.color}/30 border border-${effect.color}/50 rounded-full`}>
                      <p className="text-pixel text-xs">{effect.intensity}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-center leading-relaxed">{effect.description}</p>

                  {/* Bottom decoration line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${effect.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  />
                </div>

                {/* Glowing effect on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${effect.gradient} opacity-0 group-hover:opacity-20 blur-xl -z-10`}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-minecraft-redstone/30 max-w-2xl">
            <p className="text-gray-300 leading-relaxed">
              Cada efeito é ativado através do <span className="text-minecraft-redstone font-bold">App JengaCraft</span>, 
              conectando-se à <span className="text-accent font-bold">Base Redstone</span> via Bluetooth. 
              Use os efeitos estrategicamente para surpreender seus adversários e tornar cada partida única!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
