from django.urls import path
from .views import PlayerList,Payment,GameList,GameDetail,PlayerDetail,Deposit,AddFreeParking,SplitFreeParking

urlpatterns = [
    path('players', PlayerList.as_view()),
    path('players/<int:pk>', PlayerDetail.as_view()),
    path('players/<int:pk>/deposit', Deposit.as_view()),
    path('games', GameList.as_view()),
    path('games/<int:pk>', GameDetail.as_view()),
    path('games/<int:pk>/payment', Payment.as_view()),
    path('games/<int:pk>/freeparkingadd', AddFreeParking.as_view()),
    path('games/<int:pk>/freeparkingsplit', SplitFreeParking.as_view())
]
