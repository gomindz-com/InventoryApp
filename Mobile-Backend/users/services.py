# services.py
from twilio.rest import Client
from django.conf import settings

def send_sms_message(to_number, message):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(
        to=to_number,
        from_=settings.TWILIO_PHONE_NUMBER,
        body=message
    )