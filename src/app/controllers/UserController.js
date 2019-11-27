import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import UserSchema from '../schemas/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      teacher: Yup.boolean(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
      avatar_url: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation Fails' });
    }

    const { email, password } = req.body;

    const checkUser = await UserSchema.findOne({
      email,
    });

    if (checkUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    req.body.password_hash = await bcrypt.hash(password, 8);

    const user = await UserSchema.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
