async function handleGreetButtonClickEvent(event) {
  event.preventDefault();
  const { greet } = await import("../src/hello_world/pkg");
  console.time(`test`);
  document.getElementById("greeting").innerHTML = "hello";
  console.timeEnd(`test`);
  console.time(`test`);
  greet();
  console.timeEnd(`test`);
}

document.querySelector("#btn-greet").onclick = handleGreetButtonClickEvent;
