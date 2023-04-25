import dataQuiz from './dataQuiz.js';

const homeContainer = document.querySelector('.home-container')
const inputName = document.querySelector('.home-container input[type="text"]')
const btnOpenRules = document.querySelector('.start-roles')
const paragraphWraning = document.querySelector('.p-wraning')
const rolesContainer = document.querySelector('.roles-container')
const btnStartQuiz = document.querySelector('.roles__btn-start-quiz')
const quizContainer = document.querySelector('.quiz-container')
const choicesContainer = document.querySelector('.quiz__choices')
const amountQuestion = document.querySelector('.content__info-questions')
const displayTimer = document.querySelector('.content__countdown')
const question = document.querySelector('.content__question')
const scoreContainer = document.querySelector('.score-container')
const scoreUserName = document.querySelector('.score__user-name')
const displayScore = document.querySelector('.score__display__number')
const totalquestions = document.querySelector('#total-questions span')
const displayCorrectAnswers = document.querySelector('#display-correct-answers span')
const incorrectAnswers = document.querySelector('#warning-answer span')
const btnReset = document.querySelector('#btn-reset')

const quiz = dataQuiz[0].dataQuiz
const correctAnswers = quiz.map(answer => answer.answer)
let userAnswers = []
let currentIndex = 0
let userName;
let score = 0
let countDown = 0
let countTime = 15
let countIncorrectAnswer = 0
let countCorrectAnswers = 0

const renderRoles = () => {
  const inputValue = inputName.value.trim()
  
  if (!inputValue.length) {
    paragraphWraning.style.display = 'block'
    return
  }
  userName = inputValue

  homeContainer.style.display = 'none'
  rolesContainer.style.display = 'block'
}


const rederQuestion = () => {
  amountQuestion.textContent = ''
  question.textContent = ''
  choicesContainer.innerHTML = ''
  
  displayTimer.textContent = `${countTime}s`
  amountQuestion.textContent = `${currentIndex + 1}/${quiz.length} Questões`
  question.textContent = `${quiz[currentIndex].question}`
  
  quiz[currentIndex].choices.forEach(choice => {
    choicesContainer.innerHTML += `
    <button class="choices__btn shadow">${choice}</button>
    `
  })
}

const renderQuiz = () => {
  clearInterval(countDown)
  timer(countTime)
  rederQuestion()
  rolesContainer.style.display = 'none'
  quizContainer.style.display = 'block'
}

const getUserAnswer = e => {
  if (e) {
    userAnswers.push(e.target.textContent.trim())
    return
  }
  
  userAnswers.push('')
}

const calculateScore = () =>
userAnswers.reduce((acc, answer, i) => {
  if (answer === correctAnswers[i]) {
    countCorrectAnswers++
    return acc + 10
  }
  
  countIncorrectAnswer++
  return acc
  
}, 0)

const animationScore = score => {
  let countScore = 0
  
  const counter = setInterval(() => {
    if (countScore === score) {
      clearInterval(counter)
    }
    
    displayScore.textContent = `${countScore}`
    
    countScore++
  }, 10)
}

const finishQuiz = () => {
  quizContainer.style.display = 'none'
  scoreContainer.style.display = 'block'
  
  score = calculateScore()
  animationScore(score)  
  
  scoreUserName.textContent = userName
  totalquestions.textContent += ` ${quiz.length}`
  displayCorrectAnswers.textContent = `${countCorrectAnswers}`
  incorrectAnswers.textContent = `${countIncorrectAnswer}` 
}

const nextQuestion = e => {  
  getUserAnswer(e)
  
  if (currentIndex < dataQuiz[0].dataQuiz.length - 1) {
    currentIndex++
    rederQuestion()
    clearInterval(countDown)
    timer(countTime)
    return
  }
  
  finishQuiz()
}

const timer = countTime => {
  countDown = setInterval(() => {
    --countTime
    
    if (countTime < 0) {
      clearInterval(countDown)
      nextQuestion()
      return
    }

    countTime < 10
      ? displayTimer.textContent = `0${countTime}s`
      : displayTimer.textContent = `${countTime}s`
  }, 1000)
}

const resetQuiz = () => {
  score = 0
  
  scoreUserName.textContent = ''
  displayScore.textContent = ''
  totalquestions.textContent = ''
  displayCorrectAnswers.textContent = ''
  incorrectAnswers.textContent = ''
  inputName.value = ''
  currentIndex = 0
  userAnswers = []
  countCorrectAnswers = 0
  countIncorrectAnswer = 0
  clearInterval(countDown)
  
  scoreContainer.style.display = 'none'
  homeContainer.style.display = 'block'
}

btnStartQuiz.addEventListener('click', renderQuiz)
btnOpenRules.addEventListener('click', renderRoles)
choicesContainer.addEventListener('click', nextQuestion)
btnReset.addEventListener('click', resetQuiz)
