# GURT - Flower Studio E-commerce

🌸 **Продакшн-готовий интернет-магазин цветочной студии GURT**

Современный e-commerce сайт с эстетикой жёлтый/чёрный/белый, видео-героем, полным каталогом с корзиной и mock checkout.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Превью продакшен сборки
npm run preview
```

## 🎨 Дизайн-система

### Цвета

- **Основные**: `#FFD400` (жёлтый), `#0A0A0A` (чёрный), `#FFFFFF` (белый)
- **Текст**: `#FFFFFF` (базовый), `#C9CCD1` (приглушённый), `#111111` (акцент)
- **Стекло**: `bg-white/5`, `border-white/10`, `backdrop-blur-md`

### Компоненты

- **Primary Button**: `bg-brand-yellow text-brand-black rounded-2xl px-5 py-3`
- **Secondary Button**: `border-white/20 text-white hover:bg-white/10`
- **Cards**: Класс `.glass` со стеклянными эффектами
- **Typography**: Inter, заголовки 32/48/60px, текст 16/18px

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Cart.jsx        # Корзина (drawer)
│   ├── Hero.jsx        # Видео-герой
│   ├── Navbar.jsx      # Навигация с корзиной
│   ├── Footer.jsx      # Подвал
│   └── CatalogPreview.jsx  # Превью каталога
├── pages/              # Страницы
│   ├── Home.jsx        # Главная
│   ├── Catalog.jsx     # Каталог с фильтрами
│   ├── Product.jsx     # Страница товара
│   ├── Checkout.jsx    # Оформление заказа
│   ├── OrderSuccess.jsx # Успешный заказ
│   ├── About.jsx       # О нас
│   ├── Contact.jsx     # Контакты
│   └── PaymentDelivery.jsx # Оплата и доставка
├── context/
│   └── CartContext.jsx # Контекст корзины
├── data/
│   └── products.json   # База товаров
└── App.jsx            # Главный компонент
```

## 🛒 Функциональность

### ✅ Реализовано

- [x] **Каталог**: поиск, фильтры (категория, цвет, наличие), сортировка по цене
- [x] **Корзина**: добавление, изменение количества, сохранение в localStorage
- [x] **Товар**: выбор размера, количества, детальная информация
- [x] **Заказ**: валидация формы, mock GET-отправка, страница успеха
- [x] **SEO**: мета-теги, alt для изображений, фокус-стили
- [x] **Адаптивность**: мобильное меню, responsive сетки
- [x] **Производительность**: lazy loading, оптимизированные изображения

### 🎯 Основные страницы

- **/** - Главная с видео-героем и превью каталога
- **/catalog** - Полный каталог с фильтрами
- **/product/:id** - Детальная страница товара
- **/checkout** - Оформление заказа
- **/order-success** - Подтверждение заказа
- **/about** - О студии, миссия, команда
- **/contact** - Форма обратной связи, контакты
- **/payment-and-delivery** - Условия оплаты и доставки

## 📦 Данные и контент

### Товары (src/data/products.json)

18 товаров с полными данными:

- ID, название, цена, изображение
- Категория, цвет, наличие, артикул
- Размеры (S/M/L), описание

### Категории товаров

- **букети** - классические букеты
- **міски** - смешанные композиции
- **троянди** - розы разных сортов
- **сезонні** - сезонные цветы
- **преміум** - эксклюзивные композиции

## 🖼️ Медіа контент

#### Видео

- `public/video/hero.mp4` - Главное видео (5-12с, 3-6MB, 1920x1080)
- `public/img/hero-poster.webp` - Постер для видео (1920x1080)

#### Изображения товаров (1200x1600px, WebP, ~150-300KB)

```
public/img/
├── pink-peonies.webp          # Розовые пионы
├── white-mix.webp             # Белый микс эустомы
├── roses-long.webp            # Красные розы на длинных стеблях
├── lavender-bouquet.webp      # Лавандовый букет
├── sunflowers.webp            # Подсолнухи
├── chrysanthemums.webp        # Золотые хризантемы
├── pastel-mix.webp            # Пастельный микс
├── pink-orchids.webp          # Розовые орхидеи
├── tulips-spring.webp         # Весенние тюльпаны
├── white-lilies.webp          # Белые лилии
├── alstroemeria-mix.webp      # Альстромерии микс
├── black-callas.webp          # Чёрные каллы
├── gerbera-rainbow.webp       # Разноцветные герберы
├── coral-peonies.webp         # Коралловые пионы
├── purple-stock.webp          # Фиолетовая матиола
├── david-austin-roses.webp    # Розы Дэвида Остина
├── vintage-mix.webp           # Винтажный микс
└── white-freesias.webp        # Белые фрезии
```

#### Рекомендации по изображениям

- **Формат**: WebP для оптимальной производительности
- **Размер**: 1200x1600px (3:4 соотношение)
- **Вес**: 150-300KB после сжатия
- **Качество**: Профессиональная фотосъёмка на нейтральном фоне
- **Стиль**: Естественное освещение, минималистичная подача

#### Оптимизация изображений

```bash
# Пример команды для оптимизации
npx @squoosh/cli --webp '{"quality":85,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' public/img/*.jpg
```

## 🛠️ Техническая информация

### Технологии

- **React 18** + **Vite**
- **React Router** для маршрутизации
- **Tailwind CSS** для стилизации
- **Context API** для управления состоянием корзины
- **LocalStorage** для персистентности данных

### Производительность

- **Lazy loading** для всех изображений
- **Code splitting** по страницам
- **Минификация** CSS и JS
- **Сжатие** изображений
- **Prefetch** для критических ресурсов

### SEO & Доступность

- Семантическая разметка HTML5
- Мета-теги Open Graph и Twitter Cards
- Alt-тексты для всех изображений
- Фокус-стили для навигации с клавиатуры
- ARIA-метки для интерактивных элементов
- Контрастность AA/AAA

### Браузерная поддержка

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Деплой

### Статический хостинг

```bash
# Сборка
npm run build

# Загрузка dist/ на хостинг
# Vercel, Netlify, GitHub Pages и т.д.
```

### Environment переменные

```env
# .env.local
VITE_API_URL=https://api.gurt.flowers
VITE_TELEGRAM_BOT=@gurt_flowers
VITE_EMAIL=hello@gurt.flowers
```

## 📝 Развитие

### Возможные улучшения

- [ ] Интеграция с реальным API
- [ ] Платёжная система (Stripe, LiqPay)
- [ ] Уведомления (email, SMS)
- [ ] Админ-панель для управления товарами
- [ ] Wishlist (список желаний)
- [ ] Отзывы и рейтинги
- [ ] Программа лояльности
- [ ] Мультиязычность (i18n)

### Кастомизация

1. **Цвета**: изменить в `tailwind.config.js`
2. **Товары**: редактировать `src/data/products.json`
3. **Контент**: обновить тексты в компонентах
4. **Изображения**: заменить файлы в `public/img/`
5. **Видео**: заменить `public/video/hero.mp4`

## 🆘 Поддержка

Если возникли вопросы или нужна помощь:

- 💬 **Telegram**: @Vladislav_Pohorielov
- 📞 **Телефон**: +380 99 941 88 76

---

**GURT Flower Studio** - там, где квіти стають мистецтвом ✨
