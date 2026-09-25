from django.contrib import messages
from django.contrib.auth import (
    authenticate,
    login as auth_login,
    logout as auth_logout
)
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404

from .forms import SubscriberForm
from .models import Article, Subscriber

from allauth.socialaccount.providers.google.views import oauth2_login


# Create your views here.

def home(request):
    articles = Article.objects.all().order_by('-published_at')[:3]

    latest_articles = articles.first()

    if request.method == 'POST':
        form = SubscriberForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('home')

    else:
        form = SubscriberForm()

    return render(request, 'index.html', {
        'articles': articles,
        'latest_articles': latest_articles,
        'form': form,
    })
def news_list(request):
    articles = Article.objects.all().order_by('-published_at')

    return render(request, 'news.html', {
        'articles': articles,
    })


def login_view(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=email,
            password=password
        )

        if user is not None:
            auth_login(
                request,
                user
            )

            return redirect('home')

        messages.error(
            request,
            'Email yoki parol xato!'
        )
        return redirect('login')
    return render(request, 'login.html')

def signup_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(
                request,
                "Parollar bir xil emas!"

            )
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(
                request,
                "Bu email orqali ro'yxatdan o'tib bo'lingan!"
            )
            return redirect('login')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        user.first_name = name
        user.save()

        messages.success(
            request,
            "Muvofaqqiyatli ro'yxatdan o'tdingiz!"
        )
        return redirect('home')

    return render(request, 'signup.html')

def google_signup(request):
    request.session['google_signup'] = True
    return oauth2_login(request)

def article(request, slug):
    articles = Article.objects.all().order_by('-published_at')[:3]

    article = get_object_or_404(Article, slug=slug)
    return render(request, 'article.html', {
        'article':article,
        'articles': articles,
    })

def logout_views(request):
    auth_logout(request)
    return redirect('home')
    