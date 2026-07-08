# СантехМаркет — демо-каталог сантехнических товаров

Демонстрационный прототип маркетплейса трубопроводной арматуры и фитингов. Полностью на моковых
данных, без бэкенда, без авторизации.

## Стек

React 19 · TypeScript · Vite · Tailwind CSS · React Router · Zustand · Framer Motion · Lucide React

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Сборка

```bash
npm run build
npm run preview
```

## Структура

- `src/data` — моковые товары, категории, бренды, отзывы
- `src/store` — Zustand-хранилища (корзина, избранное, UI), персист в localStorage
- `src/pages` — страницы: главная, каталог, товар, корзина, избранное, админ-панель
- `src/components` — переиспользуемые компоненты (common / catalog / layout / admin)

## WhatsApp

Номер телефона задаётся константой `WHATSAPP_PHONE` в [src/constants/index.ts](src/constants/index.ts)
— перед продакшен-использованием замените на реальный номер клиента (см. `// TODO`).
