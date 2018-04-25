const default_data = {
  layout_data: {
    children: [
      {
        panels: [
          { id: 'panel1', title: 'panel1', content: 'content1' },
          { id: 'panel2', title: 'panel2', content: 'content2' },
          { id: 'panel3', title: 'panel3', content: 'content3' },
        ],
      },
      {
        panels: [
          { id: 'panel4', title: 'panel4', content: 'content4' },
          { id: 'panel5', title: 'panel5', content: 'content5' },
          { id: 'panel6', title: 'panel6', content: 'content6' },
        ],
      },
    ],
    direction: 'vertical',
  } as GroupData,
};

export function reducer(state = default_data, action) {
  return state;
}
