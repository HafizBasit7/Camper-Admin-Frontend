export const WITHDRAWAL_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export const WITHDRAWAL_TABS = {
  ALL: 'ALL',
  NEW: 'NEW',
  SENT: 'SENT',
  RECEIVED: 'RECEIVED'
};

export const getWithdrawalStatusColor = (status) => {
  switch (status) {
    case WITHDRAWAL_STATUS.PENDING:
      return '#FFB74D'; // Light orange - waiting
    case WITHDRAWAL_STATUS.PROCESSING:
      return '#42A5F5'; // Blue - processing
    case WITHDRAWAL_STATUS.COMPLETED:
      return '#66BB6A'; // Green - completed
    case WITHDRAWAL_STATUS.REJECTED:
      return '#EF5350'; // Red - rejected
    default:
      return '#B0BEC5'; // Light gray-blue - neutral
  }
};

export const getWithdrawalStatusLabel = (status) => {
  switch (status) {
    case WITHDRAWAL_STATUS.PENDING:
      return 'Pending';
    case WITHDRAWAL_STATUS.PROCESSING:
      return 'Processing';
    case WITHDRAWAL_STATUS.COMPLETED:
      return 'Completed';
    case WITHDRAWAL_STATUS.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
}; 