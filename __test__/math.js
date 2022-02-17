function sum(a, b) {
  a = Number(a);
  b = Number(b);

  if (!Number.isSafeInteger(a + 1) || !Number.isSafeInteger(b + 1)) {
    return Infinity;
  }
  return a + b;
}

describe('test for sum', () => {
  test('adds 4 + 8 to equal 12', () => {
    expect(sum(4, 8)).toBe(12);
  });

  test('adds str:4 + str:8 to equal 12', () => {
    expect(sum('4', '8')).toBe(12);
  });

  test('adds 1.2 + 2.3 to equal 3.5', () => {
    expect(sum(1.2, 2.3)).toBe(3.51);
  });
});
