import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScheduleExport from '../../components/myScheduleComponents/ScheduleExport'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

jest.mock('@react-pdf/renderer', () => ({
  Document: ({children}) => <div>{children}</div>,
  Image: ({children}) => <div>{children}</div>,
  Page: ({children}) => <div>{children}</div>,
  StyleSheet: { create: (obj) => (obj) },
  Text: ({children}) => <div>{children}</div>,
  View: ({children}) => <div>{children}</div>,
}))

jest.mock('html-to-image', () => ({
  toPng: (x) => null,
}));

const courses = [
  {
    "name": "Animal Structure and Function",
    "campus": "Uppsala",
    "internationInstitution": "Biology Education Centre",
    "language": "English",
    "academicPeriodName": "Autumn semester 2021/22",
    "code": "1BG203",
    "occurenceName": "2021-10-28 to 2022-01-16",
    "durationAcademicPeriods": "",
    "period": "First cycle - continuing course",
    "teacher": "On campus",
    "creditsDecimal": 15,
    "creditsECTSDecimal": 100,
    "description": "80 credits in biology equivalent to the basic course in biology within the Bachelor's Programme in Biology/Molecular Biology.",
    "remarks": 17505
  },
  {
    "name": "Applied Ecosystem Ecology",
    "campus": "Uppsala",
    "internationInstitution": "Biology Education Centre",
    "language": "English",
    "academicPeriodName": "Autumn semester 2021/22",
    "code": "1BG305",
    "occurenceName": "2021-10-28 to 2022-01-16",
    "durationAcademicPeriods": "",
    "period": "Second cycle",
    "teacher": "On campus",
    "creditsDecimal": 15,
    "creditsECTSDecimal": 100,
    "description": "120 credits including (1) 60 credits in biology and 30 credits in chemistry or 30 credits in earth science, or (2) 90 credits in biology, in both cases, including a second course of 15 credits in ecology or limnology.",
    "remarks": 17543
  }
]

describe('Schedule PDF Component', () => {
  test('render', () => {
    render(<ScheduleExport />);
  })
  test('render with empty props', () => {
    render(<ScheduleExport name='' courses={[]}/>);
  })
  test('renders with name', () => {
    const name = 'John';
    const { getByText } = render(<ScheduleExport name={name} />);
    
    const headerElement = getByText(`${name}'s Courses`);
    expect(headerElement).toBeInTheDocument();
  })
  test('renders without name', () => {
    const { getByText } = render(<ScheduleExport />);
    
    const headerElement = getByText('Courses');
    expect(headerElement).toBeInTheDocument();
  })
  test('renders with courses', () => {
    const { getByText } = render(<ScheduleExport courses={courses} />);
    
    for (let i in courses) {
      const courseTitleElement = getByText(`${courses[i].name.toUpperCase()} (${courses[i].code})`);
      expect(courseTitleElement).toBeInTheDocument();
      const courseDetailsElement = getByText(`${courses[i].occurenceName}, ${courses[i].creditsDecimal} credits, ${courses[i].period}`);
      expect(courseDetailsElement).toBeInTheDocument();
    }
  })
  test('renders with name and courses', () => {
    const name = 'John';
    const { getByText } = render(<ScheduleExport name={name} courses={courses} />);
    
    const headerElement = getByText(`${name}'s Courses`);
    expect(headerElement).toBeInTheDocument();

    for (let i in courses) {
      const courseTitleElement = getByText(`${courses[i].name.toUpperCase()} (${courses[i].code})`);
      expect(courseTitleElement).toBeInTheDocument();
      const courseDetailsElement = getByText(`${courses[i].occurenceName}, ${courses[i].creditsDecimal} credits, ${courses[i].period}`);
      expect(courseDetailsElement).toBeInTheDocument();
    }
  })
})
