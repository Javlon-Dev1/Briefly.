# Briefly — News Platform

A Django-based news/blog platform with automatic Telegram channel publishing, email notifications for subscribers, and Google OAuth login.

**Live demo:** https://briefly-rq6j.onrender.com

## Features

- 📰 Article publishing with categories, summaries, and read-time estimates
- 📱 Automatic Telegram channel post when a new article is published
- 📧 Automatic email notification to subscribers on new articles
- 🔐 Authentication via email/password and Google (django-allauth)
- 🎨 Responsive frontend with custom SCSS/CSS

## Tech Stack

- **Backend:** Django 6
- **Database:** PostgreSQL (production), SQLite (local development)
- **Auth:** django-allauth (Google OAuth)
- **Static files:** WhiteNoise
- **Server:** Gunicorn
- **Hosting:** Render

## Project Structure

```
core/               # Django project settings, URLs, WSGI
news/               # Main app
├── models.py       # Article, Subscriber
├── views.py
├── adapters.py     # Custom allauth adapter
├── services/
│   ├── gmail.py     # Email sending logic
│   └── telegram.py  # Telegram posting logic
├── migrations/
static/assets/       # CSS, JS, SCSS
templates/            # HTML templates
```

## Local Setup

1. Clone the repository and create a virtual environment:
   ```bash
   git clone <repo-url>
   cd Briefly
   python -m venv venv
   venv\Scripts\activate   # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   SECRET_KEY=
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=sqlite:///db.sqlite3

   EMAIL_HOST_USER=
   EMAIL_HOST_PASSWORD=

   BOT_TOKEN=
   CHANNEL_ID=

   id=
   secret=
   ```

4. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

## Deployment (Render)

- **Build Command:** `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- **Start Command:** `python manage.py migrate && gunicorn core.wsgi`
- Environment variables are set in the Render dashboard (same keys as `.env`, with `DEBUG=False` and production `ALLOWED_HOSTS`)
- A managed PostgreSQL instance provides `DATABASE_URL`
- Google OAuth requires the Render domain to be added to **Authorized redirect URIs** in Google Cloud Console, and a matching **Social Application** entry in the Django admin

## Author

Javlon — [GitHub](https://github.com/Javlon-Dev1)

---

## O'zbekcha qisqacha

**Briefly** — Django asosida yozilgan yangiliklar platformasi. Yangi maqola qo'shilganda avtomatik ravishda Telegram kanalga post qiladi va obunachilarga email yuboradi. Google orqali kirish (OAuth) qo'llab-quvvatlanadi. Baza sifatida productionda PostgreSQL, localda SQLite ishlatiladi. Render'da deploy qilingan, static fayllar WhiteNoise orqali xizmat qiladi.

Local ishga tushirish uchun yuqoridagi "Local Setup" bo'limiga qarang — asosiy qadamlar: repo'ni klonlash, virtual environment yaratish, `requirements.txt`ni o'rnatish, `.env` faylini to'ldirish, so'ng `migrate` va `runserver`.
