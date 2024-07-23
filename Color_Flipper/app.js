const colorBox = document.getElementById('color-box'); // 현재 색상을 표시할 박스
const colorValue = document.getElementById('color-value'); // 현재 색상의 HEX 값을 표시할 요소
const btnQuest = document.getElementById('btn-quest'); // 새로운 퀘스트 시작 버튼
const btnMix = document.getElementById('btn-mix'); // 색상 혼합 버튼
const btnInvert = document.getElementById('btn-invert'); // 색상 반전 버튼
const redSlider = document.getElementById('red-slider'); // 빨간색 슬라이더
const greenSlider = document.getElementById('green-slider'); // 초록색 슬라이더
const blueSlider = document.getElementById('blue-slider'); // 파란색 슬라이더
const questDescription = document.getElementById('quest-description'); // 현재 퀘스트 설명 요소
const score = document.getElementById('score'); // 점수를 표시할 요소
const hint = document.getElementById('hint'); // 힌트를 표시할 요소

// 현재 색상, 목표 색상 및 현재 점수를 저장하는 변수
let currentColor = { r: 255, g: 255, b: 255 }; // 초기 색상은 흰색 (#FFFFFF)
let targetColor = { r: 0, g: 0, b: 0 }; // 목표 색상 (초기에는 검정색)
let currentScore = 0; // 현재 점수

// 색상 표시를 업데이트하는 함수
function updateColorDisplay() {
    const hexColor = rgbToHex(currentColor.r, currentColor.g, currentColor.b); // RGB 값을 HEX로 변환
    colorBox.style.backgroundColor = hexColor; // 색상 박스의 배경색을 업데이트
    colorValue.textContent = hexColor; // HEX 값을 텍스트로 업데이트
    updateSliders(); // 슬라이더 값을 현재 색상에 맞게 업데이트
    updateHint(); // 힌트를 업데이트
}

// 슬라이더를 현재 색상에 맞게 업데이트하는 함수
function updateSliders() {
    redSlider.value = currentColor.r; // 빨간색 슬라이더 값을 현재 빨간색 값으로 설정
    greenSlider.value = currentColor.g; // 초록색 슬라이더 값을 현재 초록색 값으로 설정
    blueSlider.value = currentColor.b; // 파란색 슬라이더 값을 현재 파란색 값으로 설정
}

// RGB 색상을 HEX로 변환하는 함수
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// 랜덤 색상을 생성하는 함수
function generateRandomColor() {
    return {
        r: Math.floor(Math.random() * 256), // 0부터 255 사이의 랜덤 빨간색 값
        g: Math.floor(Math.random() * 256), // 0부터 255 사이의 랜덤 초록색 값
        b: Math.floor(Math.random() * 256)  // 0부터 255 사이의 랜덤 파란색 값
    };
}

// 새로운 퀘스트를 시작하는 함수
function startNewQuest() {
    targetColor = generateRandomColor(); // 목표 색상을 랜덤으로 설정
    const hexTargetColor = rgbToHex(targetColor.r, targetColor.g, targetColor.b); // 목표 색상을 HEX로 변환
    questDescription.textContent = `목표: ${hexTargetColor} 색상을 만드세요!`; // 퀘스트 설명을 업데이트
    updateHint(); // 힌트를 업데이트
}

// 현재 색상과 랜덤 색상을 혼합하는 함수
function mixColors() {
    const mixColor = generateRandomColor(); // 혼합할 랜덤 색상 생성
    currentColor.r = Math.floor((currentColor.r + mixColor.r) / 2); // 빨간색 값 혼합
    currentColor.g = Math.floor((currentColor.g + mixColor.g) / 2); // 초록색 값 혼합
    currentColor.b = Math.floor((currentColor.b + mixColor.b) / 2); // 파란색 값 혼합
    updateColorDisplay(); // 색상 표시를 업데이트
}

// 현재 색상을 반전시키는 함수
function invertColor() {
    currentColor.r = 255 - currentColor.r; // 빨간색 값 반전
    currentColor.g = 255 - currentColor.g; // 초록색 값 반전
    currentColor.b = 255 - currentColor.b; // 파란색 값 반전
    updateColorDisplay(); // 색상 표시를 업데이트
}

// 현재 색상과 목표 색상 간의 점수를 계산하는 함수
function calculateScore() {
    const diff = Math.abs(currentColor.r - targetColor.r) +
                 Math.abs(currentColor.g - targetColor.g) +
                 Math.abs(currentColor.b - targetColor.b); // 색상 차이 계산
    const maxDiff = 255 * 3; // 최대 색상 차이 (빨강, 초록, 파랑 각각 255)
    const percentage = (1 - diff / maxDiff) * 100; // 점수를 백분율로 변환
    return Math.round(percentage); // 점수를 반올림하여 반환
}

// 점수를 업데이트하고 목표 색상 달성 여부를 체크하는 함수
function updateScore() {
    const newScore = calculateScore(); // 새로운 점수 계산
    if (newScore > currentScore) { // 점수가 현재 점수보다 높은 경우
        currentScore = newScore; // 현재 점수를 업데이트
        score.textContent = currentScore; // 점수 표시를 업데이트
    }
    
    if (currentScore === 100) { // 점수가 100인 경우
        alert('축하합니다! 목표 색상을 달성했습니다.'); // 축하 메시지 표시
        startNewQuest();  // 새로운 퀘스트 시작
    }
}

// 현재 색상과 목표 색상 간의 차이에 따라 힌트를 업데이트하는 함수
function updateHint() {
    const diff = Math.abs(currentColor.r - targetColor.r) +
                 Math.abs(currentColor.g - targetColor.g) +
                 Math.abs(currentColor.b - targetColor.b); // 색상 차이 계산
    const hintText = diff < 50 ? "매우 가까움!" : diff < 100 ? "가까움!" : "멀음!"; // 힌트 텍스트 결정
    hint.textContent = `힌트: ${hintText}`; // 힌트 표시를 업데이트
}

// 버튼에 클릭 이벤트 리스너를 추가합니다.
btnQuest.addEventListener('click', () => {
    startNewQuest(); // 새로운 퀘스트 시작
    currentScore = 0; // 점수 초기화
    score.textContent = currentScore; // 점수 표시를 업데이트
});

btnMix.addEventListener('click', mixColors); // 색상 혼합 버튼 클릭 시 mixColors 함수 호출
btnInvert.addEventListener('click', invertColor); // 색상 반전 버튼 클릭 시 invertColor 함수 호출

// 슬라이더에 input 이벤트 리스너를 추가합니다.
[redSlider, greenSlider, blueSlider].forEach(slider => {
    slider.addEventListener('input', () => {
        currentColor.r = parseInt(redSlider.value); // 빨간색 슬라이더 값 업데이트
        currentColor.g = parseInt(greenSlider.value); // 초록색 슬라이더 값 업데이트
        currentColor.b = parseInt(blueSlider.value); // 파란색 슬라이더 값 업데이트
        updateColorDisplay(); // 색상 표시 업데이트
        updateScore(); // 점수 업데이트
    });
});

// 초기 색상 표시를 업데이트합니다.
updateColorDisplay();
