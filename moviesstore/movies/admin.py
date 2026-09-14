from django.contrib import admin

# Register your models here.
from .models import Movie, Review

class MovieAdmin(admin.ModelAdmin):
    ordering = ['name']
    search_fields = ['name']

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'movie', 'user', 'comment', 'reported', 'date']
    list_filter = ['reported', 'movie']
    search_fields = ['comment']

admin.site.register(Movie, MovieAdmin)
admin.site.register(Review, ReviewAdmin)