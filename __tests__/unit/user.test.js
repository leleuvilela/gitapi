const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('shoyuld encrpyt user password', async () => {
    const user = await factory.create('User', {
      password: '123'
    });

    const compareHash = await bcrypt.compare('123', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
