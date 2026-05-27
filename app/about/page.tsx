"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sections = [
    {
      id: 1,
      title: "Our Beginning",
      subtitle: "Founded with Purpose",
      description: "Boty was born from a simple belief: that skincare should be natural, effective, and accessible to everyone. In 2020, our founder realized the skincare industry was overcomplicated and filled with unnecessary chemicals. We decided to change that.",
      image: "/images/products/serum-bottles-1.png",
      imagePosition: "left" as const,
    },
    {
      id: 2,
      title: "Our Mission",
      subtitle: "Pure Ingredients, Pure Results",
      description: "We source only the finest natural ingredients from sustainable farms around the world. Each product is carefully formulated by our team of botanists and chemists to deliver real results without compromise. Our mission is to bring the healing power of nature to your daily routine.",
      image: "/images/products/cream-jars-colored.png",
      imagePosition: "right" as const,
    },
    {
      id: 3,
      title: "Our Values",
      subtitle: "Sustainability & Transparency",
      description: "Every decision we make is guided by our core values: sustainability, transparency, and quality. We believe in being honest about our ingredients, our practices, and our impact. Our packaging is 100% recyclable, and we partner with carbon-neutral shipping providers to reduce our environmental footprint.",
      image: "/images/products/pump-bottles-lavender.png",
      imagePosition: "left" as const,
    },
    {
      id: 4,
      title: "Our Community",
      subtitle: "Growing Together",
      description: "What makes Boty truly special is our community. We're not just a skincare brand—we're a movement of people who believe in the power of natural beauty. Join thousands of Boty lovers who are transforming their skin and their relationship with skincare.",
      image: "/images/products/tube-bottles.png",
      imagePosition: "right" as const,
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={pageRef}>
          {/* Hero Section */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance">
              Skincare Reimagined
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              At Boty, we believe beauty comes from within—and from nature. Discover the story behind our mission to revolutionize skincare with pure, effective, and sustainable products.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-24">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`transition-all duration-1000 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Text Content */}
                  <div
                    className={`${
                      section.imagePosition === "right" ? "lg:order-first" : ""
                    }`}
                  >
                    <span className="text-sm tracking-[0.2em] uppercase text-primary/70 mb-2 block">
                      {section.subtitle}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                      {section.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {section.description}
                    </p>
                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
                  </div>

                  {/* Image */}
                  <div
                    className={`relative aspect-square rounded-3xl overflow-hidden bg-card boty-shadow ${
                      section.imagePosition === "right" ? "lg:order-last" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none z-10" />
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div
            className={`mt-28 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${(sections.length + 1) * 150}ms` }}
          >
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "100%", label: "Natural Ingredients" },
              { number: "12+", label: "Years of Research" },
              { number: "30", label: "Certified Organic" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl bg-card boty-shadow boty-transition hover:scale-105"
              >
                <p className="font-serif text-4xl md:text-5xl text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div
            className={`mt-28 text-center transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: `${(sections.length + 2) * 150}ms` }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our community and discover the power of natural skincare. Start your journey to beautiful, healthy skin today.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-wide boty-transition hover:bg-primary/90 boty-shadow"
            >
              Shop Our Collection
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
