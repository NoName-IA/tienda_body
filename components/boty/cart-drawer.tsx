"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, CreditCard, Loader2 } from "lucide-react"
import Image from "next/image"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "./cart-context"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, itemCount, subtotal } = useCart()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const shipping = 0
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio"
    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Correo electrónico inválido"
    }
    if (!formData.address.trim()) errors.address = "La dirección de envío es obligatoria"
    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "El número de tarjeta es obligatorio"
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Debe ser un número de tarjeta de 16 dígitos"
    }
    if (!formData.cardExpiry.trim()) {
      errors.cardExpiry = "La fecha de vencimiento es obligatoria"
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      errors.cardExpiry = "Usa el formato MM/AA"
    }
    if (!formData.cardCvc.trim()) {
      errors.cardCvc = "El CVC es obligatorio"
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      errors.cardCvc = "Debe ser de 3 o 4 dígitos"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const generatedOrder = "BOTY-" + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(generatedOrder)
      setIsProcessing(false)
      setOrderPlaced(true)
      clearCart()
    }, 1500)
  }

  const resetDrawerState = () => {
    setIsCheckingOut(false)
    setOrderPlaced(false)
    setFormData({
      name: "",
      email: "",
      address: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: ""
    })
    setFormErrors({})
  }

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          // Reset checkout state when drawer closes
          setTimeout(resetDrawerState, 300)
        }
      }} 
      direction="right"
    >
      <DrawerContent className="h-full w-full sm:max-w-[460px] bg-background">
        
        {/* Drawer Header */}
        <DrawerHeader className="border-b border-border/50 p-6 py-4 flex items-center justify-between">
          <div>
            {orderPlaced ? (
              <DrawerTitle className="font-serif text-2xl">Pedido Completado</DrawerTitle>
            ) : isCheckingOut ? (
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsCheckingOut(false)}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                  aria-label="Back to Cart"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <DrawerTitle className="font-serif text-2xl">Pagar</DrawerTitle>
              </div>
            ) : (
              <>
                <DrawerTitle className="font-serif text-2xl">Carrito</DrawerTitle>
                <DrawerDescription>{itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}</DrawerDescription>
              </>
            )}
          </div>
        </DrawerHeader>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Order Success State */}
          {orderPlaced ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2">¡Gracias por tu pedido!</h3>
              <p className="text-primary font-medium text-lg mb-4">#{orderNumber}</p>
              <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
                Hemos recibido tu pago y enviado un correo de confirmación a <span className="font-medium text-foreground">{formData.email}</span>. ¡Tus esenciales de cuidado de piel serán enviados pronto!
              </p>
              <button
                type="button"
                onClick={() => {
                  resetDrawerState()
                  setIsOpen(false)
                }}
                className="w-full max-w-xs bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Seguir Comprando
              </button>
            </div>
          ) 
          
          // Checkout Form State
          : isCheckingOut ? (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <h3 className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-1">Datos de envío</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="text-xs font-semibold text-foreground/80 mb-1 block">Nombre Completo</label>
                  <input
                    type="text"
                    id="checkout-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.name ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                  />
                  {formErrors.name && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-email" className="text-xs font-semibold text-foreground/80 mb-1 block">Correo Electrónico</label>
                  <input
                    type="email"
                    id="checkout-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane.doe@example.com"
                    className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.email ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                  />
                  {formErrors.email && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.email}</p>}
                </div>

                <div>
                  <label htmlFor="checkout-address" className="text-xs font-semibold text-foreground/80 mb-1 block">Dirección de Envío</label>
                  <input
                    type="text"
                    id="checkout-address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Botanica Way, Garden Suite 4B"
                    className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.address ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                  />
                  {formErrors.address && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.address}</p>}
                </div>
              </div>

              <div className="border-t border-border/50 my-6 pt-5">
                <h3 className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" /> Datos de pago
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="checkout-card" className="text-xs font-semibold text-foreground/80 mb-1 block">Número de Tarjeta</label>
                    <input
                      type="text"
                      id="checkout-card"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.cardNumber ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                    />
                    {formErrors.cardNumber && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkout-expiry" className="text-xs font-semibold text-foreground/80 mb-1 block">Fecha de Vencimiento</label>
                      <input
                        type="text"
                        id="checkout-expiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        maxLength={5}
                        className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.cardExpiry ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                      />
                      {formErrors.cardExpiry && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label htmlFor="checkout-cvc" className="text-xs font-semibold text-foreground/80 mb-1 block">CVC</label>
                      <input
                        type="text"
                        id="checkout-cvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full px-4 py-3 bg-muted/20 border ${formErrors.cardCvc ? 'border-destructive' : 'border-border'} rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                      />
                      {formErrors.cardCvc && <p className="text-destructive text-xs mt-1 font-medium">{formErrors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Invisible submit button to handle form enter key */}
              <input type="submit" className="hidden" />
            </form>
          )
          
          // Cart Items List State
          : (
            <div className="h-full">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center min-h-[300px]">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Tu carrito está vacío</p>
                  <DrawerClose asChild>
                    <button
                      type="button"
                      className="mt-4 text-primary hover:underline text-sm font-medium"
                    >
                      Seguir Comprando
                    </button>
                  </DrawerClose>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start py-2">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-muted border border-border/20">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-base text-foreground font-semibold line-clamp-1">{item.name}</h3>
                        <p className="text-muted-foreground text-xs line-clamp-1 mb-2.5">{item.description}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-border/60 rounded-full bg-muted/20">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-muted/80 rounded-l-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 text-foreground/80" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-foreground">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-muted/80 rounded-r-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 text-foreground/80" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-medium text-foreground text-sm">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && !orderPlaced && (
          <DrawerFooter className="border-t border-border/50 p-6 gap-4 bg-muted/5">
            {/* Summary */}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-foreground pt-2.5 border-t border-border/40">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {isCheckingOut ? (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-80"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando Pago...
                  </>
                ) : (
                  <>
                    Realizar Pedido (${total})
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Pagar
              </button>
            )}

            {!isProcessing && (
              <DrawerClose asChild>
                <button
                  type="button"
                  className="w-full border border-border text-foreground/80 py-4 rounded-full font-medium hover:bg-muted transition-colors text-sm"
                >
                  Seguir Comprando
                </button>
              </DrawerClose>
            )}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

