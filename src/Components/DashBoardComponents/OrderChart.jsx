import React from 'react';
import { Card, CardContent, Typography, Box, Stack, MenuItem, Select } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OrdersChart = () => {
  const [timeRange, setTimeRange] = React.useState('monthly');

  // This would come from your API based on the selected time range
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

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Select data based on time range
  const chartData = timeRange === 'monthly' 
    ? monthlyData 
    : timeRange === 'weekly' 
      ? weeklyData 
      : dailyData;

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
          <Typography variant="h6">Orders Overview</Typography>
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

        <Box sx={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#4caf50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelled" name="Cancelled" fill="#f44336" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ongoing" name="Ongoing" fill="#FF9B00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Box display="flex" alignItems="center">
            <Box component="span" sx={{ width: 12, height: 12, bgcolor: '#4caf50', borderRadius: 1, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">Completed</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box component="span" sx={{ width: 12, height: 12, bgcolor: '#f44336', borderRadius: 1, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">Cancelled</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box component="span" sx={{ width: 12, height: 12, bgcolor: '#FF9B00', borderRadius: 1, mr: 1 }} />
            <Typography variant="body2" color="text.secondary">Ongoing</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrdersChart;