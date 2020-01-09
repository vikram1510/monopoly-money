from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    free_parking = models.IntegerField(default=0)
    sold_properties = models.CharField(max_length=100, blank=True)

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

class Transaction(models.Model):
    from_name = models.CharField(max_length=50)
    to_name = models.CharField(max_length=50)
    amount = models.IntegerField()
    action = models.CharField(max_length=20)
    game = models.ForeignKey(Game, related_name="history", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True, null=True)

    
    
