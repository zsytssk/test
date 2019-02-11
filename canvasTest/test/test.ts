const a = gmStart.start(1334, 750, {
    base_path: '/laya/laya/assets/',
    bg_color: '#41c4df',
    screen_mode: 'horizontal',
});

console.log(a);
// const scene_xml = `<View width="1036" sceneColor="#000" height="504" editorInfo="compId=1">
// <Image skin="res/pre_start/bg.jpg" x="0" y="-266" editorInfo="compId=9"/>
// <Image skin="res/pre_start/barbg.png" x="358" y="345" sizeGrid="1,8,1,8" width="320" height="10" editorInfo="compId=10">
//    <Box height="10" x="2" width="316" y="0" editorInfo="compId=11">
//       <Image skin="res/pre_start/bar.png" sizeGrid="1,4,1,4" y="1" x="0" width="10" height="8" var="progress_bar" editorInfo="compId=12"/>
//    </Box>
// </Image>
// </View>`;
// // const alert = `
// // <Dialog width="444" sceneColor="#000" height="282" editorInfo="compId=1">
// //     <Image y="0" x="0" width="444" skin="image/alert_bg.png" sizeGrid="15,15,15,15" height="282"/>
// //     <Image y="0" x="0" width="444" skin="image/alert_title_bg.png" sizeGrid="9,88,9,139" height="37"/>
// //     <Label y="5" x="62" width="319" var="tipsTitle" text="公共提示框" strokeColor="#000000" stroke="3.5"
// //     fontSize="26" color="#ffffff" bold="true" align="center"/>
// //     <Button y="0" x="406" var="btn_close" stateNum="1" skin="image/btn_close.png" editorInfo="compId=5"/>
// //     <Label y="70" x="40" wordWrap="true" width="362" var="tipsText" valign="middle" text="是否确认购买"
// //     leading="10" height="120" fontSize="20" color="#fff" bold="true" align="center"/>
// //     <Image y="204" x="254" skin="image/sure_bg.png" var="btn_confirm" editorInfo="compId=20"/>
// //     <Image y="205" x="52" var="btn_cancel" skin="image/cancel_bg.png" editorInfo="compId=26"/>
// // </Dialog>`;
// const { setXml, start, destroy } = gmStart;
// setXml({ scene: scene_xml });
// const { scene } = start(1036, 504, {
//     base_path: '/laya/laya/assets/',
//     bg_color: '#41c4df',
//     screen_mode: 'horizontal',
// });
// setTimeout(() => {
//     scene.progress_bar.width = 100;
//     setTimeout(() => {
//         // destroy();
//         scene.progress_bar.width = 300;
//     }, 3000);
// }, 1000);
