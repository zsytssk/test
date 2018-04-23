// 原
const origin_layout = {
  groups: [
    {
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
    },
  ],
};

const end_layout = {
  groups: [
    {
      children: [
        {
          children: [
            {
              panels: [
                { id: 'panel1', title: 'panel1', content: 'content1' },
                { id: 'panel2', title: 'panel2', content: 'content2' },
                { id: 'panel3', title: 'panel3', content: 'content3' },
              ],
            },
          ],
        },
        {
          children: [
            {
              panels: [
                { id: 'panel4', title: 'panel4', content: 'content4' },
                { id: 'panel5', title: 'panel5', content: 'content5' },
              ],
            },
            {
              panels: [{ id: 'panel6', title: 'panel6', content: 'content6' }],
            },
          ],
          direction: 'horizontal',
        },
      ],
      direction: 'vertical',
    },
  ],
};
