type StoreState = {
  layout_data: GroupData;
};

type GroupDirection = 'vertical' | 'horizontal';
type ConType = 'group' | 'container';
type GroupData = {
  id: string;
  direction: GroupDirection;
  children: ContainerData[] | GroupData[];
  type: ConType;
  split_radio: number[];
};

type ContainerData = {
  id: string;
  cur_id?: string;
  children: PanelData[];
  type: ConType;
  split_radio: number[];
};

type PanelData = {
  // type: ''
  id: string;
  title: string;
  content: string;
};

interface LocalWindow extends window {
  Immutable: any;
}

type AssetsType = 'folder' | 'img' | 'button';

type AssetsPanelData = {
  name: string;
  type: AssetsType;
  path: string;
  children?: AssetsPanelData[];
};

declare module '*.png' {
  const value: string;
  export default value;
}

// const TEST_STATE = [
//   { id: 'panel1', title: 'panel1', content: 'content1' },
//   { id: 'panel2', title: 'panel2', content: 'content2' },
//   { id: 'panel3', title: 'panel3', content: 'content3' },
//   { id: 'panel4', title: 'panel4', content: 'content4' },
//   { id: 'panel5', title: 'panel5', content: 'content5' },
//   { id: 'panel6', title: 'panel6', content: 'content6' },
// ];

// const contains1 = TEST_STATE.filter((item, index) => {
//   return index < 3;
// });
// const contains2 = TEST_STATE.filter((item, index) => {
//   return index >= 3;
// });

// const contains = [contains1, contains2];

// const con_nums = 2;
// const sash_nums = con_nums - 1;
// const client_width = window.innerWidth;
// const client_height = window.innerHeight;
// const sash_w = 5;
// const con_w = (client_width - 5) / 2;
// const cons = [...Array(con_nums)].map((item, index) => {
//   return (
//     <React.Fragment key={index}>
//       <Container
//         contains={contains[index]}
//         all_panel={TEST_STATE}
//         width={con_w}
//         left={index * (con_w + sash_w)}
//       />
//       {index < con_nums - 1 && (
//         <Sash left={con_w * (index + 1) + sash_w * index} />
//       )}
//     </React.Fragment>
//   );
// });
