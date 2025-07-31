from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User,Task
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('username', 'first_name', 'last_name', 'bio', 'avatar')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    
    list_display = ('email', 'username', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'completed')   # Columns shown in admin list
    list_filter = ('completed', 'date')            # Filters in sidebar
    search_fields = ('name',)                       # Search bar fields
    ordering = ('date',)
