# backend/api/views.py

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Payment, Creator
from .serializers import RegisterSerializer, PaymentSerializer, CreatorSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .ai_payments import generate_payment_plan, generate_ai_tipping_plan, send_usdc

# --- USER REGISTRATION WITH AUTO-JWT ---
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "user": serializer.data,
            "access": access_token,
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)


# --- PAYMENT MANAGEMENT ---
class PaymentListView(generics.ListCreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --- CREATOR LIST VIEW ---
class CreatorListView(generics.ListAPIView):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer
    permission_classes = [permissions.AllowAny]


# --- AI-POWERED PAYMENT PLAN ---
class AIPaymentPlanView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        topic = request.data.get("topic")
        ai_suggestion = generate_payment_plan(topic)
        return Response({"plan": ai_suggestion}, status=status.HTTP_200_OK)


# --- AI TIPPING SYSTEM (for content creators) ---
class CreatorPaymentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        creator_id = request.data.get("creator_id")
        engagement_data = request.data.get("engagement_data", {"likes": 0, "views": 0})

        try:
            creator = Creator.objects.get(id=creator_id)
        except Creator.DoesNotExist:
            return Response({"error": "Creator not found"}, status=status.HTTP_404_NOT_FOUND)

        # AI-powered tip suggestion
        ai_tip = generate_ai_tipping_plan(engagement_data)

        # Convert AI tip to USDC smallest unit (6 decimals)
        usdc_amount = int(ai_tip * 10**6)

        # Use demo send_usdc
        tx_hash = send_usdc(creator.wallet_address, usdc_amount)

        return Response({
            "creator": creator.user.username,
            "wallet_address": creator.wallet_address,
            "sent_tip_usdc": ai_tip,
            "tx_hash": tx_hash
        }, status=status.HTTP_200_OK)
