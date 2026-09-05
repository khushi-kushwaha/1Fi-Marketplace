import {
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products, { calculateEmi } from "../../data/products";

const MarketplaceSection = ({ search }) => {
  const [category, setCategory] = useState("All");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

 const navigate = useNavigate();   

 const getStartingEmi = (product) => {
  const defaultVariant = product.variants[0];

  const longestPlan = product.emiPlans.reduce((longest, plan) =>
    plan.months > longest.months ? plan : longest
  );

  return calculateEmi(
    defaultVariant.price,
    longestPlan.months,
    longestPlan.interestRate
  );
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.brand}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section>
      {/* Heading */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Popular Picks
        </h2>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-violet-400"
          >
            <option value="All">All</option>
            <option value="Phone">Phones</option>
            <option value="Laptop">Laptops</option>
          </select>

          <SlidersHorizontal
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-white px-5 py-10 text-center shadow-sm">
          <p className="font-medium text-gray-800">
            No products found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Try another product or category.
          </p>
        </div>
      ) : (
        /* Product List */
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const defaultVariant = product.variants[0];
            const defaultImage = product.colors[0].image;
            const startingEmi = getStartingEmi(product);

            return (
              <button
                key={product.id}
                type="button"
                 onClick={() =>{
                 window.scrollTo(0, 0);
                 navigate(`/shop/marketplace/${product.slug}`)
                 } 
                }
                className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition hover:border-violet-100 hover:shadow-md"
              >
                {/* Product Image */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={defaultImage}
                    alt={product.name}
                    className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-400">
                    {product.brand}
                  </p>

                  <h3 className="mt-1 truncate text-base font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                      {formatPrice(defaultVariant.price)}
                    </span>

                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(defaultVariant.mrp)}
                    </span>
                  </div>

                  {/* EMI */}
                  <p className="mt-1 text-xs font-medium text-emerald-600 sm:text-sm">
                    EMI from {formatPrice(startingEmi)}/mo
                  </p>

                
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={20}
                  className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-violet-500"
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MarketplaceSection;