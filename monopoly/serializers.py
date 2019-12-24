from rest_framework import serializers
from .models import Player, Game, Transaction

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Game
        fields = ['id', 'name', 'players', 'free_parking', 'history']


class TransactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Transaction
        fields = ['to_name', 'from_name', 'amount', 'action']

class NestedGameSerializer(serializers.ModelSerializer):

    history = TransactionSerializer(many=True)
    players = PlayerSerializer(many=True)
    
    class Meta:
        model = Game
        fields = ['id', 'name', 'free_parking', 'players', 'history']


