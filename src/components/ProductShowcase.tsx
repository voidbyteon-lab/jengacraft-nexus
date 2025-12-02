import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import productImage from "@/assets/product-showcase.png";
export const ProductShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  return <section ref={ref} className="py-20 relative overflow-hidden bg-gradient-to-b from-minecraft-dark via-minecraft-darker to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-minecraft-redstone/20 rounded-lg blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-minecraft-grass/20 rounded-lg blur-3xl animate-pulse" style={{
        animationDelay: "1s"
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 30
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-pixel text-destructive">
            CONHEÇA O <span className="text-secondary">JENGA</span> x{" "}
            <span className="text-primary">MINECRAFT</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A torre pixelada que conecta dois mundos: o físico e o digital
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={isInView ? {
        opacity: 1,
        scale: 1
      } : {
        opacity: 0,
        scale: 0.9
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="relative max-w-5xl mx-auto">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-minecraft-redstone via-minecraft-grass to-cyan-500 rounded-2xl blur-xl opacity-75 animate-pulse" />
          
          {/* Image container */}
          <div className="relative bg-gradient-to-br from-minecraft-darker to-black p-2 rounded-2xl overflow-hidden">
            <img src={productImage} alt="Jenga x Minecraft - Torre Pixelada com Base Redstone e App JengaCraft" className="w-full h-auto rounded-xl shadow-2xl" />
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-minecraft-grass" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-minecraft-redstone" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-cyan-500" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-yellow-500" />
          </div>
        </motion.div>

        {/* Key features badges */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="bg-minecraft-grass/20 border-2 border-minecraft-grass px-6 py-3 rounded-lg backdrop-blur-sm">
            <span className="text-minecraft-grass font-bold">🎮 App JengaCraft</span>
          </div>
          <div className="bg-minecraft-redstone/20 border-2 border-minecraft-redstone px-6 py-3 rounded-lg backdrop-blur-sm">
            <span className="text-minecraft-redstone font-bold">⚡ Base Redstone</span>
          </div>
          <div className="bg-cyan-500/20 border-2 border-cyan-500 px-6 py-3 rounded-lg backdrop-blur-sm">
            <span className="text-cyan-500 font-bold">🔮 Efeitos Holográficos</span>
          </div>
          <div className="bg-yellow-500/20 border-2 border-yellow-500 px-6 py-3 rounded-lg backdrop-blur-sm">
            <span className="text-yellow-500 font-bold">🎯 Blocos Especiais</span>
          </div>
        </motion.div>
      </div>
    </section>;
};