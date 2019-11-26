import * as Yup from 'yup';
import Course from '../schemas/Course';

class CourseController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        teacher: Yup.object().required(),
        powered_by: Yup.string(),
        stars: Yup.number().required(),
        students: Yup.object(),
        post: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json('O curso foi preenchido de forma errada, favor validar');
      }

      const {
        name,
        description,
        teacher,
        powered_by,
        stars,
        students,
        post,
      } = req.body;

      const courseCreated = await Course.create({
        name,
        description,
        teacher,
        powered_by,
        stars,
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
