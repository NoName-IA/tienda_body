"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Language, string>> = {
  // Header
  "header.shop": { en: "Shop", es: "Tienda" },
  "header.about": { en: "About", es: "Acerca de" },
  "header.ingredients": { en: "Ingredients", es: "Ingredientes" },
  "header.search": { en: "Search", es: "Buscar" },
  "header.login": { en: "Login", es: "Iniciar sesión" },
  "header.cart": { en: "Cart", es: "Carrito" },
  "header.account": { en: "Account", es: "Cuenta" },

  // Hero
  "hero.label": { en: "Natural Skincare", es: "Cuidado de Piel Natural" },
  "hero.glow": { en: "Glow gently.", es: "Brilla suavemente." },
  "hero.you": { en: "Naturally you.", es: "Naturalmente tú." },
  "hero.description": { en: "Discover skincare that breathes with you. Pure ingredients, gentle rituals, radiant results.", es: "Descubre cuidado de piel que respira contigo. Ingredientes puros, rituales suaves, resultados radiantes." },
  "hero.shop": { en: "Shop Now", es: "Compra Ahora" },
  "hero.scroll": { en: "Scroll", es: "Desplázate" },

  // Trust Badges
  "badges.organic": { en: "Organic Certified", es: "Certificado Orgánico" },
  "badges.organic.desc": { en: "100% organic ingredients", es: "100% ingredientes orgánicos" },
  "badges.extracts": { en: "Natural Extracts", es: "Extractos Naturales" },
  "badges.extracts.desc": { en: "Pure botanical formulas", es: "Fórmulas botánicas puras" },
  "badges.clean": { en: "Clean Beauty", es: "Belleza Limpia" },
  "badges.clean.desc": { en: "No toxic chemicals", es: "Sin químicos tóxicos" },
  "badges.vegan": { en: "Vegan Formula", es: "Fórmula Vegana" },
  "badges.vegan.desc": { en: "Plant-powered skincare", es: "Cuidado de piel a base de plantas" },

  // Features
  "features.packaging": { en: "Eco-Friendly Packaging", es: "Empaque Ecológico" },
  "features.packaging.desc": { en: "Recyclable and biodegradable materials", es: "Materiales reciclables y biodegradables" },
  "features.natural": { en: "100% Natural", es: "100% Natural" },
  "features.natural.desc": { en: "No synthetic chemicals or parabens", es: "Sin químicos sintéticos ni parabenos" },
  "features.plant": { en: "Plant-Based", es: "A Base de Plantas" },
  "features.plant.desc": { en: "Botanical extracts and essential oils", es: "Extractos botánicos y aceites esenciales" },
  "features.ethical": { en: "Ethical Sourcing", es: "Abastecimiento Ético" },
  "features.ethical.desc": { en: "Fair trade certified ingredients", es: "Ingredientes certificados de comercio justo" },
  "features.why": { en: "Why Boty?", es: "¿Por qué Boty?" },
  "features.crafted": { en: "Crafted with Purpose", es: "Elaborado con Propósito" },
  "features.mission": { en: "Every product is formulated with intention. We partner with farmers and suppliers who share our commitment to sustainability and ethical practices.", es: "Cada producto está formulado con intención. Nos asociamos con agricultores y proveedores que comparten nuestro compromiso con la sostenibilidad y las prácticas éticas." },

  // CTA Banner
  "cta.natural": { en: "100% Natural", es: "100% Natural" },
  "cta.you": { en: "100% You", es: "100% Tú" },
  "cta.noharsh": { en: "No Harsh Chemicals", es: "Sin Químicos Agresivos" },
  "cta.plant": { en: "Plant-Based Goodness", es: "Bondad a Base de Plantas" },
  "cta.ethical": { en: "Ethically Sourced", es: "Abastecido Éticamente" },

  // Product Grid
  "products.bestseller": { en: "Bestseller", es: "Más Vendido" },
  "products.new": { en: "New", es: "Nuevo" },
  "products.sale": { en: "Sale", es: "Oferta" },

  // Shop
  "shop.title": { en: "Shop All Products", es: "Compra Todos los Productos" },
  "shop.subtitle": { en: "Discover our complete range of natural skincare essentials", es: "Descubre nuestro completo rango de esenciales de cuidado de piel natural" },
  "shop.collection": { en: "Our Collection", es: "Nuestra Colección" },
  "shop.filters": { en: "Filters", es: "Filtros" },
  "shop.product": { en: "product", es: "producto" },
  "shop.products": { en: "products", es: "productos" },

  // About
  "about.story": { en: "Our Story", es: "Nuestra Historia" },
  "about.title": { en: "Skincare Reimagined", es: "Cuidado de Piel Reinventado" },
  "about.subtitle": { en: "At Boty, we believe beauty comes from within—and from nature. Discover the story behind our mission to revolutionize skincare with pure, effective, and sustainable products.", es: "En Boty, creemos que la belleza viene de adentro—y de la naturaleza. Descubre la historia detrás de nuestra misión de revolucionar el cuidado de la piel con productos puros, efectivos y sostenibles." },
  
  "about.beginning": { en: "Our Beginning", es: "Nuestro Inicio" },
  "about.beginning.sub": { en: "Founded with Purpose", es: "Fundada con Propósito" },
  "about.beginning.desc": { en: "Boty was born from a simple belief: that skincare should be natural, effective, and accessible to everyone. In 2020, our founder realized the skincare industry was overcomplicated and filled with unnecessary chemicals. We decided to change that.", es: "Boty nació de una creencia simple: que el cuidado de la piel debe ser natural, efectivo y accesible para todos. En 2020, nuestro fundador se dio cuenta de que la industria del cuidado de la piel era demasiado complicada y estaba llena de químicos innecesarios. Decidimos cambiar eso." },
  
  "about.mission": { en: "Our Mission", es: "Nuestra Misión" },
  "about.mission.sub": { en: "Pure Ingredients, Pure Results", es: "Ingredientes Puros, Resultados Puros" },
  "about.mission.desc": { en: "We source only the finest natural ingredients from sustainable farms around the world. Each product is carefully formulated by our team of botanists and chemists to deliver real results without compromise. Our mission is to bring the healing power of nature to your daily routine.", es: "Obtenemos solo los mejores ingredientes naturales de granjas sostenibles en todo el mundo. Cada producto es cuidadosamente formulado por nuestro equipo de botánicos y químicos para entregar resultados reales sin compromisos. Nuestra misión es llevar el poder curativo de la naturaleza a tu rutina diaria." },
  
  "about.values": { en: "Our Values", es: "Nuestros Valores" },
  "about.values.sub": { en: "Sustainability & Transparency", es: "Sostenibilidad y Transparencia" },
  "about.values.desc": { en: "Every decision we make is guided by our core values: sustainability, transparency, and quality. We believe in being honest about our ingredients, our practices, and our impact. Our packaging is 100% recyclable, and we partner with carbon-neutral shipping providers to reduce our environmental footprint.", es: "Cada decisión que tomamos está guiada por nuestros valores centrales: sostenibilidad, transparencia y calidad. Creemos en ser honesto sobre nuestros ingredientes, nuestras prácticas y nuestro impacto. Nuestro empaque es 100% reciclable, y nos asociamos con proveedores de envío de carbono neutro para reducir nuestra huella ambiental." },
  
  "about.community": { en: "Our Community", es: "Nuestra Comunidad" },
  "about.community.sub": { en: "Growing Together", es: "Creciendo Juntos" },
  "about.community.desc": { en: "What makes Boty truly special is our community. We're not just a skincare brand—we're a movement of people who believe in the power of natural beauty. Join thousands of Boty lovers who are transforming their skin and their relationship with skincare.", es: "Lo que hace a Boty realmente especial es nuestra comunidad. No somos solo una marca de cuidado de la piel—somos un movimiento de personas que creen en el poder de la belleza natural. Únete a miles de amantes de Boty que están transformando su piel y su relación con el cuidado de la piel." },
  
  "about.stats.customers": { en: "Happy Customers", es: "Clientes Felices" },
  "about.stats.ingredients": { en: "Natural Ingredients", es: "Ingredientes Naturales" },
  "about.stats.research": { en: "Years of Research", es: "Años de Investigación" },
  "about.stats.organic": { en: "Certified Organic", es: "Certificado Orgánico" },
  
  "about.cta.title": { en: "Ready to Transform Your Skin?", es: "¿Listo para Transformar Tu Piel?" },
  "about.cta.desc": { en: "Join our community and discover the power of natural skincare. Start your journey to beautiful, healthy skin today.", es: "Únete a nuestra comunidad y descubre el poder del cuidado de piel natural. Comienza tu viaje hacia una piel hermosa y saludable hoy." },
  "about.cta.button": { en: "Shop Our Collection", es: "Compra Nuestra Colección" },

  // Footer
  "footer.allproducts": { en: "All Products", es: "Todos los Productos" },
  "footer.serums": { en: "Serums", es: "Sueros" },
  "footer.moisturizers": { en: "Moisturizers", es: "Hidratantes" },
  "footer.cleansers": { en: "Cleansers", es: "Limpiadores" },
  "footer.giftsets": { en: "Gift Sets", es: "Juegos de Regalos" },
  "footer.ourstory": { en: "Our Story", es: "Nuestra Historia" },
  "footer.ingredients": { en: "Ingredients", es: "Ingredientes" },
  "footer.sustainability": { en: "Sustainability", es: "Sostenibilidad" },
  "footer.press": { en: "Press", es: "Prensa" },
  "footer.contact": { en: "Contact Us", es: "Contáctanos" },
  "footer.faq": { en: "FAQ", es: "Preguntas Frecuentes" },
  "footer.shipping": { en: "Shipping", es: "Envío" },
  "footer.returns": { en: "Returns", es: "Devoluciones" },
  "footer.description": { en: "Natural skincare for those who believe beauty should feel as good as it looks.", es: "Cuidado de piel natural para quienes creen que la belleza debe sentirse tan bien como se ve." },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
