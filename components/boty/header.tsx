"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User, Globe } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

const t = (key: string) => {
  const map: Record<string, string> = {
    "header.shop": "Shop",
    "header.about": "About",
    "header.ingredients": "Ingredients",
    "header.search": "Search",
    "header.login": "Login",
    "header.cart": "Cart",
    "header.account": "Account",
  }
  return map[key] ?? key
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsOpen, itemCount } = useCart()
  const [animateBadge, setAnimateBadge] = useState(false)

  useEffect(() => {
    if (itemCount > 0) {
      setAnimateBadge(true)
      const timer = setTimeout(() => setAnimateBadge(false), 300)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-lg py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.32)]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}
      >
        <div className="flex items-center justify-between h-[68px]">
          {/* Botón de menú móvil */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Navegación desktop (izquierda) */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.shop")}
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.about")}
            </Link>
            <Link
              href="/"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.ingredients")}
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-wider text-foreground">Boty</h1>
          </Link>

          {/* Acciones (derecha) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label={t("header.search")}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/login"
              className="hidden sm:block p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label={t("header.login")}
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label={t("header.cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span
                  className={`absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full transition-transform duration-300 ${
                    animateBadge ? "scale-125" : "scale-100"
                  }`}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Navegación mobile */}
        <div
          className={`lg:hidden overflow-hidden boty-transition ${
            isMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.shop")}
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.about")}
            </Link>
            <Link
              href="/"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.ingredients")}
            </Link>
            <Link
              href="/login"
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground boty-transition"
            >
              {t("header.account")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

