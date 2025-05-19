import React from 'react';
import { Card, CardContent, Typography, Box, Stack, MenuItem, Select } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const [timeRange, setTimeRange] = React.useState('monthly');

  // This would come from your API based on the selected time range
  const monthlyData = [
    { name: 'Jan', revenue: 25000, commission: 2500 },
    { name: 'Feb', revenue: 28000, commission: 2800 },
    { name: 'Mar', revenue: 22000, commission: 2200 },
    { name: 'Apr', revenue: 32000, commission: 3200 },
    { name: 'May', revenue: 35000, commission: 3500 },
    { name: 'Jun', revenue: 40000, commission: 4000 },
  ];

  const weeklyData = [
    { name: 'Week 1', revenue: 9500, commission: 950 },
    { name: 'Week 2', revenue: 10200, commission: 1020 },
    { name: 'Week 3', revenue: 9800, commission: 980 },
    { name: 'Week 4', revenue: 11500, commission: 1150 },
  ];

  const dailyData = [
    { name: 'Mon', revenue: 1500, commission: 150 },
    { name: 'Tue', revenue: 1800, commission: 180 },
    { name: 'Wed', revenue: 1200, commission: 120 },
    { name: 'Thu', revenue: 1600, commission: 160 },
    { name: 'Fri', revenue: 2000, commission: 200 },
    { name: 'Sat', revenue: 2500, commission: 250 },
    { name: 'Sun', revenue: 2200, commission: 220 },
  ];

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Select data based on time range
  const chartData = timeRange === 'monthly' 
    ? monthlyData 
    : timeRange === 'weekly' 
      ? weeklyData 
      : dailyData;

  // Calculate totals
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCommission = chartData.reduce((sum, item) => sum + item.commission, 0);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'primary.verylight',
        borderRadius: 2,
                width:"100%"

      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Revenue & Commission</Typography>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </Box>

        <Stack direction="row" spacing={4} mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {formatter.format(totalRevenue)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Total Commission</Typography>
            <Typography variant="h5" fontWeight={600} color="primary.main">
              {formatter.format(totalCommission)}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatter.format(value)}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue" 
                stroke="#385DFF" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="commission" 
                name="Commission" 
                stroke="#FF9B00" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;