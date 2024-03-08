from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'students', views.StudentViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path('schools/', views.SchoolListView.as_view(), name='school-list'),
    path('majors/', views.MajorListView.as_view(), name='major-list'),
    path("index/", views.index, name="index"),
]