import i18next from 'i18next';

export const ORDER_STATUS = {
  NEW: i18next.t('orders.status.new'),
  ONGOING: i18next.t('orders.status.ongoing'),
  COMPLETED: i18next.t('orders.status.completed'),
  HANDOVERED: i18next.t('orders.status.handovered'),
  DISMISSED: i18next.t('orders.status.dismissed'),
  ISSUE: i18next.t('orders.status.issue')
};

export const ORDER_ACTIONS = {
  [ORDER_STATUS.NEW]: [
    { label: i18next.t('orders.actions.startOrder'), value: 'start', color: 'primary' },
    { label: i18next.t('orders.actions.dismiss'), value: 'dismiss', color: 'error' }
  ],
  [ORDER_STATUS.ONGOING]: [
    { label: i18next.t('orders.actions.complete'), value: 'complete', color: 'success' },
    { label: i18next.t('orders.actions.reportIssue'), value: 'issue', color: 'warning' }
  ],
  [ORDER_STATUS.COMPLETED]: [
    { label: i18next.t('orders.actions.handover'), value: 'handover', color: 'primary' }
  ],
  [ORDER_STATUS.HANDOVERED]: [],
  [ORDER_STATUS.DISMISSED]: [
    { label: i18next.t('orders.actions.reopen'), value: 'reopen', color: 'info' }
  ],
  [ORDER_STATUS.ISSUE]: [
    { label: i18next.t('orders.actions.resolve'), value: 'resolve', color: 'success' },
    { label: i18next.t('orders.actions.dismiss'), value: 'dismiss', color: 'error' }
  ]
};

export const getStatusColor = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW:
      return '#cce5ff'; // light blue
    case ORDER_STATUS.ONGOING:
      return '#ffe5b4'; // light orange
    case ORDER_STATUS.COMPLETED:
      return '#d4edda'; // light green
    case ORDER_STATUS.HANDOVERED:
      return '#b3e5fc'; // soft sky blue
    case ORDER_STATUS.DISMISSED:
      return '#f8d7da'; // light red
    case ORDER_STATUS.ISSUE:
      return '#fff3cd'; // soft yellow
    default:
      return '#e2e3e5'; // neutral light gray
  }
};

export const ORDER_TABS = [
  { label: i18next.t('orders.tabs.all'), value: 'all' },
  { label: ORDER_STATUS.NEW, value: 'new' },
  { label: ORDER_STATUS.ONGOING, value: 'ongoing' },
  { label: ORDER_STATUS.COMPLETED, value: 'completed' },
  { label: ORDER_STATUS.HANDOVERED, value: 'handovered' },
  { label: ORDER_STATUS.DISMISSED, value: 'dismissed' },
  { label: ORDER_STATUS.ISSUE, value: 'issue' }
];