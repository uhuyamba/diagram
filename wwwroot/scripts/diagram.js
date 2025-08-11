function initDiagram() {
  const $ = go.GraphObject.make;

  // Define custom geometry strings
  const tank1 = "F M0 0 L0 80 120 80 120 0z";
  const tank2 = "F M0 0 L0 120 50 120 50 0z";
  
  // Simple wash tank - rectangular tank shape
  const washTank = "F M10 10 L110 10 L110 70 L10 70 Z";
  
  // Simple shipping tank - larger rectangular tank shape
  const shippingTank = "F M5 5 L125 5 L125 75 L5 75 Z";
  
  // Realistic gas boot separator - horizontal drum with inlet/outlet nozzles
  const gasBootSeparator = "F M10 20 L90 20 A20 20 0 0 1 90 60 L10 60 A20 20 0 0 1 10 20 Z M5 35 L15 35 L15 45 L5 45 Z M95 35 L105 35 L105 45 L95 45 Z M40 5 L60 5 L60 20 L40 20 Z M40 60 L60 60 L60 75 L40 75 Z";

  // Updated pump geometry to match the image - vertical cylindrical pump with piston rod
  const pump1 =
    "F M35 0 L45 0 L45 15 L55 15 L55 65 L25 65 L25 15 L35 15 Z M30 20 L50 20 L50 60 L30 60 Z";

  const koDrum =
    "F M10 10 L90 10 A5 5 0 0 1 90 20 L10 20 A5 5 0 0 1 10 10 Z M0 12 L10 12 L10 18 L0 18 Z M90 12 L100 12 L100 18 L90 18 Z";

  const rectArrowRight = "F M0 5 L80 5 L80 0 L100 12.5 L80 25 L80 20 L0 20 Z";

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    initialContentAlignment: go.Spot.Center,
    "toolManager.hoverDelay": 100,
    allowZoom: true,
    allowHorizontalScroll: true,
    allowVerticalScroll: true,
  });

  // Enhanced Gas Boot template with realistic separator design
  myDiagram.nodeTemplateMap.add(
    "gasboot",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
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
          geometryString: gasBootSeparator,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 9pt sans-serif",
          margin: 2
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Wash Tank template with realistic cylindrical design
  myDiagram.nodeTemplateMap.add(
    "washtank",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
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
          stroke: "darkred",
          geometryString: washTank,
          fill: new go.Brush("Linear", {
            0: go.Brush.darken("#FF4500"),
            0.2: "#FF6347", 
            0.5: "#FF7F50",
            0.8: "#FF6347",
            1: go.Brush.darken("#FF4500"),
            start: go.Spot.Left,
            end: go.Spot.Right,
          }),
        },
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 9pt sans-serif",
          margin: 2
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Shipping Tank template with realistic larger cylindrical design
  myDiagram.nodeTemplateMap.add(
    "shippingtank",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
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
          stroke: "darkgreen",
          geometryString: shippingTank,
          fill: new go.Brush("Linear", {
            0: go.Brush.darken("#228B22"),
            0.2: "#32CD32", 
            0.5: "#90EE90",
            0.8: "#32CD32",
            1: go.Brush.darken("#228B22"),
            start: go.Spot.Left,
            end: go.Spot.Right,
          }),
        },
      ),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "white",
          font: "bold 9pt sans-serif",
          background: "rgba(0,0,0,0.7)",
          margin: 2
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Tank template (for other tanks)
  myDiagram.nodeTemplateMap.add(
    "tank",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
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
          font: "bold 10pt sans-serif",
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
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
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
          stroke: "darkblue",
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
            fetchAndShowInfo(node.data.key);
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
          stroke: "darkorange",
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
        const node = obj.part;
        if (node) fetchAndShowInfo(node.data.key);
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
      { margin: 4, editable: true, font: "9pt sans-serif" },
      new go.Binding("text", "key").makeTwoWay()
    )
  );

  myDiagram.nodeTemplateMap.add(
    "rectarrow",
    $(
      go.Node,
      "Spot",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "SHAPE",
        click: function (e, obj) {
          const node = obj.part;
          if (node) fetchAndShowInfo(node.data.key);
        },
      },
      new go.Binding("location", "pos", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(go.Shape, {
        name: "SHAPE",
        strokeWidth: 2,
        stroke: "black",
        geometryString: rectArrowRight,
        fill: "transparent",
      }),
      $(
        go.TextBlock,
        {
          alignment: go.Spot.Center,
          stroke: "black",
          font: "bold 9pt sans-serif",
        },
        new go.Binding("text", "key")
      )
    )
  );

  // Enhanced Link template with orthogonal routing for clearer connections
  myDiagram.linkTemplate = $(
    go.Link,
    { 
      routing: go.Link.Orthogonal, 
      corner: 10,
      reshapable: true,
      resegmentable: true
    },
    new go.Binding("routing", "routing"),
    $(go.Shape, { strokeWidth: 3 }, new go.Binding("stroke", "color")),
    $(
      go.Shape,
      { toArrow: "Standard", strokeWidth: 0, scale: 1.2 },
      new go.Binding("fill", "color")
    )
  );

  // Improved layout with better spacing and positioning
  myDiagram.model = new go.GraphLinksModel(
    [
      // Starting point (far left)
      {
        key: "Produce Well",
        category: "rectarrow",
        pos: "50 150",
      },

      // Gas Boot separators - positioned vertically with proper spacing and realistic design
      {
        key: "Gas Boot I",
        category: "gasboot",
        color: new go.Brush("Linear", {
          0: go.Brush.darken("#2E8B57"),
          0.1: "#90EE90", 
          0.3: "#98FB98",
          0.7: "#90EE90",
          0.9: go.Brush.darken("#2E8B57"),
          1: "#006400",
          start: go.Spot.Top,
          end: go.Spot.Bottom,
        }),
        pos: "220 100",
      },
      {
        key: "Gas Boot II", 
        category: "gasboot",
        color: new go.Brush("Linear", {
          0: go.Brush.darken("#DC143C"),
          0.1: "#DC143C", 
          0.3: "#DC143C",
          0.7: "#DC143C",
          0.9: go.Brush.darken("#DC143C"),
          1: "#8B0000",
          start: go.Spot.Top,
          end: go.Spot.Bottom,
        }),
        pos: "220 220",
      },

      // Wash Tanks with simple rectangular tank design and red/green colors
      {
        key: "Wash Tank I",
        category: "washtank",
        pos: "500 100",
      },
      {
        key: "Wash Tank II",
        category: "washtank",
        pos: "680 160",
      },
      {
        key: "Wash Tank III",
        category: "washtank",
        pos: "860 100",
      },

      // Shipping tank with simple rectangular design and green color
      {
        key: "Shipping Tank",
        category: "shippingtank",
        pos: "500 320",
      },

      {
        key: "Pompa-0201",
        color: "#f9f9f9",
        pos: "200 450",
      },
      {
        key: "Metering w-0201",
        category: "metering",
        color: "#e6f3ff",
        pos: "380 450",
      },
      {
        key: "Shipping Line",
        category: "shippingline",
        color: "#fff2e6",
        pos: "580 450",
      },

      {
        key: "Ko Drum",
        color: "#eeeeee",
        pos: "680 280",
      },
      {
        key: "Gas Plant",
        category: "rectarrow",
        pos: "860 280",
      },

      {
        key: "Inlet Raw Water",
        category: "rectarrow",
        pos: "1040 160",
      },

      {
        key: "Inlet Surge Tank",
        category: "rectarrow",
        pos: "200 580",
      },
      {
        key: "Water Balance Tank",
        category: "rectarrow",
        pos: "500 580",
      },
    ],
    [
      { from: "Produce Well", to: "Gas Boot I", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Produce Well", to: "Gas Boot II", color: "#000000", routing: go.Link.Orthogonal },

      { from: "Gas Boot I", to: "Wash Tank I", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Gas Boot II", to: "Wash Tank II", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Wash Tank I", to: "Wash Tank III", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Wash Tank II", to: "Wash Tank III", color: "#000000", routing: go.Link.Orthogonal },

  
      { from: "Wash Tank I", to: "Shipping Tank", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Wash Tank II", to: "Shipping Tank", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Wash Tank III", to: "Shipping Tank", color: "#000000", routing: go.Link.Orthogonal },

      { from: "Shipping Tank", to: "Pompa-0201", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Pompa-0201", to: "Metering w-0201", color: "#000000", routing: go.Link.Orthogonal },
      { from: "Metering w-0201", to: "Shipping Line", color: "#000000", routing: go.Link.Orthogonal },

      { from: "Gas Boot I", to: "Ko Drum", color: "#FFD700", routing: go.Link.Orthogonal },
      { from: "Gas Boot II", to: "Ko Drum", color: "#FFD700", routing: go.Link.Orthogonal },
      { from: "Ko Drum", to: "Gas Plant", color: "#FFD700", routing: go.Link.Orthogonal },

      { from: "Wash Tank I", to: "Inlet Surge Tank", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Wash Tank II", to: "Inlet Surge Tank", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Wash Tank III", to: "Inlet Surge Tank", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Inlet Surge Tank", to: "Water Balance Tank", color: "#0066FF", routing: go.Link.Orthogonal },

      // Raw water supply (Blue - Water Supply)
      { from: "Inlet Raw Water", to: "Wash Tank I", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Inlet Raw Water", to: "Wash Tank II", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Inlet Raw Water", to: "Wash Tank III", color: "#0066FF", routing: go.Link.Orthogonal },

      { from: "Water Balance Tank", to: "Wash Tank I", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Water Balance Tank", to: "Wash Tank II", color: "#0066FF", routing: go.Link.Orthogonal },
      { from: "Water Balance Tank", to: "Wash Tank III", color: "#0066FF", routing: go.Link.Orthogonal },
    ]
  );
}

function fetchAndShowInfo(key) {
  fetch(`http://localhost:5287/api/NodeInfo/${encodeURIComponent(key)}`)
    .then((response) => {
      if (!response.ok) throw new Error("Tidak ditemukan");
      return response.text();
    })
    .then((infoText) => {
      showPopup(key, infoText);
    })
    .catch(() => {
      showPopup(key, "Informasi tidak tersedia.");
    });
}

function showPopup(title, content) {
  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popupContent").innerText = content;
  document.getElementById("infoPopup").style.display = "block";
}

function hidePopup() {
  document.getElementById("infoPopup").style.display = "none";
}