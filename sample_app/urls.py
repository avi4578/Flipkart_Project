from django.urls import path
from .import views


urlpatterns=[
    path('signup',views.signup),
    path('login',views.login),
    # path('logout',views.logout),
    path('adddocument',views.add_document),
    path('editdocument',views.edit_document),
    path('fetchdocument', views.fetchData),
    path('singlefetchData/<int:id>',views.singlefetchData),
    path('search_document', views.search_document),
    path('fetch_document/', views.fetch_documents, name='fetch_documents'),
    path('delete-document/<int:id>', views.delete_document, name='delete_document'),
    path('delete-all/', views.delete_all_documents, name='delete_all_documents'),


] 