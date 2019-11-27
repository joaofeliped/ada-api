import CourseSchema from '../schemas/Course';
import UserSchema from '../schemas/User';

class SubscriptionController {
  async store(req, res) {
    const { courseId } = req.params;

    const course = await CourseSchema.findById(courseId);

    if (!course) {
      return res.status(400).json({ error: 'Course not found' });
    }

    console.log(course.teacher._id);
    console.log(req.userId);

    if (course && course.teacher._id == req.userId) {
      return res
        .status(400)
        .json({ error: `You can't subscribe in your own course` });
    }

    const user = await UserSchema.findById(req.userId);

    return res.json({ msg: 'OK' });
  }
}

export default new SubscriptionController();
