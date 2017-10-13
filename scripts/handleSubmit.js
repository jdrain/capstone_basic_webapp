/**
 * handle form submissions
 */

// format the data and post it to the API
function handleSubmit() {

  // jsonify the form data
  var jsonFormData = processFormData($("#saveListForm").serializeArray());
  jsonFormData["contents"] = processContents($("#listContents").val());
  $.ajax({
        url:         'http://localhost:8080/api/post_data/',
        method:      'POST',
        dataType:    'json',
        data:        jsonFormData
    });
}

// process the input fields
function processFormData(formData) {
  jsonFormData = {};

  for (var i = 0; i < formData.length; i++){
    jsonFormData[formData[i]['name']] = formData[i]['value'];
  }

  return jsonFormData;
}

// process the entered contents of the list
function processContents(contents) {
  return contents.split("\n");
}
