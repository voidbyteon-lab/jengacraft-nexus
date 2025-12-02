import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { JengaTower3D } from "./JengaTower3D";
import heroBg from "@/assets/hero-bg.jpg";
export const Hero = () => {
  const scrollToPreOrder = () => {
    const element = document.getElementById("pre-order");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="text-center lg:text-left">
            <motion.h1 className="text-pixel text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              JENGA × MINECRAFT
            </motion.h1>

            <motion.p className="text-2xl md:text-4xl font-bold text-primary mb-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }}>
              Onde o Equilíbrio Encontra a Emoção
            </motion.p>

            <motion.p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
              A fusão perfeita entre a tensão tática do Jenga e a criatividade ilimitada do
              Minecraft, com tecnologia Redstone que vibra a cada jogada.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.8
          }}>
              <Button size="lg" onClick={scrollToPreOrder} className="text-white redstone-glow text-lg px-8 shake-on-hover bg-primary">
                 COMPRAR AGORA!
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("concept")?.scrollIntoView({
              behavior: "smooth"
            })} className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8">
                Saiba Mais
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Tower */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 1,
          delay: 0.3
        }} className="relative">
            <JengaTower3D />
            <motion.p className="text-center text-white/80 mt-4 text-sm" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1.5
          }}>
              Arraste para girar • Scroll para zoom
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.5,
      repeat: Infinity,
      duration: 1.5
    }}>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
          <motion.div className="w-1.5 h-3 bg-primary rounded-full" animate={{
          y: [0, 12, 0]
        }} transition={{
          repeat: Infinity,
          duration: 1.5
        }} />
        </div>
      </motion.div>
    </section>;
};