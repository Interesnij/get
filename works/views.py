from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from works.models import Works
from tags.models import Tag
from django.views.generic import ListView
from common.utils import get_small_template


class WorksDetailView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.work = Works.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("works/work.html", request.META['HTTP_USER_AGENT'])
		return super(WorksDetailView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(WorksDetailView,self).get_context_data(**kwargs)
		context["object"] = self.work
		context['tags'] = Tag.objects.only("pk")
		return context


class WorksListView(ListView, CategoryListMixin):
	template_name, paginate_by = None, 12

	def get(self,request,*args,**kwargs):
		from works_cat.models import WorksCategory

		self.cat = WorksCategory.objects.get(slug=self.kwargs["slug"])
		self.template_name = get_small_template("works/works_list.html", request.META['HTTP_USER_AGENT'])
		return super(WorksListView,self).get(request,*args,**kwargs)

	def get_queryset(self):
		return Works.objects.filter(category=self.cat)

	def get_context_data(self, **kwargs):
		context = super(WorksListView, self).get_context_data(**kwargs)
		context['cat'] = self.cat
		context['tags'] = Tag.objects.only("pk")
		return context


class WorksCalculator(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.work = Works.objects.get(pk=self.kwargs["pk"])
		self.template_name = get_small_template("works/calculator.html", request.META['HTTP_USER_AGENT'])
		return super(WorksCalculator,self).get(request,*args,**kwargs)
