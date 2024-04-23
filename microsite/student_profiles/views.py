from django.http import HttpResponse
from rest_framework import viewsets, filters
from rest_framework.generics import ListAPIView, ListCreateAPIView
from .models import Student, School, Major, Employer, Opportunity
from .serializers import EmployerSerializer, OpportunitySerializer, StudentSerializer, SchoolSerializer, MajorSerializer

def index(request):
    return HttpResponse("Hello, world. You're at the student profiles index.")

class StudentViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling CRUD operations on student profiles.
    Get the queryset of student profiles based on query parameters.
    Keyword arguments:
    cgpa -- Filter by CGPA (default: None)
    school -- Filter by school ID (default: None)
    major -- Filter by major ID (default: None)
    passing_year -- Filter by passing year (default: None)

    Search on Skills or area of interests

    Return:
    A queryset of student profiles filtered by the provided query parameters.
    """

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['skills__name', 'area_of_interest__name']

    def get_queryset(self):
        """
        Get the queryset of student profiles based on query parameters.

        Keyword arguments:
        cgpa -- Filter by CGPA (default: None)
        school -- Filter by school ID (default: None)
        major -- Filter by major ID (default: None)
        passing_year -- Filter by passing year (default: None)

        Return:
        A queryset of student profiles filtered by the provided query parameters.
        """
        queryset = Student.objects.all()
        cgpa = self.request.query_params.get('cgpa')
        school = self.request.query_params.get('school')
        major = self.request.query_params.get('major')
        passing_year = self.request.query_params.get('passing_year')

        if cgpa:
            queryset = queryset.filter(cgpa__gte=cgpa)
        if school:
            queryset = queryset.filter(school__name=school)
        if major:
            queryset = queryset.filter(major__name=major)
        if passing_year:
            queryset = queryset.filter(passing_year=passing_year)

        return queryset

class SchoolListView(ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class MajorListView(ListAPIView):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer

class EmployerListCreateView(ListCreateAPIView):
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer

class OpportunityListCreateView(ListCreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer