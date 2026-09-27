from django.core.mail import EmailMultiAlternatives

def send_article_email(email, article):

    article_html = f"""
    <html>
        <body>
            <h1>Briefly</h1>

            <h2>{article.title}</h2>

            <img src="{article.image}" width="600">

            <p>
                {article.summary}
            </p>

            <p>
                <strong>Muallif:</strong> {article.author}
            </p>

            <p>
                <strong>Kategoriya:</strong> #{article.category}
            </p>

            <p>
                <a href="https://briefly-rq6j.onrender.com">Briefly</a> — yangiliklardan xabardor bo‘ling.
            </p>
        </body>
    </html>
    """

    mail = EmailMultiAlternatives(
        subject=f"Briefly — {article.title}",
        body=article.summary,
        from_email="javlonxabibullayev1@gmail.com",
        to=[email],
    )
    mail.attach_alternative(article_html, 'text/html')
    mail.send()