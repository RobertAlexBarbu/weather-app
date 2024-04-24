import time
import board
import adafruit_dht
import pyrebase
import random

config = {
  "apiKey": "AIzaSyBme5hGShcyPNOfRCl0HgSNJU5MmOfbg8Q",
  "authDomain": "weather-app-b3426.firebaseapp.com",
  "databaseURL": "https://weather-app-b3426-default-rtdb.europe-west1.firebasedatabase.app/",
  "storageBucket": ""
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

#replace D23 with the GPIO pin you used in your circuit
dhtDevice = adafruit_dht.DHT11(board.D23)


while True:
  try:
    # Print the values to the serial port
    temperature_c = dhtDevice.temperature
    temperature_f = temperature_c * (9 / 5) + 32
    humidity = dhtDevice.humidity
    print(
      "Temp: {:.1f} F / {:.1f} C     Humidity: {}% ".format(
        temperature_f, temperature_c, humidity
      )
    )
    data = {
      "Temperature": temperature_c,
      "Humidity": humidity
    }
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