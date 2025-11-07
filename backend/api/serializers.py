from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Creator, Engagement, Payment


# --- USER SERIALIZER ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


# --- USER REGISTRATION ---
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


# --- CREATOR SERIALIZER ---
class CreatorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Creator
        fields = ["id", "user", "bio", "wallet_address"]


# --- ENGAGEMENT SERIALIZER ---
class EngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagement
        fields = "__all__"


# --- PAYMENT SERIALIZER ---
class PaymentSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"
