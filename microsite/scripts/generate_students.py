import os
import django
import random
import sys
sys.path.insert(0, r'C:\Users\ishui\Desktop\Microsite\SNU-microsite-internships\microsite')


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'microsite.settings')
django.setup()

from faker import Faker
from student_profiles.models import Student, School, Major, AreaOfInterest, Skill

fake = Faker()

def create_schools_majors(n):
    schools = []
    majors = []
    for _ in range(n):
        school_choice = random.choice(School.SCHOOL_CHOICES)[0]
        school, created = School.objects.get_or_create(name=school_choice)
        schools.append(school)
        
        major = Major.objects.create(name=f'{fake.word()} Major', school=school)
        majors.append(major)
    
    return schools, majors

def create_areas_skills(n):
    areas = []
    skills = []
    for _ in range(n):
        area_name = fake.word().capitalize()
        skill_name = fake.word().capitalize()
        
        area, _ = AreaOfInterest.objects.get_or_create(name=area_name)
        areas.append(area)

        skill, _ = Skill.objects.get_or_create(name=skill_name)
        skills.append(skill)
    return areas, skills


def add_students(n):
    schools, majors = create_schools_majors(n)
    areas, skills = create_areas_skills(n)

    for _ in range(n):
        student = Student.objects.create(
            name=fake.name(),
            roll_number=fake.unique.random_int(min=1000, max=9999),
            phone_number=fake.phone_number(),
            snu_email=fake.unique.email(),
            cgpa=round(random.uniform(1.0, 4.0), 2),
            is_available=fake.boolean(),
            availability_details=fake.sentence(),
            passing_year=random.randint(2020, 2025),
            school=random.choice(schools),
            major=random.choice(majors),
            linkedin_link=fake.url(),
            github_link=fake.url(),
            experience=fake.sentence(),
            projects=fake.sentence(),
        )
        student.area_of_interest.set(random.choices(areas, k=random.randint(1, len(areas))))
        student.skills.set(random.choices(skills, k=random.randint(1, len(skills))))

if __name__ == "__main__":
    add_students(10)
