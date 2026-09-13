from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home.index'), # '' maps to localhost:8000/ and calls the index function in views.py
    # home.index is name we will assign to this url pattern, can be referenced later

    path('about', views.about, name='home.about')
]