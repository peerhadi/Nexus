export default function WorkHeader() {
  return (
    <section className="px-5 pb-14 pt-14 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1450px] items-end justify-between border-b border-black/10 pb-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/30">
            001 — The archive
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-[-0.07em] sm:text-7xl">
            THE WORK.
          </h2>
        </div>

        <span className="hidden text-xs font-bold tracking-[0.15em] text-black/20 sm:block">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
