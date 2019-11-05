$(function() {
  var option_list = ["1룸", "1.5룸", "2룸", "3룸", "4룸", "복층", "테라스", "월세", "전세", "구옥"];
  var files = null;

  $("#validatedCustomFile").on("change", function(event) {
    files = document.getElementById("validatedCustomFile").files[0];
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

  $("#submit").on("click", function(event) {
    var setData = {};
    var building_name = $("#building").val();
    var memo = $("#memo").val();
    var options = [];

    $(".option_class").each(function(index, element) {
      var checkbox_value = this.checked;
      if(checkbox_value) {
        options.push(option_list[index]);
      }
    })

    options = options.join(',');

    setData = {
      title: building_name,
      status: 'add',
      memo: memo,
      option: options,
      file: files
    }

    console.log(setData);
    files = null;
  })
})
