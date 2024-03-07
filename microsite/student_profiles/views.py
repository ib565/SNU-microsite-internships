from django.http import HttpResponse
from rest_framework import viewsets, filters
from .models import Student
from .serializers import StudentSerializer

def index(request):
    return HttpResponse("Hello, world. You're at the student profiles index.")

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['skills__name', 'area_of_interest__name']
    
    def get_queryset(self):
        queryset = Student.objects.all()
        cgpa = self.request.query_params.get('cgpa')
        school = self.request.query_params.get('school')
        major = self.request.query_params.get('major')
        passing_year = self.request.query_params.get('passing_year')

        if cgpa:
            queryset = queryset.filter(cgpa=cgpa)
        if school:
            queryset = queryset.filter(school__id=school)
        if major:
            queryset = queryset.filter(major__id=major)
        if passing_year:
            queryset = queryset.filter(passing_year=passing_year)

        return queryset
