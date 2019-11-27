import CourseSchema from '../schemas/Course';
import UserSchema from '../schemas/User';

class SubscriptionController {
  async store(req, res) {
    const { courseId } = req.params;

    const course = await CourseSchema.findById(courseId);

    if (!course) {
      return res.status(400).json({ error: 'Course not found' });
    }

    if (course && course.teacher._id == req.userId) {
      return res
        .status(400)
        .json({ error: `You can't subscribe in your own course` });
    }

    const user = await UserSchema.findById(req.userId);

    const { students } = course;

    const checkUser = students.map(student => {
      if (student._id == req.userId) return student;
    });

    if (checkUser.length > 0) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed in this course' });
    }

    const newStudents = students;

    newStudents.push(user);

    const courseUpdated = await CourseSchema.findByIdAndUpdate(course._id, {
      $set: {
        students: newStudents,
      },
    });

    courseUpdated.students = newStudents;

    return res.json(courseUpdated);
  }
}

export default new SubscriptionController();
