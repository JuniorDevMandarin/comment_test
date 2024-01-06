from django.contrib import admin
from .models import Article, Comment

# Register your models here.


@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')

admin.site.register(Comment)