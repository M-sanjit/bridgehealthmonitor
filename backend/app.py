from flask import Flask
from flask_socketio import SocketIO
import serial
import threading
import json
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

SERIAL_PORT = 'COM4' 
BAUD_RATE = 9600

@app.route('/')
def index():
    return "Backend is running! WebSockets are ready."

def serial_thread():
    try:
        print(f"Attempting connection to Arduino on {SERIAL_PORT}...")
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        time.sleep(2) 
        print(f"Successfully linked to hardware on {SERIAL_PORT}!")
        
        while True:
            if ser.in_waiting > 0:
                try:
                    raw_line = ser.readline().decode('utf-8', errors="ignore").strip()
                    if raw_line and raw_line.startswith('{') and raw_line.endswith('}'):
                        real_data = json.loads(raw_line)
                        print(f"Live Stream -> {real_data}")
                        socketio.emit('sensor_data', real_data)
                        
                except json.JSONDecodeError:
                    pass
            time.sleep(0.01)
            
    except Exception as e:
        print(f"Serial Error: {e}")

if __name__ == '__main__':
    thread = threading.Thread(target=serial_thread)
    thread.daemon = True
    thread.start()
    
    socketio.run(app, port=5000, debug=True, use_reloader=False)