from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialLogin
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.shortcuts import redirect

class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        if not request.session.get('google_signup'):
            return
        request.session.pop('google_signup', None)

        email = sociallogin.account.extra_data.get('email')

        if not email:
            return

        User = get_user_model()

        if User.objects.filter(email__iexact=email).exists():
            return redirect('login')