from rest_framework import serializers
from .models import Player, Game

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Game
        fields = ['id', 'name', 'players', 'free_parking']

class NestedGameSerializer(serializers.ModelSerializer):

    players = PlayerSerializer(many=True)
    
    class Meta:
        model = Game
        fields = ['id', 'name', 'free_parking', 'players']
