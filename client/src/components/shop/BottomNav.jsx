import {
  Home,
  Store,
  ReceiptText,
  ChartNoAxesCombined,
  UserRound,
} from "lucide-react";

const BottomNav = () => {
  const items = [
    { label: "Home", icon: Home },
    { label: "Shop", icon: Store, active: true },
    { label: "EMI Dues", icon: ReceiptText },
    { label: "Limit", icon: ChartNoAxesCombined },
    { label: "Profile", icon: UserRound },
  ];

  return (
   <nav className="fixed bottom-4 left-1/2 z-50 flex w-11/12 max-w-125 -translate-x-1/2 items-center justify-around rounded-3xl bg-white px-3 py-2 shadow-lg">
      {items.map(({ label, icon: Icon, active }) => (
        <button
          key={label}
        className={`relative flex min-w-12 flex-col items-center gap-1 text-xs font-medium ${
            active ? "text-violet-600" : "text-gray-400"
          }`}
        >
          {active && (
            <span className="absolute -top-1.5 h-0.5 w-6 rounded-full bg-violet-600" />
          )}

          <Icon size={19} />

          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;