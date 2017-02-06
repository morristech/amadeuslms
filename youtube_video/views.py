from django.shortcuts import get_object_or_404, redirect, render
from django.views import generic
from django.contrib import messages
from django.http import JsonResponse
from django.core.urlresolvers import reverse, reverse_lazy
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.mixins import LoginRequiredMixin

from amadeus.permissions import has_subject_permissions, has_resource_permissions

import time
from log.models import Log
from log.mixins import LogMixin
from log.decorators import log_decorator_ajax, log_decorator

from topics.models import Topic

from .forms import YTVideoForm, InlinePendenciesFormset
from .models import YTVideo

class NewWindowView(LoginRequiredMixin, LogMixin, generic.DetailView):
	log_component = 'resources'
	log_action = 'view'
	log_resource = 'ytvideo'
	log_context = {}

	login_url = reverse_lazy("users:login")
	redirect_field_name = 'next'

	template_name = 'youtube/window_view.html'
	model = YTVideo
	context_object_name = 'youtube'

	def dispatch(self, request, *args, **kwargs):
		slug = self.kwargs.get('slug', '')
		youtube = get_object_or_404(YTVideo, slug = slug)

		if not has_resource_permissions(request.user, youtube):
			return redirect(reverse_lazy('subjects:home'))

		return super(NewWindowView, self).dispatch(request, *args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(NewWindowView, self).get_context_data(**kwargs)
		
		context['title'] = _("%s - Video")%(self.object.name)

		self.log_context['category_id'] = self.object.topic.subject.category.id
		self.log_context['category_name'] = self.object.topic.subject.category.name
		self.log_context['category_slug'] = self.object.topic.subject.category.slug
		self.log_context['subject_id'] = self.object.topic.subject.id
		self.log_context['subject_name'] = self.object.topic.subject.name
		self.log_context['subject_slug'] = self.object.topic.subject.slug
		self.log_context['topic_id'] = self.object.topic.id
		self.log_context['topic_name'] = self.object.topic.name
		self.log_context['topic_slug'] = self.object.topic.slug
		self.log_context['ytvideo_id'] = self.object.id
		self.log_context['ytvideo_name'] = self.object.name
		self.log_context['ytvideo_slug'] = self.object.slug
		self.log_context['timestamp_start'] = str(int(time.time()))

		super(NewWindowView, self).createLog(self.request.user, self.log_component, self.log_action, self.log_resource, self.log_context) 

		self.request.session['log_id'] = Log.objects.latest('id').id

		return context

class InsideView(LoginRequiredMixin, LogMixin, generic.DetailView):
	log_component = 'resources'
	log_action = 'view'
	log_resource = 'ytvideo'
	log_context = {}
	
	login_url = reverse_lazy("users:login")
	redirect_field_name = 'next'

	template_name = 'youtube/view.html'
	model = YTVideo
	context_object_name = 'youtube'	

	def dispatch(self, request, *args, **kwargs):
		slug = self.kwargs.get('slug', '')
		youtube = get_object_or_404(YTVideo, slug = slug)

		if not has_resource_permissions(request.user, youtube):
			return redirect(reverse_lazy('subjects:home'))

		return super(InsideView, self).dispatch(request, *args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(InsideView, self).get_context_data(**kwargs)

		context['title'] = self.object.name
		
		context['topic'] = self.object.topic
		context['subject'] = self.object.topic.subject

		self.log_context['category_id'] = self.object.topic.subject.category.id
		self.log_context['category_name'] = self.object.topic.subject.category.name
		self.log_context['category_slug'] = self.object.topic.subject.category.slug
		self.log_context['subject_id'] = self.object.topic.subject.id
		self.log_context['subject_name'] = self.object.topic.subject.name
		self.log_context['subject_slug'] = self.object.topic.subject.slug
		self.log_context['topic_id'] = self.object.topic.id
		self.log_context['topic_name'] = self.object.topic.name
		self.log_context['topic_slug'] = self.object.topic.slug
		self.log_context['ytvideo_id'] = self.object.id
		self.log_context['ytvideo_name'] = self.object.name
		self.log_context['ytvideo_slug'] = self.object.slug
		self.log_context['timestamp_start'] = str(int(time.time()))

		super(InsideView, self).createLog(self.request.user, self.log_component, self.log_action, self.log_resource, self.log_context) 

		self.request.session['log_id'] = Log.objects.latest('id').id

		return context

class CreateView(LoginRequiredMixin, LogMixin, generic.edit.CreateView):
	log_component = 'resources'
	log_action = 'create'
	log_resource = 'ytvideo'
	log_context = {}

	login_url = reverse_lazy("users:login")
	redirect_field_name = 'next'

	template_name = 'youtube/create.html'
	form_class = YTVideoForm

	def dispatch(self, request, *args, **kwargs):
		slug = self.kwargs.get('slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		if not has_subject_permissions(request.user, topic.subject):
			return redirect(reverse_lazy('subjects:home'))

		return super(CreateView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		self.object = None
		
		form_class = self.get_form_class()
		form = self.get_form(form_class)

		slug = self.kwargs.get('slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		pendencies_form = InlinePendenciesFormset(initial = [{'subject': topic.subject.id, 'actions': [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]}])

		return self.render_to_response(self.get_context_data(form = form, pendencies_form = pendencies_form))

	def post(self, request, *args, **kwargs):
		self.object = None
		
		form_class = self.get_form_class()
		form = self.get_form(form_class)

		slug = self.kwargs.get('slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		pendencies_form = InlinePendenciesFormset(self.request.POST, initial = [{'subject': topic.subject.id, 'actions': [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]}])
		
		if (form.is_valid() and pendencies_form.is_valid()):
			return self.form_valid(form, pendencies_form)
		else:
			return self.form_invalid(form, pendencies_form)

	def get_initial(self):
		initial = super(CreateView, self).get_initial()

		slug = self.kwargs.get('slug', '')

		topic = get_object_or_404(Topic, slug = slug)
		initial['subject'] = topic.subject
		
		return initial

	def form_invalid(self, form, pendencies_form):
		for p_form in pendencies_form.forms:
			p_form.fields['action'].choices = [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]

		return self.render_to_response(self.get_context_data(form = form, pendencies_form = pendencies_form))

	def form_valid(self, form, pendencies_form):
		self.object = form.save(commit = False)

		slug = self.kwargs.get('slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		self.object.topic = topic
		self.object.order = topic.resource_topic.count() + 1

		if not self.object.topic.visible and not self.object.topic.repository:
			self.object.visible = False

		self.object.save()

		pendencies_form.instance = self.object
		pendencies_form.save(commit = False)
		
		for pform in pendencies_form.forms:
			pend_form = pform.save(commit = False)

			if not pend_form.action == "":
				pend_form.save()

		self.log_context['category_id'] = self.object.topic.subject.category.id
		self.log_context['category_name'] = self.object.topic.subject.category.name
		self.log_context['category_slug'] = self.object.topic.subject.category.slug
		self.log_context['subject_id'] = self.object.topic.subject.id
		self.log_context['subject_name'] = self.object.topic.subject.name
		self.log_context['subject_slug'] = self.object.topic.subject.slug
		self.log_context['topic_id'] = self.object.topic.id
		self.log_context['topic_name'] = self.object.topic.name
		self.log_context['topic_slug'] = self.object.topic.slug
		self.log_context['ytvideo_id'] = self.object.id
		self.log_context['ytvideo_name'] = self.object.name
		self.log_context['ytvideo_slug'] = self.object.slug

		super(CreateView, self).createLog(self.request.user, self.log_component, self.log_action, self.log_resource, self.log_context) 
		
		return redirect(self.get_success_url())

	def get_context_data(self, **kwargs):
		context = super(CreateView, self).get_context_data(**kwargs)

		context['title'] = _('Create Youtube Video')

		slug = self.kwargs.get('slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		context['topic'] = topic
		context['subject'] = topic.subject

		return context

	def get_success_url(self):
		messages.success(self.request, _('The Youtube Video "%s" was added to the Topic "%s" of the virtual environment "%s" successfully!')%(self.object.name, self.object.topic.name, self.object.topic.subject.name))

		success_url = reverse_lazy('youtube:view', kwargs = {'slug': self.object.slug})

		if self.object.show_window:
			self.request.session['resources'] = {}
			self.request.session['resources']['new_page'] = True
			self.request.session['resources']['new_page_url'] = reverse('youtube:window_view', kwargs = {'slug': self.object.slug})

			success_url = reverse_lazy('subjects:view', kwargs = {'slug': self.object.topic.subject.slug})

		return success_url

class UpdateView(LoginRequiredMixin, LogMixin, generic.UpdateView):
	log_component = 'resources'
	log_action = 'update'
	log_resource = 'ytvideo'
	log_context = {}

	login_url = reverse_lazy("users:login")
	redirect_field_name = 'next'

	template_name = 'youtube/update.html'
	model = YTVideo
	form_class = YTVideoForm
	context_object_name = 'youtube'

	def dispatch(self, request, *args, **kwargs):
		slug = self.kwargs.get('topic_slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		if not has_subject_permissions(request.user, topic.subject):
			return redirect(reverse_lazy('subjects:home'))

		return super(UpdateView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		self.object = self.get_object()
		
		form_class = self.get_form_class()
		form = self.get_form(form_class)

		slug = self.kwargs.get('topic_slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		pendencies_form = InlinePendenciesFormset(instance=self.object, initial = [{'subject': topic.subject.id, 'actions': [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]}])

		return self.render_to_response(self.get_context_data(form = form, pendencies_form = pendencies_form))

	def post(self, request, *args, **kwargs):
		self.object = self.get_object()
		
		form_class = self.get_form_class()
		form = self.get_form(form_class)

		slug = self.kwargs.get('topic_slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		pendencies_form = InlinePendenciesFormset(self.request.POST, instance = self.object, initial = [{'subject': topic.subject.id, 'actions': [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]}])
		
		if (form.is_valid() and pendencies_form.is_valid()):
			return self.form_valid(form, pendencies_form)
		else:
			return self.form_invalid(form, pendencies_form)
	
	def form_invalid(self, form, pendencies_form):
		for p_form in pendencies_form.forms:
			p_form.fields['action'].choices = [("", "-------"),("view", _("Visualize")), ("finish", _("Finish"))]

		return self.render_to_response(self.get_context_data(form = form, pendencies_form = pendencies_form))

	def form_valid(self, form, pendencies_form):
		self.object = form.save(commit = False)

		if not self.object.topic.visible and not self.object.topic.repository:
			self.object.visible = False
		
		self.object.save()

		pendencies_form.instance = self.object
		pendencies_form.save(commit = False)

		for form in pendencies_form.forms:
			pend_form = form.save(commit = False)

			if not pend_form.action == "":
				pend_form.save()

		self.log_context['category_id'] = self.object.topic.subject.category.id
		self.log_context['category_name'] = self.object.topic.subject.category.name
		self.log_context['category_slug'] = self.object.topic.subject.category.slug
		self.log_context['subject_id'] = self.object.topic.subject.id
		self.log_context['subject_name'] = self.object.topic.subject.name
		self.log_context['subject_slug'] = self.object.topic.subject.slug
		self.log_context['topic_id'] = self.object.topic.id
		self.log_context['topic_name'] = self.object.topic.name
		self.log_context['topic_slug'] = self.object.topic.slug
		self.log_context['ytvideo_id'] = self.object.id
		self.log_context['ytvideo_name'] = self.object.name
		self.log_context['ytvideo_slug'] = self.object.slug

		super(UpdateView, self).createLog(self.request.user, self.log_component, self.log_action, self.log_resource, self.log_context) 
        
		return redirect(self.get_success_url())

	def get_context_data(self, **kwargs):
		context = super(UpdateView, self).get_context_data(**kwargs)

		context['title'] = _('Update YouTube Video')

		slug = self.kwargs.get('topic_slug', '')
		topic = get_object_or_404(Topic, slug = slug)

		context['topic'] = topic
		context['subject'] = topic.subject

		return context

	def get_success_url(self):
		messages.success(self.request, _('The YouTube Video "%s" was updated successfully!')%(self.object.name))

		success_url = reverse_lazy('youtube:view', kwargs = {'slug': self.object.slug})

		if self.object.show_window:
			self.request.session['resources'] = {}
			self.request.session['resources']['new_page'] = True
			self.request.session['resources']['new_page_url'] = reverse('youtube:window_view', kwargs = {'slug': self.object.slug})

			success_url = reverse_lazy('subjects:view', kwargs = {'slug': self.object.topic.subject.slug})

		return success_url

class DeleteView(LoginRequiredMixin, LogMixin, generic.DeleteView):
	log_component = 'resources'
	log_action = 'delete'
	log_resource = 'ytvideo'
	log_context = {}

	login_url = reverse_lazy("users:login")
	redirect_field_name = 'next'

	template_name = 'resources/delete.html'
	model = YTVideo
	context_object_name = 'resource'

	def dispatch(self, request, *args, **kwargs):
		slug = self.kwargs.get('slug', '')
		youtube = get_object_or_404(YTVideo, slug = slug)

		if not has_subject_permissions(request.user, youtube.topic.subject):
			return redirect(reverse_lazy('subjects:home'))

		return super(DeleteView, self).dispatch(request, *args, **kwargs)

	def get_success_url(self):
		messages.success(self.request, _('The YouTube Video "%s" was removed successfully from virtual environment "%s"!')%(self.object.name, self.object.topic.subject.name))
		
		self.log_context['category_id'] = self.object.topic.subject.category.id
		self.log_context['category_name'] = self.object.topic.subject.category.name
		self.log_context['category_slug'] = self.object.topic.subject.category.slug
		self.log_context['subject_id'] = self.object.topic.subject.id
		self.log_context['subject_name'] = self.object.topic.subject.name
		self.log_context['subject_slug'] = self.object.topic.subject.slug
		self.log_context['topic_id'] = self.object.topic.id
		self.log_context['topic_name'] = self.object.topic.name
		self.log_context['topic_slug'] = self.object.topic.slug
		self.log_context['ytvideo_id'] = self.object.id
		self.log_context['ytvideo_name'] = self.object.name
		self.log_context['ytvideo_slug'] = self.object.slug

		super(DeleteView, self).createLog(self.request.user, self.log_component, self.log_action, self.log_resource, self.log_context) 

		return reverse_lazy('subjects:view', kwargs = {'slug': self.object.topic.subject.slug})

@log_decorator_ajax('resources', 'watch', 'ytvideo')
def ytvideo_watch_log(request, ytvideo):
	action = request.GET.get('action')

	if action == 'open':
		ytvideo = get_object_or_404(YTVideo, slug = ytvideo)

		log_context = {}
		log_context['category_id'] = ytvideo.topic.subject.category.id
		log_context['category_name'] = ytvideo.topic.subject.category.name
		log_context['category_slug'] = ytvideo.topic.subject.category.slug
		log_context['subject_id'] = ytvideo.topic.subject.id
		log_context['subject_name'] = ytvideo.topic.subject.name
		log_context['subject_slug'] = ytvideo.topic.subject.slug
		log_context['topic_id'] = ytvideo.topic.id
		log_context['topic_name'] = ytvideo.topic.name
		log_context['topic_slug'] = ytvideo.topic.slug
		log_context['ytvideo_id'] = ytvideo.id
		log_context['ytvideo_name'] = ytvideo.name
		log_context['ytvideo_slug'] = ytvideo.slug
		log_context['timestamp_start'] = str(int(time.time()))
		log_context['timestamp_end'] = '-1'

		request.log_context = log_context

		log_id = Log.objects.latest('id').id

		return JsonResponse({'message': 'ok', 'log_id': log_id})

	return JsonResponse({'message': 'ok'})

@log_decorator('resources', 'finish', 'ytvideo')
def ytvideo_finish_log(request, ytvideo):
	ytvideo = get_object_or_404(YTVideo, slug = ytvideo)

	log_context = {}
	log_context['category_id'] = ytvideo.topic.subject.category.id
	log_context['category_name'] = ytvideo.topic.subject.category.name
	log_context['category_slug'] = ytvideo.topic.subject.category.slug
	log_context['subject_id'] = ytvideo.topic.subject.id
	log_context['subject_name'] = ytvideo.topic.subject.name
	log_context['subject_slug'] = ytvideo.topic.subject.slug
	log_context['topic_id'] = ytvideo.topic.id
	log_context['topic_name'] = ytvideo.topic.name
	log_context['topic_slug'] = ytvideo.topic.slug
	log_context['ytvideo_id'] = ytvideo.id
	log_context['ytvideo_name'] = ytvideo.name
	log_context['ytvideo_slug'] = ytvideo.slug
	
	request.log_context = log_context

	return JsonResponse({'message': 'ok'})