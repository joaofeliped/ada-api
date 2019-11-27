import * as Yup from 'yup';
import Course from '../schemas/Course';
import User from '../schemas/User';

class CourseController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        teacher: Yup.object(),
        powered_by: Yup.string(),
        powered_by_avatar: Yup.string(),
        stars: Yup.number(),
        students: Yup.object(),
        post: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error: 'O curso foi preenchido de forma errada, favor validar',
        });
      }

      const teacher = await User.findById(req.userId);

      if (!teacher) {
        return res.status(400).json('Teacher not found');
      }

      if (!teacher.teacher) {
        return res.status(400).json({ error: 'User is not a teacher' });
      }

      const {
        name,
        description,
        powered_by,
        powered_by_avatar,
        students,
        post,
      } = req.body;

      const checkCourseName = await Course.findOne({
        teacher,
        name,
      });

      if (checkCourseName) {
        return res.status(400).json({ error: 'Course already exists' });
      }

      const courseCreated = await Course.create({
        name,
        description,
        teacher,
        powered_by,
        powered_by_avatar,
        students,
        post,
      });

      return res.json(courseCreated);
    } catch (erro) {
      console.log(erro);
      return res.status(400).json('Não foi possivel cadastrar');
    }
  }

  async index(req, res) {
    const courses = await Course.find();
    return res.json(courses);
  }
}

export default new CourseController();
