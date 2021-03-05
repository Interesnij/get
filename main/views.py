from django.views.generic.base import TemplateView
from generic.mixins import CategoryListMixin
from common.utils import get_small_template
from works.models import Works
from blog.models import Blog


class MainPageView(TemplateView, CategoryListMixin):
	template_name = None

	def get(self,request,*args,**kwargs):
		self.template_name = get_small_template("main/mainpage.html", request.META['HTTP_USER_AGENT'])
		return super(MainPageView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context = super(MainPageView,self).get_context_data(**kwargs)
		context["works"] = Works.objects.only("pk")[:2]
		context["blog"] = Blog.objects.only("pk")[:2]
		return context
