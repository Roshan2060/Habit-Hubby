
from rest_framework import serializers
from .models import Section, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'completed', 'section','date']

    def validate_section(self, value):
        user = self.context['request'].user
        if not Section.objects.filter(id=value.id, user=user).exists():
            raise serializers.ValidationError("Invalid section.")
        return value

class SectionSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)  # assuming related_name='tasks'

    class Meta:
        model = Section
        fields = ['id', 'title', 'tasks']