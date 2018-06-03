import { add, checkValue, createUser, fetchUser, returnNull } from '../index';

describe('This is a simple test', () => {
  test('add: 1+2+3=6', () => {
    expect(add(1, 2, 3)).toEqual(6);
  });
  test('add: 1+2+3!=5', () => {
    expect(add(1, 2, 3)).not.toBe(5);
  });
  test('returnNull', () => {
    expect(returnNull()).toBeNull();
  });
  test('checkValue', () => {
    expect(checkValue(1)).toBeTruthy();
  });
  test('createUser', () => {
    expect(createUser()).toEqual({
      firstName: 'z',
      lastName: 'sy',
    });
  });
});

test('under 1600', () => {
  const a = 800;
  const b = 700;
  expect(a + b).toBeLessThan(1600);
});
test('no i', async () => {
  expect.assertions(1);
  const data = await fetchUser();
  expect(data.userId).toEqual(1);
});
