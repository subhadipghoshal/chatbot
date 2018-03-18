import aiml
import sys
import os

from chatbot.settings import BASE_DIR


def singleton(class_):
    instances = {}

    def getinstance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]

    return getinstance


# @singleton
class ChatBrain:

    def __init__(self):
        self.kernel = aiml.Kernel()
        self.kernel.verbose(True)

        self.kernel.learn(os.path.join(BASE_DIR, 'chatbot', 'core', 'std-startup.xml'))

        self.kernel.respond('LOAD AIML B')

    def getResponse(self, chat_input):
        response = self.kernel.respond(chat_input)

        if not response:
            return "Sorry! I don't know! :("
        else:
            return response

# while True:
# 	input_string = raw_input("Enter your message >> ")
# 	if input_string in ['exit', 'quit', 'bye','thanks']:
# 		print ("OK Bye!")
# 		break
# 	response = kernel.respond(input_string)
# 	if not response:
# 		print("Sorry! I don't know! :(")
# 	else:
# 		print(response)
#     # print kernel.respond(raw_input("Enter your message >> "))
