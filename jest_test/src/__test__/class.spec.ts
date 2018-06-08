import { TestClass1 } from '../class1';
import { TestClass2 } from '../class2';
jest.mock('../class1');
jest.setEnvinroment({ node: false, browser: true });

beforeAll(() => {
  TestClass1.mockImplementation(() => {
    return {
      setXY: () => {
        throw new Error('Test error');
      },
    };
  });
});

it('We can check if the consumer called the class constructor', () => {
  const testClass2 = new TestClass2(0, 0);
  expect(TestClass1).toHaveBeenCalledTimes(1);
});
