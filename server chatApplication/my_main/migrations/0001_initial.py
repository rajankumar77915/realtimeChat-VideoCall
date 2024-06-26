# Generated by Django 4.1.5 on 2023-02-20 08:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('u_id', models.AutoField(primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=50)),
                ('firstName', models.CharField(max_length=50)),
                ('lastName', models.CharField(max_length=50)),
                ('Image', models.ImageField(upload_to='')),
                ('email', models.EmailField(max_length=254)),
                ('BirthDate', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userId', models.CharField(max_length=50)),
                ('reciverId', models.CharField(max_length=50)),
                ('message', models.CharField(max_length=50)),
                ('sendDate', models.DateTimeField(auto_now=True)),
                ('u_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='my_main.userinfo')),
            ],
        ),
    ]
