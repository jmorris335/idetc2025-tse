<?php
// Get the number from the GET request
$group_id = isset($_GET['group_id']) ? htmlspecialchars($_GET['group_id']) : '';
if ($group_id === '') {
    // Redirect back if no number provided
    header("Location: index.php");
    exit;
}
?>
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
  <h1>Adventures in Tradespace Exploration: Stage 3</h1>

   <div class="nav_buttons">
    <form action="stage2.php" method="get" style="margin-right: auto;">
        <input type="hidden" name="group_id" value="<?php echo $group_id; ?>">
        <button type="submit" class="nav_submit">Return to Stage 2 (if needed)</button>
    </form>
  </div>

  <form method="post" action="" id="form-input" target="_self">
    <input type="hidden" id="group_id" name="group_id" value="<?php echo $group_id; ?>">
    <input type="hidden" id="stage" name="stage" value="3">
    <div id="input-container"></div>
    <button class="table_submit" type="submit">Simulate Vehicle</button>
  </form>

  <div id="metric-table"></div>

</body>
</html>