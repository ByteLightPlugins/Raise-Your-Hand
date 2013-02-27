function renderQuestion(question) {
  var $el = $("<div class='question'><span class='score'>"+(question.score || 0)+"</span><button class='answered'>&#x2713;</button><button class='down'>&gt;</button><button class='up'>&gt;</button><h2>"+question.q+"</h2></div>");
  $el[0].question = question;
  if (question.answered) $el.addClass('inactive')
  $('#questions').append($el);
}

var content;

function save() {
  BL.updateContent(JSON.stringify(content), function() {});
}

$(function () {
  content = JSON.parse(BL.getContentItem());
  $('h1').html(content.name);
  content.questions = content.questions || [];
  
  function renderQuestions() {
    $('#questions').empty()
    
    content.questions.sort(function(a,b) {
//      if (a.answered && !b.answered) return 1;
//      else if (!a.answered && b.answered) return -1;
      
      a = a.score
      b = b.score
      if (a < b) return 1;
      else if (a > b) return -1;
      return 0;
    })
    
    for(var i=0; i<content.questions.length; i++)
      renderQuestion(content.questions[i]);  
  }
  renderQuestions()
  
  $('#submit').click(function() {
    var question = { q: $('#q').val(), score:0 };
    content.questions.push(question);
    save();
    $('#q').val('');
    renderQuestion(question);
  })
  
  function vote(btn, delta) {
    var el = $(btn).closest('.question')[0], question = el.question;
    question.score = question.score || 0;
    question.score += delta;
  
    renderQuestions()
    
    $(el).find('.score').html(question.score)
    save()
  }
  
  $('#questions').on('click', '.up', function() {
    vote(this, 1)
  });
  
  $('#questions').on('click', '.down', function() {
    vote(this, -1)
  });
  
  $('#questions').on('click', '.answered', function() {
    var $el = $(this).closest('.question'), question = $el[0].question;
//    content.questions.splice($el.index(), 1)
    question.answered = true
    $el.addClass('inactive')
    save()
  })
});