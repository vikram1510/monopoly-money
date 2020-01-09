# Generated by Django 3.0 on 2020-01-09 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monopoly', '0010_transaction_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='sold_properties',
            field=models.ManyToManyField(blank=True, to='monopoly.Property'),
        ),
    ]