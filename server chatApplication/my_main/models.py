from django.db import models

# Create your models here.

class Person(models.Model):
    P_id = models.AutoField(primary_key=True);
    fname = models.CharField(max_length=100);
    mname = models.CharField(max_length=100);
    lname = models.CharField(max_length=100);
    profilePic = models.ImageField(upload_to='pic/',null=True, blank=True);

class User(models.Model):
    p_id = models.ForeignKey('Person', on_delete=models.CASCADE);
    birthdate = models.DateField(null=True, blank=True);
    emailId = models.EmailField(default='');

class ReportInfo(models.Model):
    reportId = models.AutoField(primary_key=True);
    report = models.CharField(max_length=250);
    p_id = models.ForeignKey('User', on_delete=models.CASCADE);

class Admin(models.Model):
    reportId = models.ForeignKey('ReportInfo',on_delete=models.CASCADE)
    statusOfReport = models.BooleanField(default=False);
    
class ContactInfo(models.Model):
    contactId= models.AutoField(primary_key=True);
    p_id = models.ForeignKey('User', on_delete=models.CASCADE);
    emailId = models.EmailField(default='');
    mobile = models.CharField(max_length=10,null=False,blank=False,default='');


class Message(models.Model):
    mes = models.CharField(max_length=500,null=True,blank=True);
    image= models.ImageField(null=True, blank=True,default='');
    file = models.FileField(null=True, blank=True,default='');
    video = models.FileField(null=True, blank=True,default='');
    sender = models.ForeignKey('Person', on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey('Person', on_delete=models.CASCADE, related_name='received_messages')


# class UserInfo(models.Model):
#     u_id =  models.AutoField(primary_key=True)
#     userName = models.CharField(max_length=50)
#     password = models.CharField(max_length=50)
#     firstName = models.CharField(max_length=50)
#     lastName = models.CharField(max_length=50)
#     Image = models.ImageField()
#     email = models.EmailField()
#     BirthDate = models.DateField()
#     # def __str__(self):#why i wrote this funcion Because  in admin i want to identify object via name
#     #     return self.userName

# class MobileInfo(models.Model):
#     # u_id =  models.AutoField(primary_key=True)
#     u_id = models.ForeignKey('UserInfo', on_delete=models.CASCADE)
#     mobile_no = models.IntegerField(max_length=10)

class LoginInfo(models.Model):
    P_id = models.ForeignKey('Person', on_delete=models.CASCADE)
    useName = models.CharField(max_length=25)
    password = models.CharField(max_length=8)

# class GroupInfo(models.Model):
#     u_id = models.ForeignKey('UserInfo', on_delete=models.CASCADE)
#     group_id = models.AutoField(primary_key=True)
#     group_name = models.CharField(max_length=50)

# class HistoryInfo(models.Model):
#       userId  = models.CharField(max_length=50)
#       reciverId  = models.CharField(max_length=50)
       
    



class Img(models.Model):
    image= models.ImageField(upload_to='images/');



# class Message(models.Model):
#     u_id = models.ForeignKey('UserInfo', on_delete=models.CASCADE,related_name='sender_messages')
#     reciverId = models.ForeignKey('UserInfo', on_delete=models.CASCADE,related_name='receive_messages')
    
#     # reciverId  = models.IntegerField()
#     message  = models.CharField(max_length=50)
#     sendDate = models.DateTimeField(auto_now=True)
#     def __str__(self):#why i wrote this funcion Because  in admin i want to identify object via name
#         return f"{self.u_id.userName} to {self.reciverId.userName}: {self.message}"
