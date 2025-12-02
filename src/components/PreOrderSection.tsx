import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

export const PreOrderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    "54 blocos temáticos Minecraft",
    "Base Altar de Redstone com sensores",
    "Feedback háptico inteligente",
    "Conectividade Bluetooth/Wi-Fi",
    "App JengaCraft incluído",
    "Materiais eco-friendly",
  ];


  return (
    <section
      id="pre-order"
      className="py-20 bg-gradient-to-b from-background to-muted"
      ref={ref}
    >

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-4">
              PREÇO E DISPONIBILIDADE
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Conheça o valor do produto e seus recursos inclusos
            </p>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-primary/20">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <p className="text-muted-foreground text-sm mb-2">Preço Sugerido</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">R$ 299</span>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
