from django.contrib import admin

from .models import Student, Employer, Opportunity

admin.site.register(Student)
admin.site.register(Employer)
admin.site.register(Opportunity)
