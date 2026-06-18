# Pulse Analytics Dashboard v2

داشبورد آنالیتیکس حرفه‌ای با ۶ صفحه، تم روز/شب، نمودارهای پیشرفته و بروزرسانی زنده.

## اجرا
```bash
npm install
npm run dev
# http://localhost:5173
```

## صفحات
| مسیر | صفحه | محتوا |
|------|------|-------|
| `/` | نمای کلی | ۶ KPI + Area Chart + Pie + Bar |
| `/sales` | فروش | قیف + P&L Line + Region Bars + جدول محصولات |
| `/audience` | مخاطبان | Session Trend + Device Pie + Geo Table + Live Feed |
| `/orders` | سفارش‌ها | جدول کامل با Sort / Filter / Search / CSV |
| `/reports` | گزارش‌ها | P&L ماهانه + Conversion + Goal Progress |
| `/settings` | تنظیمات | Profile + تم روز/شب + اعلان‌ها |

## ویژگی‌ها
- 🌙☀️ **تم روز/شب** — دکمه در هدر با انیمیشن spin + ذخیره در localStorage
- ⚡ بروزرسانی خودکار هر **۳۰ ثانیه** با React Query + شمارش معکوس
- 🔢 انیمیشن **odometer** روی همه KPIها
- 📊 نمودار Area, Bar, Pie, Line, Funnel با Recharts
- 🔍 جدول با sort دوطرفه، جستجو، فیلتر وضعیت، صفحه‌بندی، **خروجی CSV** با BOM فارسی
- 🌊 انیمیشن **ECG زنده** در هدر
- 📱 ریسپانسیو کامل — Sidebar کشویی روی موبایل
- RTL کامل + فونت Vazirmatn

## تکنولوژی
React 18 · TypeScript · Vite · MUI v5 · Recharts · React Query v5 · React Table v8 · React Router v6
