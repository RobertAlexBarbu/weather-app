import time
# import board
# import adafruit_dht
import pyrebase
import random
import datetime
# import RPi.GPIO as GPIO

config = {
  "apiKey": "AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q",
  "authDomain": "weather-app-b3426.firebaseapp.com",
  "databaseURL": "https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app/",
  "storageBucket": ""
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

while True:

  # Photoresistor/Luminosity Part
  time.sleep(0.1)
  luminosity = random.randint(1000, 12000)
  luminosityMessage = ""
  time.sleep(1)
  print(luminosity)
  if (luminosity > 6000):
    # too cloudy
    luminosityMessage = "cloudy"
  else:
    # sunny
    luminosityMessage = "sunny"

  # Temperature/Humidity Part
  try:
    # Print the values to the serial port
    temperature_c = random.randint(10,30)
    temperature_f = temperature_c * (9 / 5) + 32
    humidity = random.randint(0, 100)
    # print(
    #   "Temp: {:.1f} F / {:.1f} C     Humidity: {}% ".format(
    #     temperature_f, temperature_c, humidity
    #   )
    # )
    data = {
      "temperature": temperature_c,
      "humidity": humidity,
      "datetime": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
      "luminosity": luminosityMessage,
      "rain": True
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
    raise error
  
  time.sleep(2.0)