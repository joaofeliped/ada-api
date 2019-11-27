import * as Yup from 'yup';

import User from '../schemas/User';
import Course from '../schemas/Course';
import Comment from '../schemas/Comment';

class CommentController {
  async store(req, res) {
    try {
      const { userId } = req;
      const user = await User.findById(userId);

      const { courseId } = req.params;
      const course = await Course.findById(courseId);

      const schema = Yup.object().shape({
        date: Yup.date(),
        title: Yup.string(),
        message: Yup.string().required(),
        content_url: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json('O curso foi preenchido de forma errada, favor validar');
      }

      const { date, title, message, content_url } = req.body;

      const commentCreated = await Comment.create({
        date,
        title,
        message,
        content_url,
        author: user,
      });

      const { postId } = req.params;

      const postSaved = await course.posts.find(post => post.id === postId);

      const { comments } = postSaved;

      comments.push(commentCreated);

      await Course.findByIdAndUpdate(courseId, {
        posts: { $set: comments },
      });

      return res.json(commentCreated);
    } catch (erro) {
      console.error(erro);
      return res
        .status(500)
        .json({ erro: 'Não foi possível cadastrar o comentário.' });
    }
  }
}

export default new CommentController();
