import { uploadRepo } from '../../utils/uploadHelpers'
import { preprocessing } from '../../utils/dataproc/preprocessing'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { UPLOAD_ACL } from '../../utils/globals'

export default withApiAuthRequired(async function handler (req, res) {
  const session = await getSession(req, res)

  if (!UPLOAD_ACL.includes(session.user.email)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    const jsonData = req.body.trimmedJSON
    const semester = req.body.semester
    const processedData = preprocessing.runPreprocessing(jsonData)

    if (processedData !== null) {
      preprocessing.commitData(processedData, '2023', semester)
      return res.status(201).json(processedData)
    } else {
      return res.status(400).json({ error: 'Could not process data' })
    }
  }

  if (req.method === 'DELETE') {
    const success = preprocessing.restoreBackup()

    if (success) {
      return res.status(200).json({ success: 'Successfully restored backup' })
    } else {
      return res.status(400).json({ error: 'Could not restore backup' })
    }
  }
})
