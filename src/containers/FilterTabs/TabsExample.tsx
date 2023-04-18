import {Tabs, Tab } from 'react-bootstrap'


const callback = (key) => {}
export const TestTabs = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <Tab title="Tab 1" eventKey="1">
        First Tab
      </Tab>
      <Tab title="Tab 2" eventKey= "2">
        Second Tab
      </Tab>
    </Tabs>
  )
}
export default TestTabs