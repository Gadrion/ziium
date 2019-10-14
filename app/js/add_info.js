$(function() {
  $("#validatedCustomFile").on("change", function(event) {
    var files = document.getElementById("validatedCustomFile").files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      var img_element = $("<img class='img' style='width: 50px; height: 50px;'>");
      $(img_element).attr("src", event.target.result);
      $("#img_list").append(img_element);
    }

    reader.readAsDataURL(files);
  })
})