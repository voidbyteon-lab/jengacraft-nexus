import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Hammer, Pickaxe, Smartphone, Blocks } from "lucide-react";
import grassBlock from "@/assets/grass-block.png";
import woodBlock from "@/assets/wood-block.png";

export const ConceptSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Blocks,
      title: "Conceito",
      description: "A fusão phygital que celebra construção e destruição de blocos",
    },
    {
      icon: Pickaxe,
      title: "TECNOLOGIA",
      description: "Sensores avançados e feedback háptico para máxima imersão",
    },
    {
      icon: Hammer,
      title: "Altar de Redstone",
      description: "Base inteligente que monitora estabilidade em tempo real",
    },
    {
      icon: Smartphone,
      title: "App JengaCraft",
      description: "Conectividade Bluetooth/Wi-Fi para efeitos especiais",
    },
  ];

  return (
    <section id="concept" className="py-20 bg-muted relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <img src={grassBlock} alt="" className="w-24 h-24 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <img src={woodBlock} alt="" className="w-32 h-32 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-6">CONCEITO</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unir a criatividade ilimitada e o reconhecimento global de Minecraft com a tensão tática
            do Jenga, adicionando interatividade tecnológica para criar uma experiência única.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-lg hover-lift hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-pixel text-sm text-foreground mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-minecraft-grass/10 border-2 border-primary rounded-lg p-8 text-center"
        >
          <p className="text-2xl font-bold text-foreground mb-4">
            "Onde o Equilíbrio Encontra a Emoção"
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A prova de que a nostalgia (Jenga) e a inovação tecnológica (Minecraft/Tech) podem
            criar uma experiência de jogo superior e memorável, transformando o jogador em um
            construtor e minerador do mundo real.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
