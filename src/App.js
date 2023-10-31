import './App.css';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {initiateTx, validateOtp, changePassword, data} from './calls';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}





function App() {
  const [value, setValue] = React.useState(0);
  const [flowId, setFlowId] = React.useState(0);
  const [otpValue, setOtpValue] = React.useState()
  const [password, setPassword] = React.useState('!Confirm1234u')
  const [response, setResponse] = React.useState({})

  const validateOtpPayload = (flowId, otp) => ({
    "flowId": flowId,
    "otp": otp
})


const changePasswordPayload = (flowId, password) => ({
  "flowId": flowId,
  "password": password
})



  const handleChange = async (event, newValue) => {
    setResponse({})
    setValue(newValue);
  };

  const handleOtp = (event) => {
    setOtpValue(event.target.value);
  }

  const handleInitiateTx = async () => {
    const response = await initiateTx()
    setResponse(response.data)
    setFlowId(response.data.flowId)
  }

  const handleValidateOtp = async () => {
    const response = await validateOtp(validateOtpPayload(flowId, otpValue))
    setResponse(response)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChangePassword = async () => {
    const response = await changePassword(changePasswordPayload(flowId, password))
    setResponse(response)
  }


  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Step One: Initiate TX" {...a11yProps(0)} />
        <Tab label="Step Two: Validate OTP" {...a11yProps(1)} />
        <Tab label="Step Three: Change Password" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <strong>Payload</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(data, null, 4)}</pre>
        <button type="submit" onClick={handleInitiateTx}>Initiate tx</button>
        <br/><br/>
        <strong>Response</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(response, null, 4)}</pre>
      </TabPanel>


      <TabPanel value={value} index={1}>
        Enter OTP: <input type="tel" value={otpValue} onChange={handleOtp}/>
        <br/><br/><br/>
        <strong>Payload</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(validateOtpPayload(flowId, otpValue), null, 4)}</pre>
        <button type="submit" onClick={handleValidateOtp} value={otpValue}>Validate OTP</button>
        <br/><br/>
        <strong>Response</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(response, null, 4)}</pre>
      </TabPanel>


      <TabPanel value={value} index={2}>
        Enter Password: <input type="text" value={password} onChange={handlePassword}/>
        <br/><br/><br/>
        <strong>Payload</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(changePasswordPayload(flowId, password), null, 4)}</pre>
        <button type="submit" onClick={handleChangePassword} value={otpValue}>Confirm password</button>
        <br/><br/>
        <strong>Response</strong>
        <pre className="prettyprint lang-html" style={{ background: 'grey', color: 'white', padding: '20px'}}>{JSON.stringify(response, null, 4)}</pre>
      </TabPanel>
    </Box>
  );
}

export default App;
