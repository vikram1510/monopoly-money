from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .serializers import PlayerSerializer, GameSerializer, NestedGameSerializer
from django.http import HttpResponse, JsonResponse

from .models import Player, Game

class PlayerList(ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get_queryset(self):
        params = self.request.GET
        if not params:
            return Player.objects.all()

        if 'name' in params:
            name = params['name']
            return Player.objects.filter(name=name)
        
        if 'game' in params:
            game = params['game']
            return Player.objects.filter(game=game)

class PlayerDetail(RetrieveUpdateDestroyAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class GameList(ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def get_queryset(self):
        params = self.request.GET
        if not params:
            return Game.objects.all()

        if 'name' in params:
            name = params['name']
            game = Game.objects.filter(name=name)
            if not game:
                raise ValidationError({ 'name': ['Game not Found']})
            return game

class GameDetail(RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return NestedGameSerializer
        else:
            return GameSerializer

class Payment(APIView):
    
    def post(self, request, pk):
        serializer = GameSerializer(Game.objects.get(pk=pk))
        amount = int(request.data.get('amount'))

        from_player = Player.objects.get(pk=request.data.get('from'))
        to_player = Player.objects.get(pk=request.data.get('to'))

        if not from_player.is_bank:
            from_player.amount -= amount
        if not to_player.is_bank:
            to_player.amount += amount

        from_player.save()
        to_player.save()
        return Response(serializer.data)
        





