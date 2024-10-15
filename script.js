let clockFormat = 'binary'; // Formato padrão é binário
let currentPhase = 1; // Fase inicial
let alarmTime;
let alarmTriggered = false;

function updateClocks() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Atualizar Relógio Digital
    document.getElementById('clock-digital').textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Atualizar Relógio com o formato selecionado
    let formattedHours, formattedMinutes, formattedSeconds;
    switch (clockFormat) {
        case 'binary':
            formattedHours = hours.toString(2).padStart(4, '0');
            formattedMinutes = minutes.toString(2).padStart(6, '0');
            formattedSeconds = seconds.toString(2).padStart(6, '0');
            break;
        case 'hex':
            formattedHours = hours.toString(16).toUpperCase().padStart(2, '0');
            formattedMinutes = minutes.toString(16).toUpperCase().padStart(2, '0');
            formattedSeconds = seconds.toString(16).toUpperCase().padStart(2, '0');
            break;
        case 'octal':
            formattedHours = hours.toString(8).padStart(2, '0');
            formattedMinutes = minutes.toString(8).padStart(2, '0');
            formattedSeconds = seconds.toString(8).padStart(2, '0');
            break;
    }
    document.getElementById('clock-binario').textContent =
        `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

    // Verificar se é hora do alarme
    if (alarmTime && `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` === alarmTime) {
        if (!alarmTriggered) {
            document.getElementById('feedback').textContent = `Alarme! Tente adivinhar a hora em ${clockFormat === 'binary' ? 'binário' : clockFormat === 'hex' ? 'hexadecimal' : 'octal'}!`;
            document.getElementById('feedback').style.color = "blue";
            alarmTriggered = true;
        }
    }
}

function setClockFormat(format) {
    clockFormat = format;
    let explanation, timeRepresentation;
    switch (format) {
        case 'binary':
            explanation = 'O relógio binário mostra a hora em formato binário, onde cada dígito é representado por uma sequência de 0s e 1s. Por exemplo, se a hora é 10:15:30, em binário seria:';
            timeRepresentation = '<strong>Horas:</strong> 10 em binário é 1010 <strong>Minutos:</strong> 15 em binário é 1111 <strong>Segundos:</strong> 30 em binário é 11110';
            break;
        case 'hex':
            explanation = 'O relógio hexadecimal mostra a hora em formato hexadecimal, onde cada dígito é representado por uma combinação de 0 a 9 e A a F. Por exemplo, se a hora é 10:15:30, em hexadecimal seria:';
            timeRepresentation = '<strong>Horas:</strong> 10 em hexadecimal é A <strong>Minutos:</strong> 15 em hexadecimal é F <strong>Segundos:</strong> 30 em hexadecimal é 1E';
            break;
        case 'octal':
            explanation = 'O relógio octal mostra a hora em formato octal, onde cada dígito é representado por uma sequência de 0 a 7. Por exemplo, se a hora é 10:15:30, em octal seria:';
            timeRepresentation = '<strong>Horas:</strong> 10 em octal é 12 <strong>Minutos:</strong> 15 em octal é 17 <strong>Segundos:</strong> 30 em octal é 36';
            break;
    }
    document.getElementById('explanation').textContent = explanation;
    document.getElementById('timeRepresentation').innerHTML = timeRepresentation;
    updateClocks(); // Atualizar relógio imediatamente
}

function setAlarm() {
    const alarmInput = document.getElementById('alarmInput').value;
    if (alarmInput) {
        alarmTime = alarmInput;
        alarmTriggered = false;
        document.getElementById('feedback').textContent = `Alarme definido para ${alarmTime}`;
        document.getElementById('feedback').style.color = "green";
    } else {
        document.getElementById('feedback').textContent = "Por favor, defina um horário válido para o alarme.";
        document.getElementById('feedback').style.color = "red";
    }
}

function checkGuess() {
    if (!alarmTriggered) {
        document.getElementById('feedback').textContent = "Você só pode adivinhar a hora quando o alarme tocar!";
        document.getElementById('feedback').style.color = "red";
        return;
    }
    
    const guess = document.getElementById('guessInput').value.trim();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let correctAnswer;
    switch (clockFormat) {
        case 'binary':
            correctAnswer = `${hours.toString(2).padStart(4, '0')} : ${minutes.toString(2).padStart(6, '0')} : ${seconds.toString(2).padStart(6, '0')}`;
            break;
        case 'hex':
            correctAnswer = `${hours.toString(16).toUpperCase().padStart(2, '0')} : ${minutes.toString(16).toUpperCase().padStart(2, '0')} : ${seconds.toString(16).toUpperCase().padStart(2, '0')}`;
            break;
        case 'octal':
            correctAnswer = `${hours.toString(8).padStart(2, '0')} : ${minutes.toString(8).padStart(2, '0')} : ${seconds.toString(8).padStart(2, '0')}`;
            break;
    }

    const feedback = document.getElementById('feedback');
    if (guess === correctAnswer) {
        feedback.textContent = "Parabéns! Você acertou!";
        feedback.style.color = "green";
        advancePhase();
    } else {
        feedback.textContent = `Você vai tentar de novo. A hora correta em ${clockFormat === 'binary' ? 'binário' : clockFormat === 'hex' ? 'hexadecimal' : 'octal'} era ${correctAnswer}`;
        feedback.style.color = "red";
    }

    document.getElementById('guessInput').value = ''; // Limpar o campo de entrada após a verificação
    alarmTriggered = false; // Resetar o alarme após a tentativa
}

function advancePhase() {
    currentPhase++;
    const phaseElement = document.getElementById('fase');

    if (currentPhase > 3) {
        currentPhase = 1;
    }

    switch (currentPhase) {
        case 1:
            clockFormat = 'binary';
            phaseElement.textContent = "Fase: 1 (Binário)";
            break;
        case 2:
            clockFormat = 'hex';
            phaseElement.textContent = "Fase: 2 (Hexadecimal)";
            break;
        case 3:
            clockFormat = 'octal';
            phaseElement.textContent = "Fase: 3 (Octal)";
            break;
    }
    setClockFormat(clockFormat);
}

// Atualizar relógios a cada segundo
setInterval(updateClocks, 1000);

// Inicializar relógios
updateClocks();
setClockFormat('binary'); // Definir explicação inicial
