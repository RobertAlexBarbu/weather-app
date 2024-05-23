from time import sleep
import os
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(8, GPIO.IN)
state = GPIO.input(8)

if (state == 0):
    print("Water detected!")
else:
    print("Water not detected")