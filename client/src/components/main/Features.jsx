import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const items = [
  {
    title: 'Dashboard',
    description:
      'Incorporated with a dashboard which provides a comprehensive snapshot of your finances, featuring monthly charts, recent transactions, and total income and expenses at a glance',
    imageLight: "url('../../../public/dashboard.jpg')",
  },
  {
    title: 'Add Transactions',
    description:
    "Add transactions seamlessly with our intuitive interface, ensuring every purchase is accounted for and effortlessly integrated into your financial overview.Also allows deletion and updation of previous transactions",
    imageLight: "url('../../../public/dashboard.jpg')",
  },
  {
    title: 'Customize Categories',
    description:
      'Easily tailor or customize your expense categories to suit your unique financial habits, ensuring precise tracking and personalized insights into your spending patterns.Also allows to edit or delete categories.',
    imageLight: "url('../../../category.jpg')",
  },
  {
    title: 'Analyse Expenses',
    description:
      'Unlock deeper insights into your spending habits with dynamic Charts, including Line,Pie, and Bar charts, allowing you to visualize and understand your expenses at a glance.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageLight: "url('../../../public/analysis.jpg')",
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{paddingBottom:5}}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" color="text.primary">
              Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Explore the powerful features of MyExpensePilot, designed to simplify your financial journey. With intuitive expense tracking, insightful charts, MyExpensePilot empowers you to track your expenses efficiently and effectively.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {items.slice(0, 2).map(({ title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                onClick={() => handleItemClick(index)}
                sx={{
                  cursor: 'pointer',
                  borderColor: selectedItemIndex === index ? 'primary.light' : '',
                  backgroundColor: selectedItemIndex === index ? 'primary.light' : '',
                }}
              >
                <Typography variant="h6" color="text.primary" sx={{p:2,paddingBottom:"2px"}}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{p:2}}>
                  {description}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {items.slice(2, 4).map(({ title, description }, index) => (
              <Card
                key={index + 2}
                variant="outlined"
                onClick={() => handleItemClick(index + 2)}
                sx={{
                  cursor: 'pointer',
                  borderColor: selectedItemIndex === index + 2 ? 'primary.light' : '',
                  backgroundColor: selectedItemIndex === index + 2 ? 'primary.light' : '',
                }}
              >
                <Typography variant="h6" color="text.primary" sx={{p:2,paddingBottom:"2px" }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{p:2}}>
                  {description}
                </Typography>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card variant="outlined">
            <Box
              sx={{
                width: '100%',
                height: 450,
                backgroundSize: 'contain',
                backgroundImage: selectedFeature.imageLight,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
