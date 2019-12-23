from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotAcceptable, NotFound
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

class Deposit(APIView):
    def post(self, request, pk):
        player = Player.objects.get(pk=pk)
        if request.data.get('action') == 'add':
            player.deposit += int(request.data.get('amount'))
            player.amount -= int(request.data.get('amount'))
            player.save()
            return Response({'message': 'successful'})
        
        elif request.data.get('action') == 'collect':
            at_bank = request.data.get('at_bank')
            collect_amount = int(request.data.get('amount'))
            player.deposit -= collect_amount
            player.amount += collect_amount
            if not at_bank:
                player.amount -= round(collect_amount*0.25)
            player.save()
            return Response({'message': 'successful'})

        else:
            return Response({'error': 'invalid action'}, status=400)
            

class AddFreeParking(APIView):
    def post(self, request, pk):
        try: 
            player_id = int(request.data.get('player'))
            amount = int(request.data.get('amount'))
        except:
            raise NotAcceptable({ 'error': 'Invalid payload please send player and amount'})
        
        try:
            game = Game.objects.get(pk=pk)
        except:
            raise NotFound({ 'game': 'Game not found'})

        try:
            player = Player.objects.get(pk=player_id)
        except:
            raise NotFound({ 'player': 'Player not found'})

        if not game.players.filter(pk=player_id).exists():
            raise NotFound({ 'game': 'Player is not in this game'})

        game.free_parking += amount
        player.amount -= amount

        game.save()
        player.save()
        return Response({'message': 'successful'})


class SplitFreeParking(APIView):
    def post(self, request, pk):
        player_id = int(request.data.get('player'))
        try:
            game = Game.objects.get(pk=pk)
        except:
            raise NotFound({ 'game': 'Game not found'})

        try:
            player = Player.objects.get(pk=player_id)
        except:
            raise NotFound({ 'player': 'Player not found'})

        others = game.players.exclude(pk=player_id).exclude(is_bank=True)
        player.amount += int(5 * round((game.free_parking/2)/5))
        for other in others:
            other.amount += int(5 * round(game.free_parking/(2*len(others))/5))
            print('splittig', other.amount)
            other.save()
        game.free_parking = 0
        player.save()
        game.save()

        return Response(PlayerSerializer(others, many=True).data)


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
        





