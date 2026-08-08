"use client";

import { useState } from "react";

const services = [
  "کودکان (تا ۱۴ سال)",
  "انحراف چشم (استرابیسم)",
  "پتوز",
  "مشاوره بلفارو",
  "لیزیک",
  "مجاری اشکی",
];

export default function Home() {
  const [service, setService] = useState("");

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f9ff",
        padding: "24px 16px 50px",
        fontFamily: "Arial, sans-serif",
        color: "#17324d",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "28px 22px",
            boxShadow: "0 8px 30px rgba(50, 100, 150, 0.10)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#e8f3ff",
              margin: "0 auto 18px",
            }}
          />

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
              fontSize: "17px",
              lineHeight: 1.9,
            }}
          >
            فوق تخصص چشم‌پزشکی کودکان و استرابیسم
          </p>

          <div
            style={{
              marginTop: "24px",
              padding: "18px",
              background: "#f0f8ff",
              borderRadius: "16px",
              textAlign: "right",
              lineHeight: 2,
            }}
          >
            <strong>قبل از رزرو وقت لطفاً توجه کنید:</strong>

            <p style={{ marginBottom: "10px" }}>
              فقط برای موارد زیر امکان پذیرش و رزرو وقت وجود دارد:
            </p>

            <ul style={{ margin: 0, paddingRight: "22px" }}>
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "#fff8ef",
              borderRadius: "16px",
              textAlign: "right",
              lineHeight: 2,
            }}
          >
            <strong>بیماران محترم شهرستانی</strong>

            <p style={{ marginBottom: 0 }}>
              اگر از شهرهایی دور از کرج تشریف می‌آورید و قرار است عمل داشته
              باشید، لطفاً برای نوبت خود <strong>روز سه‌شنبه</strong> را
              انتخاب کنید.
              <br />
              روزهای عمل چهارشنبه‌هاست؛ به این ترتیب می‌توانید پس از مراجعه
              روز سه‌شنبه، عمل خود را روز چهارشنبه انجام دهید و به دلیل فاصله
              محل سکونت، فقط یک شب در کرج اقامت داشته باشید.
            </p>
          </div>

          <h2
            style={{
              marginTop: "32px",
              color: "#1769aa",
              fontSize: "22px",
            }}
          >
            رزرو نوبت
          </h2>

          <label
            style={{
              display: "block",
              textAlign: "right",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            نوع مراجعه
          </label>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #c9dff2",
              background: "#fff",
              fontSize: "16px",
            }}
          >
            <option value="">لطفاً انتخاب کنید</option>

            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            disabled={!service}
            style={{
              width: "100%",
              marginTop: "18px",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: service ? "#1769aa" : "#b8c9d8",
              color: "#fff",
              fontSize: "17px",
              cursor: service ? "pointer" : "not-allowed",
            }}
          >
            ادامه رزرو نوبت
          </button>
        </section>

        <section
          style={{
            marginTop: "20px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "22px",
            boxShadow: "0 8px 25px rgba(50, 100, 150, 0.08)",
            lineHeight: 2,
            fontSize: "15px",
          }}
        >
          <h3 style={{ color: "#1769aa", marginTop: 0 }}>آدرس مطب</h3>

          <p>
            کرج، خیابان شهید بهشتی، نرسیده به خیابان کسری، جنب نساجی بروجرد،
            ساختمان ولیعهدی، طبقه پنجم، واحد ۵۰۱
          </p>

          <p>
            <strong>تلفن:</strong> ۰۹۳۰۶۶۳۰۱۸۵
          </p>
        </section>
      </div>
    </main>
  );
}
