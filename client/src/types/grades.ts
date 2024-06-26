interface Grades {
  id?: number;
  score: string;
  student: {
    id?: number;
    name: string;
    birthDate: string;
  };
  course: {
    id?: number;
    code: string;
    subject: string;
    description: string;
  };
}

export default Grades;
