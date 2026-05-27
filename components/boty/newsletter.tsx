"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl leading-tight text-primary-foreground mb-4 text-balance md:text-7xl">
            Únete al ritual
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Suscríbete para ofertas exclusivas, consejos de cuidado de piel y acceso anticipado a nuevos productos.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-8 py-4">
              <Check className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground">¡Bienvenido/a a la familia Boty!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="flex-1 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-6 py-4 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition"
                required
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary-foreground/90"
              >
                Suscribirse
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </button>
            </form>
          )}

          <p className="text-sm text-primary-foreground/60 mt-6">
            Cancela en cualquier momento. Respetamos tu bandeja de entrada.
          </p>
        </div>
      </div>
    </section>
  )
}
