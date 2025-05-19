import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  useTheme,
  Divider,
  ImageList,
  ImageListItem,
  Paper
} from '@mui/material';
import {
  DirectionsCar,
  LocationOn,
  AttachMoney,
  Event,
  Security,
  Pets,
  Build,
  Info,
  CalendarToday,
  Person,
  LocalOffer
} from '@mui/icons-material';

const DetailSection = ({ title, icon, children }) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography 
      variant="body2" 
      color="text.secondary"
      sx={{ mb: 0.5 }}
    >
      {label}
    </Typography>
    <Typography variant="body1">
      {value || 'Not specified'}
    </Typography>
  </Box>
);

const SpecialPriceItem = ({ price }) => (
  <Paper 
    variant="outlined" 
    sx={{ 
      p: 1.5, 
      mb: 1,
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: 1
    }}
  >
    <Typography variant="body2" fontWeight={500}>
      {price.startDate} - {price.endDate}
    </Typography>
    <Typography variant="body1" color="primary.main">
      ${price.price}/day
    </Typography>
  </Paper>
);

const ExtraItem = ({ extra }) => (
  <Paper 
    variant="outlined" 
    sx={{ 
      p: 1.5, 
      mb: 1,
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: 1
    }}
  >
    <Typography variant="body2" fontWeight={500}>
      {extra.name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {extra.description}
    </Typography>
    <Typography variant="body1" color="primary.main">
      ${extra.price}
    </Typography>
  </Paper>
);

const VehicleDetailsDialog = ({ open, onClose, vehicle }) => {
  const theme = useTheme();

  if (!vehicle) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            fontWeight="bold"
            sx={{
              color: theme.palette.text.primary,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Vehicle Details
          </Typography>
          <Chip
            label={vehicle.status}
            sx={{
              backgroundColor: vehicle.status === 'active' ? theme.palette.success.main : theme.palette.warning.main,
              color: '#fff',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minWidth: 100,
              borderRadius: 1,
              height: 24,
              py: 1,
              fontSize: '0.7rem',
              '& .MuiChip-label': {
                p: 1
              }
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <DetailSection title="Basic Information" icon={<DirectionsCar />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Vehicle ID" value={vehicle._id} />
                  <DetailItem label="Owner ID" value={vehicle.user} />
                  <DetailItem label="Name" value={vehicle.name} />
                  <DetailItem label="License Plate" value={vehicle.licensePlate} />
                  <DetailItem label="Camper Type" value={vehicle.camperType} />
                  <DetailItem label="Booking Type" value={vehicle.bookingType?.join(', ')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Description" value={vehicle.description} />
                  <DetailItem label="Approval Date" value={vehicle.approvalDate ? new Date(vehicle.approvalDate).toLocaleDateString() : 'Not approved yet'} />
                  <DetailItem label="Available" value={vehicle.available ? 'Yes' : 'No'} />
                </Grid>
              </Grid>
            </DetailSection>
          </Grid>

          {/* Location Information */}
          <Grid item xs={12}>
            <DetailSection title="Location Details" icon={<LocationOn />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailItem 
                    label="Pickup Location" 
                    value={vehicle.pickupLocation ? `${vehicle.pickupLocation.address}, ${vehicle.pickupLocation.city}, ${vehicle.pickupLocation.country}` : 'Not specified'} 
                  />
                  <DetailItem 
                    label="Allowed Country" 
                    value={vehicle.allowedCountry ? `${vehicle.allowedCountry.name} (${vehicle.allowedCountry.code})` : 'Not specified'} 
                  />
                </Grid>
              </Grid>
            </DetailSection>
          </Grid>

          {/* Pricing Information */}
          <Grid item xs={12}>
            <DetailSection title="Pricing Details" icon={<AttachMoney />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Standard Price" value={`$${vehicle.standardPrice}/day`} />
                  <DetailItem label="Cleaning Fee" value={`$${vehicle.cleaningFee}`} />
                  <DetailItem label="Security Deposit" value={`$${vehicle.deposit}`} />
                  <DetailItem label="Minimum Rental Days" value={vehicle.minimumRentalDays} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Cancellation Policy" value={vehicle.cancellationPolicy} />
                  <DetailItem label="Maintenance Days" value={vehicle.maintenanceDays} />
                </Grid>
              </Grid>
              {vehicle.specialPrices && vehicle.specialPrices.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Special Pricing Periods
                  </Typography>
                  <Grid container spacing={2}>
                    {vehicle.specialPrices.map((price, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <SpecialPriceItem price={price} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </DetailSection>
          </Grid>

          {/* Safety & Requirements */}
          <Grid item xs={12}>
            <DetailSection title="Safety & Requirements" icon={<Security />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DetailItem label="License Type Required" value={vehicle.licenseType} />
                  <DetailItem label="Special License Required" value={vehicle.specialDrivingLicense ? 'Yes' : 'No'} />
                  <DetailItem label="Max Age of Tenant" value={vehicle.maxAgeOfTenant} />
                  <DetailItem label="Pets Allowed" value={vehicle.petsAllowed ? 'Yes' : 'No'} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Total Safety Belts" value={vehicle.safetyBelts} />
                  <DetailItem label="3-Point Seat Belts" value={vehicle.threePointSeatBelts} />
                  <DetailItem label="Insurance ID" value={vehicle.insuranceId} />
                  <DetailItem label="Additional Safety Info" value={vehicle.additionalSafetyInfo} />
                </Grid>
              </Grid>
            </DetailSection>
          </Grid>

          {/* Equipment & Extras */}
          <Grid item xs={12}>
            <DetailSection title="Equipment & Extras" icon={<Build />}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Included Equipment
                  </Typography>
                  {vehicle.equipment && vehicle.equipment.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {vehicle.equipment.map((item, index) => (
                        <Chip 
                          key={index}
                          label={item}
                          size="small"
                          sx={{ 
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2">No equipment specified</Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <DetailItem label="Rental Conditions" value={vehicle.rentalConditions} />
                </Grid>
              </Grid>
              {vehicle.extras && vehicle.extras.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Additional Extras
                  </Typography>
                  <Grid container spacing={2}>
                    {vehicle.extras.map((extra, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <ExtraItem extra={extra} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </DetailSection>
          </Grid>

          {/* Images */}
          {vehicle.images && vehicle.images.length > 0 && (
            <Grid item xs={12}>
              <DetailSection title="Vehicle Images" icon={<Info />}>
                <ImageList cols={3} gap={8}>
                  {vehicle.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`Vehicle ${index + 1}`}
                        loading="lazy"
                        style={{ borderRadius: 8 }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </DetailSection>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleDetailsDialog; 