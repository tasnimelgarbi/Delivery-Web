import { useState, useEffect, useRef } from "react";

const Feedback = () => {
  const reviews = [
    { text: "التطبيق سهل الاستخدام والدليفري وصلني لحد البيت بسرعة ⚡🍔", name: "محمد علي", stars: 5 },
    { text: "أول مرة أجرب الخدمة وبصراحة مش آخر مرة، بجد وفرتوا عليا وقت ومجهود 🙏🚀", name: "سارة حسن", stars: 4 },
    { text: "التوصيل كان سريع جدًا، واستلمت الطلب في المعاد بالظبط 👌✨", name: "أحمد مصطفى", stars: 3 },
    { text: "خدمة ممتازة.. التعامل محترم والأسعار مناسبة جدًا 💯", name: "نورهان خالد", stars: 4 },
    { text: "أمانة واحترافية، الطلب جالي مظبوط من غير أي غلطة 👏❤", name: "محمود عبد الله", stars: 2 },
    { text: "بجد خدمة تستحق التجربة، وموظفين محترمين جدًا 👌😊", name: "مي عمر", stars: 5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false); 
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 1500);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, reviews.length]);

  const getVisibleReviews = () => {
    const total = reviews.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;
    return [reviews[nextIndex], reviews[currentIndex], reviews[prevIndex]];
  };

  return (
    <div id="feedback" className="mt-20 overflow-hidden px-4 sm:px-6 lg:px-8">
      <h1
        className="flex justify-center font-black text-white text-2xl sm:text-3xl lg:text-4xl mb-10 text-center"
        style={{ textShadow: "0 4px 2px #000" }}
      >
        آراء عملائنا
      </h1>

      <div className="flex flex-wrap justify-center gap-6 items-center mb-20">
        {getVisibleReviews().map((review, index) => (
          <div
            key={index}
            tabIndex={0} 
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className={`w-[240px] sm:w-[280px] bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-4 text-white transition-all duration-700 outline-none
              ${
                index === 1
                  ? "scale-110 opacity-100 z-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] focus:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                  : "scale-90 opacity-60"
              }
            `}
          >
            <div
              className="flex text-yellow-400 text-xl sm:text-2xl drop-shadow-md"
              style={{ textShadow: "0 4px 2px #000" }}
            >
              {"★".repeat(review.stars)}
            </div>
            <p className="text-center font-semibold text-sm sm:text-base">{review.text}</p>
            <span className="text-xs sm:text-sm text-gray-300">- {review.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
