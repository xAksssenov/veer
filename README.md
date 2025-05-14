# VeerRZA Store

Коммерческий интернет-магазин одежды с адаптивным интерфейсом и интеграцией платёжного шлюза ЮKassa.

## Сайт
[https://veerrzastore.ru/](https://veerrzastore.ru/)

## Возможности
- Каталог с фильтрами (размер, цвет, цена)
- Страница товара с описанием и выбором опций
- Корзина и оформление заказа с учётом скидок и доставки
- Платежи через ЮKassa (карты, электронные кошельки, переводы)
- Адаптивный дизайн для любых устройств

## Стек технологий
- **Backend**: Django, Django REST Framework, PostgreSQL, Docker  
- **Frontend**: React, Redux Toolkit, Axios, SCSS  
- **Платёжный шлюз**: ЮKassa  
- **Сервер**: Nginx  

## Быстрый запуск
1. Клонировать:  
   ```bash
   git clone https://github.com/xAksssenov/veer.git
   cd veer
2. Настроить файл окружения.
3. Собрать и запустить контейнеры:
   ```bash
   docker-compose up -d --build

## Доступ
- **Frontend**: http://localhost:3000

-**API**: http://localhost:8000/api/

-**Admin**: http://localhost:8000/admin
