from django.apps import AppConfig
from jobs import updater

class StoreConfig(AppConfig):
    name = 'store'
    def ready(self):
    	#updater.start()
        pass
        

