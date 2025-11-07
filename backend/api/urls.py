from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView,
    PaymentListView,
    AIPaymentPlanView,
    CreatorListView,
    CreatorPaymentView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("payments/", PaymentListView.as_view(), name="payments"),
    path("ai-plan/", AIPaymentPlanView.as_view(), name="ai_plan"),
    path("creators/", CreatorListView.as_view(), name="creators"),
    path("ai-tip/", CreatorPaymentView.as_view(), name="ai_tip"),
]
