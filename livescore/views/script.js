// Connect to the Socket.io server
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

// Listen for 'scoreUpdate' events from the server
socket.on('update', (update) => {
    document.getElementById('name1').textContent = update.team1;
    document.getElementById('name2').textContent = update.team2;
    document.getElementById('set1team1').textContent = update.score.team1.set1;
    document.getElementById('set2team1').textContent = update.score.team1.set2;
    document.getElementById('set3team1').textContent = update.score.team1.set3;
    document.getElementById('set1team2').textContent = update.score.team2.set1;
    document.getElementById('set2team2').textContent = update.score.team2.set2;
    document.getElementById('set3team2').textContent = update.score.team2.set3;
});
