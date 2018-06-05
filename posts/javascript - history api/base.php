<?php
if (isset($_GET["view_as"]) && $_GET["view_as"] == "json") {
  echo json_encode(array("page" => $page_title, "content" => $page_content));
} else {
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <script src="app.js"></script>
    <title><?php echo $page_title; ?></title>
  </head>
  <body>
    <p id="navigator">
      [ <a class="ajax-nav" href="first_page.php">First page</a>
      | <a class="ajax-nav" href="second_page.php">Second page</a>
      | <a class="ajax-nav" href="third_page.php">Third page</a> ]
    </p>

    <div id="ajax-content">
        <?php echo $page_content; ?>
    </div>

    <p>This paragraph is shown only when the navigation starts from <strong><?php echo $page_url; ?></strong>.</p>
  </body>
</html>
<?php
}
?>