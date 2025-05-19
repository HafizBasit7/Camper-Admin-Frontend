export const VEHICLE_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SUSPENDED: 'SUSPENDED',
  UNVERIFIED: 'UNVERIFIED'
};

export const VEHICLE_TABS = {
  ALL: 'ALL',
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  DRAFTS: 'DRAFTS',
  CHANGE_REQUESTS: 'CHANGE_REQUESTS',
  REPORTED: 'REPORTED'
};

export const CHANGE_REQUEST_FIELDS = {
  BOOKING_TYPE: 'BOOKING_TYPE',
  PRICE: 'PRICE',
  THUMBNAIL: 'THUMBNAIL',
  GALLERY: 'GALLERY',
  FACILITIES: 'FACILITIES'
};

export const getStatusColor = (status) => {
  switch (status) {
    case VEHICLE_STATUS.DRAFT:
      return '#B0BEC5'; // Light gray-blue (neutral draft)
    case VEHICLE_STATUS.PENDING:
      return '#FFB74D'; // Light orange (waiting action)
    case VEHICLE_STATUS.APPROVED:
      return '#66BB6A'; // Mid green (positive approval)
    case VEHICLE_STATUS.REJECTED:
      return '#E57373'; // Mid red (soft rejection)
    case VEHICLE_STATUS.SUSPENDED:
      return '#BA68C8'; // Mid purple (highlighted restriction)
    case VEHICLE_STATUS.UNVERIFIED:
      return '#FFD54F'; // Light amber (caution/unverified)
    default:
      return '#B0BEC5'; // Neutral default
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case VEHICLE_STATUS.DRAFT:
      return 'Draft';
    case VEHICLE_STATUS.PENDING:
      return 'Pending Approval';
    case VEHICLE_STATUS.APPROVED:
      return 'Approved';
    case VEHICLE_STATUS.REJECTED:
      return 'Rejected';
    case VEHICLE_STATUS.SUSPENDED:
      return 'Suspended';
    case VEHICLE_STATUS.UNVERIFIED:
      return 'Unverified';
    default:
      return status;
  }
}; 