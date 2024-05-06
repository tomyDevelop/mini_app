const init = function() {
  const submit = document.getElementById('submit');
  let question;
  let answer;
  const correct = document.getElementById('correct');
  const diff = document.getElementById('diff');
  const diff_question = document.getElementById('diff_question');
  const diff_answer = document.getElementById('diff_answer');
  const correct_submit = document.querySelector('#correct_submit a');

  submit.addEventListener('click', function() {
    question = document.querySelector('#question ruby rt').textContent
    answer = document.querySelector('#answer').value

    if (question === answer) {
      if (!diff.classList.contains('hidden')) {
        diff.classList.add('hidden');
      }
      if (correct.classList.contains('hidden')) {
        correct.classList.remove('hidden');
        setTimeout(function() {
        correct.classList.add('hidden');
        }, 2000);
      }
      setTimeout(function() {
        correct_submit.click();
      }, 2000);
      document.querySelector('#answer').value = '';
    } else {
      if (diff.classList.contains('hidden')) {
        diff.classList.remove('hidden');
      }
      if (!correct.classList.contains('hidden')) {
        correct.classList.add('hidden');
      }
      diff_question.textContent = '"' + question + '"';
      diff_answer.textContent = '"' + answer + '"';
    }
  });
}

export default init;
