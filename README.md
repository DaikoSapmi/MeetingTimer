# Meeting Timer

## Description
Meeting Timer is a web-based solution designed for local network use, to manage and display countdown timers for meetings or presentations. It includes an admin control panel for setting up timers and a display page that shows the countdown in large, easily readable digits. The timer can count down to zero and then continue in negative, indicating overtime, with the time displayed in red.

## Local Network Setup
This application is designed to be run on a local network. This allows multiple devices on the same network to access the timer display in real-time.

To set up and run the Meeting Timer on your local server, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Clone the repository to your local machine or download the zip file and extract it.
3. Navigate to the project directory in the terminal.
4. Run `npm install` to install all the dependencies.
5. Start the application with `node server.js`.
6. Open your web browser and go to `http://localhost:3000` to access the admin panel.
7. To access the timer display from another machine on the same network, enter the local IP address of the host machine followed by `:3000/timer.html`. For example, `http://192.168.1.2:3000/timer.html`.

## Usage
### Admin Page
- Access the admin page to set up timers by entering minutes and seconds and then clicking "Add Timer".
- Click "Start" to initiate the countdown for a specific timer.
- The active timer's countdown will be displayed in large digits on the admin page and can be viewed on the timer display page by other devices on the network.
- If the countdown reaches zero, it will continue into negative numbers in red, indicating the time has elapsed.

### Timer Display Page
- This page is intended for public display within a meeting or presentation environment.
- It will show the countdown in large, easily readable digits.
- Once the timer reaches zero, it will turn red and count upwards, indicating overtime.

## Contributing
If you would like to contribute to the development of Meeting Timer, please fork the repository and submit a pull request with your suggested changes.

## License
Meeting Timer is released under the MIT License. See the LICENSE file for more details.
