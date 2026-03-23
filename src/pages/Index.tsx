import { useState } from "react"
import SplineScene from "@/components/SplineScene"
import Header from "@/components/Header"
import RotatingTextAccent from "@/components/RotatingTextAccent"
import Footer from "@/components/Footer"
import HeroTextOverlay from "@/components/HeroTextOverlay"
import Icon from "@/components/ui/icon"

const GAME_NAME = "НАЗВАНИЕ ИГРЫ"
const PRICE = "ЦЕНА"
const PRICE_PRO = String(Math.round(Number(PRICE.replace(/\D/g, '')) * 1.5) || "ЦЕНА")
const PRICE_PREMIUM = String(Math.round(Number(PRICE.replace(/\D/g, '')) * 2.5) || "ЦЕНА")
const DEADLINE = "1 апреля 2026"

const features = [
  { icon: "Briefcase", title: "Реализм", desc: "Управляй настоящей компанией: найм, продажи, инвестиции" },
  { icon: "Users", title: "Мультиплеер", desc: "До 6 игроков в одной партии — конкурируй вживую" },
  { icon: "Award", title: "Сертификат", desc: "Получи документ о прохождении бизнес-симуляции" },
  { icon: "Headphones", title: "Поддержка", desc: "Куратор онлайн 7 дней в неделю для новичков" },
  { icon: "TrendingUp", title: "Рост навыков", desc: "85% игроков улучшают бизнес-мышление за 1 месяц" },
  { icon: "Shield", title: "Гарантия", desc: "Возврат 100% в течение 14 дней без вопросов" },
]

const reviews = [
  {
    name: "Алексей М.",
    role: "Предприниматель, 34 года",
    text: "За 3 вечера понял, где терял деньги в реальном бизнесе. Это лучшее, что я потратил в этом году!",
    avatar: "A",
  },
  {
    name: "Светлана К.",
    role: "Топ-менеджер, 41 год",
    text: "Играли командой 6 человек. Азарт как в Монополии, но с реальными бизнес-инсайтами. Рекомендую!",
    avatar: "С",
  },
  {
    name: "Дмитрий Р.",
    role: "Стартапер, 28 лет",
    text: "Наконец-то практика вместо скучной теории. Применил стратегии из игры — вырос оборот на 30%.",
    avatar: "Д",
  },
]

const faqs = [
  { q: "Как оплатить?", a: "Принимаем карты Visa/Mastercard/МИР через Тбанк. Оплата безопасна, данные защищены SSL." },
  { q: "Можно вернуть деньги?", a: "Да, гарантия возврата 14 дней. Напишите на почту — вернём без лишних вопросов." },
  { q: "Сколько времени занимает игра?", a: "Одна партия — 2-4 часа. Можно играть вечером с командой или друзьями." },
  { q: "Сколько человек нужно для игры?", a: "От 2 до 6 игроков. Подходит для корпоратива, команды или друзей." },
  { q: "Это физическая игра или онлайн?", a: "Это оффлайн-игра в красивой коробке. Доставим по всей России за 3-7 дней." },
]

const plans = [
  {
    name: "Basic",
    price: PRICE,
    desc: "Для знакомства с игрой",
    features: ["1 экземпляр игры", "Правила на русском", "Email-поддержка", "Доставка по России"],
    popular: false,
  },
  {
    name: "Pro",
    price: PRICE_PRO,
    desc: "Для команды и корпоративов",
    features: ["2 экземпляра игры", "Видео-инструкция", "Приоритетная поддержка", "Сертификат участника", "Доставка по России"],
    popular: true,
  },
  {
    name: "Premium",
    price: PRICE_PREMIUM,
    desc: "Максимум для бизнеса",
    features: ["3 экземпляра игры", "Личная консультация", "VIP-поддержка 24/7", "Фирменный сертификат", "Бесплатная доставка", "Корпоративный тренинг"],
    popular: false,
  },
]

