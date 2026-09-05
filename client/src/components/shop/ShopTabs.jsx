const ShopTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "brands", label: "Top Brands" },
    { id: "stores", label: "Nearby Stores" },
    { id: "marketplace", label: "Marketplace" },
  ];

  return (
    <div className="mx-auto -mt-5 flex w-full rounded-3xl bg-[#f1ecff] p-1.5 shadow-sm ">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 rounded-2xl px-3 py-2 text-sm font-semibold transition ${
            activeTab === tab.id
              ? "bg-white text-violet-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ShopTabs;