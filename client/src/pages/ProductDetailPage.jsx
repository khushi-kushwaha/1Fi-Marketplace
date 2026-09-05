import {
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products, { calculateEmi } from "../data/products";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.slug === slug);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f7f8] p-4">
        <div className="mx-auto w-full max-w-135">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-violet-600"
          >
            <ChevronLeft size={19} />
          </button>

          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Product not found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              This product is currently unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];
  const selectedVariant = product.variants[selectedVariantIndex];
  const selectedPlan = product.emiPlans[selectedPlanIndex];

  const monthlyEmi = calculateEmi(
    selectedVariant.price,
    selectedPlan.months,
    selectedPlan.interestRate
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="min-h-screen bg-[#f7f7f8] pb-8">
      <div className="mx-auto w-full max-w-135">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:text-violet-600"
          >
            <ChevronLeft size={19} />
          </button>

          <h1 className="text-base font-semibold text-gray-900">
            Product Details
          </h1>
        </div>

        {/* Product Image */}
        <div className="px-4">
          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white p-5 shadow-sm">
            <img
              src={selectedColor.image}
              alt={`${product.name} ${selectedColor.name}`}
              className="max-h-64 w-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <section className="px-4 pt-4">
          <p className="text-xs font-medium text-gray-500">
            {product.brand}
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h2>

          {product.description && (
            <p className="mt-2 text-sm leading-5 text-gray-500">
              {product.description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>

            <span className="text-xs text-gray-400 line-through">
              {formatPrice(selectedVariant.mrp)}
            </span>
          </div>
        </section>

        {/* Color */}
        <section className="mt-5 px-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Color
            </h3>

            <span className="text-xs text-gray-500">
              {selectedColor.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.colors.map((color, index) => {
              const isSelected = selectedColorIndex === index;

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(index)}
                  className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-xs font-medium transition ${
                    isSelected
                      ? "border-violet-500 text-violet-700"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />

                  {color.name}

                  {isSelected && (
                    <Check size={14} className="text-violet-600" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Variant */}
        <section className="mt-5 px-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            {product.category === "Laptop"
              ? "Memory & Storage"
              : "Storage"}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {product.variants.map((variant, index) => {
              const isSelected = selectedVariantIndex === index;

              return (
                <button
                  key={variant.label}
                  type="button"
                  onClick={() => {
                    setSelectedVariantIndex(index);
                    setSelectedPlanIndex(0);
                  }}
                  className={`rounded-2xl border bg-white px-3 py-3 text-left transition ${
                    isSelected
                      ? "border-violet-500 ring-1 ring-violet-100"
                      : "border-gray-200"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold ${
                      isSelected
                        ? "text-violet-700"
                        : "text-gray-900"
                    }`}
                  >
                    {variant.label}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {formatPrice(variant.price)}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* EMI Plans */}
        <section className="mt-5 px-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Choose EMI Plan
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Select a tenure that works for you.
            </p>
          </div>

          <div className="space-y-2">
            {product.emiPlans.map((plan, index) => {
              const emi = calculateEmi(
                selectedVariant.price,
                plan.months,
                plan.interestRate
              );

              const isSelected = selectedPlanIndex === index;

              return (
                <button
                  key={plan.months}
                  type="button"
                  onClick={() => setSelectedPlanIndex(index)}
                  className={`flex w-full items-center justify-between rounded-2xl border bg-white p-3 text-left transition ${
                    isSelected
                      ? "border-violet-500 ring-1 ring-violet-100"
                      : "border-gray-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {plan.months} months
                      </p>

                      {plan.interestRate === 0 && (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                          No-cost EMI
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {plan.interestRate}% interest
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(emi)}
                    </p>

                    <p className="text-xs text-gray-500">
                      /month
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Summary */}
        <section className="mt-5 px-4">
          <div className="rounded-2xl bg-violet-50 p-4">
            <p className="text-sm font-semibold text-violet-900">
              Your selection
            </p>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">Variant</span>

                <span className="font-medium text-gray-900">
                  {selectedVariant.label}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">Color</span>

                <span className="font-medium text-gray-900">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-500">Tenure</span>

                <span className="font-medium text-gray-900">
                  {selectedPlan.months} months
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-violet-100 pt-2">
                <span className="font-medium text-gray-700">
                  Monthly EMI
                </span>

                <span className="text-base font-semibold text-violet-700">
                  {formatPrice(monthlyEmi)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Proceed */}
        <div className="mt-5 px-4">
          <button
            type="button"
            onClick={() => setShowConfirmation(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Proceed with {selectedPlan.months}-month EMI

            <ChevronRight size={18} />
          </button>

          <p className="mt-2 text-center text-xs leading-5 text-gray-400">
            Final eligibility and payment details will be confirmed before checkout.
          </p>
        </div>
      </div>

      {/* EMI Confirmation Bottom Sheet */}
    
      {showConfirmation && (
      <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 animate-[fadeIn_200ms_ease-out]"
      onClick={() => setShowConfirmation(false)}
      >
      <div
      className="w-full max-w-135 rounded-t-3xl bg-white px-4 pb-6 pt-3 animate-[slideUp_300ms_ease-out]"
      onClick={(e) => e.stopPropagation()}
       >
      {/* Handle */}
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-200" />

      {/* Sheet Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
         <h3 className="text-xl font-semibold text-gray-900">
           You're all set!
         </h3>

          <p className="mt-1 text-sm text-gray-500">
            Review your EMI details before continuing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowConfirmation(false)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
          aria-label="Close confirmation"
        >
          <X size={17} />
        </button>
      </div>

      {/* Product */}
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white p-2">
          <img
            src={selectedColor.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-400">
            {product.brand}
          </p>

          <h4 className="mt-0.5 truncate text-sm font-semibold text-gray-900">
            {product.name}
          </h4>

          <p className="mt-1 text-xs text-gray-500">
            {selectedColor.name} · {selectedVariant.label}
          </p>
        </div>

        <p className="text-sm font-semibold text-gray-900">
          {formatPrice(selectedVariant.price)}
        </p>
      </div>

      {/* EMI Details */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Product price
          </span>

          <span className="font-medium text-gray-900">
            {formatPrice(selectedVariant.price)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            EMI tenure
          </span>

          <span className="font-medium text-gray-900">
            {selectedPlan.months} months
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Interest
          </span>

          <span
            className={
              selectedPlan.interestRate === 0
                ? "font-medium text-emerald-600"
                : "font-medium text-gray-900"
            }
          >
            {selectedPlan.interestRate === 0
              ? "No-cost EMI"
              : `${selectedPlan.interestRate}%`}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Monthly EMI
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                for {selectedPlan.months} months
              </p>
            </div>

            <p className="text-lg font-semibold text-violet-700">
              {formatPrice(monthlyEmi)}
              <span className="ml-1 text-xs font-medium text-gray-400">
                /mo
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Final Button */}
      <button
        type="button"
         onClick={() => setShowConfirmation(false)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-800"
      >
        Confirm & Continue
      </button>

      <p className="mt-2 text-center text-xs text-gray-400">
       This is a demo. No payment or loan will be processed.
      </p>
    </div>
   </div>
    )}
    </main>
  );
};

export default ProductDetailPage;