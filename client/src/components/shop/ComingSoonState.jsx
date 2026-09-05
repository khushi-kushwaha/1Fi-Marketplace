import { LoaderCircle } from "lucide-react";

const ComingSoonState = ({ title, description }) => {
  return (
    <div className="flex min-h-65 flex-col items-center justify-center rounded-3xl bg-white px-6 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
        <LoaderCircle className="animate-spin text-violet-600" size={26} />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default ComingSoonState;