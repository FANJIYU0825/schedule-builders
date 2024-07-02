import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

/**
 * @description This component renders into a PDF file which displays relevant
 * information about courses that have been scheduled by the user. If provided,
 * the user's name wil also be displayed in the document.
 *
 * @param courses A list of the courses which should be displayed in the document.
 * @param {string} name The name to be printed (if defined) at the top of the document.
 * @param graphic - The associated graphic displaying the schedule.
*/

function ScheduleExport ({ courses, name, graphic }) {
  const styles = StyleSheet.create({
    header: { textAlign: 'center', fontSize: '24px', margin: 50, marginBottom: 0 },
    course: { textAlign: 'center', margin: 20, width: '75%' },
    courseTitle: { marginBottom: 5, fontSize: '16px' },
    courseDetails: { fontSize: '12px', opacity: 0.8 },
    page: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    emblem: { height: '100px', marginTop: 50 },
    graphic: { height: '200px', marginTop: 50 }
  })

  return (
    <Document>
      <Page style={styles.page}>
        <Image src='/images/uulogo.png' style={styles.emblem} />
        <View style={styles.header}>
          <Text>
            {name ? name + '\'s Courses' : 'Courses'}
          </Text>
        </View>
        <Image
          src={graphic}
          style={styles.graphic}
        />
        {courses?.map((course, index) =>
          (
            <View key={index} style={styles.course}>
              <Text style={styles.courseTitle}>{course.name.toUpperCase()} ({course.code})</Text>
              <Text style={styles.courseDetails}>{course.occurenceName}, {course.creditsDecimal} credits, {course.period}</Text>
            </View>
          )
        )}
      </Page>
    </Document>
  )
}

export default ScheduleExport
