<!DOCTYPE html>
<html>
<head>
    <!-- Google tag (gtag.js) -->
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tradespace Exploration</title>
    <link rel="stylesheet" href="tse_style.css">
    <script src="model.js"></script>
    <script src="tse_input.js" defer></script>
</head>
<body>
  <h1>ASME IDETC Tradespace Exploration Workshop: Stage 1</h1>

  <p><emph>Click below to move to stage 2 when instructed:</emph></p>
  <button onclick="window.location.href='https://ideas3design.com/idetc2025-tse/stage2.php';">To Stage 2</button>

  <form method="post" action="" id="form-input" target="_self">
    Group ID: <input type="text" id="group_id" name="group_id">
    <input type="hidden" id="stage" name="stage" value="1">
    <div id="input-container"></div>
    <input type="submit">
  </form>

  <div id="metric-table"></div>

</body>
</html>