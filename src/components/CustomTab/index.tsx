import * as React from 'react';
import { Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface ICustomTabProps {
  tabContent: { [key: string]: React.ReactNode };
  initialSelectedTab: string;
}

export default function CustomTab({ tabContent, initialSelectedTab }: ICustomTabProps) {
  const tabLabels = Object.keys(tabContent);
  let initialTabIndex = tabLabels.findIndex(element => element === initialSelectedTab);
  if (initialTabIndex === -1) initialTabIndex = 0;
  const [tabIndexValue, setTabIndexValue] = React.useState(initialTabIndex);
  const [tabValue, setTabValue] = React.useState(tabLabels[initialTabIndex]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndexValue(newValue);
    setTabValue(tabLabels[newValue]);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Tabs
        value={tabIndexValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={tabLabels.length !== 0}
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabContent[tabValue]}
      </Box>
    </Box>
  );
}