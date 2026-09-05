const PromoBanner = () => {
  return (
    <section className="overflow-hidden bg-linear-to-br from-violet-950 via-violet-800 to-purple-600 text-white">
      <div className="relative px-6 py-8 sm:px-8">
       

        {/* Content */}
        <div className="mt-5">
          <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Shop today,
            <span className="block font-normal italic">
              Pay later using
            </span>
            <span className="block">
              Mutual funds.
            </span>
          </h1>

        
        </div>

      </div>
    </section>
  );
};

export default PromoBanner;