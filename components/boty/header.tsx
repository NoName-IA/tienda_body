"use client"

import { useState } from "react"
import { useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User, Globe } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"
import { useLanguage } from "./language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsOpen, itemCount } = useCart()
  const { language, setLanguage, t } = useLanguage()
  const [animateBadge, setAnimateBadge] = useState(false)

  useEffect(() => {
    if (itemCount > 0) {
      setAnimateBadge(true)
      const timer = setTimeout(() => setAnimateBadge(false), 300)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }


  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-lg py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.4)] border border-[rgba(255,255,255,0.32)]" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px' }}>
        <div className="flex items-center justify-between h-[68px]">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground/80 hover:text-foreground boty-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Navigation - Left */}
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

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-foreground/70 hover:text-foreground boty-transition"
              aria-label={t("header.search")}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Selector */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2 text-foreground/70 hover:text-foreground boty-transition flex items-center gap-1"
              aria-label="Change language"
              title={language === "en" ? "Cambiar a Español" : "Switch to English"}
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
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
                <span className={`absolute -top-0 -right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full transition-transform duration-300 ${animateBadge ? 'scale-125' : 'scale-100'}`}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Mobile Navigation */}
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
