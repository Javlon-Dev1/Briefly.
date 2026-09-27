from django.db import models
from django.utils.text import slugify

from .services.gmail import send_article_email
from .services.telegram import send_telegram_photo
# Create your models here.

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)

    category = models.CharField(max_length=100)
    summary = models.TextField()
    content = models.TextField()

    image = models.URLField()
    author = models.CharField(max_length=20)

    published_at = models.DateField(auto_now_add=True)
    read_time = models.IntegerField()

    def save(self, *args, **kvargs):

        is_new = self.pk is None

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kvargs)

        if is_new:
            send_telegram_photo(
                photo=self.image,
                caption=(
                    f"📰 <b>{self.title}</b>\n\n"
                    f"{self.summary}\n\n"
                    f"👤 <b>Muallif:</b> {self.author}\n"
                    f"📂 <b>Kategoriya:</b> #{self.category}\n\n"
                    f"🌐 <i><a href='https://briefly-rq6j.onrender.com'>Briefly</a> — yangiliklardan xabardor bo‘ling.</i>"
                ),
            )

            emails = Subscriber.objects.values_list('email', flat=True)

            for email in emails:
                send_article_email(email, self)

    def __str__(self):
        return self.title


