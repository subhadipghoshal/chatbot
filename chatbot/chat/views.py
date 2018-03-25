# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import os
from django.http import HttpResponse
from django.shortcuts import render, render_to_response


# Create your views here.
from django.template import Template, Context
from django.template.loader import get_template
from django.views import View

from chatbot.core.chat_brain import ChatBrain
from chatbot.settings import BASE_DIR


class ChatView(View):
    def get(self, request, *args, **kwargs):
        # template = get_template('chat_ui.html')
        with open(os.path.join(BASE_DIR, 'chatbot', 'chat', 'static', 'templates', 'chat_ui.html')) as fp:
            t = Template(fp.read())
            fp.close()
        if t:
            html = t.render(Context())
            return HttpResponse(html)
        else:
            return HttpResponse('Aw! Shucks!')


class ResponseView(View):

    def post(self, request, *args, **kwargs):
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)

        chat_brain = ChatBrain()
        response = chat_brain.getResponse(data['content'])

        return HttpResponse(response)