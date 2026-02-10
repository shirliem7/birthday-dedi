import { useRef, useState, useCallback, useEffect } from "react";
import Confetti, { ConfettiRef } from "@/components/Confetti";
import gallery01 from "@/assets/gallery-01.jpg";
import gallery02 from "@/assets/gallery-02.jpg";
import gallery03 from "@/assets/gallery-03.jpg";
import gallery04 from "@/assets/gallery-04.jpg";
import gallery05 from "@/assets/gallery-05.jpg";

const toasts = [
  "📣 יאללהה בן פלד!",
  "🧺 SWISH! נקי.",
  "👏 MVP! MVP!",
  "🪩 אברקסס: הרגע שהתחיל הכל 😄",
  "🔥 עוד מהלך ענק!",
  "🐆 RAWR! נמר על הפרקט!",
  "🏀 תעשה חיים כמו נמר!",
];

const galleryItems = [
  { label: "הציור הכי דדי", tag: "🖼️", img: gallery01 },
  { label: "משפחה / נוסטלגיה", tag: "🫶", img: gallery02 },
  { label: "יום שמש", tag: "😎", img: gallery03 },
  { label: "סלפי מושלם", tag: "✨", img: gallery04 },
  { label: "חמוד ברמות", tag: "🐾", img: gallery05 },
];

const tigerFacts = [
  "🐆 ידעת? נמרים יכולים לרוץ עד 80 קמ״ש — בדיוק כמו דדי בדרך לאימון",
  "🏀 בן פלד = הנמר של הפרקט 🐅",
  "🔥 נמר לא צריך לספר שהוא נמר — הוא פשוט מגיע ועושה DUNK",
  "🐾 כל נמר מיוחד — בדיוק כמו הפסים שלו. ובדיוק כמו דדי שלנו 🧡",
];

