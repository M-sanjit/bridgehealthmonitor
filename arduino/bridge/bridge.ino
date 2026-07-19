#include <MPU6050_tockn.h>
#include <Wire.h>
#include "HX711.h"

// Hardware Pin Definitions for HX711
const int HX711_DOUT = 2;
const int HX711_SCK = 3;

// Create sensor objects
MPU6050 mpu(Wire);
HX711 scale;

// Adjust this after calibration.
float calibration_factor = 1.0; 

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  // Initialize MPU6050
  mpu.begin();
  
  // Optional: Calculates offsets to zero out gyroscope/accelerometer error.
  // Keep the sensor perfectly still on a flat surface during setup if active.
  // mpu.calcGyroOffsets(true); 

  // Initialize HX711 Load Cell
  scale.begin(HX711_DOUT, HX711_SCK);
  scale.set_scale(calibration_factor);
  scale.tare(); 
}

void loop() {
  // Update internal sensor data registers
  mpu.update();

  // Read weight data from HX711 (averaging 1 sample for performance)
  float load_val = scale.get_units(1); 

  // Fetch acceleration data values
  float ax = mpu.getAccX();
  float ay = mpu.getAccY();

  // Construct and print pure, valid JSON string over Serial
  Serial.print("{\"load\":");
  Serial.print(load_val, 2); // 2 decimal points precision
  Serial.print(",\"ax\":");
  Serial.print(ax, 4);
  Serial.print(",\"ay\":");
  Serial.print(ay, 4);
  Serial.println("}");

  delay(100); // 10Hz sampling frequency prevents flooding the serial buffer
}