from django.shortcuts import render
# from .models import UserInfo
from django.http import HttpResponse
from .serializers import *
from rest_framework.generics import DestroyAPIView

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from rest_framework import viewsets
from django.db.models import Q




@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def get_user_list(request):
    if request.method == 'POST':
        S = UserSerializer(data=request.data)
        print(S)
        if S.is_valid():
            S.save()
            return Response({'Created successfully':True})
        else:
            return Response({'Created successfully':False})
    
    elif request.method == 'GET':
        id = request.GET.get('id')
        if id is not None:
            user = User.objects.get(u_id=id)
            S = UserSerializer(instance=user)
            return Response(S.data)
        else:
            user = User.objects.all()
            S = UserSerializer(user, many=True)
            return Response(S.data)
    
    elif request.method == 'PUT':
        id = request.GET.get('id')
        user = User.objects.get(u_id=id)
        S = UserSerializer(instance=user, data=request.data)
        if S.is_valid():
            S.save()
            return Response({'Updated successfully':True})
        else:
            return Response({'Updated successfully':False})




@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def get_person_list(request):
    if request.method == 'POST':
        S = PersonSerializer(data=request.data)
        print(S)
        if S.is_valid():
            person = S.save()
            data = {'P_id': person.P_id}
            
            print(data)
            return Response(data)
        else:
            # print("OMOMOMOMOM")
            print(S.error_messages)
            return Response({'Created successfully':False})
    
    elif request.method == 'GET':
        id = request.GET.get('id')
        if id is not None:
            user = Person.objects.get(P_id=id)
            S = PersonSerializer(instance=user)
            return Response(S.data)
        else:
            user = Person.objects.all()
            S = PersonSerializer(user, many=True)
            print(S.data[0].get('P_id'))


            return Response(S.data)
    
    elif request.method == 'PUT':
        id = request.GET.get('id')
        user = Person.objects.get(u_id=id)
        S = PersonSerializer(instance=user, data=request.data)
        if S.is_valid():
            S.save()
            return Response({'Updated successfully':True})
        else:
            return Response({'Updated successfully':False})
        

@api_view(['POST'])#for security we won't allow get,delete ,updat
def loginVerify(request):
    print(request.data)
    serializer = LoginInfoSerializer(data=request.data)
    if serializer.is_valid():
            username=serializer.data.get('useName');
            password = serializer.data.get('password')

                    
            try:
            # check if the LoginInfo object with the provided username exists in the database
                login_info = LoginInfo.objects.get(useName=username)#return object
                # print(login_info.useName);
                id=login_info.P_id.P_id;
                

            except LoginInfo.DoesNotExist:
            # the provided username is not found in the database, return an error response
                return Response(0)
        
        # check if the provided password matches the stored password
            if password == login_info.password:
            # authentication successful, return a success response
                return Response( id)
            else:
            # authentication failed, return an error response
                return Response(0)
    else:
        # the data is invalid, return a bad request response with the validation errors
        
        return Response(0)


@api_view(['POST'])#for security we won't allow get,delete ,updat
def loginVerify_store(request):
    serializer = LoginInfoSerializer(data=request.data)
    if serializer.is_valid(): 
            serializer.save()
            return Response("sucess")
    return Response("error");         


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def get_message_list(request):
    if request.method == 'POST':
        S = MessageInfoSerializer(data=request.data)
        print(S)
        if S.is_valid():
            S.save()
            return Response({'Created successfully':True})
        else:
            print("why y")
            print(S.errors)
            return Response({'Created successfully':False})
    
    elif request.method == 'GET':
        id = request.GET.get('id')
        if id is not None:
            receiver_id = request.GET.get('id2')
            user =  Message.objects.filter(
        (Q(sender=id) & Q(receiver=receiver_id)) |
        (Q(sender=receiver_id) & Q(receiver=id))
    ).order_by('id')
            # S=[]
            
            S=( MessageInfoSerializer(user,many=True).data)

            return Response(S)
        else:
            user = Message.objects.all()
            S = MessageInfoSerializer(user, many=True)
            print(S.data[0].get('P_id'))


            return Response(S.data)
    
    elif request.method == 'PUT':
        id = request.GET.get('id')
        user = Message.objects.get(u_id=id)
        S = MessageInfoSerializer(instance=user, data=request.data)
        if S.is_valid():
            S.save()
            return Response({'Updated successfully':True})
        else:
            return Response({'Updated successfully':False})
    elif request.method == 'DELETE':
        id = request.GET.get('id')
        message = Message.objects.filter(id=id).first()
        if message is None:
            return Response({'delete successfully': False, 'errors': 'Message not found'}, status="status.HTTP_404_NOT_FOUND")
        message.delete()
        return Response({'delete successfully':True})


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def contact_api(request):
    if request.method == 'POST':
        S = ContactInfoSerializer(data=request.data)
        print(S)
        if S.is_valid():
            S.save()
            return Response({'Created successfully':True})
        else:
            return Response({'Created successfully':False})
    
    elif request.method == 'GET':
        id = request.GET.get('id')
        if id is not None:
            user = ContactInfo.objects.get(P_id=id)
            S = ContactInfoSerializer(instance=user)
            return Response(S.data)
        else:
            user = ContactInfo.objects.all()
            S = ContactInfoSerializer(user, many=True)
            # print(S.data[0].get('P_id'))


            return Response(S.data)
    
    elif request.method == 'PUT':
        id = request.GET.get('id')
        user = ContactInfo.objects.get(u_id=id)
        S = ContactInfoSerializer(instance=user, data=request.data)
        if S.is_valid():
            S.save()
            return Response({'Updated successfully':True})
        else:
            return Response({'Updated successfully':False})




from django.shortcuts import render, redirect, get_object_or_404
from .models import Person
from .forms import PersonForm

def update_person(request, pk):
    person = get_object_or_404(Person, pk=pk)
    if request.method == 'POST':
        form = PersonForm(request.POST, request.FILES, instance=person)
        if form.is_valid():
            form.save()
            return redirect('http://localhost:3000/app')
    else:
        form = PersonForm(instance=person)
    return render(request, 'update_person.html', {'form': form})


 


class img1(viewsets.ModelViewSet):
    queryset=Img.objects.all()
    serializer_class=ImgSerializer

 

# http://127.0.0.1:8000/media/images/Untitled.png
# http://127.0.0.1:8000/media/images/Untitled_1.png
# http://127.0.0.1:8000/media/download_1_xZxDjYh.jfif

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Img
from .serializers import ImgSerializer

@api_view(['GET', 'POST'])
def img(request):
    if request.method == 'GET':
        images = Img.objects.all()
        serializer = ImgSerializer(images, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ImgSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
