from rest_framework import serializers
from .models import Student, AreaOfInterest, Skill, School, Major, Employer, Opportunity

class StudentSerializer(serializers.ModelSerializer):
    area_of_interest = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=AreaOfInterest.objects.all()
    )
    skills = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Skill.objects.all()
    )
    school = serializers.SlugRelatedField(
        slug_field='name',
        queryset=School.objects.all()
    )
    major = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Major.objects.all()
    )

    class Meta:
        model = Student
        fields = '__all__'


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name']

class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ['id', 'name']

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = ['id', 'name', 'email', 'phone_number', 'description']

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['id', 'employer', 'title', 'description', 'location', 'type', 'posted_on']