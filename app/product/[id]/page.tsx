"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Leaf, Heart, Award, Recycle, Star, Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { useToast } from "@/hooks/use-toast"

const products: Record<string, {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice: number | null
  image: string
  sizes: string[]
  details: string
  howToUse: string
  ingredients: string
  delivery: string
}> = {
  "radiance-serum": {
    id: "radiance-serum",
    name: "Sérum Radiante",
    tagline: "Ilumina tu brillo natural",
    description: "Un sérum ligero y de rápida absorción infundido con Vitamina C y extractos botánicos. Diseñado para iluminar, unificar el tono de piel y revelar la luminosidad natural de tu piel.",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum.jpg",
    sizes: ["30ml", "50ml"],
    details: "Nuestro Sérum Radiante combina 15% de Vitamina C estabilizada con aceite de semilla de rosa mosqueta y extracto de espino amarillo. La fórmula está diseñada para penetrar profundamente en la piel, atacando manchas oscuras y tono desigual mientras protege contra agresores ambientales. Adecuado para todo tipo de piel, este sérum es tu dosis diaria de luminosidad.",
    howToUse: "Aplica 3-4 gotas en el rostro y cuello limpios por la mañana y por la noche. Presiona suavemente sobre la piel hasta que se absorba. Continúa con tu crema hidratante Boty favorita. Para mejores resultados, usa consistentemente durante 4-6 semanas.",
    ingredients: "Aqua, Ascorbic Acid (Vitamin C), Rosa Canina Seed Oil, Hippophae Rhamnoides Oil, Glycerin, Niacinamide, Tocopherol (Vitamin E), Ferulic Acid, Aloe Barbadensis Leaf Juice, Citrus Aurantium Dulcis Peel Oil, Lavandula Angustifolia Oil.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "hydra-cream": {
    id: "hydra-cream",
    name: "Crema Hidra",
    tagline: "Hidratación profunda, confort duradero",
    description: "Una crema hidratante rica pero ligera que brinda hidratación intensa sin pesadez. Formulada con ácido hialurónico y mantecas botánicas para nutrición durante todo el día.",
    price: 54,
    originalPrice: null,
    image: "/images/products/moisturizer.jpg",
    sizes: ["50ml", "100ml"],
    details: "La Crema Hidra presenta ácido hialurónico de múltiples pesos para hidratar en cada nivel de la piel. La manteca de karité y el aceite de jojoba sellan la humedad mientras que el escualano proporciona un acabado sedoso y no graso. Perfecta para pieles normales a secas que buscan confort duradero.",
    howToUse: "Después de la limpieza y el sérum, aplica una pequeña cantidad en el rostro y cuello. Masajea suavemente con movimientos ascendentes. Usa por la mañana y por la noche como el paso final de tu rutina de cuidado de la piel.",
    ingredients: "Aqua, Butyrospermum Parkii Butter, Simmondsia Chinensis Seed Oil, Sodium Hyaluronate, Squalane, Glycerin, Cetearyl Alcohol, Calendula Officinalis Extract, Chamomilla Recutita Extract, Tocopherol.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "gentle-cleanser": {
    id: "gentle-cleanser",
    name: "Limpiador Suave",
    tagline: "Limpia sin compromisos",
    description: "Un lavado botánico calmante que elimina impurezas respetando el equilibrio natural de tu piel. Perfecto para pieles sensibles y uso diario.",
    price: 38,
    originalPrice: 48,
    image: "/images/products/cleanser.jpg",
    sizes: ["150ml", "250ml"],
    details: "Nuestro Limpiador Suave usa surfactantes derivados del coco que limpian eficazmente sin resecar. Enriquecido con manzanilla, extracto de avena y aloe vera, calma y suaviza mientras limpia. Con pH balanceado y probado por dermatólogos para pieles sensibles.",
    howToUse: "Moja el rostro con agua tibia. Aplica una pequeña cantidad en las yemas de los dedos y masajea sobre el rostro con movimientos circulares. Enjuaga completamente. Usa por la mañana y por la noche.",
    ingredients: "Aqua, Coco-Glucoside, Glycerin, Avena Sativa Kernel Extract, Aloe Barbadensis Leaf Juice, Chamomilla Recutita Extract, Panthenol, Allantoin, Citric Acid, Benzyl Alcohol, Potassium Sorbate.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "renewal-oil": {
    id: "renewal-oil",
    name: "Aceite Renovador",
    tagline: "Nutre profundamente, brilla eternamente",
    description: "Una lujosa mezcla de aceites botánicos preciosos que nutren profundamente y restauran la piel durante la noche. Despierta con una piel más suave y flexible.",
    price: 72,
    originalPrice: null,
    image: "/images/products/oil.jpg",
    sizes: ["30ml", "50ml"],
    details: "El Aceite Renovador combina aceites de argán, rosa mosqueta y marula con vitamina E para una nutrición nocturna intensiva. Este aceite seco se absorbe rápidamente, dejando la piel suave sin residuos. Ideal para pieles maduras o deshidratadas que buscan restauración.",
    howToUse: "Aplica 4-6 gotas en las palmas y calienta entre las manos. Presiona suavemente sobre el rostro y cuello como el paso final de tu rutina nocturna. También se puede mezclar con crema hidratante para mayor hidratación.",
    ingredients: "Argania Spinosa Kernel Oil, Rosa Canina Seed Oil, Sclerocarya Birrea Seed Oil, Tocopherol, Rosa Damascena Flower Oil, Lavandula Angustifolia Oil, Helianthus Annuus Seed Oil, Limonene, Linalool.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  }
}

const benefits = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Heart, label: "Libre de Crueldad" },
  { icon: Recycle, label: "Ecológico" },
  { icon: Award, label: "Aprobado por Expertos" }
]

type AccordionSection = "details" | "howToUse" | "ingredients" | "delivery"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products[productId] || products["radiance-serum"]

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("details")
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image
    }, quantity);

    toast({
      title: "Producto Agregado",
      description: `${quantity}x ${product.name} (${selectedSize}) agregado a tu carrito.`,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Detalles", content: product.details },
    { key: "howToUse", title: "Cómo Usar", content: product.howToUse },
    { key: "ingredients", title: "Ingredientes", content: product.ingredients },
    { key: "delivery", title: "Envío y Devoluciones", content: product.delivery }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a la Tienda
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card boty-shadow">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <span className="text-sm tracking-[0.3em] uppercase text-primary mb-2 block">
                  Esenciales Boty
                </span>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground italic mb-4">
                  {product.tagline}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(128 reseñas)</span>
                </div>

                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-medium text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">Tamaño</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm boty-transition boty-shadow ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-card/80"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">Cantidad</label>
                <div className="inline-flex items-center gap-4 bg-card rounded-full px-2 py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow ${
                    isAdded
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Agregado al Carrito
                    </>
                  ) : (
                    "Agregar al Carrito"
                  )}
                </button>
                <button
                  type="button"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
                >
                  Comprar Ahora
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-2 p-4 boty-shadow bg-transparent shadow-none rounded-md"
                  >
                    <benefit.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground text-center">{benefit.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
