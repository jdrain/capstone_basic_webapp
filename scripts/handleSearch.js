/**
 * functions to handle form searches
 */

function handleSearch() {

  var data = processFormData($("#getListForm").serializeArray());

  $.ajax({
    url:        `http://localhost:8080/api/get_data/${data.name}`,
    method:     "GET",
    dataType:   "json",
    success:    function(res) { alert(`list contents:\n${handleResponse(res)}`); }
  })
}

// process the input fields
function processFormData(formData) {
  jsonFormData = {};

  for (var i = 0; i < formData.length; i++){
    jsonFormData[formData[i]['name']] = formData[i]['value'];
  }

  return jsonFormData;
}

// handle response from the API
function handleResponse(res) {
    var contents = res[0].contents;
    return contents.join("\n");
}
