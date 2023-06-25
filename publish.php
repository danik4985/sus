<?php
# Thats right I'm using PHP for the publish script and you CAN NEVER STOP ME!

$amogus = readline("Are you sure you are ready to publish? (Test everything and change version!) [y/n] ");
if ($amogus !== "y") exit(1);

echo "[Reading version data]\n";

$package_string = file_get_contents("package.json");
$package_object = json_decode($package_string);
$version = $package_object->version;

$amogus = readline("Version: " . $version . " Continue? [y/n] ");
if ($amogus !== "y") exit(1);

echo "[Creating schema]\n";

$res = `npm run gen-schema`;

echo "Result: " . $res;

$amogus = readline("Continue? [y/n] ");
if ($amogus !== "y") exit(1);

echo "[Publishing schema]\n";

$api_dev_key = file_get_contents("secret");
$api_paste_code = file_get_contents("config_schema.json");
$api_paste_private = '1';
$api_paste_name = "Config schema for sus obfuscator v" . $version;
$api_paste_expire_date = 'N';
$api_paste_format = 'json';
$api_user_key = '';
$api_paste_name = urlencode($api_paste_name);
$api_paste_code = urlencode($api_paste_code);

$url = 'https://pastebin.com/api/api_post.php';
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'api_option=paste&api_user_key='.$api_user_key.'&api_paste_private='.$api_paste_private.'&api_paste_name='.$api_paste_name.'&api_paste_expire_date='.$api_paste_expire_date.'&api_paste_format='.$api_paste_format.'&api_dev_key='.$api_dev_key.'&api_paste_code='.$api_paste_code.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_NOBODY, 0);

$response = curl_exec($ch);
#$response = "we did shit";

echo "Response: " . $response . "\n";
$amogus = readline("Continue? [y/n] ");
if ($amogus !== "y") exit(1);
if (str_starts_with($response, "Bad API request")) exit(2);

echo "[Editing README.md]\n";

$og_comment = "# This is a development version\n# yaml-language-server: \$schema=config_schema.json";
$new_comment = "# Schema for version " . $version . "\n# yaml-language-server: \$schema=" . $response;

$readme = file_get_contents("README.md");
$og_readme = $readme;
$readme = str_replace(
	$og_comment,
	$new_comment,
	$readme);

file_put_contents("README.md", $readme);

$amogus = readline("Continue? [y/n] ");
if ($amogus !== "y") exit(1);

echo "[Pushing to GitHub]\n";

$res = `git add .`;
echo $res . "\n";
$res = shell_exec("git commit -m 'version " . $version . "'");
echo $res . "\n";
$res = `git push -u origin main`;
echo $res . "\n";

$amogus = readline("Continue? [y/n] ");
if ($amogus !== "y") exit(1);

echo "[Publishing to NPM]\n";

$res = `npm publish`;
echo $res . "\n";

echo "[Reseting README.md]\n";

file_put_contents("README.md", $og_readme);

echo "Done! Hopefully it maybe even worked.";

?>