export default function RotatingTextAccent() {
  const text = "-- Купить сейчас! Бизнес-игра --- "

  return (
    <div className="absolute bottom-20 right-8 w-24 h-24 md:w-32 md:h-32 cursor-pointer" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold font-mono">GO</span>
          </div>
        </div>

        <div className="absolute inset-0 animate-spin-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path id="circle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <text className="text-xs fill-white font-medium">
              <textPath href="#circle" startOffset="0%">
                {text.repeat(2)}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}