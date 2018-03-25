import aiml
import sys
import os

kernel = aiml.Kernel()
kernel.verbose(True)

kernel.learn('std-startup.xml')

kernel.respond('load aiml b')
kernel.saveBrain('liaCt.brn')
while True:
	input_string = raw_input("Enter your message >> ")
	if input_string in ['exit', 'quit', 'bye','thanks']:
		print ("OK Bye!")
		break
	response = kernel.respond(input_string)
	if not response:
		print("Sorry! I don't know! :(")
	else:
		print(response)
    # print kernel.respond(raw_input("Enter your message >> "))