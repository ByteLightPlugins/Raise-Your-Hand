$(function () {
  var content = BL.getContentForPreview().content[0];
  var data = JSON.parse(content.data);
  $('a').html(data.name);
  $('a').click(function() { BL.showContent(content.id) });
  BL.previewReady();
});