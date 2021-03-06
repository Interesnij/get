from django.db import models
from django.db.models import Q
from blog.models import Blog
from autoslug import AutoSlugField


class BlogCategory(models.Model):
	name = models.CharField(max_length=100, verbose_name="Название")
	slug = AutoSlugField(populate_from='name', unique=True, db_index=True)
	order = models.PositiveSmallIntegerField(default=0, verbose_name="Порядковый номер")

	def __str__(self):
		return self.name

	class Meta:
		ordering = ["order", "name"]
		verbose_name = "категория блога"
		verbose_name_plural = "категории блога"

	def __str__(self):
		return self.name

	def is_blog_exists(self):
		return self.blog_categories.filter(category=self).values("pk").exists()

	def get_blog_10(self):
		list = self.blog_categories.filter(category=self)[:10]
		return list

	def get_blog(self):
		list = self.blog_categories.filter(category=self)
		return list

	def get_count(self):
		list = self.blog_categories.filter(category=self).values("pk").count()
		return list
