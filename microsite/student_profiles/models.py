from django.db import models

class School(models.Model):
    SCHOOL_CHOICES = [
        ('SOE', 'School of Engineering'),
        ('SME', 'School of Management and Entrepreneurship'),
        ('SHSS', 'School of Humanities and Social Sciences'),
        ('SNS', 'School of Natural Sciences')
    ]
    name = models.CharField(max_length=255, choices=SCHOOL_CHOICES)
    def __str__(self):
        return self.name
    
class Major(models.Model):
    name = models.CharField(max_length=255)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='majors')
    def __str__(self):
        return self.name
    
class AreaOfInterest(models.Model):
    name = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return self.name
    
class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return self.name
    
class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True, unique=True)
    sex = models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    snu_email = models.EmailField(max_length=255, unique=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    is_available = models.BooleanField(default=True)
    availability_details = models.CharField(max_length=255, blank=True, null=True)
    passing_year = models.IntegerField()
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, related_name='students')
    major = models.ForeignKey(Major, on_delete=models.SET_NULL, null=True, related_name='students')
    area_of_interest = models.ManyToManyField(AreaOfInterest, related_name='students', blank=True)
    skills = models.ManyToManyField(Skill, related_name='students', blank=True)
    linkedin_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    experience = models.CharField(max_length=512, blank=True, null=True)
    projects = models.TextField(max_length=512, blank=True, null=True)

    def __str__(self):
        return self.name

class Employer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Opportunity(models.Model):
    title = models.CharField(max_length=255)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='opportunities')
    description = models.TextField()
    location = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    area_of_interest = models.ForeignKey(AreaOfInterest, on_delete=models.SET_NULL, related_name='opportunities', null=True)
    skills_required = models.ManyToManyField(Skill, related_name='opportunities', blank=True)
    is_open = models.BooleanField(default=True)
    posted_on = models.DateField(auto_now_add=True)
    last_date = models.DateField()

    def __str__(self):
        return f"{self.title} by {self.employer.name}"