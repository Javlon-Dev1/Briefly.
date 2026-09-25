import requests
from django.conf import settings

def send_telegram_photo(photo, caption):
    url = f"https://api.telegram.org/bot{settings.BOT_TOKEN}/sendPhoto"

    data = {
        'chat_id': settings.CHANNEL_ID,
        'photo': photo,
        'caption': caption,
        'parse_mode': 'HTML'
    }

    response = requests.post(url=url, data=data)

    return response.json()