const dateStr = new Date().toLocaleDateString("he-IL", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

const floatingEmojis = ["🏀", "🐆", "🔥", "✨", "🐅", "🧡", "💛", "🐾"];

const Index = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [floaters, setFloaters] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [shaking, setShaking] = useState(false);
  const [scoreAnim, setScoreAnim] = useState(false);
  const [tigerFactIdx, setTigerFactIdx] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const floatId = useRef(0);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const pop = useCallback((n = 120) => confettiRef.current?.pop(n), []);

  const flash = () => {
    document.body.animate(
      [{ filter: "none" }, { filter: "saturate(1.4) brightness(1.15)" }, { filter: "none" }],
      { duration: 400, easing: "ease-out" }
    );
  };

  const spawnFloater = useCallback((x: number, y: number) => {
    const emoji = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    const id = floatId.current++;
    setFloaters(prev => [...prev, { id, emoji, x, y }]);
    setTimeout(() => setFloaters(prev => prev.filter(f => f.id !== id)), 1300);
  }, []);

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    spawnFloater(rect.left + rect.width / 2, rect.top);
    action();
  };

  const handleRoar = () => {
    setShaking(true);
    showToast(toasts[5]);
    pop(200);
    flash();
    setTimeout(() => setShaking(false), 500);
  };

  const handleDunk = (e: React.MouseEvent) => {
    setScore(s => s + 1);
    setScoreAnim(true);
    showToast("🏀 DUNK! +1 לדדי.");
    pop(80);
    flash();
    spawnFloater(e.clientX, e.clientY);
    setTimeout(() => setScoreAnim(false), 400);
  };

  // Cycle tiger facts
  useEffect(() => {
    const interval = setInterval(() => {
      setTigerFactIdx(i => (i + 1) % tigerFacts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Initial confetti
  useEffect(() => {
    setTimeout(() => pop(120), 300);
  }, [pop]);

  return (
    <div className={`w-[min(1100px,94vw)] mx-auto py-4 pb-20 px-1 ${shaking ? "shake" : ""}`}>
      {/* Floating emojis */}
      {floaters.map(f => (
        <span key={f.id} className="float-emoji" style={{ left: f.x - 16, top: f.y }}>
          {f.emoji}
        </span>
      ))}

      {/* Tiger Marquee Banner */}
      <div className="mb-3 rounded-2xl border border-white/[0.1] bg-black/[0.25] overflow-hidden py-2.5 reveal">
        <div className="marquee-text text-sm font-bold text-muted-foreground">
          {tigerFacts[tigerFactIdx]} &nbsp;&nbsp;&nbsp;🐆🏀🐅&nbsp;&nbsp;&nbsp; {tigerFacts[(tigerFactIdx + 1) % tigerFacts.length]}
        </div>
      </div>

      {/* Hero */}
      <section className="relative rounded-[28px] sm:rounded-[32px] border border-border bg-gradient-to-b from-white/10 to-white/[0.06] shadow-[0_22px_70px_rgba(0,0,0,0.45)] overflow-hidden reveal reveal-delay-1">
        <div className="court-overlay" />
        <div className="tiger-stripes" />
        <Confetti ref={confettiRef} />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-3 sm:gap-4 p-3 sm:p-[18px]">
          {/* Left Panel */}
          <div className="p-3 sm:p-4 rounded-[18px] sm:rounded-[22px] bg-white/[0.08] border border-border">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/[0.18] bg-black/[0.22] text-xs sm:text-sm text-muted-foreground">
              🏀🐆 יום הולדת × כדורסל × נמרים
            </span>
            <h1 className="mt-3 mb-2 text-[clamp(24px,5vw,46px)] leading-[1.05] font-bold">
              דדי שלנו — יום הולדת שמח! 🎂🐅
            </h1>
            <p className="text-muted-foreground text-[15px] sm:text-base leading-[1.75]">
              בן פלד, מהרגע ההוא באברקסס שהתחלת איתי —
              מאז אתה הדדי שלי 😄🧡
              מאחלת לך שנה של בריאות, אנרגיות טובות, אנשים נכונים סביבך,
              והרבה רגעים של &quot;SWISH&quot; בחיים. 🐆🔥
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={(e) => handleButtonClick(e, () => pop(180))} className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-gradient-to-br from-primary to-secondary text-primary-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                🧨 קונפטי
              </button>
              <button onClick={(e) => handleButtonClick(e, () => { setShowModal(true); pop(160); })} className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-gradient-to-br from-accent/95 to-primary/75 border border-border text-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                🎁 הפתעה
              </button>
              <button onClick={(e) => handleButtonClick(e, handleRoar)} className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-gradient-to-br from-amber-700/80 to-orange-500/60 border border-white/[0.16] text-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                🐅 שאגה!
              </button>
              <button onClick={(e) => handleButtonClick(e, () => { showToast(toasts[3]); pop(140); })} className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-white/[0.06] border border-white/[0.16] text-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                🪩 Abraxas
              </button>
              <a href="#gallery" className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-white/[0.06] border border-white/[0.16] text-foreground no-underline inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                📸 גלריה
              </a>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-3 sm:p-4 rounded-[18px] sm:rounded-[22px] bg-white/[0.08] border border-border">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/[0.18] bg-black/[0.22] text-xs sm:text-sm text-muted-foreground">
              🔥 MVP Controls 🐆
            </span>

            <div className="flex items-center justify-between gap-2 mt-3 p-3 rounded-[18px] border border-white/[0.14] bg-black/[0.18]">
              <div>
                <div className="text-muted-foreground text-[12px] sm:text-[13px]">Scoreboard</div>
                <strong className={`text-[22px] sm:text-[28px] ${score > 0 ? "score-glow" : ""} ${scoreAnim ? "bounce-pop" : ""}`}>
                  {score} 🏀
                </strong>
              </div>
              <button onClick={handleDunk} className="btn-glow px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-2xl font-[850] text-[14px] sm:text-[15px] bg-gradient-to-br from-primary to-secondary text-primary-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform">
                🏀 DUNK +1
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {[
                ["📣 יאללהה", 0, 90],
                ["🧺 SWISH", 1, 120],
                ["👏 MVP", 2, 70],
                ["🐆 נמר!", 6, 100],
              ].map(([label, idx, n]) => (
                <button
                  key={label as string}
                  onClick={(e) => handleButtonClick(e, () => { showToast(toasts[idx as number]); pop(n as number); })}
                  className="btn-glow px-3 py-2.5 rounded-2xl font-[850] text-[13px] sm:text-[15px] bg-white/[0.06] border border-white/[0.16] text-foreground inline-flex items-center gap-2 active:scale-[0.96] transition-transform"
                >
                  {label as string}
                </button>
              ))}
            </div>

            {toast && (
              <div className="mt-3 p-3 rounded-2xl bg-primary/[0.14] border border-primary/[0.35] text-foreground/90 font-[800] text-[14px] sm:text-base animate-in fade-in slide-in-from-bottom-1 duration-200">
                {toast}
              </div>
            )}

            <p className="text-muted-foreground text-[13px] sm:text-base mt-3 leading-[1.7]">
              🐅 כל לחיצה = עוד אנרגיה של נמר לדדי!
            </p>
          </div>
        </div>
      </section>

      {/* Tiger Stats Bar */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 reveal reveal-delay-2">
        {[
          { emoji: "🏀", label: "דאנקים", value: score },
          { emoji: "🐆", label: "רמת נמר", value: score >= 10 ? "MAX" : score >= 5 ? "🔥🔥" : score >= 1 ? "🔥" : "—" },
          { emoji: "⭐", label: "MVP Status", value: score >= 7 ? "Legend" : score >= 3 ? "All-Star" : "Rookie" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-2xl border border-white/[0.12] bg-black/[0.18] text-center">
            <div className="text-2xl sm:text-3xl mb-1">{stat.emoji}</div>
            <div className="text-muted-foreground text-[11px] sm:text-xs">{stat.label}</div>
            <div className="font-[850] text-sm sm:text-lg mt-0.5">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <section className="mt-5" id="gallery">
        <h2 className="text-lg sm:text-xl font-bold mb-3 reveal reveal-delay-2">📸 רגעים שלנו (הגלריה) 🐾</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <article
              key={i}
              className={`gallery-card rounded-[18px] sm:rounded-[22px] bg-black/[0.18] border border-white/[0.12] overflow-hidden cursor-pointer reveal reveal-delay-${Math.min(i + 1, 5)}`}
              onClick={(e) => {
                spawnFloater(e.clientX, e.clientY);
                pop(40);
              }}
            >
              <div className="overflow-hidden">
                <img src={item.img} alt={item.label} className="w-full h-[220px] sm:h-[270px] object-cover block saturate-[1.05] contrast-[1.03]" />
              </div>
              <div className="p-3 flex justify-between items-center text-muted-foreground text-[13px] sm:text-sm">
                <span>{item.label}</span>
                <span className="px-2.5 py-1.5 rounded-full border border-white/[0.16] bg-white/[0.06] text-white/[0.78] font-[800] text-xs whitespace-nowrap">
                  {item.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="mt-5 flex justify-between gap-2.5 flex-wrap text-white/[0.55] text-[12px] sm:text-[13px] py-1.5 px-0.5 reveal reveal-delay-5">
        <span>{dateStr}</span>
        <span>Built with 🧡 + 🏀 + 🐆</span>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3" onClick={() => setShowModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="modal-enter w-[min(760px,94vw)] border border-white/[0.18] bg-[rgba(10,12,20,0.95)] text-foreground rounded-[22px] shadow-[0_22px_70px_rgba(0,0,0,0.55)] p-4 sm:p-[22px]">
            <div className="tiger-stripes rounded-[22px]" />
            <span className="relative inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/[0.18] bg-black/[0.22] text-xs sm:text-sm text-muted-foreground">
              🎁🐅 Surprise Mode
            </span>
            <h3 className="mt-3 mb-2 text-[20px] sm:text-[24px] font-bold">הפתעה קטנה 🐆</h3>
            <p className="text-muted-foreground leading-[1.7] text-[15px] sm:text-base">
              בן פלד (דדי) — אתה אחד האנשים הכי טובים וכיפיים שיש.
              שתהיה לך שנה של שקט, הצלחות, והרבה רגעים שמרגישים &quot;נכון&quot;.
              אני כאן — ובאמת שמחה שאתה בחיים שלי 🧡🐅
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <button onClick={() => { setShowModal(false); pop(100); }} className="btn-glow px-3.5 py-3 rounded-2xl font-[850] text-[15px] bg-gradient-to-br from-primary to-secondary text-primary-foreground inline-flex items-center gap-2.5 active:scale-[0.96] transition-transform">
                סוגרים 🧡
              </button>
              <button onClick={() => { showToast(toasts[4]); pop(110); }} className="btn-glow px-3.5 py-3 rounded-2xl font-[850] text-[15px] bg-white/[0.06] border border-white/[0.16] text-foreground inline-flex items-center gap-2.5 active:scale-[0.96] transition-transform">
                עוד היילייט 🏀
              </button>
              <button onClick={handleRoar} className="btn-glow px-3.5 py-3 rounded-2xl font-[850] text-[15px] bg-gradient-to-br from-amber-700/80 to-orange-500/60 border border-white/[0.16] text-foreground inline-flex items-center gap-2.5 active:scale-[0.96] transition-transform">
                🐅 שאגת נמר!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
