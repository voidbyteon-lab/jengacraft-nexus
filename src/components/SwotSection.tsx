import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, AlertTriangle, Lightbulb, Target } from "lucide-react";

export const SwotSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const swotData = [
    {
      title: "Forças",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      items: [
        "Fusão de Marcas Fortes",
        "Sustentabilidade",
        "Engajamento Estendido",
        "Inovação Tecnológica"
      ]
    },
    {
      title: "Fraquezas",
      icon: AlertTriangle,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      items: [
        "Custo de Produção",
        "Dependência Tecnológica",
        "Curva de Aprendizado",
        "Requisitos de Hardware"
      ]
    },
    {
      title: "Oportunidades",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      items: [
        "Mercado de \"Phygital\"",
        "Expansão de Conteúdo DLC",
        "Estratégia Cross-Promotion",
        "Educação e STEAM"
      ]
    },
    {
      title: "Ameaças",
      icon: Target,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      items: [
        "Saturação do Mercado Digital",
        "Concorrência e Replicação Tecnológica",
        "Risco de Propriedade Intelectual (PI)"
      ]
    }
  ];

  return (
    <section id="swot" className="py-20 bg-gradient-to-b from-muted to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-4">
            ANÁLISE SWOT
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visão estratégica do JengaCraft no mercado
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {swotData.map((quadrant, index) => {
            const Icon = quadrant.icon;
            return (
              <motion.div
                key={quadrant.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${quadrant.bgColor} ${quadrant.borderColor} border-2 rounded-2xl p-6 relative overflow-hidden`}
              >
                {/* Background gradient effect */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${quadrant.color}`} />
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quadrant.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${quadrant.textColor}`}>
                    {quadrant.title}
                  </h3>
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {quadrant.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${quadrant.color} mt-2 flex-shrink-0`} />
                      <span className="text-foreground/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative pixel corner */}
                <div className={`absolute bottom-2 right-2 w-4 h-4 ${quadrant.bgColor} opacity-50`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
