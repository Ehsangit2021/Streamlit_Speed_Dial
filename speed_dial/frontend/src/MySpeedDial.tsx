import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import React, { useCallback, useEffect, useMemo, useState, ReactElement } from "react"

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { ReplyTwoTone, UploadFile } from "@mui/icons-material";

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <UploadFile/>, name: 'Upload' },
];


function MySpeedDial({ args, disabled, theme }: ComponentProps): ReactElement {
  const { name } = args
  const [isFocused, setIsFocused] = useState(false)
  const [numClicks, setNumClicks] = useState('Test')

  const style: React.CSSProperties = useMemo(() => {
    if (!theme) return {}

    // Use the theme object to style our button border. Alternatively, the
    // theme style is defined in CSS vars.
    const borderStyling = `1px solid ${isFocused ? theme.primaryColor : "gray"}`
    return { border: borderStyling, outline: borderStyling }
  }, [theme, isFocused])

  useEffect(() => {
    Streamlit.setComponentValue(numClicks)
  }, [numClicks])

  // setFrameHeight should be called on first render and evertime the size might change (e.g. due to a DOM update).
  // Adding the style and theme here since they might effect the visual size of the component.
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [style, theme])

  /** Click handler for our "Click Me!" button. */
  const onClicked = useCallback((): void => {
    // const numClicks = value
    // setNumClicks((numClicks) => numClicks)
    // setNumClicks(numClicks)
    // console.log(action.action)
  }, [])

  /** Focus handler for our "Click Me!" button. */
  const onFocus = useCallback((): void => {
    setIsFocused(true)
  }, [])

  /** Blur handler for our "Click Me!" button. */
  const onBlur = useCallback((): void => {
    setIsFocused(false)
  }, [])

  const [selectedAction, setSelectedAction] = useState('');

  const handleActionClick = (actionName:string) => {
    setSelectedAction(actionName); // Save the selected action name
    console.log('Selected Action:', actionName); // Log the selected action
    Streamlit.setComponentValue(actionName)
  };

  return (
    <span>
      Hello, {name}! &nbsp;
      {/* <button
        style={style}
        onClick={onClicked}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Click Me!
      </button> */}
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        >
        {actions.map((action) => (
          <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleActionClick(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
    </span>
  )
}

export default withStreamlitConnection(MySpeedDial)
