const data = [
  {
    id: 1,
    orderDate: "11/11/2020",
    customer: { id: 1, text: "Abc" },
    note: "product is good",
    po: "123",
    item: { id: 1, text: "item-1" },
    fabric: { id: 1, text: "fabric-1" },
    gsm: 123,
    deliveryDate: "11/11/2021",
    remarks: "Remarks-one",
    type: { id: 1, text: "type-1" },
    subTable: [
      [
        { size: "S", qty: 1, cost: 20, ws: 5, retail: 5, margin: 2 },
        { size: "M", qty: 2, cost: 30, ws: 6, retail: 3, margin: 1 },
      ],
      [{ size: "S", qty: 1, cost: 20, ws: 5, retail: 5, margin: 2 }],
    ],
  },
];

function formatData(obj) {
  const newFormat = [];
  obj.forEach((ele) => {
    const {
      orderDate,
      customer,
      note,
      po,
      item,
      fabric,
      gsm,
      deliveryDate,
      remarks,
      type,
      subTable,
    } = ele;
    newFormat.push({
      BillDate: orderDate,
      SupplierID: customer.id,
      SupplierName: customer.text,
      Narration: note,
      detail: {
        ReferenceInvoiveID: po,
        Item_ItemID: item.id,
        Item_ItemName: item.text,
        Fabric_FabricID: fabric.id,
        Fabric_FabricName: fabric.text,
        GSM: gsm,
        Delivery_Date: deliveryDate,
        Detail_Narration: remarks,
        Type_TypeID: type.id,
        Type_TypeName: type.text,
        Table: subTable,
      },
    });
  });
  return newFormat;
}

console.log(formatData(data));
