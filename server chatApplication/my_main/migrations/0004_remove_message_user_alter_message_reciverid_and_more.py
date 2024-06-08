# Generated by Django 4.1.5 on 2023-02-21 17:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('my_main', '0003_userinfo_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='user',
        ),
        migrations.AlterField(
            model_name='message',
            name='reciverId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receive_messages', to='my_main.userinfo'),
        ),
        migrations.AlterField(
            model_name='message',
            name='u_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender_messages', to='my_main.userinfo'),
        ),
    ]
