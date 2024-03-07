from rest_framework import serializers
from .models import Student, AreaOfInterest, Skill, School, Major

class StudentSerializer(serializers.ModelSerializer):
    area_of_interest = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    skills = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    school = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    major = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Student
        fields = '__all__'