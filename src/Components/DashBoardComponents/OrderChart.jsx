import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Typography, Box, ButtonGroup, Button, TextField } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const OrdersChart = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = React.useState('monthly');
  const [startDate, setStartDate] = React.useState(new Date('2012-01-01'));
  const [endDate, setEndDate] = React.useState(new Date('2025-12-31'));

  // Generate yearly data from 2012 to 2025
  const generateYearlyData = () => {
    const data = [];
    for (let year = 2012; year <= 2025; year++) {
      data.push({
        name: year.toString(),
        completed: Math.floor(Math.random() * (3000 - 1000) + 1000),
        cancelled: Math.floor(Math.random() * (400 - 100) + 100),
        ongoing: Math.floor(Math.random() * (200 - 50) + 50)
      });
    }
    return data;
  };

  const yearlyData = generateYearlyData();

  const monthlyData = [
    { name: 'Jan', completed: 120, cancelled: 18, ongoing: 5 },
    { name: 'Feb', completed: 130, cancelled: 20, ongoing: 8 },
    { name: 'Mar', completed: 100, cancelled: 15, ongoing: 6 },
    { name: 'Apr', completed: 150, cancelled: 22, ongoing: 10 },
    { name: 'May', completed: 180, cancelled: 25, ongoing: 12 },
    { name: 'Jun', completed: 200, cancelled: 30, ongoing: 15 },
  ];

  const weeklyData = [
    { name: 'Week 1', completed: 45, cancelled: 8, ongoing: 3 },
    { name: 'Week 2', completed: 52, cancelled: 10, ongoing: 4 },
    { name: 'Week 3', completed: 48, cancelled: 7, ongoing: 5 },
    { name: 'Week 4', completed: 55, cancelled: 9, ongoing: 6 },
  ];

  const dailyData = [
    { name: 'Mon', completed: 12, cancelled: 2, ongoing: 1 },
    { name: 'Tue', completed: 15, cancelled: 3, ongoing: 2 },
    { name: 'Wed', completed: 10, cancelled: 1, ongoing: 1 },
    { name: 'Thu', completed: 14, cancelled: 2, ongoing: 1 },
    { name: 'Fri', completed: 16, cancelled: 3, ongoing: 2 },
    { name: 'Sat', completed: 20, cancelled: 4, ongoing: 2 },
    { name: 'Sun', completed: 18, cancelled: 3, ongoing: 1 },
  ];

  const chartData = timeRange === 'yearly' 
    ? yearlyData 
    : timeRange === 'monthly' 
      ? monthlyData 
      : timeRange === 'weekly' 
        ? weeklyData 
        : dailyData;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.7),
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('dashboard.ordersChart.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t('dashboard.ordersChart.startDate')}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              maxDate={endDate}
            />
            <DatePicker
              label={t('dashboard.ordersChart.endDate')}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" />}
              minDate={startDate}
            />
          </LocalizationProvider>
          <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2 }}>
            {['yearly', 'monthly', 'weekly', 'daily'].map((range) => (
              <Button
                key={range}
                onClick={() => setTimeRange(range)}
                variant={timeRange === range ? 'contained' : 'outlined'}
                sx={{
                  textTransform: 'capitalize',
                  px: 2,
                  ...(range === 'yearly' && {
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }),
                  ...(range === 'daily' && {
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }),
                }}
              >
                {t(`dashboard.ordersChart.timeRanges.${range}`)}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              border: 'none',
              backgroundColor: '#fff',
            }}
          />
          <Legend />
          <Bar 
            dataKey="completed" 
            name={t('dashboard.ordersChart.series.completed')} 
            fill={theme.palette.success.main} 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="cancelled" 
            name={t('dashboard.ordersChart.series.cancelled')} 
            fill={theme.palette.error.main} 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="ongoing" 
            name={t('dashboard.ordersChart.series.ongoing')} 
            fill="#FF9B00" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default OrdersChart;
