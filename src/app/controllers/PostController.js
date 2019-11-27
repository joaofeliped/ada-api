import * as Yup from 'yup';
import User from '../schemas/User';
import Post from '../schemas/Post';
import Course from '../schemas/Course';

class PostController {
  async index(req, res) {
    try {
      const { courseId } = req.params;

      const course = await Course.findById({ _id: courseId });

      return res.json(course.posts);
    } catch (erro) {
      console.error(erro);
      return res
        .status(400)
        .json({ erro: 'Erro ao pesquisar as postagens do curso.' });
    }
  }

  async store(req, res) {
    try {
      const { userId } = req;
      const { courseId } = req.params;

      const schema = Yup.object().shape({
        title: Yup.string().required(),
        message: Yup.string().required(),
        content_url: Yup.string().required(),
        date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        console.error(schema.error);
        return res.status(400).json({ error: 'Erro ao validar os campos.' });
      }

      const course = await Course.findById({ _id: courseId });

      if (!course) {
        return res
          .status(400)
          .json({ error: 'Não foi possível localizar o curso.' });
      }

      const author = await User.findById({ _id: userId });

      if (!author) {
        return res
          .status(400)
          .json({ error: 'Não foi possível localizar o usuário.' });
      }

      const { title, message, content_url, date } = req.body;

      const post = await Post.create({
        title,
        message,
        content_url,
        date,
        author,
      });

      const { posts } = course;

      posts.push(post);

      await Course.findByIdAndUpdate(courseId, {
        $set: {
          posts,
        },
      });

      return res.json(post);
    } catch (erro) {
      console.error(erro);
      return res.status(400).json('Erro ao persistir um Post');
    }
  }
}

export default new PostController();
