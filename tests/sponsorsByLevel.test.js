const getSponsorsByLevel = require('../src/_data/sponsorsByLevel');

test('groups sponsors under their levels', () => {
  const result = getSponsorsByLevel();
  expect(Array.isArray(result)).toBe(true);
  result.forEach(group => {
    expect(group).toHaveProperty('level');
    expect(group).toHaveProperty('sponsors');
    group.sponsors.forEach(sponsor => {
      expect(sponsor.level).toBe(group.level);
    });
  });
});
