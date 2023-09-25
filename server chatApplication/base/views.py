from django.shortcuts import render
from django.http import JsonResponse
import random
import time
from agora_token_builder import RtcTokenBuilder
from .models import RoomMember
import json
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse
from rest_framework.generics import DestroyAPIView

from rest_framework.response import Response
from rest_framework.decorators import api_view
from my_main.models import *
from my_main.serializers import PersonSerializer
from rest_framework import viewsets
from django.db.models import Q

# Create your views here.
class Video:
    def __init__(self, name, room):
        self.name = name
        self.room = room


def lobby(request):
    x =Video("rajan","OM");
    print(x.room)
    return render(request, 'base/lobby.html',{'x':x})

def room(request):
    return render(request, 'base/room.html')


def getToken(request):
    appId = "9b6ef3e9519f4402aba38360b6d668b2"
    appCertificate = "8154f455ebab4d89824eb8baaf84105e"
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expirationTimeInSeconds = 3600
    currentTimeStamp = int(time.time())
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1

    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)

    return JsonResponse({'token': token, 'uid': uid}, safe=False)


@csrf_exempt
def createMember(request):
    data = json.loads(request.body)
    member, created = RoomMember.objects.get_or_create(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )

    return JsonResponse({'name':data['name']}, safe=False)


def getMember(request):
    uid = request.GET.get('UID')
    room_name = request.GET.get('room_name')

    member = RoomMember.objects.get(
        uid=uid,
        room_name=room_name,
    )
    name = member.name
    return JsonResponse({'name':member.name}, safe=False)

@csrf_exempt
def deleteMember(request):
    data = json.loads(request.body)
    member = RoomMember.objects.get(
        name=data['name'],
        uid=data['UID'],
        room_name=data['room_name']
    )
    member.delete()
    return JsonResponse('Member deleted', safe=False)



#rest framework



@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def get_message_list(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        if id is not None:
            id1=request.GET.get('id1')
            user = Person.objects.get(P_id=id)
            name_seder=user.fname
            # user = Person.objects.get(P_id=id1)
            # name_receiver=user.fname
            
            no=min(id,id1);
            no1=max(id,id1)
            x =Video(name_seder,no+""+no1);
            # print(x.room)
            return render(request, 'base/lobby.html',{'x':x})
        