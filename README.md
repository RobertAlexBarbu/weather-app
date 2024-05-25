# Raspberry Pi Weather Station

## Introduction to IoT and Cloud Architectures

**Authors:** Barbu Robert-Alex, Bărbosu Raul  
**Study Year:** CTI-En year 3  
**Website:** <https://weather-station123.azurewebsites.net/>

---

## Overview

### Problem Statement

Monitoring endangered animal habitats is labor-intensive and costly.

### Solution

Combining Raspberry Pi with a web app for real-time, cost-effective monitoring.

### Key Components

- **DHT Sensor:** Measures temperature and humidity.
- **Photoresistor:** Detects light levels.
- **Rain Sensor:** Tracks rainfall.

### Web App Features

- **Animal Data Management:** Add, view, and update animal data.
- **Real-Time Monitoring:** View live sensor readings.
- **Alerts:** Notifications for out-of-range conditions.

## Development Board

### Raspberry Pi 3

![Raspberry](https://pinout-ai.s3.eu-west-2.amazonaws.com/raspberry-pi-5-gpio-pinout-diagram.webp)

- **Characteristics:** 
  - Small, powerful computer.
  - Runs Linux OS.
  - Connects to peripherals.
  - Popular in education and embedded projects.

- **ARM Cortex-A53 Processor:**
  - Energy-efficient and powerful.
  - Quad-core configuration.
  - Supports 64-bit computing.

- **Features:**
  - Low power consumption.
  - Open-source hardware and software.
  - GPIO pins for sensors and actuators.
  - Large online community.

## System Architecture



### Sensors

#### DHT11

![DHT11](https://raw.githubusercontent.com/leductan-nguyen/Automatic-Fan-Control/master/docs/DHT11%E2%80%93Temperature-Sensor-Pinout.png)

- **Purpose:** Measures temperature and humidity.
- **Connection:** 
  - VCC to 3.3V or 5V.
  - GND to ground.
  - Data pin to digital input.
  - 10kΩ pull-up resistor between Data pin and VCC.

#### Photoresistor

![Photoresistor](https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/285990321_1466936777100081_3863720273893833952_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MwEpxAYnT_UQ7kNvgGhR43T&_nc_ht=scontent-otp1-1.xx&oh=00_AYBGsi7_GWjh9e580iZvKl53I3saLZzqNy381L6UprI3UA&oe=66582FF4)


- **Purpose:** Detects light intensity.
- **Connection:** 
  - One lead to 3.3V or 5V.
  - Other lead in series with a capacitor.
  - Capacitor lead to ground.

### Web Application

#### Features

1. **Real-time Weather Monitoring:**
   - Fetches and displays weather data from Firebase.
2. **Animal Data Management:**
   - CRUD operations on animal data.
   - Image uploads to Firebase Storage.
3. **Weather Compatibility Check:**
   - Checks and notifies if conditions fit animal requirements.

#### Technologies

- **Frontend:**
  - React, CSS, Firebase.
- **Backend:**
  - .NET Core, Entity Framework Core.

#### Functional Details

- **Fetching Weather Data:**
  ```javascript
  useEffect(() => {
    const weatherRef = ref(db, 'Status');
    onValue(weatherRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestData = Object.values(data).pop();
        setLatestWeather(latestData);
      }
    });
    return () => {
      off(weatherRef);
    };
  }, [db]);
  ```
- **Managing Animal Data:**
  ```javascript
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const imageUrl = await uploadImage(imageFile, animalData.name);
      setAnimalData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    }
    onCreateAnimal(animalData);
    onClose();
  };
  ```
- **Weather Compatibility Check:**
  ```javascript
  useEffect(() => {
    animals.forEach(async (animal) => {
      if (!doesAnimalFitWeather(animal)) {
        try {
          await sendNotification({ animalId: animal.id, message: `${animal.name} does not fit the current weather!` });
        } catch (error) {
          console.error(`Failed to send notification for ${animal.name}`, error);
        }
      }
    });
  }, [animals, latestWeather]);
  ```

## Cloud Services

### Firebase Realtime Database

- Synchronizes data between sensors and web app.

### Azure App Service

- Hosts the web app, mobile backends, and APIs.

### DigitalOcean Managed Database

- PostgreSQL for storing animal data.

### Firebase File Storage

- Stores images and user-generated content.

## Mobile Notifications

- **Pushover:** Sends alerts to mobile devices and desktops.

```csharp
var parameters = new Dictionary<string, string> {
  ["token"] = "a4k27kfkaj61s1vkdkxwftaqgtd4zv",
  ["user"] = "ujx42kkfrknyo5jjf3bzk8tjrz3qcs",
  ["message"] = notificationDto.message
};
using var client = new HttpClient();
var response = await client.PostAsync("https://api.pushover.net/1/messages.json", new FormUrlEncodedContent(parameters));
return Ok();
```

---