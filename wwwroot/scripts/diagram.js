function initDiagram() {
  const $ = go.GraphObject.make;

  // Define custom geometry strings
  const tank1 = "F M0 0 L0 80 120 80 120 0z";
  const tank2 = "F M0 0 L0 120 50 120 50 0z";
  
  // Updated separator geometry to match the image with diagonal internal plates
  const separator = "F M0 0 L0 80 120 80 120 0 Z M20 10 L40 30 M30 10 L50 30 M40 10 L60 30 M50 10 L70 30 M60 10 L80 30 M70 10 L90 30 M80 10 L100 30 M20 50 L40 70 M30 50 L50 70 M40 50 L60 70 M50 50 L70 70 M60 50 L80 70 M70 50 L90 70 M80 50 L100 70";
  
  // Updated pump geometry to match the image - vertical cylindrical pump with piston rod
  const pump1 = "F M35 0 L45 0 L45 15 L55 15 L55 65 L25 65 L25 15 L35 15 Z M30 20 L50 20 L50 60 L30 60 Z";
  
  const koDrum = "F M10 10 L90 10 A5 5 0 0 1 90 20 L10 20 A5 5 0 0 1 10 10 Z M0 12 L10 12 L10 18 L0 18 Z M90 12 L100 12 L100 18 L90 18 Z";

  // Emergency pit geometry - stepped pit shape like in the image
  const emergencyPit = "F M0 0 L80 0 L80 10 L70 10 L70 20 L60 20 L60 30 L50 30 L50 40 L30 40 L30 30 L20 30 L20 20 L10 20 L10 10 L0 10 Z";

  // Close pit geometry - U-shaped channel like in the provided image
  const closePit = "F M0 0 L10 0 L10 50 L70 50 L70 0 L80 0 L80 60 L0 60 Z";

  // Candle flare geometry - lilin dengan api di atas
  const candleFlare = "F M35 10 L45 10 L45 70 L35 70 Z M30 70 L50 70 L50 80 L30 80 Z M37 0 L38 0 L40 5 L42 3 L43 0 L44 0 L42 8 L38 8 Z";

  // Circular tank with conical bottom geometry for P-0108A
  const circularTank = "F M40 10 A30 30 0 1 1 40 70 A30 30 0 1 1 40 10 Z M25 70 L40 85 L55 70 Z";

  // NEW: Aerator Pond geometry with scalloped border and internal diagonal lines
  const aeratorPond = "F M10 0 A5 5 0 0 1 20 0 A5 5 0 0 1 30 0 A5 5 0 0 1 40 0 A5 5 0 0 1 50 0 A5 5 0 0 1 60 0 A5 5 0 0 1 70 0 A5 5 0 0 1 80 0 A5 5 0 0 1 90 0 A5 5 0 0 1 100 0 A5 5 0 0 1 110 0 L110 10 A5 5 0 0 1 110 20 A5 5 0 0 1 110 30 A5 5 0 0 1 110 40 A5 5 0 0 1 110 50 A5 5 0 0 1 110 60 L100 60 A5 5 0 0 1 90 60 A5 5 0 0 1 80 60 A5 5 0 0 1 70 60 A5 5 0 0 1 60 60 A5 5 0 0 1 50 60 A5 5 0 0 1 40 60 A5 5 0 0 1 30 60 A5 5 0 0 1 20 60 A5 5 0 0 1 10 60 L10 50 A5 5 0 0 1 10 40 A5 5 0 0 1 10 30 A5 5 0 0 1 10 20 A5 5 0 0 1 10 10 A5 5 0 0 1 10 0 Z M20 15 L40 35 M30 15 L50 35 M40 15 L60 35 M50 15 L70 35 M60 15 L80 35 M70 15 L90 35 M80 15 L100 35";

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.GridLayout, { spacing: new go.Size(30, 30) }),
  });

  // NEW: Aerator Pond template with scalloped border design
  myDiagram.nodeTemplateMap.add(
    
    "aeratorpond",
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
          width: 120,
          height: 70,
          geometryString: aeratorPond,
          fill: new go.Brush("Linear", {
            0: "lightcyan",
            0.3: "lightblue", 
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
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 9pt sans-serif",
          wrap: go.TextBlock.WrapFit,
          width: 100,
          textAlign: "center",
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Circular tank template for P-0108A
  myDiagram.nodeTemplateMap.add(
    "circulartank",
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
          height: 85,
          geometryString: circularTank,
          fill: new go.Brush("Radial", {
            0: "lightblue",
            0.3: "white", 
            0.7: "lightgray",
            1: "darkgray",
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

  // Separator template with custom geometry
  myDiagram.nodeTemplateMap.add(
    "separator",
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
          width: 120,
          height: 80,
          geometryString: separator,
          fill: new go.Brush("Linear", {
            0: "lightblue",
            0.3: "white", 
            0.7: "lightgray",
            1: "darkgray",
            start: go.Spot.Left,
            end: go.Spot.Right,
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

  // Close pit template - U-shaped channel
  myDiagram.nodeTemplateMap.add(
    "closepit",
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
          height: 60,
          geometryString: closePit,
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

  // Candle flare template
  myDiagram.nodeTemplateMap.add(
    "candleflare",
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
          width: 50,
          height: 80,
          geometryString: candleFlare,
          fill: new go.Brush("Linear", {
            0: "orange",
            0.1: "red",
            0.2: "yellow",
            0.6: "white",
            0.8: "lightgray",
            1: "gray",
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

  // Metering template - smaller rectangular component
  myDiagram.nodeTemplateMap.add(
    "metering",
    $(
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
          fill: "#e6f3ff",
          strokeWidth: 2,
          stroke: "darkblue",
          width: 100,
          height: 40,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { 
          margin: 4, 
          editable: true,
          font: "bold 9pt sans-serif",
          stroke: "darkblue"
        },
        new go.Binding("text", "key").makeTwoWay()
      )
    )
  );

  // Shipping line template - longer horizontal component
  myDiagram.nodeTemplateMap.add(
    "shippingline",
    $(
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
          fill: "#fff2e6",
          strokeWidth: 2,
          stroke: "darkorange",
          width: 120,
          height: 35,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { 
          margin: 4, 
          editable: true,
          font: "bold 9pt sans-serif",
          stroke: "darkorange"
        },
        new go.Binding("text", "key").makeTwoWay()
      )
    )
  );

  // Existing canal template - wider component for canal representation
  myDiagram.nodeTemplateMap.add(
    "canal",
    $(
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
          fill: "#e6f7ff",
          strokeWidth: 2,
          stroke: "#1890ff",
          width: 110,
          height: 45,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { 
          margin: 4, 
          editable: true,
          font: "bold 9pt sans-serif",
          stroke: "#1890ff"
        },
        new go.Binding("text", "key").makeTwoWay()
      )
    )
  );

  // Emergency vent template - wider horizontal component
  myDiagram.nodeTemplateMap.add(
    "emergencyvent",
    $(
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
          fill: "#fff0f6",
          strokeWidth: 2,
          stroke: "#c41e3a",
          width: 120,
          height: 50,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { 
          margin: 4, 
          editable: true,
          font: "bold 9pt sans-serif",
          stroke: "#c41e3a"
        },
        new go.Binding("text", "key").makeTwoWay()
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

  // Set the model data - Updated Aerator Pond PWTP-5C to use new aeratorpond category
  myDiagram.model = new go.GraphLinksModel(
    [
      { "key": "Pit Pump 1", "category": "pump", "pos": "250 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { "key": "Pit Pump 2", "category": "pump", "pos": "350 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { "key": "Pit Pump 3", "category": "pump", "pos": "450 -80", "info": "Pompa pit untuk mengangkat fluida dari sumur dalam" },
      { "key": "Close Pit", "category": "closepit", "pos": "450 -80", "info": "Saluran berbentuk U untuk drainase atau penampungan" },
      { key: "Emergency Pit 1", category: "emergencypit", pos: "150 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "Emergency Pit 2", category: "emergencypit", pos: "550 -80", info: "Sumur darurat dengan struktur bertingkat untuk menampung fluida" },
      { key: "P-0108A", category: "circulartank", pos: "550 -80", info: "Tangki bulat dengan dasar kerucut untuk settling dan clarification" },
      { key: "Water Spreader", category: "emergencypit", pos: "650 -80", info: "Penyebar air untuk distribusi merata" },
      { key: "PWPT-01", category: "emergencypit", pos: "750 -80", info: "Process Water Pit Tank 01" },
      { key: "PWPT-02", category: "emergencypit", pos: "850 -80", info: "Process Water Pit Tank 02" },
      { key: "PWPT-05A", category: "emergencypit", pos: "950 -80", info: "Process Water Pit Tank 05A" },
      { key: "PWPT-05B", category: "emergencypit", pos: "1050 -80", info: "Process Water Pit Tank 05B" },
      { key: "Aerator Pond PWTP-5C", category: "aeratorpond", pos: "1150 -80", info: "Aerator pond dengan sistem aerasi untuk treatment biologis air limbah" },
      { key: "Pre Wetland 1B&2B", category: "emergencypit", pos: "1150 -80", info: "Pre wetland untuk treatment awal 1B dan 2B" },
      { key: "Wetland 1B,2B,3B&4B", category: "emergencypit", pos: "1250 -80", info: "Wetland untuk treatment biologis 1B-4B" },
      { key: "Pre Wetland 1A", category: "emergencypit", pos: "1350 -80", info: "Pre wetland untuk treatment awal 1A" },
      { key: "Wetland 1A,2A,3A&4A", category: "emergencypit", pos: "1450 -80", info: "Wetland untuk treatment biologis 1A-4A" },
      { key: "Gas Boot I", category: "tank", tankType: tank2, pos: "250 -200" },
      { key: "Gas Boot II", category: "tank", tankType: tank2, pos: "350 -200" },
      { key: "Recycle Tank", category: "tank", tankType: tank1, pos: "100 0" },
      { key: "Separator 1", category: "separator", pos: "200 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
      { key: "Separator 2", category: "separator", pos: "300 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
      { key: "Separator 3", category: "separator", pos: "400 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
      { key: "Separator 4", category: "separator", pos: "500 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
      { key: "Separator 5", category: "separator", pos: "600 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
      { key: "Separator 6", category: "separator", pos: "700 0", info: "Separator dengan plat internal diagonal untuk pemisahan fase" },
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
      { key: "P-0201", color: "#f9f9f9", pos: "100 200" },
      { key: "Metering w-0201", category: "metering", pos: "250 200", info: "Unit metering untuk pengukuran flow rate air" },
      { key: "Shipping Line", category: "shippingline", pos: "400 200", info: "Jalur pengiriman produk ke storage atau transport" },
      { key: "Existing Canal", category: "canal", pos: "550 200", info: "Kanal yang sudah ada untuk drainase atau transport air" },
      { key: "Seal Tank", color: "#f9f9f9", pos: "700 200" },
      { key: "Gas Plant", color: "#f9f9f9", pos: "850 200" },
      { key: "Emergency Vent", category: "emergencyvent", pos: "300 -300", info: "Ventilasi darurat untuk pelepasan tekanan berlebih" },
      { key: "Relief Line From Petani", color: "#eeeeee", pos: "500 -200" },
      { key: "Relief From Bekasap GP", color: "#eeeeee", pos: "500 -200" },
      { key: "Relief From Bekasap GP", color: "#eeeeee", pos: "500 -200" },
      { key: "Ko Drum", color: "#eeeeee", pos: "500 -200" },
      { key: "Flare", category: "candleflare", pos: "650 -200", info: "Flare berbentuk lilin untuk membakar gas berlebih" },
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
      { from: "Seal Tank", to: "Gas Plant" },
      { from: "Ko Drum", to: "Flare" },
      { from: "Pompa-0201", to: "Metering w-0201" },
      { from: "Metering w-0201", to: "Shipping Line" },
      { from: "Shipping Line", to: "Existing Canal" },
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