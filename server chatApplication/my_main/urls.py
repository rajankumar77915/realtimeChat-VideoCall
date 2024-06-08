from django.contrib import admin
from django.urls import path, include

from . import views
from rest_framework import routers
urlpatterns = [
    # path('regitration',views.registration,name='registration'),
    # path('/',include('my_main.urls'))
    path('user/',views.get_user_list,name='u')
    ,path('imgs/',views.img,name='img'),
    path('person/',views.get_person_list,name='p')
    ,path('verify/',views.loginVerify,name='v')
    , path('msg/',views.get_message_list,name='m')
    , path('contact_api/',views.contact_api,name='c')
    , path('loginVerify_store/',views.loginVerify_store,name='c')
    ,path('person_update/<int:pk>', views.update_person, name='update_person')
]




# router = routers.DefaultRouter()
# router.register(r'',views.img1)


# urlpatterns = [
#     path('',include(router.urls)),
# # *router.urls,
# ]


