from django.urls import path,include
from .auth_views import RegisterView, MeView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet,GoogleAuthView,SectionViewSet



router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')
router.register('sections', SectionViewSet, basename='sections')

urlpatterns = [
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
     path('', include(router.urls)),

]
