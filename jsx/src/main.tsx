import { h, updateElement } from './jsx/createElement';
function log(e) {
  console.log(e.target.value);
}

const f = (
  <ul style="list-style: none;">
    <li className="item" onClick={() => alert('hi!')}>
      item 1
    </li>
    <li className="item">
      <input type="checkbox" checked={true} />
      <input type="text" onInput={log} />
    </li>
    {/* this node will always be updated */}
    <li forceUpdate={true}>text</li>
  </ul>
);

const g = (
  <ul style="list-style: none;">
    <li className="item">item 1</li>
    <li className="item">
      <input type="checkbox" checked={true} />
      <input type="text" />
    </li>
    {/* this node will always be updated */}
    <li forceUpdate={true}>text</li>
  </ul>
);

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

updateElement($root, f);
$reload.addEventListener('click', () => {
  updateElement($root, g, f);
});
