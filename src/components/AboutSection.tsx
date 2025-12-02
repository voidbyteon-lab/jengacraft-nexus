import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: "MISSÃO",
      description:
        "Criar uma experiência de jogo única que une tradição e inovação, transformando jogadores em construtores do mundo real através da fusão entre Jenga e Minecraft.",
    },
    {
      icon: Eye,
      title: "VISÃO",
      description:
        "Ser referência global em jogos phygitais, celebrando a construção e destruição criativa através de tecnologia acessível e sustentável.",
    },
    {
      icon: Heart,
      title: "VALORES",
      description:
        "Inovação tecnológica, sustentabilidade, nostalgia reinventada, e a crença de que o equilíbrio entre físico e digital cria experiências memoráveis.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-minecraft-obsidian text-white relative overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(124, 179, 66, 0.1) 20px,
              rgba(124, 179, 66, 0.1) 40px
            )`,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-pixel text-4xl md:text-5xl mb-6">MISSÃO / VISÃO / VALORES</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nossa jornada para redefinir a experiência de jogo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border-2 border-primary/30 hover:border-primary hover-lift"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-pixel text-sm text-primary mb-4 text-center">{value.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-8 rounded-lg border-2 border-primary/50 max-w-4xl mx-auto"
        >
          <h3 className="text-pixel text-xl mb-4 text-center">HISTÓRIA DA CRIAÇÃO</h3>
          <p className="text-gray-200 leading-relaxed mb-4">
            A história começou com a visão de fundir a tensão física do Jenga com a criatividade
            ilimitada do Minecraft. Engenheiros do Jenga e designers da Mojang uniram forças,
            percebendo que o jogo precisava de mais do que simples blocos pintados: precisava de
            magia.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Essa magia veio na forma do "Altar de Redstone" (a Base Inteligente), que usa sensores
            para monitorar a "estabilidade do chunk" em tempo real. O Jenga x Minecraft foi lançado
            como a prova de que a nostalgia e a inovação tecnológica podem criar uma experiência
            superior e memorável.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
