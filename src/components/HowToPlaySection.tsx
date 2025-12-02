import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Layers3, Hand, Zap, Trophy } from "lucide-react";

export const HowToPlaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Layers3,
      number: "01",
      title: "Monte a Torre",
      description:
        "Coloque os blocos pixelados sobre o Altar de Redstone em camadas alternadas de 3 blocos, criando a torre Minecraft.",
    },
    {
      icon: Hand,
      title: "Extraia os Blocos",
      number: "02",
      description:
        "Use apenas uma mão para 'minerar' um bloco de qualquer camada abaixo da mais alta. Sinta a base vibrar conforme a instabilidade aumenta.",
    },
    {
      icon: Zap,
      title: "Reposicione no Topo",
      number: "03",
      description:
        "Coloque o bloco extraído no topo da torre, completando uma nova camada. O Altar de Redstone monitora cada movimento.",
    },
    {
      icon: Trophy,
      title: "Vença o Desafio",
      number: "04",
      description:
        "O último jogador a colocar um bloco com sucesso antes da torre cair é o vencedor. A base emite um sinal especial ao detectar a queda!",
    },
  ];

  return (
    <section
      id="how-to-play"
      className="py-20 bg-gradient-to-b from-muted to-background relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              currentColor 10px,
              currentColor 20px
            )`,
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
          <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-6">COMO JOGAR</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quatro passos simples para uma experiência phygital inesquecível
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-card p-6 rounded-lg shadow-lg hover-lift h-full border-2 border-transparent hover:border-primary transition-colors">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-pixel text-xs redstone-glow">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-pixel text-sm text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line (except for last item on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-minecraft-grass/10 border-2 border-primary px-8 py-4 rounded-lg">
            <p className="text-foreground font-bold mb-2">💡 Dica Especial</p>
            <p className="text-muted-foreground">
              Conecte o app JengaCraft para efeitos sonoros autênticos de Minecraft e estatísticas
              em tempo real da sua partida!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
