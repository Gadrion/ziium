$(function() {
  $("#validatedCustomFile").on("change", function(event) {
    var files = document.getElementById("validatedCustomFile").files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      var img_element = $("<img class='img' style='width: 50px; height: 50px;'>");
      $(img_element).attr("src", event.target.result);
      $("#img_list").append(img_element);
      
      // Upload the file and metadata
      // storage.child('test/' + files.name).put(files).then(snapshot => {
      //   console.log('suc');
      // });
    }

    reader.readAsDataURL(files);
  })
})