function CountdownTimer() {
  const now = new Date()
  const target = new Date("2026-04-01T23:59:59")
  const diff = Math.max(0, target.getTime() - now.getTime())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="flex items-center gap-4 font-mono">
      {[{ val: days, label: "дней" }, { val: hours, label: "часов" }, { val: minutes, label: "минут" }].map(({ val, label }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-bold text-accent">{String(val).padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

function PaymentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "", email: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Введите имя"
    if (form.card.replace(/\s/g, "").length < 16) e.card = "Введите 16 цифр карты"
    if (form.expiry.length < 5) e.expiry = "Введите срок (ММ/ГГ)"
    if (form.cvv.length < 3) e.cvv = "3 цифры"
    if (!form.email.includes("@")) e.email = "Введите email"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) alert("Оплата будет настроена через Тбанк. Свяжитесь с нами для активации платёжной системы.")
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-foreground font-bold text-xl" style={{ fontFamily: "var(--font-montserrat)" }}>Оплата заказа</h3>
            <p className="text-muted-foreground text-sm font-mono mt-1">{GAME_NAME} — {PRICE} руб</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-5 p-3 bg-accent/10 border border-accent/30 rounded-xl">
          <Icon name="Lock" size={14} className="text-accent" />
          <span className="text-accent text-xs font-mono">Защищённое соединение SSL · Тбанк</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1 block">Имя владельца карты</label>
            <input
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="IVAN IVANOV"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value.toUpperCase() })}
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1 block">Номер карты</label>
            <div className="relative">
              <input
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors pr-12"
                placeholder="0000 0000 0000 0000"
                value={form.card}
                onChange={e => setForm({ ...form, card: formatCard(e.target.value) })}
              />
              <Icon name="CreditCard" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.card && <p className="text-destructive text-xs mt-1">{errors.card}</p>}
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Срок</label>
              <input
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="ММ/ГГ"
                value={form.expiry}
                onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
              />
              {errors.expiry && <p className="text-destructive text-xs mt-1">{errors.expiry}</p>}
            </div>
            <div className="w-28">
              <label className="text-xs font-mono text-muted-foreground mb-1 block">CVV</label>
              <input
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="•••"
                type="password"
                maxLength={3}
                value={form.cvv}
                onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
              />
              {errors.cvv && <p className="text-destructive text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1 block">Email для чека</label>
            <input
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold font-mono text-base hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
          >
            Оплатить {PRICE} руб
          </button>
        </form>

        <p className="text-muted-foreground text-xs font-mono text-center mt-4">
          Нажимая «Оплатить», вы соглашаетесь с условиями оферты
        </p>
      </div>
    </div>
  )
}

const Index = () => {
  const [showPayment, setShowPayment] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="w-full min-h-screen bg-background">
      <Header />

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}

      {/* Hero */}
      <section id="hero" className="max-w-[1200px] mx-auto">
        <main className="w-full relative h-[600px]">
          <SplineScene />
          <HeroTextOverlay />
          <RotatingTextAccent />
        </main>
      </section>

      {/* Urgency bar */}
      <div className="bg-accent/10 border-y border-accent/30 py-3 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-foreground font-mono text-sm">
              <span className="text-accent font-bold">Акция до {DEADLINE}</span> — скидка 50%
            </span>
          </div>
          <CountdownTimer />
          <button
            onClick={() => setShowPayment(true)}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold font-mono text-sm hover:scale-105 transition-all duration-300"
          >
            Купить за {PRICE} руб
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 space-y-24 pb-24">

        {/* About / Problem-Solution */}
        <section id="about" className="pt-16">
          <div className="text-center mb-12">
            <span className="text-accent font-mono text-sm tracking-widest">О ИГРЕ</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Устал от теории?
            </h2>
            <p className="text-muted-foreground font-mono mt-4 max-w-2xl mx-auto text-sm md:text-base">
              В <span className="text-accent">{GAME_NAME}</span> ты управляешь настоящей компанией: нанимаешь сотрудников, заключаешь сделки, инвестируешь и выводишь бизнес на вершину. Никакой скучной теории — только живой опыт.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={f.icon} size={20} className="text-accent" />
                </div>
                <h3 className="text-foreground font-bold mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>{f.title}</h3>
                <p className="text-muted-foreground font-mono text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-card border border-border rounded-4xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { val: "10 000+", label: "Игроков по всей России" },
              { val: "85%", label: "Улучшили бизнес-навыки" },
              { val: "4.9 / 5", label: "Средняя оценка игры" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>{val}</div>
                <div className="text-muted-foreground font-mono text-sm">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="text-center mb-10">
            <span className="text-accent font-mono text-sm tracking-widest">ОТЗЫВЫ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Что говорят игроки
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground font-mono text-sm leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-sm">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-foreground text-sm font-bold">{r.name}</div>
                    <div className="text-muted-foreground text-xs font-mono">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing">
          <div className="text-center mb-10">
            <span className="text-accent font-mono text-sm tracking-widest">ТАРИФЫ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Выберите свой набор
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card border rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? "border-accent shadow-[0_0_30px_hsl(var(--accent)/0.2)]" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-primary-foreground text-xs font-bold px-4 py-1 rounded-full font-mono">
                      ПОПУЛЯРНЫЙ
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-foreground font-bold text-xl mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>{plan.name}</h3>
                  <p className="text-muted-foreground font-mono text-sm">{plan.desc}</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-montserrat)" }}>{plan.price} руб</span>
                  <div className="text-muted-foreground font-mono text-xs line-through">{String(Math.round(Number(plan.price.replace(/\D/g,''))*2))} руб</div>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm font-mono text-foreground">
                      <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowPayment(true)}
                  className={`w-full py-3 rounded-xl font-bold font-mono text-sm transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                      : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-primary-foreground"
                  }`}
                >
                  Купить {plan.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="text-center mb-10">
            <span className="text-accent font-mono text-sm tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Частые вопросы
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-foreground font-mono text-sm font-medium">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-accent flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-border">
                    <p className="text-muted-foreground font-mono text-sm pt-4 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}

export default Index
