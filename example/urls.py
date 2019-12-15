from django.urls import path
from .views import FruitList

urlpatterns = [
    path('fruits', FruitList.as_view())
]
