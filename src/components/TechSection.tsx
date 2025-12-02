import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Radio, Vibrate, Blocks } from "lucide-react";
import redstoneBlock from "@/assets/redstone-block.png";

export const TechSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techFeatures = [
    {
      icon: Cpu,
      title: "Base de Sensorização",
      description:
        "Detecta peso, pressão e o ponto exato de desequilíbrio da torre, como se estivesse monitorando a 'estabilidade do chunk' em tempo real.",
    },
    {
      icon: Vibrate,
      title: "Feedback Háptico Pixelado",
      badge: "NOVO!",
      description:
        "A base emite vibrações graduais que simulam a sensação de blocos rangendo ou um 'creeper' se aproximando à medida que a torre se torna instável.",
    },
    {
      icon: Blocks,
      title: "Blocos Temáticos",
      description:
        "Blocos idênticos ao jogo, fabricados com plástico reciclado de alta resistência com texturas autênticas de Minecraft.",
    },
    {
      icon: Radio,
      title: "Conexão Bluetooth/Wi-Fi",
      description:
        "Para o JengaCraft App, que interage diretamente com a base do Jenga, proporcionando efeitos visuais e sonoros distintos.",
    },
  ];

  return (
    <section id="tech" className="py-20 bg-minecraft-obsidian text-white relative overflow-hidden" ref={ref}>
      {/* Animated Redstone glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-minecraft-redstone/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-minecraft-redstone/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-pixel text-4xl md:text-5xl mb-4">INOVAÇÃO E TECNOLOGIA</h2>
          <p className="text-xl text-gray-300 mb-8">O Coração da Pixelização</p>

          <div className="flex justify-center mb-8">
            <motion.img
              src={redstoneBlock}
              alt="Altar de Redstone"
              className="w-32 h-32"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="inline-block bg-accent/20 border-2 border-accent px-6 py-3 rounded-lg redstone-glow">
            <p className="text-pixel text-lg">ALTAR DE REDSTONE</p>
            <p className="text-sm text-gray-300 mt-2">Bluetooth/WiFi Enabled</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {techFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-minecraft-redstone/30 hover:border-minecraft-redstone hover-lift relative overflow-hidden group"
              >
                {feature.badge && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs px-3 py-1 rounded-full font-bold">
                    {feature.badge}
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-minecraft-redstone/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-minecraft-redstone/40 transition-colors">
                    <Icon className="w-6 h-6 text-minecraft-redstone" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-pixel text-xs mb-3 text-primary">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-minecraft-redstone/0 via-minecraft-redstone/5 to-minecraft-redstone/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
