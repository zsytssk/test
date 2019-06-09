var iconv = require("iconv-lite");
var terminal = require("child_process").spawn("cmd");

terminal.stdout.on("data", function(data) {
  console.log("stdout: " + iconv.decode(new Buffer(data), "gbk"));
});

terminal.stderr.on("data", function(data) {
  console.log("stderr: " + data);
});

terminal.on("exit", function(code) {
  console.log("child process exited with code " + code);
});

setTimeout(function() {
  terminal.stdin.write("echo %PATH%\n");
}, 2000);
