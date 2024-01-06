from django.urls import path, include
from .views import ArticleViewSet,UserViewSet, CommentListCreateView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]