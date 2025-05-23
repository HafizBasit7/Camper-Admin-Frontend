import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Divider,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PercentIcon from '@mui/icons-material/Percent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Custom styled upload button for logos
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [commission, setCommission] = useState(10);
  const [isSaved, setIsSaved] = useState(false);
  
  // This would come from your API or state management
  const [settings, setSettings] = useState({
    companyName: 'Car Rental Service',
    email: 'admin@carrentalservice.com',
    phone: '+1 (123) 456-7890',
    address: '123 Main Street, New York, NY 10001',
    logoLight: null,
    logoDark: null,
    favicon: null,
    commission: 10,
    taxRate: 8.5,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommissionChange = (event) => {
    setCommission(event.target.value);
  };

  const handleSaveSettings = () => {
    // This would be an API call to save settings
    setSettings({
      ...settings,
      commission
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFileUpload = (type) => (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // In a real application, you would upload this file to your server
      // and then update the state with the URL
      console.log(`Uploading ${type} file:`, file.name);
      
      setSettings({
        ...settings,
        [type]: URL.createObjectURL(file)
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        {t('settings.title')}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              px: 4
            }
          }}
        >
          <Tab label={t('settings.tabs.general')} />
          <Tab label={t('settings.tabs.branding')} />
          <Tab label={t('settings.tabs.commission')} />
          <Tab label={t('settings.tabs.email')} />
          <Tab label={t('settings.tabs.notifications')} />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Card 
          elevation={0} 
          sx={{ 
            border: '1px solid',
            borderColor: 'primary.verylight',
            borderRadius: 2
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>{t('settings.general.title')}</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.companyName')}
                  value={settings.companyName}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.email')}
                  value={settings.email}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.phone')}
                  value={settings.phone}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.address')}
                  value={settings.address}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.dateFormat')}
                  value={settings.dateFormat}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.general.timeFormat')}
                  value={settings.timeFormat}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  sx={{ mt: 2 }}
                >
                  {t('settings.general.save')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Card 
          elevation={0} 
          sx={{ 
            border: '1px solid',
            borderColor: 'primary.verylight',
            borderRadius: 2
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>{t('settings.branding.title')}</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box 
                    sx={{ 
                      height: 150, 
                      width: '100%', 
                      border: '1px dashed',
                      borderColor: 'primary.light',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: settings.logoLight 
                        ? `url(${settings.logoLight}) center/contain no-repeat` 
                        : 'none'
                    }}
                  >
                    {!settings.logoLight && (
                      <Typography color="text.secondary">{t('settings.branding.lightLogo.preview')}</Typography>
                    )}
                  </Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('settings.branding.lightLogo.upload')}
                    <VisuallyHiddenInput 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload('logoLight')}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box 
                    sx={{ 
                      height: 150, 
                      width: '100%', 
                      border: '1px dashed',
                      borderColor: 'primary.light',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: settings.logoDark 
                        ? `url(${settings.logoDark}) center/contain no-repeat` 
                        : 'none',
                      bgcolor: settings.logoDark ? 'transparent' : 'black'
                    }}
                  >
                    {!settings.logoDark && (
                      <Typography color="white">{t('settings.branding.darkLogo.preview')}</Typography>
                    )}
                  </Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('settings.branding.darkLogo.upload')}
                    <VisuallyHiddenInput 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload('logoDark')}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box 
                    sx={{ 
                      height: 150, 
                      width: '100%', 
                      border: '1px dashed',
                      borderColor: 'primary.light',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: settings.favicon 
                        ? `url(${settings.favicon}) center/contain no-repeat` 
                        : 'none'
                    }}
                  >
                    {!settings.favicon && (
                      <Typography color="text.secondary">{t('settings.branding.favicon.preview')}</Typography>
                    )}
                  </Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ textTransform: 'none' }}
                  >
                    {t('settings.branding.favicon.upload')}
                    <VisuallyHiddenInput 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload('favicon')}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                >
                  {t('settings.branding.save')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Card 
          elevation={0} 
          sx={{ 
            border: '1px solid',
            borderColor: 'primary.verylight',
            borderRadius: 2
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>{t('settings.commission.title')}</Typography>
            {isSaved && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {t('settings.commission.success')}
              </Alert>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="commission-rate">{t('settings.commission.commissionRate.label')}</InputLabel>
                  <OutlinedInput
                    id="commission-rate"
                    value={commission}
                    onChange={handleCommissionChange}
                    endAdornment={<InputAdornment position="end"><PercentIcon /></InputAdornment>}
                    label={t('settings.commission.commissionRate.label')}
                    type="number"
                  />
                  <FormHelperText>
                    {t('settings.commission.commissionRate.helper')}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="tax-rate">{t('settings.commission.taxRate.label')}</InputLabel>
                  <OutlinedInput
                    id="tax-rate"
                    value={settings.taxRate}
                    endAdornment={<InputAdornment position="end"><PercentIcon /></InputAdornment>}
                    label={t('settings.commission.taxRate.label')}
                    type="number"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.commission.currency.label')}
                  value={settings.currency}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ bgcolor: 'primary.verylight', p: 2, borderRadius: 2, mt: 2 }}>
                  <Typography variant="body1" fontWeight={500}>{t('settings.commission.howItWorks.title')}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {t('settings.commission.howItWorks.description')}
                    <br />
                    {t('settings.commission.howItWorks.steps.1')}
                    <br />
                    {t('settings.commission.howItWorks.steps.2')}
                    <br />
                    {t('settings.commission.howItWorks.steps.3', { rate: commission })}
                    <br />
                    {t('settings.commission.howItWorks.steps.4')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  onClick={handleSaveSettings}
                  sx={{ mt: 2 }}
                >
                  {t('settings.commission.save')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Other tabs would be implemented here */}
    </Container>
  );
};

export default Settings;