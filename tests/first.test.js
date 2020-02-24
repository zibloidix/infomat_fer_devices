test('First test', () => {
    expect(10).toBe(10);
})

test('Object test', () => {
    expect({ name: 'Oleg', age: 23 }).toEqual({ name: 'Oleg', age: 23 });
})