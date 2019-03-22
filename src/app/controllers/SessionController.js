const { User } = require('../models');

const Mail = require('../services/MailService');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.statu(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Password not check' });
    }

    await Mail.send({
      from: 'Leleu Vilela <leleu@leu.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'New Access',
      text: 'New access as registred in your account'
    });

    return res.json({
      token: await user.generateToken()
    });
  }
}

module.exports = new SessionController();
