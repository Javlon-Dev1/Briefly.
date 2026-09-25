from django.urls import path
from . import views



urlpatterns = [
    path(
        'account/google/singup',
        views.google_signup,
        name='google_signup',
    ),

    path('', views.home, name='home'),
    path('news/', views.news_list, name='news_list'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('article/<slug:slug>/', views.article, name='article'),
    path('logout/', views.logout_views, name='logout'),

]