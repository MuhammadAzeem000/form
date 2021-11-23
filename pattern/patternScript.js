setTimeout(function () {
  $(document).ready(() => {
    var shirt = [
      {
        id: 0,
        text: "Crepe",
      },
      {
        id: 1,
        text: "Lace",
      },
      {
        id: 2,
        text: "Zipper",
      },
    ];

    var color = [
      {
        id: 0,
        text: "Pink",
      },
      {
        id: 1,
        text: "Blue",
      },
      {
        id: 2,
        text: "Red",
      },
    ];

    // Single Search Select

    $("#pattern-table-body").find("select#shirt-dropdown").select2({
      placeholder: "Select Shirt",
      data: shirt,
    });

    $("#pattern-table-body").find("select#color-dropdown").select2({
      placeholder: "Select Color",
      data: color,
    });

    let inputFields = {
      outputQty: $("#output-qty"),
      shirt: $("#shirt-dropdown"),
      color: $("#color-dropdown"),
      front: $("#front-input"),
      back: $("#back-input"),
      trouser: $("#trouser-input"),
      duppata: $("#duppata-input"),
      other: $("#other-input"),
      applic: $("#applic-input"),
      isMaterial: $("#isMaterial-checkbox"),
      avgRate: $("#avg-rate-input"),
      totalQty: $("#total-qty-ro"),
      material: $("#material-ro"),
      perPC: $("#per-pc-ro"),
      baseCost: $("#base-cost-ro"),
      material2: $("#material2-ro"),
      costPerPC: $("cost-per-pc-ro"),
    };

    const tableBody = $("#pattern-table-body");

    function addTableRow(checkboxID) {
      var row = `                                        <tr id="row">
      <td><input type="number" class="form-control" min="0" id="output-qty" placeholder="0"></td>
      <td>
          <div class="form-group">
              <div class="select2-drpdwn">
                  <select class="js-example-basic-single" id="shirt-dropdown">
                      <option></option>
                  </select>
              </div>
          </div>
      </td>
      <td>
          <div class="form-group">
              <div class="select2-drpdwn">
                  <select class="js-example-basic-single" id="color-dropdown">
                      <option></option>
                  </select>
              </div>
          </div>
      </td>
      <td><input type="number" class="form-control" min="0" id="front-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="back-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="trouser-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="duppata-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="other-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="applic-input" placeholder="0"></td>
      <td><div class="checkbox checkbox-solid-dark is-Material">
          <input id=solid${checkboxID} type="checkbox" value="daily">
          <label for=solid${checkboxID} class="p-0"></label>
      </div></td>
      <td><input type="number" class="form-control" min="0" id="avg-rate-input" placeholder="0"></td>
      <td><input type="number" class="form-control" min="0" id="total-qty-ro" readonly></td>
      <td><input type="number" class="form-control" min="0" id="material-ro" readonly></td>
      <td><input type="number" class="form-control" min="0" id="per-pc-ro" readonly></td>
      <td><input type="number" class="form-control" min="0" id="base-cost-ro" readonly></td>
      <td><input type="number" class="form-control" min="0" id="material-ro" readonly></td>
      <td><input type="number" class="form-control" min="0" id="cost-per-pc-ro" readonly></td>
      <td>
          <a id="add-row-in-table"><i class="fa fa-lg fa-plus-circle"></i></a>
          <a id="remove-row-in-table"><i class="fa fa-lg fa-minus-circle"></i></a>
      </td>
  </tr>`;
      return row;
    }

    const {
      front,
      back,
      trouser,
      duppata,
      other,
      applic,
      avgRate,
      totalQty,
      material,
      perPC,
      outputQty,
    } = inputFields;

    //==Total Quantity==//
    front
      .add(back)
      .add(trouser)
      .add(duppata)
      .add(other)
      .add(applic)
      .on("keyup mouseup", function () {
        let frontValue = $(this).closest("tr").find(front).val();
        let backValue = $(this).closest("tr").find(back).val();
        let trouserValue = $(this).closest("tr").find(trouser).val();
        let duppataValue = $(this).closest("tr").find(duppata).val();
        let otherValue = $(this).closest("tr").find(other).val();
        let applicValue = $(this).closest("tr").find(applic).val();

        let totalQtyValue =
          parseInt(frontValue) +
          parseInt(backValue) +
          parseInt(trouserValue) +
          parseInt(duppataValue) +
          parseInt(otherValue) +
          parseInt(applicValue);

        $(this).closest("tr").find(totalQty).val(totalQtyValue);
      });

    //==Average Quantity==//
    avgRate.on("keyup mouseup", function () {
      let avgRateValue = $(this).closest("tr").find(avgRate).val();
      let totalQtyValue = $(this).closest("tr").find(totalQty).val();
      let materialValue = totalQtyValue * avgRateValue;
      $(this).closest("tr").find(material).val(materialValue);
    });

    //==Per PC==//
    outputQty.on("keyup mouseup", function () {
      let outputQtyValue = $(this).closest("tr").find(outputQty).val();
      let materialValue = $(this).closest("tr").find(material).val();
      const perPCValue = materialValue / parseInt(outputQtyValue);
      console.log(perPCValue);
      $(this).closest("tr").find(perPC).val(perPCValue);
    });

    // Add Row
    $(document).on("click", "#add-row-in-table", function () {
      //console.log(tableBody.find("tr"));

      const checkboxID = tableBody.find("tr").length;
      tableBody.append(addTableRow(checkboxID));

      $("#pattern-table-body").find("select#shirt-dropdown").select2({
        placeholder: "Select Shirt",
        data: shirt,
      });

      $("#pattern-table-body").find("select#color-dropdown").select2({
        placeholder: "Select Color",
        data: color,
      });
    });

    // Remove Row
    $(document).on("click", "#remove-row-in-table", function () {
      const rowNumber = tableBody.find("tr").length;
      if (rowNumber > 1) {
        $(this).closest("tr").remove();
      }
    });
  });
}, 350);
