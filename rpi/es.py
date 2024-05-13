import time
import board
import adafruit_dht
import random
import datetime
import RPi.GPIO as GPIO


#replace D23 with the GPIO pin you used in your circuit
dhtDevice = adafruit_dht.DHT11(board.D23)
# tm = tm1637.TM1637(clk=5, dio=4) # GPIO 5 for clock and GPIO 4 for dio

# GPIO.setmode(GPIO.BOARD)
resistorPin = 7
redLedPin = 18
buzzerPin = 24

while True:
  GPIO.setup(redLedPin,GPIO.OUT)
  GPIO.setup(buzzerPin, GPIO.OUT)

  GPIO.setup(resistorPin, GPIO.OUT)
  GPIO.output(resistorPin, GPIO.LOW)
  time.sleep(0.1)
  GPIO.setup(resistorPin, GPIO.IN)
  currentTime = time.time()
  diff = 0
  while(GPIO.input(resistorPin) == GPIO.LOW):
    diff = time.time() - currentTime
  print(diff * 10000000)
  time.sleep(1)
  if (diff * 10000000> 6000):
    GPIO.output(redLedPin, GPIO.HIGH)
  else:
    GPIO.output(redLedPin, GPIO.LOW)
  
# hey
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
    if(humidity > 30):
      GPIO.output(buzzerPin, GPIO.HIGH)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.LOW)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.HIGH)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.LOW)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.HIGH)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.LOW)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.HIGH)
      time.sleep(0.2)
      GPIO.output(buzzerPin, GPIO.LOW)
      time.sleep(0.2)
    data = {
      "Temperature": temperature_c,
      "Humidity": humidity,
      "Datetime": datetime.datetime.now()
    }
    #tm.temperature(temperature_c)
    
  except RuntimeError as error:
    # Errors happen fairly often, DHT's are hard to read, just keep going
    print(error.args[0])
    time.sleep(2.0)
    continue
  except Exception as error:
    dhtDevice.exit()
    raise error
  
  time.sleep(2.0)