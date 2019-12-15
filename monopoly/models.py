from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Player(models.Model):
    name = models.CharField(max_length=100, unique=True)
    amount = models.IntegerField(default=1500)
    game = models.ForeignKey(Game, related_name="players", on_delete=models.DO_NOTHING, null=True)

    def __str__(self):
        return self.name



