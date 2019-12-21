from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    free_parking = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Player(models.Model):
    name = models.CharField(max_length=100, unique=True)
    amount = models.IntegerField(default=1500)
    game = models.ForeignKey(Game, related_name="players", on_delete=models.DO_NOTHING, null=True)
    is_bank = models.BooleanField(default=False)
    deposit = models.IntegerField(default=0)
    photo = models.CharField(max_length=9000, null=True, blank=True)
    color = models.CharField(max_length=100, default='royalblue')

    def __str__(self):
        return self.name



