import React from 'react';
import { Paper, Box, Typography, Button, ButtonGroup } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const RevenueChart = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = React.useState('monthly');

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

  const chartData =
    timeRange === 'monthly' ? monthlyData : timeRange === 'weekly' ? weeklyData : dailyData;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.7),
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Revenue & Commission
        </Typography>
        <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2 }}>
          {['daily', 'weekly', 'monthly'].map((period) => (
            <Button
              key={period}
              onClick={() => setTimeRange(period)}
              variant={timeRange === period ? 'contained' : 'outlined'}
              sx={{
                px: 2,
                ...(period === 'daily' && {
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8
                }),
                ...(period === 'monthly' && {
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8
                })
              }}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              formatter={(value) => formatter.format(value)}
              labelFormatter={(label) => `Period: ${label}`}
              contentStyle={{
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: 'none',
                backgroundColor: '#fff'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="commission"
              name="Commission"
              stroke={theme.palette.success.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default RevenueChart;
