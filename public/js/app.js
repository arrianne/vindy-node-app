'use strict';

/* global gapi */
function gapiReady() {
  gapi.client.load('youtube', 'v3').then(function () {
    gapi.client.setApiKey('AIzaSyD6x21Oi4rZzQktZrFTC6umTX-Ckg-yU5o');
  });
}

$(function () {

  //profile pic upload


  // $(document).ready(function() {
  //
  //
  //   var readURL = function(input) {
  //     if (input.files && input.files[0]) {
  //       var reader = new FileReader();
  //
  //       reader.onload = function (e) {
  //         $('.profile-pic').attr('src', e.target.result);
  //       };
  //
  //       reader.readAsDataURL(input.files[0]);
  //     }
  //   };
  //
  //
  //   $('.file-upload').on('change', function(){
  //     readURL(this);
  //   });
  //
  //   $('.upload-button').on('click', function() {
  //     $('.file-upload').click();
  //   });
  // });

  $('.results').on('click', '.select-video', populateForm);

  function populateForm(e) {
    $('.selected').removeClass('selected');
    $(e.target).addClass('selected');

    var youtubeId = $(e.target).data('youtubeid');
    var thumbnail = $(e.target).data('thumbnail');

    $('input[name="youtubeId"]').val(youtubeId);
    $('input[name="thumbnailUrl"]').val(thumbnail);
  }

  var $results = $('.results');
  console.log($('#search'));
  $('#search').on('submit', function (e) {
    e.preventDefault();

    var q = $('[name=q]').val();
    console.log(q);

    gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',

      maxResults: 9,
      order: 'viewCount'
    }).execute(function (res) {
      $results.empty();
      res.items.forEach(function (video) {
        console.log(video);
        $results.append('\n          <div class="video-result">\n            <iframe width="250" height="130" src="https://www.youtube.com/embed/' + video.id.videoId + '" frameborder="0" allowfullscreen></iframe>\n            <button class="select-video" data-youtubeid="' + video.id.videoId + '" data-thumbnail="' + video.snippet.thumbnails.high.url + '">Select</button>\n          </div>\n        ');
      });
    });
  });
});