import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-minecraft-obsidian text-white py-12 border-t-4 border-accent">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-pixel text-lg mb-4 text-primary">JENGA × MINECRAFT</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A fusão perfeita entre tradição e inovação. Construa, mine, e divirta-se com
              tecnologia de ponta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {["Concept", "Tech", "Design", "How to Play", "About Us"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const id = link.toLowerCase().replace(/ /g, "-");
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Email: contato@jengacraft.com</li>
              <li className="text-gray-400">Suporte: suporte@jengacraft.com</li>
              <li className="text-gray-400">Tel: (11) 9999-9999</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 JengaCraft. Todos os direitos reservados.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
