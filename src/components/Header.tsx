import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>
            НАЗВАНИЕ ИГРЫ
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Главная", "О игре", "Цены", "FAQ", "Контакты"].map((item, i) => (
            <a
              key={item}
              href={["#hero", "#about", "#pricing", "#faq", "#contact"][i]}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#pricing">
            <Button className="bg-primary text-primary-foreground rounded-full px-6 font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
              Купить <Icon name="ArrowUpRight" size={16} className="ml-1" />
            </Button>
          </a>
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {["Главная", "О игре", "Цены", "FAQ", "Контакты"].map((item, i) => (
            <a
              key={item}
              href={["#hero", "#about", "#pricing", "#faq", "#contact"][i]}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}