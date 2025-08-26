import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from './hooks/useCart.js'

const formatPrice = (price) => {
  if (typeof price === 'number') return price.toFixed(2)
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.-]/g, ''))
    return isNaN(num) ? '0.00' : num.toFixed(2)
  }
  return '0.00'
}

const parsePrice = (price) => {
  if (typeof price === 'number') return price
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.-]/g, ''))
    return isNaN(num) ? 0 : num
  }
  return 0
}

const Cartpage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()

  const totals = useMemo(() => {
    const subtotal = getCartTotal()
    const qualifiesForFreeShipping = subtotal >= 50
    const shipping = qualifiesForFreeShipping || items.length === 0 ? 0 : 4.99
    const tax = 0 // Add tax rules if needed
    const total = subtotal + shipping + tax
    return { subtotal, shipping, tax, total, qualifiesForFreeShipping }
  }, [getCartTotal, items.length])

  if (!items || items.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Browse our products and add your favorites to the cart.</p>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const unitPrice = parsePrice(item.variant?.price ?? item.price)
              const lineTotal = unitPrice * item.quantity
              const imageSrc = item.image || item.images?.[0]
              return (
                <div
                  key={`${item.id}-${item.variant?.id || 'default'}-${index}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex gap-4"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border">
                    {imageSrc ? (
                      <img src={imageSrc} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                        {item.variant?.name && (
                          <p className="text-sm text-gray-600 mt-0.5">Option: {item.variant.name}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center w-28 h-10 border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                          className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 h-full flex items-center justify-center font-medium">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right sm:text-left sm:ml-auto">
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-base font-medium text-gray-900">${formatPrice(unitPrice)}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-base font-semibold text-gray-900">${formatPrice(lineTotal)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="flex items-center justify-between">
              <Link to="/" className="text-primary hover:underline">Continue shopping</Link>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {totals.shipping === 0 ? 'Free' : `$${formatPrice(totals.shipping)}`}
                  </span>
                </div>
                {/* Tax placeholder */}
                {totals.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated tax</span>
                    <span className="font-medium">${formatPrice(totals.tax)}</span>
                  </div>
                )}
                <div className="pt-2 border-t flex justify-between text-base">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-gray-900 font-semibold">${formatPrice(totals.total)}</span>
                </div>
              </div>

              {!totals.qualifiesForFreeShipping && (
                <p className="text-xs text-gray-600">Spend ${formatPrice(50 - totals.subtotal)} more to get free shipping.</p>
              )}

              <button className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg transition-colors font-medium">
                Checkout
              </button>
              <p className="text-xs text-gray-500 text-center">Taxes and discounts calculated at checkout.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Cartpage