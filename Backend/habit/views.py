from rest_framework import viewsets, permissions
from drf_yasg.utils import swagger_auto_schema
from .serializer import TaskSerializer
from .models import Task

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('date')
    serializer_class = TaskSerializer
    permission_classes = []

    @swagger_auto_schema(
        operation_summary="Create a new task",
        operation_description="Adds a new task with name, date, and completion status.",
        responses={201: TaskSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
