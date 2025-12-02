import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Package, Truck, Shield } from "lucide-react";
import { toast } from "sonner";

export const PreOrderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handlePreOrder = () => {
    if (email) {
      toast.success("Pré-venda confirmada! Em breve entraremos em contato.", {
        description: `Enviamos os detalhes para ${email}`,
      });
      setEmail("");
    } else {
      toast.error("Por favor, insira seu e-mail");
    }
  };

  const features = [
    "54 blocos temáticos Minecraft",
    "Base Altar de Redstone com sensores",
    "Feedback háptico inteligente",
    "Conectividade Bluetooth/Wi-Fi",
    "App JengaCraft incluído",
    "Materiais eco-friendly",
  ];

  const benefits = [
    { icon: Package, text: "Edição limitada de lançamento" },
    { icon: Truck, text: "Frete grátis para todo Brasil" },
    { icon: Shield, text: "Garantia de 2 anos" },
  ];

  return (
    <section
      id="pre-order"
      className="py-20 bg-gradient-to-b from-background to-muted relative overflow-hidden"
      ref={ref}
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-block bg-accent text-white px-6 py-2 rounded-full mb-6 redstone-glow"
            >
              <span className="text-pixel text-sm">PRÉ-VENDA EXCLUSIVA</span>
            </motion.div>
            
            <h2 className="text-pixel text-4xl md:text-5xl text-foreground mb-4">
              GARANTA O SEU AGORA
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Edição limitada de lançamento com benefícios exclusivos
            </p>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-primary/20">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <p className="text-muted-foreground text-sm mb-2">Preço de Lançamento</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">R$ 299</span>
                  <span className="text-2xl text-muted-foreground line-through">R$ 399</span>
                </div>
                <p className="text-accent font-bold mt-2">25% OFF na pré-venda</p>
              </div>
            </div>

            {/* Features list */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
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

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-lg"
                  >
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Email form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-lg border-2 border-input bg-background text-foreground focus:border-primary focus:outline-none text-lg"
              />
              <Button
                size="lg"
                onClick={handlePreOrder}
                className="w-full bg-accent hover:bg-accent/90 text-white text-xl py-7 redstone-glow shake-on-hover"
              >
                CONFIRMAR PRÉ-VENDA
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                🔒 Pagamento seguro • Envio previsto para Janeiro 2026
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
