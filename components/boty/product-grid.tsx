"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"
import { useToast } from "@/hooks/use-toast"

type Category = "cream" | "oil" | "serum"

const products = [
  // Serums
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    description: "Illuminating formula with Vitamin C",
    price: 68,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: "Bestseller",
    category: "serum" as Category
  },
  {
    id: "hydrating-serum",
    name: "Hydrating Serum",
    description: "Hydration boost with hyaluronic acid",
    price: 62,
    originalPrice: null,
    image: "/images/products/eye-serum-bottles.png",
    badge: null,
    category: "serum" as Category
  },
  {
    id: "age-defense-serum",
    name: "Age Defense Serum",
    description: "Retinol and peptide complex",
    price: 78,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "New",
    category: "serum" as Category
  },
  {
    id: "glow-serum",
    name: "Luminous Glow Serum",
    description: "Illuminating boost with niacinamide",
    price: 58,
    originalPrice: 68,
    image: "/images/products/spray-bottles.png",
    badge: "Sale",
    category: "serum" as Category
  },
  // Creams
  {
    id: "hydra-cream",
    name: "Hydra Cream",
    description: "Deep hydration with hyaluronic acid",
    price: 54,
    originalPrice: null,
    image: "/images/products/cream-jars-colored.png",
    badge: null,
    category: "cream" as Category
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    description: "Calming botanical wash",
    price: 38,
    originalPrice: 48,
    image: "/images/products/tube-bottles.png",
    badge: "Sale",
    category: "cream" as Category
  },
  {
    id: "night-cream",
    name: "Night Cream",
    description: "Restorative night treatment",
    price: 64,
    originalPrice: null,
    image: "/images/products/jars-wooden-lid.png",
    badge: "Bestseller",
    category: "cream" as Category
  },
  {
    id: "day-cream-spf",
    name: "Day Cream SPF 30",
    description: "Protection and hydration",
    price: 58,
    originalPrice: null,
    image: "/images/products/pump-bottles-lavender.png",
    badge: null,
    category: "cream" as Category
  },
  // Oils
  {
    id: "renewal-oil",
    name: "Renewal Oil",
    description: "Nourishing facial oil blend",
    price: 72,
    originalPrice: null,
    image: "/images/products/amber-dropper-bottles.png",
    badge: "New",
    category: "oil" as Category
  },
  {
    id: "rosehip-oil",
    name: "Rosehip Oil",
    description: "Pure organic rosehip extract",
    price: 48,
    originalPrice: null,
    image: "/images/products/serum-bottles-1.png",
    badge: null,
    category: "oil" as Category
  },
  {
    id: "jojoba-oil",
    name: "Jojoba Oil",
    description: "Balancing and lightweight",
    price: 42,
    originalPrice: null,
    image: "/images/products/spray-bottles.png",
    badge: null,
    category: "oil" as Category
  },
  {
    id: "argan-oil",
    name: "Argan Oil",
    description: "Moroccan beauty elixir",
    price: 56,
    originalPrice: null,
    image: "/images/products/pump-bottles-cream.png",
    badge: "Bestseller",
    category: "oil" as Category
  }
]

const categories = [
  { value: "cream" as Category, label: "Creams" },
  { value: "oil" as Category, label: "Oils" },
  { value: "serum" as Category, label: "Serums" }
]

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("cream")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const { toast } = useToast()
  
  const filteredProducts = products.filter(product => product.category === selectedCategory)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  // Preload all product images on mount
  useEffect(() => {
    products.forEach((product) => {
      const img = new window.Image()
      img.src = product.image
    })
  }, [])

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      gridObserver.observe(gridRef.current)
    }

    if (headerRef.current) {
      headerObserver.observe(headerRef.current)
    }

    return () => {
      if (gridRef.current) {
        gridObserver.unobserve(gridRef.current)
      }
      if (headerRef.current) {
        headerObserver.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
            Nuestra Colección
          </span>
          <h2 className={`font-serif leading-tight text-foreground mb-4 text-balance text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Esenciales suaves
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            Productos elaborados con cuidado para tu ritual diario de cuidado de piel
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-background rounded-full p-1 gap-1 relative">
            {/* Animated background slide */}
            <div
              className="absolute top-1 bottom-1 bg-foreground rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{
                left: selectedCategory === 'cream' ? '4px' : selectedCategory === 'oil' ? 'calc(33.333% + 2px)' : 'calc(66.666%)',
                width: 'calc(33.333% - 4px)'
              }}
            />
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <Link
              key={`${selectedCategory}-${product.id}`}
              href={`/product/${product.id}`}
              className={`group transition-all duration-500 ease-out ${
                isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              <div className="bg-background rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Image */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover boty-transition group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide bg-white text-black ${
                        product.badge === "Oferta"
                          ? "bg-destructive/10 text-destructive"
                          : product.badge === "Nuevo"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {/* Quick add button */}
                  <button
                    type="button"
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      addItem({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image
                      })
                      toast({
                        title: "Producto Agregado",
                        description: `${product.name} ha sido agregado a tu carrito.`,
                      })
                    }}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-foreground" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-foreground mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground/5"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}
