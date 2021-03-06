from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from django.views.generic import ListView
from works_cat.models import WorksCategory
from common.utils import get_small_template


class WorksCatsView(ListView, CategoryListMixin):
	template_name = None
	paginate_by = 20

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("works/works_cats.html", request.META['HTTP_USER_AGENT'])
		return super(WorksCatsView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		cats = WorksCategory.objects.only("pk")
		return cats
