export default function Question(question, choices, answer){
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrect = function (guessKey) {
    return guessKey === this.answer;
}