from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .models import Task, User,Section
from .serializer import TaskSerializer,SectionSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions



class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return tasks only from sections owned by the logged-in user
        return Task.objects.filter(section__user=self.request.user).order_by('date')

    def perform_create(self, serializer):
        section = serializer.validated_data.get('section')
        if not section:
            raise ValidationError({"section": "This field is required."})

        if section.user != self.request.user:
            raise PermissionDenied("You cannot add tasks to this section.")

        serializer.save(user=self.request.user)

    # Optional swagger doc decorator, keep or remove as needed
    @swagger_auto_schema(
        operation_summary="Create a new task",
        operation_description="Adds a new task under a section with name, date, and completion status.",
        responses={201: TaskSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get('id_token')
        if not token:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'  # Replace with your client ID

            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), CLIENT_ID)

            if not idinfo.get('email_verified'):
                return Response({'error': 'Email not verified'}, status=status.HTTP_400_BAD_REQUEST)

            email = idinfo['email']
            name = idinfo.get('name', '')
            avatar = idinfo.get('picture', '')

            user_model = User if hasattr(self, 'User') else User  # Defensive import usage
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email.split('@')[0],
                    'avatar': avatar,
                    'first_name': name.split(' ')[0] if name else '',
                    'last_name': ' '.join(name.split(' ')[1:]) if name else '',
                }
            )

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'username': user.username,
                    'avatar': user.avatar,
                }
            })
        
        except ValueError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Section.objects.filter(user=self.request.user).order_by('title')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
