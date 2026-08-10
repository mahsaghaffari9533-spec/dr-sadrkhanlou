"use client";

import { useMemo, useState } from "react";

const services = [
  "کودکان (تا ۱۴ سال)",
  "انحراف چشم (استرابیسم)",
  "پتوز",
  "مشاوره بلفارو",
  "لیزیک",
  "مجاری اشکی",
];

const holidays = [
  "2026-01-01",
  "2026-01-02",
  "2026-01-03",
  "2026-01-04",
  "2026-01-16",
  "2026-02-11",
  "2026-03-20",
  "2026-03-21",
  "2026-03-22",
  "2026-03-23",
  "2026-04-01",
  "2026-04-02",
  "2026-06-04",
  "2026-06-05",
  "2026-06-06",
  "2026-06-07",
  "2026-06-28",
  "2026-08-26",
  "2026-11-25",
];

const monthNames = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

function persianDate(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function makeSlots() {
  const slots: string[] = [];

  for (let i = 0; i < 60; i++) {
    const totalMinutes = 8 * 60 + i * 6;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    slots.push(`${pad(hour)}:${pad(minute)}`);
  }

  return slots;
}

export default function Home() {
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [monthOffset, setMonthOffset] = useState(0);

  const slots = useMemo(() => makeSlots(), []);

  const today = new Date();
  const calendarDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isHoliday = (date: Date) => holidays.includes(dateKey(date));

  const isReservable = (date: Date) => {
    const day = date.getDay();

    return (day === 0 || day === 2) && !isHoliday(date);
  };

  const selectDate = (date: Date) => {
    if (!isReservable(date)) return;

    setSelectedDate(date);
    setSelectedTime("");
    setStep(2);
  };

  const goBack = () => {
    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime("");
      return;
    }
  };

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f3f8ff",
        padding: "24px 16px 60px",
        fontFamily: "Arial, sans-serif",
        color: "#17324d",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "28px 22px",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(50,100,150,0.08)",
          }}
        >
          <div
            style={{
              width: "82px",
              height: "82px",
              borderRadius: "50%",
              background: "#e6f1ff",
              margin: "0 auto 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1670c9",
              fontSize: "34px",
              fontWeight: "bold",
            }}
          >
            د
          </div>

          <h1
            style={{
              margin: "0",
              color: "#1769aa",
              fontSize: "28px",
            }}
          >
            مطب دکتر سمیرا صدرخانلو
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#536b80",
              fontSize: "16px",
              lineHeight: 1.9,
            }}
          >
            فوق تخصص چشم‌پزشکی کودکان و استرابیسم
            <br />
            (انحراف چشم)
          </p>
        </header>

        <section
          style={{
            marginTop: "20px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "22px",
            boxShadow: "0 8px 25px rgba(50,100,150,0.07)",
          }}
        >
          <h2 style={{ color: "#1769aa", marginTop: 0 }}>
            لطفاً قبل از رزرو وقت مطالعه کنید
          </h2>

          <p style={{ lineHeight: 2 }}>
            پذیرش و رزرو وقت فقط برای موارد زیر انجام می‌شود:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
            }}
          >
            {services.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setService(item);
                  setStep(1);
                }}
                style={{
                  border:
                    service === item
                      ? "2px solid #4b9de8"
                      : "1px solid #d8e8f7",
                  background:
                    service === item ? "#eaf5ff" : "#f8fbff",
                  color: "#28526f",
                  borderRadius: "12px",
                  padding: "13px 8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {service && (
            <p
              style={{
                marginTop: "16px",
                background: "#eef7ff",
                borderRadius: "12px",
                padding: "12px",
                color: "#1769aa",
              }}
            >
              مورد انتخاب‌شده: <strong>{service}</strong>
            </p>
          )}
        </section>

        <section
          style={{
            marginTop: "20px",
            background: "#fff8ed",
            border: "1px solid #f2d7a5",
            borderRadius: "20px",
            padding: "22px",
            lineHeight: 2,
          }}
        >
          <h2
            style={{
              color: "#b66a00",
              marginTop: 0,
              fontSize: "20px",
            }}
          >
            بیماران محترم شهرستانی
          </h2>

          <p style={{ marginBottom: 0 }}>
            بیمارانی که از شهرهایی دور از کرج تشریف می‌آورید و احتمال دارد
            نیاز به عمل داشته باشید، لطفاً برای رزرو وقت، <strong>روز سه‌شنبه</strong>{" "}
            را انتخاب کنید.
          </p>

          <p>
            دلیل این توصیه این است که <strong>روزهای عمل چهارشنبه‌هاست</strong>.
            با انتخاب وقت در روز سه‌شنبه، در صورتی که عمل برای شما انجام شود،
            می‌توانید همان روزهای نزدیک به عمل را در کرج بمانید و فقط{" "}
            <strong>یک شب در کرج</strong> اقامت داشته باشید.
          </p>
        </section>

        {step === 1 && (
          <section
            style={{
              marginTop: "20px",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "22px",
              boxShadow: "0 8px 25px rgba(50,100,150,0.07)",
            }}
          >
            <h2 style={{ color: "#1769aa", marginTop: 0 }}>
              انتخاب تاریخ
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <button
                onClick={() => setMonthOffset((x) => x - 1)}
                style={navButton}
              >
                ماه قبل
              </button>

              <strong style={{ fontSize: "18px", color: "#28526f" }}>
                {monthNames[month]} {year}
              </strong>

              <button
                onClick={() => setMonthOffset((x) => x + 1)}
                style={navButton}
              >
                ماه بعد
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "7px",
                textAlign: "center",
              }}
            >
              {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((d) => (
                <strong key={d} style={{ color: "#71879a" }}>
                  {d}
                </strong>
              ))}

              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {days.map((day) => {
                const date = new Date(year, month, day);
                const holiday = isHoliday(date);
                const reservable = isReservable(date);

                let background = "#f4f6f8";
                let border = "1px solid #e1e6ea";
                let color = "#9ba8b2";

                if (holiday) {
                  background = "#fff0dc";
                  border = "2px solid #e99a3d";
                  color = "#c16b00";
                } else if (reservable) {
                  background = "#eaf5ff";
                  border = "2px solid #9bcaf0";
                  color = "#1769aa";
                }

                return (
                  <button
                    key={day}
                    onClick={() => selectDate(date)}
                    disabled={!reservable}
                    style={{
                      minHeight: "55px",
                      borderRadius: "50%",
                      border,
                      background,
                      color,
                      cursor: reservable ? "pointer" : "default",
                      fontSize: "15px",
                      position: "relative",
                    }}
                  >
                    {day}

                    {holiday && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "3px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#e99a3d",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
                marginTop: "22px",
                fontSize: "13px",
              }}
            >
              <Legend color="#9bcaf0" text="روز قابل رزرو" />
              <Legend color="#e99a3d" text="تعطیل رسمی" />
              <Legend color="#e34b4b" text="تکمیل ظرفیت" />
            </div>
          </section>
        )}

        {step === 2 && selectedDate && (
          <section
            style={{
              marginTop: "20px",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "22px",
              boxShadow: "0 8px 25px rgba(50,100,150,0.07)",
            }}
          >
            <button onClick={goBack} style={backButton}>
              ← بازگشت
            </button>

            <h2 style={{ color: "#1769aa" }}>انتخاب ساعت پذیرش</h2>

            <p style={{ color: "#637b8e" }}>
              {persianDate(selectedDate)}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "9px",
                marginTop: "20px",
              }}
            >
              {slots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(3);
                  }}
                  style={{
                    padding: "11px 4px",
                    borderRadius: "10px",
                    border: "1px solid #cfe3f5",
                    background: "#f5faff",
                    color: "#1769aa",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && selectedDate && selectedTime && (
          <section
            style={{
              marginTop: "20px",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 8px 25px rgba(50,100,150,0.07)",
            }}
          >
            <button onClick={goBack} style={backButton}>
              ← بازگشت
            </button>

            <h2 style={{ color: "#1769aa" }}>
              تأیید نهایی نوبت
            </h2>

            <div
              style={{
                background: "#eef7ff",
                borderRadius: "14px",
                padding: "18px",
                lineHeight: 2,
              }}
            >
              <p>
                <strong>تاریخ:</strong>{" "}
                {persianDate(selectedDate)}
              </p>

              <p>
                <strong>ساعت پذیرش:</strong> {selectedTime}
              </p>

              {service && (
                <p>
                  <strong>مورد مراجعه:</strong> {service}
                </p>
              )}
            </div>

            <div
              style={{
                marginTop: "18px",
                background: "#fff8ed",
                border: "1px solid #f0d39d",
                borderRadius: "14px",
                padding: "18px",
                lineHeight: 2,
                color: "#72501d",
              }}
            >
              <strong>لطفاً توجه فرمایید:</strong>

              <p>
                این ساعت، <strong>ساعت پذیرش شما در مطب</strong> است و ممکن است
                برای ورود به اتاق پزشک مقداری معطلی داشته باشید.
              </p>

              <p>
                پیشاپیش بابت این موضوع عذرخواهی می‌کنیم و خواهشمندیم صبوری
                داشته باشید.
              </p>

              <p>
                با این حال، شما <strong>حتماً باید در همان ساعتی که نوبت
                گرفته‌اید در مطب حضور داشته باشید</strong>؛ در غیر این صورت
                نوبت شما لغو خواهد شد.
              </p>
            </div>

            <button
              onClick={() => alert("نوبت شما با موفقیت ثبت شد.")}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "15px",
                border: "none",
                borderRadius: "12px",
                background: "#2f86d6",
                color: "white",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              تأیید و ثبت نوبت
            </button>
          </section>
        )}

        <section
          style={{
            marginTop: "20px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "22px",
            boxShadow: "0 8px 25px rgba(50,100,150,0.07)",
            lineHeight: 2,
          }}
        >
          <h2 style={{ color: "#1769aa", marginTop: 0 }}>
            اطلاعات مطب
          </h2>

          <p>
            <strong>آدرس:</strong>
            <br />
            کرج، خیابان شهید بهشتی، نرسیده به خیابان کسری، جنب نساجی بروجرد،
            ساختمان ولیعهدی، طبقه پنجم، واحد ۵۰۱
          </p>

          <p>
            <strong>تلفن:</strong>{" "}
            <a
              href="tel:09306630185"
              style={{ color: "#1769aa", textDecoration: "none" }}
            >
              ۰۹۳۰۶۶۳۰۱۸۵
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

function Legend({
  color,
  text,
}: {
  color: string;
  text: string;
}) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: color,
          display: "inline-block",
        }}
      />
      {text}
    </span>
  );
}

const navButton = {
  border: "1px solid #d7e6f3",
  background: "#f5faff",
  color: "#1769aa",
  borderRadius: "10px",
  padding: "8px 12px",
  cursor: "pointer",
};

const backButton = {
  border: "none",
  background: "transparent",
  color: "#1769aa",
  fontSize: "15px",
  cursor: "pointer",
  padding: "5px 0",
};
