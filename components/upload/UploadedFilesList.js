import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { IconButton, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'

function UploadedFilesList ({ files, deleteFile }) {
  return (
    <List>
      {files.map((file) => (
        <ListItem
          key={file.name}
          secondaryAction={
            <IconButton
              edge='end'
              onClick={() => deleteFile(file)}
            >
              <Tooltip title='Delete' placement='right' arrow>
                <DeleteIcon />
              </Tooltip>
            </IconButton>
      }
        >
          <Tooltip title={file.name} placement='left' arrow>
            <ListItemAvatar>
              <Avatar>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <ListItemText
            disableTypography
            primary={<Typography sx={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}> {file.name} </Typography>}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default UploadedFilesList
