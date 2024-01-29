from django.apps import AppConfig
from jobs import updater

class StoreConfig(AppConfig):
    name = 'store'
    def ready(self):
        import store.signals
    	#updater.start()
        # pass

    