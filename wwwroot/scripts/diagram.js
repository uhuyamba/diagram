function initDiagram() {
  const $ = go.GraphObject.make;

  // Define custom geometry strings
  const tank1 = "F M0 0 L0 80 120 80 120 0z";
  const tank2 = "F M0 0 L0 120 50 120 50 0z";
  const pump1 =
    "F M 8 10 A 2 2 0 1 1 6 8 L 9 8 L 9 10 Z M 5 11 A 1 1 0 0 1 7 9";

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.GridLayout, { spacing: new go.Size(30, 30) }),
  });

  myDiagram.nodeTemplateMap.add(
    "pump",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          var node = obj.part;
          if (node !== null) {
            var data = node.data;
            showPopup(
              data.key || "Informasi",
              data.info || "Tidak ada informasi."
            );
          }
        },
      },
      new go.Binding("location", "pos", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        {
          name: "SHAPE",
          strokeWidth: 1,
          stroke: "black",
          width: 80,
          height: 80,
          fill: new go.Brush("Linear", {
            0: "lightgray",
            1: go.Brush.darken("white"),
            start: go.Spot.TopLeft,
            end: go.Spot.BottomRight,
          }),
        },
        new go.Binding("geometryString", "pumpType")
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 12pt sans-serif",
        },
        new go.Binding("text", "key")
      )
    )
  );

  myDiagram.nodeTemplateMap.add(
    "tank",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          var node = obj.part;
          if (node !== null) {
            var data = node.data;
            showPopup(
              data.key || "Informasi",
              data.info || "Tidak ada informasi."
            );
          }
        },
      },
      new go.Binding("location", "pos", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        {
          name: "SHAPE",
          strokeWidth: 1,
          stroke: "gray",
          fill: new go.Brush("Linear", {
            0: go.Brush.darken("white"),
            0.2: "white",
            0.33: go.Brush.lighten("white"),
            0.5: "white",
            1: go.Brush.darken("white"),
            start: go.Spot.Left,
            end: go.Spot.Right,
          }),
        },
        new go.Binding("geometryString", "tankType")
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 12pt sans-serif",
        },
        new go.Binding("text", "key")
      )
    )
  );

  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    {
      click: function (e, obj) {
        var node = obj.part;
        if (node !== null) {
          var data = node.data;
          showPopup(
            data.key || "Informasi",
            data.info || "Tidak ada informasi."
          );
        }
      },
    },
    $(
      go.Shape,
      "RoundedRectangle",
      { fill: "lightgray", strokeWidth: 1 },
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: false },
      new go.Binding("text", "key")
    )
  );

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "Pump1", name: "Pompa Utama" },
      { key: "Tank1", name: "Tangki Air" },
    ],
    [{ from: "Pump1", to: "Tank1" }]
  );

  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "RoundedRectangle",
      {
        fill: "lightgreen",
        strokeWidth: 2,
        width: 80,
        height: 50,
      },
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 4, editable: true },
      new go.Binding("text", "key").makeTwoWay()
    )
  );

  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.AvoidsNodes, curve: go.Link.JumpOver },
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
  );

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "ProduceWell", color: "#ccc", pos: "0 0" },
      {
        key: "Heat Exchanger",
        category: "pump",
        info: "Pompa untuk mengalirkan cairan ke tangki penyimpanan.",
        pumpType: pump1,
        pos: "120 0",
      },
      { key: "Gas Boot A", category: "tank", tankType: tank2, pos: "250 -80" },
      { key: "Gas Boot B", category: "tank", tankType: tank2, pos: "250 80" },
      { key: "PMRO A", category: "tank", tankType: tank1, pos: "400 -80" },
      { key: "PMRO B", category: "tank", tankType: tank1, pos: "400 80" },
      {
        key: "Wash Tank A",
        category: "tank",
        tankType: tank1,
        info: "Tangki penyimpanan air berkapasitas 1000 liter.",
        pos: "520 -80",
      },
      {
        key: "Wash Tank B",
        category: "tank",
        tankType: tank1,
        info: "Tangki penyimpanan air berkapasitas 1000 liter.",
        pos: "520 80",
      },
      {
        key: "Shipping Tank",
        category: "tank",
        tankType: tank1,
        pos: "650 80",
      },
      { key: "To DUMAI", color: "#f9f9f9", pos: "780 80" },
      { key: "Emergency Vent", color: "#dddddd", pos: "250 -150" },
      { key: "RD Drum", color: "#eeeeee", pos: "520 -150" },
      { key: "River Stack", color: "#ff9933", pos: "650 -150" },
    ],
    [
      { from: "ProduceWell", to: "Heat Exchanger" },
      { from: "Heat Exchanger", to: "Gas Boot A" },
      { from: "Heat Exchanger", to: "Gas Boot B" },
      { from: "Gas Boot A", to: "Emergency Vent" },
      { from: "Gas Boot A", to: "PMRO A" },
      { from: "Gas Boot A", to: "PMRO B" },
      { from: "Gas Boot B", to: "PMRO A" },
      { from: "Gas Boot B", to: "PMRO B" },
      { from: "PMRO A", to: "Wash Tank A" },
      { from: "PMRO A", to: "Wash Tank B" },
      { from: "PMRO B", to: "Wash Tank A" },
      { from: "PMRO B", to: "Wash Tank B" },
      { from: "Wash Tank A", to: "Shipping Tank" },
      { from: "Wash Tank B", to: "Shipping Tank" },
      { from: "Shipping Tank", to: "To DUMAI" },
      { from: "Wash Tank A", to: "RD Drum" },
      { from: "RD Drum", to: "River Stack" },
    ]
  );
}

function showPopup(title, content) {
  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popupContent").innerText = content;
  document.getElementById("infoPopup").style.display = "block";
}

function hidePopup() {
  document.getElementById("infoPopup").style.display = "none";
}
