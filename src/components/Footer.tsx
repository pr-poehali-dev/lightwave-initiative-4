import Icon from "@/components/ui/icon"

const GAME_NAME = "НАЗВАНИЕ ИГРЫ"

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t border-border mt-0">
      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* CTA повтор */}
        <div id="contact" className="bg-accent/5 border border-accent/20 rounded-4xl p-8 md:p-12 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            Готов освоить бизнес?
          </h2>
          <p className="text-muted-foreground font-mono text-sm mb-6">
            Присоединяйся к 10 000+ предпринимателей, которые уже играют
          </p>
          <a href="#pricing">
            <button className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold font-mono text-base hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 inline-flex items-center gap-2">
              Купить {GAME_NAME}
              <Icon name="ArrowRight" size={18} />
            </button>
          </a>
        </div>

        {/* Нижний футер */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-border">
          <div>
            <div className="text-accent font-bold text-xl mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
              {GAME_NAME}
            </div>
            <p className="text-muted-foreground font-mono text-sm max-w-xs">
              Оффлайн бизнес-симуляция для предпринимателей и менеджеров
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-foreground font-mono text-sm font-bold mb-3">Навигация</h4>
              <ul className="space-y-2">
                {[["О игре", "#about"], ["Цены", "#pricing"], ["FAQ", "#faq"], ["Контакты", "#contact"]].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-muted-foreground font-mono text-sm hover:text-accent transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-mono text-sm font-bold mb-3">Контакты</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                  <Icon name="Mail" size={13} className="text-accent" />
                  hello@example.com
                </li>
                <li className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                  <Icon name="Phone" size={13} className="text-accent" />
                  +7 (000) 000-00-00
                </li>
                <li className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                  <Icon name="MapPin" size={13} className="text-accent" />
                  Россия, доставка везде
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground font-mono text-xs">
              <Icon name="Lock" size={11} className="text-accent" />
              HTTPS защита
            </div>
            <div className="flex items-center gap-1 text-muted-foreground font-mono text-xs">
              <Icon name="Shield" size={11} className="text-accent" />
              Возврат 14 дней
            </div>
            <div className="flex items-center gap-1 text-muted-foreground font-mono text-xs">
              <Icon name="CreditCard" size={11} className="text-accent" />
              Тбанк
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-muted-foreground text-xs font-mono">2026 {GAME_NAME}</p>
            <a href="#" className="text-muted-foreground text-xs font-mono hover:text-accent transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-muted-foreground text-xs font-mono hover:text-accent transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
