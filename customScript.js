$(document).ready(() => {
  var sizeSelectDownData = [
    { MasterValue: "S", MasterValueID: 203 },
    { MasterValue: "M", MasterValueID: 204 },
    { MasterValue: "L", MasterValueID: 205 },
  ];

  const getDropDown = (URL) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        //sizeSelectDownData = data;
        return data;
      });
  };

  let globalData = [
    {
      id: 1,
      po: 22,
      item: "Peter",
      fabricDetail: "John Doe",
      gsm: 12,
      date: "12/12/1222",
      remarks: "remarks..",
      subTable: [
        {
          subTableid: 1,
          sizeChart: [
            {
              id: 1,
              size: "L",
              qty: 1000,
              cost: 200,
              ws: 200,
              retail: 400,
              margin: 0.4,
            },
            {
              id: 2,
              size: "S",
              qty: 1000,
              cost: 200,
              ws: 200,
              retail: 400,
              margin: 0.4,
            },
          ],
        },

        {
          subTableid: 2,
          sizeChart: [
            {
              id: 3,
              size: "S",
              qty: 1000,
              cost: 200,
              ws: 200,
              retail: 400,
              margin: 0.4,
            },
            {
              id: 4,
              size: "M",
              qty: 1000,
              cost: 200,
              ws: 200,
              retail: 400,
              margin: 0.4,
            },
          ],
        },
      ],
    },
  ];

  //let globalData = []

  let setMainTableRowId = null;
  let isMainRowUpdated = false;

  let setSubTableId = null;
  let isSubTableUpdated = false;

  //update function to load  global data
  const updateData = (obj) => {
    $("tbody#main-table").html("");

    obj.forEach((element) => {
      const { id, po, item, fabricDetail, gsm, date, remarks, subTable } =
        element;
      $("tbody#main-table").append(`
            <tr key=${id}>
            <td>${po}</td>
            <td>${item}</td>
            <td>${fabricDetail}</td>
            <td>${gsm}</td>
            <td>${date}</td>
            <td>${remarks}</td>
            <td><a href="" data-toggle="modal" data-toggle="modal" data-target=".bd-example-modal-lg" id="open-modal">ADD SIZE</a></td>
            <td id="sub-size-chart-table">${renderSubTable(subTable)}</td>
            <td>
            <i class="fa fa-pencil" style="cursor: pointer; color: green;" id="update-main-table-row"></i>
            <i class="fa fa-trash-o" style="cursor: pointer; color:red;" id="delete-main-table-row"></i>
            </td>
            </tr>`);
    });
  };

  //on form submit also on row update click
  $("form#pp-form").on("submit", function (e) {
    e.preventDefault();
    if (this.checkValidity() === true) {
      if (isMainRowUpdated) {
        let getRowDataForUpdate = globalData.find(
          (ele) => ele.id === setMainTableRowId
        );
        if (getRowDataForUpdate) {
          $("input#po-number").val(getRowDataForUpdate.po);
          $("select#item-select option")
            .find(function () {
              return $(this).text() == getRowDataForUpdate.item;
            })
            .prop("selected", true);
          $("select#fabric-select option")
            .filter(function () {
              return $(this).text() == getRowDataForUpdate.fabricDetail;
            })
            .prop("selected", true);
          $("input#gsm-number").val(getRowDataForUpdate.gsm);
          $("input#date-input").val(getRowDataForUpdate.date);
          $("textarea#remark-input").val(getRowDataForUpdate.remarks);
          $("button#pp-form-submit").html("Submit");
          isMainRowUpdated = false;
        }
      } else {
        const ppFormData = {
          id: Math.floor(Math.random() * 1000),
          po: $("input#po-number").val(),
          item: $("select#item-select").find(":selected").text(),
          fabricDetail: $("select#fabric-select").find(":selected").text(),
          gsm: $("input#gsm-number").val(),
          date: $("input#date-input").val(),
          remarks: $("textarea#remark-input").val(),
          subTable: [],
        };
        globalData.push(ppFormData);
      }
      updateData(globalData);
      $(":input", "#pp-form").val("");
    }
  });

  //on main form update
  $(document).on("click", "#update-main-table-row", function () {
    $("button#pp-form-submit").html("Update");
    isMainRowUpdated = true;
    const id = parseInt($(this).closest("tr").attr("key"));
    setMainTableRowId = id;
    const findDataToUpdate = globalData.find((ele) => ele.id === id);
    const { po, item, fabricDetail, gsm, date, remarks } = findDataToUpdate;
    $("input#po-number").val(po);
    $("input#gsm-number").val(gsm),
      $("input#date-input").val(date),
      $("textarea#remark-input").val(remarks);
    $("select#item-select").append(`<option selected>${item}</option>`);
    $("select#fabric-select").append(
      `<option selected>${fabricDetail}</option>`
    );
  });

  //on main form row delete
  $(document).on("click", "#delete-main-table-row", function () {
    if (confirm("are you sure to delete the row?")) {
      const id = parseInt($(this).closest("tr").attr("key"));
      const updatedData = globalData.filter((ele) => ele.id !== id);
      globalData = updatedData;
      updateData(globalData);
    }
  });

  //ON CLOSE MODAL
  $("#close-Modal").on("click", function () {
    $("#field-wrapper").html("");
    isSubTableUpdated = false;
  });

  //==When Click on Modal Button to Open==//
  $(document).on("click", "#open-modal", function () {
    //set the id of the current row
    setMainTableRowId = parseInt($(this).closest("tr").attr("key"));
    addInputRowInModal(sizeSelectDownData);
  });

  function addSizeSelectOption(obj, size) {
    var rtn = "";
    $.each(obj, function (idx, value) {
      const { MasterValue, MasterValueID } = value;
      if (size == MasterValue) {
        rtn += `<option value=${MasterValueID} selected>${MasterValue}</option>`;
      } else {
        rtn += `<option value=${MasterValueID}>${MasterValue}</option>`;
      }
    });
    return rtn;
  }

  function addInputRowInModal() {
    let wrapper = $("#field-wrapper");
    wrapper.html("");

    let fieldHTML = `
    <tr>
    <td>
    <div class="form-group">
    <select class="form-control" name="titles[]" required id="multipleSizeSelect">
    ${addSizeSelectOption(sizeSelectDownData)}
    </select>
    </div>
    </td>
    <td><input type="text" class="form-control" name="titles[]" required></td>
    <td><input type="text" class="form-control" name="titles[]" required></td>
    <td><input type="text" class="form-control" name="titles[]" required></td>
    <td><input type="text" class="form-control" name="titles[]" required></td>
    <td><input type="text" class="form-control" name="titles[]" required></td>
    <td>
    <a id="add-modal-field" style="cursor: pointer; display: block;"><i class="fa fa-lg fa-plus-circle"></i></a>
    <a id="remove-modal-field" style="cursor: pointer;"><i class="fa fa-lg fa-minus-circle"></i></a>
    </td>
  </tr>`;

    $(wrapper).append(fieldHTML);
  }

  //==on Modal submit Get Data from modal==//
  $("form#pp-modal-form").on("submit", function (event) {
    if (this.checkValidity() === true) {
      event.preventDefault();
      //function to get data from modal
      function getModalTableData() {
        const numberOfInput = 6;

        let data = [];

        let titles = $("[name^=titles]")
          .map(function () {
            if ($(this).is("select")) {
              return $(this).find(":selected").text();
            } else {
              return $(this).val();
            }
          })
          .get();

        const arrayShouldRun = titles.length / numberOfInput;

        for (let index = 0; index < arrayShouldRun; index++) {
          data.push({
            id: Math.floor(Math.random() * 1000),
            size: titles[0],
            qty: titles[1],
            cost: titles[2],
            ws: titles[3],
            retail: titles[4],
            margin: titles[5],
          });
          for (let index = 0; index < numberOfInput; index++) {
            titles.shift();
          }
        }

        return {
          subTableid: Math.floor(Math.random() * 1000),
          sizeChart: data,
        };

        //return data
      }

      let modalData = getModalTableData();
      let findSizeChart = globalData.find(
        (table) => table.id === setMainTableRowId
      );

      if (isSubTableUpdated) {
        if (findSizeChart) {
          let currentTable = findSizeChart.subTable.find(
            (table) => table.subTableid === setSubTableId
          );
          currentTable.sizeChart = modalData.sizeChart;
        }
        isSubTableUpdated = false;
      } else {
        //update global data
        if (findSizeChart) {
          findSizeChart.subTable = [...findSizeChart.subTable, modalData];
        }
      }
      updateData(globalData);
      $("#sub-table-modal").modal("hide");
    }
  });

  //==Render Sub Table==//
  function renderSubTable(obj) {
    var numberofTables = "";
    let total = [2000, 2000];
    let total1 = [];

    obj.forEach((table, index) => {
      const { subTableid, sizeChart } = table;
      let val = 0;
      sizeChart.forEach((table) => (val += parseInt(table.qty)));
      total1.push(val);
      numberofTables += `<div class="table-responsive mt-1">
      <table class="table table-xs" key=${subTableid}>
      <thead class="thead-light">
      <tr>
      <th scope="col" style="width: 10%;">T.QTY</th>
      <th scope="col" style="width: 10%;">SIZE</th>
      <th scope="col" style="width: 3%;">QTY</th>
      <th scope="col" style="width: 3%;">COST</th>
      <th scope="col" style="width: 3%;">WS</th>
      <th scope="col" style="width: 3%;">RETAIL</th>
      <th scope="col" style="width: 3%;">MARGIN</th>
      <th scope="col" style="width: 3%;"><i class="fa fa-reorder"></i></th>
      </tr>
      </thead>
      <tbody>
      ${renderRows(sizeChart, total1[index])}
      </tbody>
      </table>
      </div>`;
    });

    return numberofTables;
  }

  //==Render Sub Table Rows==//
  function renderRows(obj, total) {
    var numberOfRows = "";
    //for iretrate on one time
    let addOnfirst = true;
    obj.forEach((table, index) => {
      const { id, size, qty, cost, ws, retail, margin } = table;
      numberOfRows += `<tr key=${id}>
        ${addOnfirst && `<td rowspan=${obj.length}>${total}</td>`}
        <td>${size}</td>
        <td>${qty}</td>
        <td>${cost}</td>
        <td>${ws}</td>
        <td>${retail}</td>
        <td>${margin}</td>
        ${
          addOnfirst &&
          `<td rowspan=${obj.length}>
        <i class="fa fa-pencil" style="cursor: pointer; color: green;" id="update-sub-table"></i>
        <i class="fa fa-trash-o" style="cursor: pointer; color:red;" id="delete-sub-table"></i>
        </td>`
        }
      </tr>`;
      addOnfirst = "";
    });

    //return result
    return numberOfRows;
  }

  //==Remove Sub Table On Click==//
  $(document).on("click", "#delete-sub-table", function () {
    if (confirm("are you sure?")) {
      //select the id of current table
      const subTableID = parseInt($(this).closest("table").attr("key"));

      //select the id of current row in which table inserted
      const mainTableRowID = parseInt(
        $(this).closest("table").closest("tr").attr("key")
      );

      //find the current row from the global data

      let currentRow = globalData.find((row) => row.id === mainTableRowID);

      if (currentRow) {
        const newUpdatedSubTable = currentRow.subTable.filter(
          (table) => table.subTableid !== subTableID
        );
        currentRow.subTable = newUpdatedSubTable;
        updateData(globalData);
      }
    }
  });

  //==Update Sub Table on click==//
  $(document).on("click", "#update-sub-table", function () {
    isSubTableUpdated = true;
    setMainTableRowId = parseInt(
      $(this).closest("table").closest("tr").attr("key")
    );
    setSubTableId = parseInt($(this).closest("table").attr("key"));
    let wrapper = $("#field-wrapper");
    wrapper.html("");

    //get sub table data
    const currentRow = globalData.find((row) => row.id === setMainTableRowId);
    if (currentRow) {
      currentSubTable = currentRow.subTable.find(
        (table) => table.subTableid === setSubTableId
      ).sizeChart;
    }

    //populate the data into modal
    let rtn = "";
    currentSubTable.forEach((row) => {
      const { qty, size, cost, ws, retail, margin } = row;
      rtn += `<tr>
      <td>
      <div class="form-group">
      <select class="form-control" name="titles[]" required>
      ${addSizeSelectOption(sizeSelectDownData, size)}
      </select>
      </div>
      </td>
      <td><input type="text" class="form-control" name="titles[]" value=${qty} required></td>
      <td><input type="text" class="form-control" name="titles[]" value=${cost} required></td>
      <td><input type="text" class="form-control" name="titles[]" value=${ws} required></td>
      <td><input type="text" class="form-control" name="titles[]" value=${retail} required></td>
      <td><input type="text" class="form-control" name="titles[]" value=${margin} required></td>
      <td>
      <a id="add-modal-field" style="cursor: pointer; display: block;"><i class="fa fa-lg fa-plus-circle"></i></a>
      <a id="remove-modal-field" style="cursor: pointer;"><i class="fa fa-lg fa-minus-circle"></i></a>
      </td>
    </tr>`;
    });

    $(wrapper).append(rtn); //Add field html

    $("#sub-table-modal").modal("show");
  });

  //Click on Modal Plus button to add inputs//
  let wrapper = $("#field-wrapper");

  $(wrapper).on("click", "#add-modal-field", function () {
    addInputRowInModal();
  });

  //Click on Modal minus button to remove inputs
  $(wrapper).on("click", "#remove-modal-field", function (e) {
    if ($(this).closest("tbody").children("tr").length > 1) {
      $(this).parent("td").parent("tr").remove(); //Remove field html
    }
  });

  //on page load
  updateData(globalData);
  //fetch api
  getDropDown("https://jsonplaceholder.typicode.com/todos/");
});
