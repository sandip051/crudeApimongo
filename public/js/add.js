$(document).ready(function () {
  $(document).on("click", ".getData", function () {
    $.ajax({
      url: "/fetch",
      method: "GET",
      contentType: "application/json",
      success: function (data) {
        let renderHtml = "";
        //var data = JSON.parse(data);
        //var Data =json.parse(data);
        //var data = JSON.stringify(data);

        var stringified = JSON.stringify(data);
        var parsedObj = JSON.parse(stringified);
        console.log(parsedObj);
        parsedObj.forEach((value, index) => {
          renderHtml += `<tr>
                     <td>${value._id}</td>
                     <td>${value.student_name}</td>
                     <td>${value.student_last}</td>
                     
                     <td>${value.student_city}</td>
                     <td class="removeData" id='${
                       value._id
                     }'><button>delete</button></td>
                     <td class="updateData" value='${JSON.stringify(
                       value
                     )}' id='${
            value.id
          }'><button class="btn btn-info">Edit</button></td>
                    </tr>`;
        });
        $("#tdata").html(renderHtml);
      },
    });
  });

  //    delet
  $(document).on("click", ".removeData", function (evt) {
    const id = $(this).attr("id");

    console.log(id);
    $.ajax({
      url: "/deleteData/" + id,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        // getData();
        console.log(response);
      },
    });
  });
  // end

  // update

  $("#add").click(function () {
    $("#nastudent_name").val("");
    $("#student_last").val("");
    $("#student_city").val("");

    $("#exampleModal").modal("show");
    $("#addData").show();
    $("#Update").hide();
  });
  $(document).on("click", ".updateData", function () {
    const id = $(this).attr("id");
    const data = JSON.parse($(this).attr("value"));
    console.log(data);

    $("#id").val(data._id);
    $("#student_name").val(data.student_name);
    $("#student_last").val(data.student_last);
    $("#student_city").val(data.student_city);

    $("#exampleModal").modal("show");
    $("#addData").hide();
    $("#Update").show();
    //$('#Update').trigger('click');
    // console.log(id);
  });

  $("#Update").click(function () {
    const id = $("#id").val();
    console.log(id);
    const student_name = $("#student_name").val();
    const student_last = $("#student_last").val();
    const student_city = $("#student_city").val();
    //const email = $("#email").val();
    const formData = { student_name, student_last, student_city };

    $.post(
      "/update/" +id,
      { ...formData },
      function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        
      }
    );

    // $.ajax({
    //   url: "/update/" +id,
    //   type: "post",
    //   body: {...formData},
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   success: function (res) {
    //     console.log(res);
    //     $("#exampleModal").modal("hide");
    //   },
    //   error: function (err) {
    //     console.log(err);
    //   },
    // });
  });
  //end
});
