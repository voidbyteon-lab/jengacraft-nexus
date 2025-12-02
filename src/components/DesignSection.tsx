import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Recycle, Hand, Layers } from "lucide-react";
import woodBlock from "@/assets/wood-block.png";
import stoneBlock from "@/assets/stone-block.png";
import grassBlock from "@/assets/grass-block.png";
import redstoneBlock from "@/assets/redstone-block.png";

export const DesignSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const materials = [
    {
      image: woodBlock,
      title: "Madeira",
      description: "Blocos de madeira com textura realista",
    },
    {
      image: stoneBlock,
      title: "Pedra",
      description: "Pedra cobble clássica do Minecraft",
    },
    {
      image: redstoneBlock,
      title: "Redstone",
      description: "Eco-Friendly Plastic com efeito brilhante",
    },
    {
      image: grassBlock,
      title: "Grama",
      description: "Blocos de grama pixelados autênticos",
    },
  ];

  const designFeatures = [
    {
      icon: Recycle,
      title: "Blocos de Alta Resistência",
      description:
        "Fabricados com Plástico Reciclado de Alta Resistência, inspirados nos blocos de Minecraft como madeira, terra, pedra e obsidiana. Cada bloco tem o design pixelado característico.",
    },
    {
      icon: Hand,
      title: "Ergonomia Tátil",
      description:
        "Textura tátil que remete à sensação dos materiais de Minecraft, com ranhuras sutis para melhor aderência ao 'minerar' um bloco.",
    },
    {
      icon: Layers,
      title: "Base Altar de Redstone",
      description:
        "Design com elementos visuais de Redstone, servindo como molde de empilhamento inicial para criar a torre mais 'Minecraft-esque' possível.",
    },
  ];

  return (
    <section id="design" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-6">
            DESIGN & DURABILIDADE
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Blocos autênticos com texturas fiéis ao Minecraft, construídos para durar
          </p>
        </motion.div>

        {/* Materials showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-pixel text-2xl text-center mb-8 text-foreground">
            DESIGN & MATERIAIS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {materials.map((material, index) => (
              <motion.div
                key={material.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-lg hover-lift group cursor-pointer"
              >
                <div className="relative mb-4">
                  <img
                    src={material.image}
                    alt={material.title}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-pixel text-xs text-center mb-2 text-foreground">
                  {material.title}
                </h4>
                <p className="text-muted-foreground text-center text-xs">{material.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {designFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                className="bg-card p-6 rounded-lg shadow-lg hover-lift border-2 border-transparent hover:border-primary transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-pixel text-sm text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
