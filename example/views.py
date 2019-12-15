from rest_framework.generics import ListCreateAPIView
from .models import Fruit
from .serializers import FruitSerializer

class FruitList(ListCreateAPIView):
    queryset = Fruit.objects.all()
    serializer_class = FruitSerializer

# Create your views here.
