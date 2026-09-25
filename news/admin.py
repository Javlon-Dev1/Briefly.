from django.contrib import admin
from django.template.defaultfilters import title

from .models import Article, Subscriber


# Register your models here.

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'author',
        'published_at',
    )
    prepopulated_fields = {
        'slug': ('title',)
    }

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = (
        'email',
        'subscribed_at'
    )

