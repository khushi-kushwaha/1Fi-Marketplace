import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PromoBanner from "../components/shop/PromoBanner";
import ShopTabs from "../components/shop/ShopTabs";
import SearchBar from "../components/shop/SearchBar";
import ComingSoonState from "../components/shop/ComingSoonState";
import MarketplaceSection from "../components/shop/MarketplaceSection";
import BottomNav from "../components/shop/BottomNav";

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const getActiveTab = () => {
    if (location.pathname.includes("/brands")) {
      return "brands";
    }

    if (location.pathname.includes("/stores")) {
      return "stores";
    }

    return "marketplace";
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab) => {
    setSearch("");

    if (tab === "brands") {
      navigate("/shop/brands");
    } else if (tab === "stores") {
      navigate("/shop/stores");
    } else {
      navigate("/shop/marketplace");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8] pb-28">
      <div className="mx-auto w-full max-w-135 bg-[#f7f7f8]">
        <PromoBanner />

        <div className="px-4">
          <ShopTabs
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />

          <div className="mt-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              activeTab={activeTab}
            />
          </div>

          <div className="mt-6">
            {activeTab === "brands" && (
              <>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Top Brands
                </h2>

                <ComingSoonState
                  title="Top Brands are loading"
                  description="We're preparing curated brand offers for you. They'll be available here soon."
                />
              </>
            )}

            {activeTab === "stores" && (
              <>
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Nearby Stores
                </h2>

                <ComingSoonState
                  title="Nearby Stores are loading"
                  description="We're finding stores and offers around your location. They'll be available soon."
                />
              </>
            )}

            {activeTab === "marketplace" && (
              <MarketplaceSection search={search} />
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
};

export default ShopPage;