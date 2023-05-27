from django.apps import AppConfig


class MobileusersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    # name = 'mobileuUsers'
    name = 'mobileUsers'
    def ready(self):
    	#updater.start()
        pass