export default function HeroTextOverlay() {
  return (
    <div className="absolute top-20 md:top-28 left-8 z-10 max-w-lg">
      <div className="inline-block bg-accent/20 border border-accent/40 rounded-full px-3 py-1 mb-4">
        <span className="text-accent font-mono text-xs tracking-widest">БИЗНЕС-ИГРА №1</span>
      </div>
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight"
        style={{
          fontFamily: "var(--font-montserrat)",
          color: "rgb(0, 0, 0)",
          WebkitTextStroke: "3px white",
          paintOrder: "stroke fill",
        }}
      >
        НАЗВАНИЕ<br />ИГРЫ
      </h1>
      <p className="text-foreground/80 font-mono text-sm md:text-base max-w-xs tracking-wide">
        Освой бизнес за 30 дней
        <br />
        в реальной симуляции
      </p>
      <a href="#pricing" className="inline-block mt-6">
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold font-mono text-sm hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-all duration-300">
          Купить за ЦЕНА руб →
        </button>
      </a>
    </div>
  )
}