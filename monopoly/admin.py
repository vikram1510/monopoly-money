from django.contrib import admin
from .models import Player, Game, Transaction
# Register your models here.

admin.site.register(Player)
admin.site.register(Game)
admin.site.register(Transaction)
