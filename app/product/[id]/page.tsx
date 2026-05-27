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
    name: "Radiance Serum",
    tagline: "Illuminate your natural glow",
    description: "A lightweight, fast-absorbing serum infused with Vitamin C and botanical extracts. Designed to illuminate, even skin tone, and reveal your skin's natural radiance.",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum.jpg",
    sizes: ["30ml", "50ml"],
    details: "Our Radiance Serum combines 15% stabilized Vitamin C with rosehip seed oil and sea buckthorn extract. The formula is designed to penetrate deeply into the skin, targeting dark spots and uneven tone while protecting against environmental stressors. Suitable for all skin types, this serum is your daily dose of luminosity.",
    howToUse: "Apply 3-4 drops to clean face and neck morning and evening. Press gently onto skin until absorbed. Follow with your favorite Boty moisturizer. For best results, use consistently for 4-6 weeks.",
    ingredients: "Aqua, Ascorbic Acid (Vitamin C), Rosa Canina Seed Oil, Hippophae Rhamnoides Oil, Glycerin, Niacinamide, Tocopherol (Vitamin E), Ferulic Acid, Aloe Barbadensis Leaf Juice, Citrus Aurantium Dulcis Peel Oil, Lavandula Angustifolia Oil.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "hydra-cream": {
    id: "hydra-cream",
    name: "Hydra Cream",
    tagline: "Deep hydration, lasting comfort",
    description: "A rich yet lightweight hydrating cream that delivers intense moisture without heaviness. Formulated with hyaluronic acid and botanical butters for all-day nourishment.",
    price: 54,
    originalPrice: null,
    image: "/images/products/moisturizer.jpg",
    sizes: ["50ml", "100ml"],
    details: "Hydra Cream features multi-weight hyaluronic acid to hydrate at every skin level. Shea butter and jojoba oil seal in moisture while squalane provides a silky, non-greasy finish. Perfect for normal to dry skin seeking lasting comfort.",
    howToUse: "After cleansing and applying serum, apply a small amount to face and neck. Massage gently with upward strokes. Use morning and evening as the final step in your skincare routine.",
    ingredients: "Aqua, Butyrospermum Parkii Butter, Simmondsia Chinensis Seed Oil, Sodium Hyaluronate, Squalane, Glycerin, Cetearyl Alcohol, Calendula Officinalis Extract, Chamomilla Recutita Extract, Tocopherol.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "gentle-cleanser": {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    tagline: "Clean without compromise",
    description: "A calming botanical wash that removes impurities while respecting your skin's natural balance. Perfect for sensitive skin and daily use.",
    price: 38,
    originalPrice: 48,
    image: "/images/products/cleanser.jpg",
    sizes: ["150ml", "250ml"],
    details: "Our Gentle Cleanser uses coconut-derived surfactants that cleanse effectively without drying. Enriched with chamomile, oat extract, and aloe vera, it soothes and softens while cleansing. pH-balanced and dermatologist-tested for sensitive skin.",
    howToUse: "Dampen face with warm water. Apply a small amount to fingertips and massage over face in circular motions. Rinse thoroughly. Use morning and evening.",
    ingredients: "Aqua, Coco-Glucoside, Glycerin, Avena Sativa Kernel Extract, Aloe Barbadensis Leaf Juice, Chamomilla Recutita Extract, Panthenol, Allantoin, Citric Acid, Benzyl Alcohol, Potassium Sorbate.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  },
  "renewal-oil": {
    id: "renewal-oil",
    name: "Renewal Oil",
    tagline: "Nourish deeply, glow eternally",
    description: "A luxurious blend of precious botanical oils that deeply nourish and restore skin overnight. Wake up to softer, more supple skin."
    price: 72,
    originalPrice: null,
    image: "/images/products/oil.jpg",
    sizes: ["30ml", "50ml"],
    details: "Renewal Oil combines argan, rosehip, and marula oils with Vitamin E for intensive overnight nourishment. This dry oil absorbs quickly, leaving skin soft with no residue. Ideal for mature or dehydrated skin seeking restoration.",
    howToUse: "Apply 4-6 drops to palms and warm between hands. Press gently over face and neck as the final step of your nighttime routine. Can also be mixed with moisturizer for extra hydration.",
    ingredients: "Argania Spinosa Kernel Oil, Rosa Canina Seed Oil, Sclerocarya Birrea Seed Oil, Tocopherol, Rosa Damascena Flower Oil, Lavandula Angustifolia Oil, Helianthus Annuus Seed Oil, Limonene, Linalool.",
    delivery: "Envío estándar gratis en pedidos superiores a $50. Envío express disponible al pagar. Todos los pedidos se envían en 1-2 días hábiles. Devoluciones aceptadas dentro de los 30 días de la compra si el producto está sin usar y sellado."
  }
}

const benefits = [
  { icon: Leaf, label: "100% Natural" },
  { icon: Heart, label: "Cruelty-Free" },
  { icon: Recycle, label: "Eco-Friendly" },
  { icon: Award, label: "Expert Approved" }
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
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${selectedSize}) added to your cart.`,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "details", title: "Details", content: product.details },
    { key: "howToUse", title: "How to Use", content: product.howToUse },
    { key: "ingredients", title: "Ingredients", content: product.ingredients },
    { key: "delivery", title: "Shipping & Returns", content: product.delivery }
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
            Back to Shop
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
                  Boty Essentials
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
                  <span className="text-sm text-muted-foreground">(128 reviews)</span>
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
                <label className="text-sm font-medium text-foreground mb-3 block">Size</label>
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
                <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
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
