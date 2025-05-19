export const ORDER_STATUS = {
  NEW: 'New placed',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  HANDOVERED: 'Handovered',
  DISMISSED: 'Dismissed',
  ISSUE: 'Request for any issues'
};

export const ORDER_ACTIONS = {
  [ORDER_STATUS.NEW]: [
    { label: 'Start Order', value: 'start', color: 'primary' },
    { label: 'Dismiss', value: 'dismiss', color: 'error' }
  ],
  [ORDER_STATUS.ONGOING]: [
    { label: 'Complete', value: 'complete', color: 'success' },
    { label: 'Report Issue', value: 'issue', color: 'warning' }
  ],
  [ORDER_STATUS.COMPLETED]: [
    { label: 'Handover', value: 'handover', color: 'primary' }
  ],
  [ORDER_STATUS.HANDOVERED]: [],
  [ORDER_STATUS.DISMISSED]: [
    { label: 'Reopen', value: 'reopen', color: 'info' }
  ],
  [ORDER_STATUS.ISSUE]: [
    { label: 'Resolve', value: 'resolve', color: 'success' },
    { label: 'Dismiss', value: 'dismiss', color: 'error' }
  ]
};

export const getStatusColor = (status) => {
  switch(status) {
    case ORDER_STATUS.NEW:
      return 'primary.blue';
    case ORDER_STATUS.ONGOING:
      return 'primary.orange';
    case ORDER_STATUS.COMPLETED:
      return 'success.main';
    case ORDER_STATUS.HANDOVERED:
      return 'primary.main';
    case ORDER_STATUS.DISMISSED:
      return 'error.main';
    case ORDER_STATUS.ISSUE:
      return 'warning.main';
    default:
      return 'secondary.main';
  }
};

export const ORDER_TABS = [
  { label: 'All', value: 'all' },
  { label: ORDER_STATUS.NEW, value: 'new' },
  { label: ORDER_STATUS.ONGOING, value: 'ongoing' },
  { label: ORDER_STATUS.COMPLETED, value: 'completed' },
  { label: ORDER_STATUS.HANDOVERED, value: 'handovered' },
  { label: ORDER_STATUS.DISMISSED, value: 'dismissed' },
  { label: ORDER_STATUS.ISSUE, value: 'issue' }
];