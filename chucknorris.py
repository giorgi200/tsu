import requests as rq
import json
import random
import argparse
import time
import sys
from naoqi import ALProxy
import os
import threading

# varibles
answer = 'hello'

# ============


# connect
def init(robotIP, PORT=9559):    #Initialisations des modules d'Aldebaran
    global motionProxy
    global tts
    global asr
    global memProxy
    global animatedSpeechProxy
    global touch
    global aup
    motionProxy = ALProxy("ALMotion", robotIP, PORT)
    tts = ALProxy("ALTextToSpeech", robotIP, PORT)
    asr = ALProxy("ALSpeechRecognition", robotIP, PORT)
    memProxy = ALProxy("ALMemory", robotIP, PORT)
    animatedSpeechProxy = ALProxy("ALAnimatedSpeech", robotIP, PORT)
    touch = ALProxy("ALTouch", robotIP, PORT) 
    aup = ALProxy("ALAudioPlayer", robotIP, PORT)	
    chucknorris(answer);
# =============================================


# tell Random joke
def chucknorris(mot):
	payload={'query':mot}
	response = rq.get('https://api.chucknorris.io/jokes/search', params=payload).json()
	RandomIndex = random.randint(0, response["total"]-1)
	response = response["result"][RandomIndex]["value"]
	tts.say(response);
# =============================================

if __name__ == "__main__":
    global robotIP
    global PORT
    parser = argparse.ArgumentParser()
    
    parser.add_argument("--ip", type=str, default="192.168.1.34",
                        help="Robot ip address")
    parser.add_argument("--port", type=int, default=9559,
                        help="Robot port number")

    args = parser.parse_args()
    robotIP=args.ip
    PORT=args.port
    init(robotIP, PORT)
