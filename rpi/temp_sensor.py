import time
import board
import adafruit_dht
import pyrebase
import random
import datetime
import RPi.GPIO as GPIO
from gpiozero import InputDevice


config = {
  "apiKey": "AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q",
  "authDomain": "weather-app-b3426.firebaseapp.com",
  "databaseURL": "https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app/",
  "storageBucket": ""
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
conv = 100 / (65535) 

#replace D23 with the GPIO pin you used in your circuit
dhtDevice = adafruit_dht.DHT11(board.D23)
resistorPin = 7
rainPin = 18
POWER_PIN = 12  # GPIO pin that provides power to the rain sensor
DO_PIN = 8 
rainDevice = InputDevice(rainPin)
rain = False


while True:
  GPIO.setmode(GPIO.BCM)
  GPIO.setup(8, GPIO.IN)
  state = GPIO.input(8)

  if (state == 0):
    print("Water detected!")
    rain = True
  else:
    print("Water not detected")
    rain = False
  # Photoresistor/Luminosity Part
  GPIO.setup(resistorPin, GPIO.OUT)
  GPIO.output(resistorPin, GPIO.LOW)
  time.sleep(0.1)
  GPIO.setup(resistorPin, GPIO.IN)
  currentTime = time.time()
  diff = 0
  while(GPIO.input(resistorPin) == GPIO.LOW):
    diff = time.time() - currentTime
  print(diff * 10000000)
  luminosityMessage = ""
  time.sleep(1)
  if (diff * 10000000 > 2000):
    luminosityMessage = "cloudy"
  else:
    luminosityMessage = "sunny"


  # Temperature/Humidity Part
  try:
    # Print the values to the serial port
    temperature_c = dhtDevice.temperature
    temperature_f = temperature_c * (9 / 5) + 32
    humidity = dhtDevice.humidity
    data = {
      "temperature": temperature_c,
      "humidity": humidity,
      "datetime": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
      "luminosity": luminosityMessage,
      "rain": rain
    }
    print(data)
    db.child("Status").push(data)
    db.update(data)
    print("Sent to Firebase")
    
  except RuntimeError as error:
    # Errors happen fairly often, DHT's are hard to read, just keep going
    print(error.args[0])
    time.sleep(2.0)
    continue
  except Exception as error:
    dhtDevice.exit()
    raise error
  
  time.sleep(2.0)