$(function () {
  $('#done').click(function() {
    data = JSON.stringify({name: $('#name').val() });
    BL.createContent(data);
  });
});

