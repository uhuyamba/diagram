function initDiagram() {
  const $ = go.GraphObject.make;

  // Define custom geometry strings
  const tank1 = "F M0 0 L0 80 120 80 120 0z";
  const tank2 = "F M0 0 L0 120 50 120 50 0z";
  
  
  // Updated pump geometry to match the image - vertical cylindrical pump with piston rod
  const pump1 = "F M35 0 L45 0 L45 15 L55 15 L55 65 L25 65 L25 15 L35 15 Z M30 20 L50 20 L50 60 L30 60 Z";
  
  const koDrum = "F M10 10 L90 10 A5 5 0 0 1 90 20 L10 20 A5 5 0 0 1 10 10 Z M0 12 L10 12 L10 18 L0 18 Z M90 12 L100 12 L100 18 L90 18 Z";


  const rectArrowRight = "F M0 5 L80 5 L80 0 L100 12.5 L80 25 L80 20 L0 20 Z";

  myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    initialContentAlignment: go.Spot.Center,
    "toolManager.hoverDelay": 100,
    allowZoom: true,
    allowHorizontalScroll: true,
    allowVerticalScroll: true
  });

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

myDiagram.nodeTemplateMap.add(
  "rectarrow",
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
    new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(
      go.Shape,
      {
        name: "SHAPE",
        strokeWidth: 2,
        stroke: "black",
        geometryString: rectArrowRight,  // <== ini kuncinya
        fill: "transparent",
      }
    ),
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



  // Link template with color binding
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.AvoidsNodes, curve: go.Link.JumpOver },
    new go.Binding("routing", "routing"),
    $(go.Shape, 
      { strokeWidth: 3 },
      new go.Binding("stroke", "color")
    ),
    $(go.Shape, 
      { toArrow: "Standard", strokeWidth: 0 },
      new go.Binding("fill", "color")
    )
  );

  // Set the model data - Layout following reference images with proper spacing and flow
  myDiagram.model = new go.GraphLinksModel(
    [
      // Top row - Starting point (far left)
      { key: "Produce Well", category: "rectarrow", pos: "50 50", info: "Sumur produksi yang menghasilkan fluida campuran minyak, gas, dan air dari reservoir bawah tanah. Merupakan titik awal dalam proses pengolahan hidrokarbon." },
      
      // Top row - Gas processing (horizontal flow)
      { key: "Gas Boot I", category: "tank", tankType: tank2, pos: "250 80", info: "Gas Boot separator tahap pertama yang memisahkan gas dan liquid dari fluida produksi sumur. Beroperasi pada tekanan tinggi untuk optimalisasi pemisahan fase gas dan cair." },
      { key: "Gas Boot II", category: "tank", tankType: tank2, pos: "400 80", info: "Gas Boot separator tahap kedua yang melanjutkan proses pemisahan gas dan liquid. Beroperasi pada tekanan lebih rendah untuk memaksimalkan recovery gas dari liquid phase." },
      {
        key: "Wash Tank I",
        category: "tank",
        tankType: tank1,
        info: "Tangki pencuci tahap pertama berkapasitas 1000 liter. Berfungsi untuk memisahkan crude oil dari air dan impuritas menggunakan proses settling gravitasi dan demulsifikasi.",
        pos: "700 80",
      },
      {
        key: "Wash Tank II",
        category: "tank",
        tankType: tank1,
        info: "Tangki pencuci tahap kedua berkapasitas 1000 liter. Melakukan pembersihan lanjutan crude oil dengan menurunkan kadar air (BS&W) dan menghilangkan kontaminan tersisa.",
        pos: "850 80",
      },
      {
        key: "Wash Tank III",
        category: "tank",
        tankType: tank1,
        info: "Tangki pencuci tahap ketiga berkapasitas 1000 liter. Tahap final pembersihan crude oil untuk mencapai spesifikasi kualitas ekspor dengan BS&W < 0.5% dan salt content < 10 PTB.",
        pos: "1000 80",
      },
      
      // Lower middle - Additional wash tank (like in reference image 2)
      {
        key: "Shipping Tank",
        category: "tank",
        tankType: tank1,
        pos: "400 250",
        info: "Tangki penampungan crude oil bersih yang siap untuk dikirim. Dilengkapi dengan sistem pengukuran volume otomatis dan sampling point untuk quality control sebelum loading ke tanker."
      },
      
      // Bottom row - Processing equipment (left to right flow)
      { key: "Pompa-0201", color: "#f9f9f9", pos: "150 350", info: "Pompa centrifugal untuk transfer crude oil dari shipping tank ke metering system. Dilengkapi dengan variable frequency drive (VFD) untuk mengontrol laju alir sesuai kebutuhan operasional." },
      { key: "Metering w-0201", category: "metering", color: "#e6f3ff", pos: "350 380", info: "Sistem metering untuk mengukur volume dan laju alir crude oil dengan akurasi tinggi. Menggunakan teknologi Coriolis atau ultrasonic flow meter untuk custody transfer measurement sesuai standar API MPMS." },
      { key: "Shipping Line", category: "shippingline", color: "#fff2e6", pos: "550 380", info: "Pipeline untuk pengiriman crude oil ke terminal atau tanker loading facility. Dilengkapi dengan sistem monitoring tekanan, temperature, dan flow rate secara real-time." },
      
      // Right side processes (vertical layout like in reference)
      { key: "Ko Drum", color: "#eeeeee", pos: "750 250", info: "Knock-out drum untuk separasi final liquid carry-over dari gas stream. Melindungi peralatan downstream dari kerusakan akibat liquid slug dan memastikan kualitas gas sesuai spesifikasi pipeline." },
      { key: "Gas Plant", category: "rectarrow", pos: "900 250", info: "Unit pengolahan gas untuk memproses gas dari separator menjadi sales gas. Melakukan dehydrasi, sweetening, dan kompresi gas untuk mencapai spesifikasi komersial sebelum masuk ke gas transmission pipeline." },
      { key: "Inlet Raw Water", category: "rectarrow", pos: "1050 250", info: "Inlet air mentah dari sumber water supply untuk keperluan operasional seperti wash water, cooling water, dan utility water. Air akan diproses lebih lanjut di water treatment plant." },
      
      // Bottom right - Water treatment (like in reference image 2)
      { key: "Inlet Surge Tank", category: "rectarrow", pos: "150 500", info: "Surge tank inlet untuk menampung dan mengatur aliran air produksi (produced water) dari separator. Berfungsi sebagai buffer untuk mengatasi fluktuasi aliran dan tekanan dalam sistem water handling." },
      { key: "Water Balance Tank", category: "rectarrow", pos: "400 520", info: "Tangki penyeimbang untuk mengatur distribusi air dalam sistem water treatment. Memastikan keseimbangan water balance di fasilitas produksi dan mengoptimalkan penggunaan air untuk berbagai keperluan operasional." },
    ],
    [
      // Main production flow (Black - Mixed Fluid dari Produce Well)
      { from: "Produce Well", to: "Gas Boot I", color: "#000000"},
      { from: "Produce Well", to: "Gas Boot II", color: "#000000"},
      
      // Oil processing line (Black - Minyak dari separator ke wash tank)
      { from: "Gas Boot I", to: "Wash Tank I", color: "#000000"},
      { from: "Gas Boot II", to: "Wash Tank II", color: "#000000"},
      { from: "Wash Tank I", to: "Wash Tank III", color: "#000000"},
      { from: "Wash Tank II", to: "Wash Tank III", color: "#000000"},
      
      // Oil to shipping (Black continuation - Crude Oil bersih)
      { from: "Wash Tank I", to: "Shipping Tank", color: "#000000"},
      { from: "Wash Tank II", to: "Shipping Tank", color: "#000000"},
      { from: "Wash Tank III", to: "Shipping Tank", color: "#000000"},
      
      // Final oil shipping line (Black continuation)
      { from: "Shipping Tank", to: "Pompa-0201", color: "#000000"},
      { from: "Pompa-0201", to: "Metering w-0201", color: "#000000"},
      { from: "Metering w-0201", to: "Shipping Line", color: "#000000"},
      
      // Gas processing line (Yellow - Aliran Gas)
      { from: "Gas Boot I", to: "Ko Drum", color: "#FFD700"},
      { from: "Gas Boot II", to: "Ko Drum", color: "#FFD700"},
      { from: "Ko Drum", to: "Gas Plant", color: "#FFD700"},
      
      // Water treatment line (Blue - Aliran Air/Produced Water)
      { from: "Wash Tank I", to: "Inlet Surge Tank", color: "#0066FF"},
      { from: "Wash Tank II", to: "Inlet Surge Tank", color: "#0066FF"},
      { from: "Wash Tank III", to: "Inlet Surge Tank", color: "#0066FF"},
      { from: "Inlet Surge Tank", to: "Water Balance Tank", color: "#0066FF"},
      
      // Raw water supply (Blue - Water Supply)
      { from: "Inlet Raw Water", to: "Wash Tank I", color: "#0066FF"},
      { from: "Inlet Raw Water", to: "Wash Tank II", color: "#0066FF"},
      { from: "Inlet Raw Water", to: "Wash Tank III", color: "#0066FF"},
      { from: "Water Balance Tank", to: "Wash Tank I", color: "#0066FF"},
      { from: "Water Balance Tank", to: "Wash Tank II", color: "#0066FF"},
      { from: "Water Balance Tank", to: "Wash Tank III", color: "#0066FF"}
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