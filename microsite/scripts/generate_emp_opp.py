import random
import os
import django
import sys

from faker import Faker

sys.path.insert(0, r'C:\Users\ishui\Desktop\Microsite\SNU-microsite-internships\microsite')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'microsite.settings')
django.setup()

from student_profiles.models import Employer, Opportunity, Major, School, AreaOfInterest, Skill

def add_emp_opp(n):
    faker = Faker()

    areas = list(AreaOfInterest.objects.all())
    skills = list(Skill.objects.all())

    employers = list(Employer.objects.all())
   

    for _ in range(n):
        opportunity = Opportunity.objects.create(
            employer=random.choice(employers),
            title=faker.job(),
            description=faker.text(),
            area_of_interest=random.choice(areas),
            location=faker.city(),
            type=random.choice(['Internship', 'Full-time', 'Part-time']),
            posted_on=faker.date_between(start_date='-2y', end_date='today')
        )

        num_skills = random.randint(1, 5)
        opportunity_skills = random.sample(skills, num_skills)
        opportunity.skills_required.set(opportunity_skills)

if __name__ == "__main__":
    add_emp_opp(10)