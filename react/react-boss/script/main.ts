import { walk } from "./utils/ls/walk";
import { rm } from "./utils/ls/rm";
import { cp } from "./utils/ls/main";
import { excuse } from "./utils/ls/exec";

const dist = "D:\\zsytssk\\github\\zsytssk.github.io";
const src = "D:\\zsytssk\\github\\test\\react-test\\build";

async function main() {
  const list = await walk(dist, [".git"]);
  for (const item of list) {
    await rm(item);
  }
  await cp(src, dist);
  await excuse(`git acpp 'update'`, { path: dist, output: true });
}

main();
