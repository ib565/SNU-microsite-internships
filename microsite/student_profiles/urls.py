from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'students', views.StudentViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path('schools/', views.SchoolListView.as_view(), name='school-list'),
    path('majors/', views.MajorListView.as_view(), name='major-list'),
    path('employers/', views.EmployerListCreateView.as_view(), name='employer-list'),
    path('opportunities/', views.OpportunityListCreateView.as_view(), name='opportunity-list'),
    path("index/", views.index, name="index"),
]