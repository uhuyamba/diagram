function initDiagram() {
  const $ = go.GraphObject.make;

  // Define custom geometry strings
  const tank1 = "F M0 0 L0 80 120 80 120 0z";
  const tank2 = "F M0 0 L0 120 50 120 50 0z";
  
  // Updated pump geometry to match the image - vertical cylindrical pump with piston rod
  const pump1 = "F M35 0 L45 0 L45 15 L55 15 L55 65 L25 65 L25 15 L35 15 Z M30 20 L50 20 L50 60 L30 60 Z";
  
  const koDrum = "F M10 10 L90 10 A5 5 0 0 1 90 20 L10 20 A5 5 0 0 1 10 10 Z M0 12 L10 12 L10 18 L0 18 Z M90 12 L100 12 L100 18 L90 18 Z";

  // Emergency pit geometry - stepped pit shape like in the image
  const emergencyPit = "F M0 0 L80 0 L80 10 L70 10 L70 20 L60 20 L60 30 L50 30 L50 40 L30 40 L30 30 L20 30 L20 20 L10 20 L10 10 L0 10 Z";

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.GridLayout, { spacing: new go.Size(30, 30) }),
  });

  // Pump template
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
          strokeWidth: 2,
          stroke: "black",
          width: 80,
          height: 80,
          geometryString: pump1,
          fill: new go.Brush("Linear", {
            0: "lightblue",
            0.3: "white", 
            0.7: "lightgray",
            1: "darkgray",
            start: go.Spot.Top,
            end: go.Spot.Bottom,
          }),
        }
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Bottom,
          alignmentFocus: go.Spot.Top,
          stroke: "black",
          font: "bold 10pt sans-serif",
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Emergency pit template
  myDiagram.nodeTemplateMap.add(
    "emergencypit",
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
          strokeWidth: 2,
          stroke: "darkbrown",
          width: 80,
          height: 50,
          geometryString: emergencyPit,
          fill: new go.Brush("Linear", {
            0: "lightgray",
            0.3: "white", 
            0.7: "lightgray",
            1: "darkgray",
            start: go.Spot.Top,
            end: go.Spot.Bottom,
          }),
        }
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Bottom,
          alignmentFocus: go.Spot.Top,
          stroke: "black",
          font: "bold 10pt sans-serif",
          margin: new go.Margin(5, 0, 0, 0),
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Tank template
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

  // Default node template
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
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

  // Link template
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.AvoidsNodes, curve: go.Link.JumpOver },
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
  );

  // Set the model data
  myDiagram.model = new go.GraphLinksModel(
    [
      { "key": "Pit Pump 1", "category": "pump", "pos": "250 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { "key": "Pit Pump 2", "category": "pump", "pos": "350 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { "key": "Pit Pump 3", "category": "pump", "pos": "350 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { key: "Emergency Pit 1", category: "emergencypit", pos: "150 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Emergency Pit 2", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Water Spreader", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "PWPT-01", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "PWPT-02", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "PWPT-05A", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "PWPT-05B", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Pre Wetland 1B&2B", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Wetland 1B,2B,3B&4B", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Pre Wetland 1A", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Wetland 1A,2A,3A&4A", category: "emergencypit", pos: "450 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Gas Boot I", category: "tank", tankType: tank2, pos: "250 -200" },
      { key: "Gas Boot II", category: "tank", tankType: tank2, pos: "350 -200" },
      { key: "Recycle Tank", category: "tank", tankType: tank1, pos: "100 0" },
      { key: "Separator 1", category: "tank", tankType: tank1, pos: "200 0" },
      { key: "Separator 2", category: "tank", tankType: tank1, pos: "300 0" },
      { key: "Separator 3", category: "tank", tankType: tank1, pos: "400 0" },
      { key: "Separator 4", category: "tank", tankType: tank1, pos: "500 0" },
      { key: "Separator 5", category: "tank", tankType: tank1, pos: "600 0" },
      { key: "Separator 6", category: "tank", tankType: tank1, pos: "700 0" },
      {
        key: "Wash Tank I",
        category: "tank",
        tankType: tank1,
        info: "Tangki penyimpanan air berkapasitas 1000 liter.",
        pos: "150 100",
      },
      {
        key: "Wash Tank II",
        category: "tank",
        tankType: tank1,
        info: "Tangki penyimpanan air berkapasitas 1000 liter.",
        pos: "300 100",
      },
      {
        key: "Wash Tank III",
        category: "tank",
        tankType: tank1,
        info: "Tangki penyimpanan air berkapasitas 1000 liter.",
        pos: "450 100",
      },
      {
        key: "Shipping Tank",
        category: "tank",
        tankType: tank1,
        pos: "600 100",
      },
      { key: "Pompa-0201", color: "#f9f9f9", pos: "100 200" },
      { key: "Metering w-0201", color: "#f9f9f9", pos: "250 200" },
      { key: "Shipping Line", color: "#f9f9f9", pos: "400 200" },
      { key: "Existing Canal", color: "#f9f9f9", pos: "400 200" },
      { key: "Gas Plant", color: "#f9f9f9", pos: "550 200" },
      { key: "Emergency Vent", color: "#dddddd", pos: "300 -300" },
      { key: "Ko Drum", color: "#eeeeee", pos: "500 -200" },
      { key: "River Stack", color: "#ff9933", pos: "650 -200" },
    ],
    [
      { from: "Emergency Pit 1", to: "Pit Pump 1" },
      { from: "Emergency Pit 2", to: "Pit Pump 2" },
      { from: "Pit Pump 1", to: "Gas Boot I" },
      { from: "Pit Pump 2", to: "Gas Boot II" },
      { from: "Gas Boot I", to: "Emergency Vent" },
      { from: "Gas Boot I", to: "Separator 1" },
      { from: "Gas Boot II", to: "Separator 2" },
      { from: "Separator 1", to: "Wash Tank I" },
      { from: "Separator 2", to: "Wash Tank II" },
      { from: "Wash Tank I", to: "Shipping Tank" },
      { from: "Wash Tank II", to: "Shipping Tank" },
      { from: "Shipping Tank", to: "Pompa-0201" },
      { from: "Wash Tank I", to: "Ko Drum" },
      { from: "Seal Tank", to: "River Stack" },
      { from: "Ko Drum", to: "River Stack" },
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