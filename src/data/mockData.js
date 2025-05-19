// Sample order data
export const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    carModel: 'Toyota Camry',
    plateNumber: 'ABC 123',
    status: 'New placed',
    createdAt: '2025-05-10T10:30:00',
    updatedAt: '2025-05-10T10:30:00',
    services: ['Oil Change', 'Wheel Alignment'],
    totalAmount: 150.00,
    paymentStatus: 'Pending',
    notes: 'Customer requested express service'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    carModel: 'Honda Civic',
    plateNumber: 'XYZ 789',
    status: 'Ongoing',
    createdAt: '2025-05-09T14:45:00',
    updatedAt: '2025-05-09T16:20:00',
    services: ['Brake Replacement', 'Air Filter Change'],
    totalAmount: 320.00,
    paymentStatus: 'Partially Paid',
    notes: ''
  },
  {
    id: 'ORD-003',
    customerName: 'Robert Johnson',
    carModel: 'Tesla Model 3',
    plateNumber: 'EV 456',
    status: 'Completed',
    createdAt: '2025-05-08T09:15:00',
    updatedAt: '2025-05-08T15:45:00',
    services: ['Battery Check', 'Software Update'],
    totalAmount: 200.00,
    paymentStatus: 'Paid',
    notes: 'Customer will pick up tomorrow'
  },
  {
    id: 'ORD-004',
    customerName: 'Emily White',
    carModel: 'BMW X5',
    plateNumber: 'LUX 001',
    status: 'Handovered',
    createdAt: '2025-05-07T11:30:00',
    updatedAt: '2025-05-08T10:15:00',
    services: ['Full Detailing', 'Tire Replacement'],
    totalAmount: 850.00,
    paymentStatus: 'Paid',
    notes: 'Customer very satisfied with service'
  },
  {
    id: 'ORD-005',
    customerName: 'Michael Brown',
    carModel: 'Audi A4',
    plateNumber: 'AUD 444',
    status: 'Dismissed',
    createdAt: '2025-05-06T13:45:00',
    updatedAt: '2025-05-06T14:30:00',
    services: ['AC Repair'],
    totalAmount: 180.00,
    paymentStatus: 'Cancelled',
    notes: 'Customer cancelled due to scheduling conflict'
  },
  {
    id: 'ORD-006',
    customerName: 'Sarah Davis',
    carModel: 'Mercedes C-Class',
    plateNumber: 'MBZ 777',
    status: 'Request for any issues',
    createdAt: '2025-05-05T10:00:00',
    updatedAt: '2025-05-05T16:45:00',
    services: ['Engine Tuning', 'Suspension Check'],
    totalAmount: 420.00,
    paymentStatus: 'Paid',
    notes: 'Customer reported noise after service'
  },
  {
    id: 'ORD-007',
    customerName: 'Thomas Wilson',
    carModel: 'Nissan Altima',
    plateNumber: 'NIS 222',
    status: 'New placed',
    createdAt: '2025-05-11T09:30:00',
    updatedAt: '2025-05-11T09:30:00',
    services: ['Oil Change', 'Brake Inspection'],
    totalAmount: 120.00,
    paymentStatus: 'Pending',
    notes: ''
  },
  {
    id: 'ORD-008',
    customerName: 'Lisa Moore',
    carModel: 'Subaru Outback',
    plateNumber: 'SUB 888',
    status: 'Ongoing',
    createdAt: '2025-05-10T13:15:00',
    updatedAt: '2025-05-10T15:30:00',
    services: ['Transmission Flush', 'Coolant Change'],
    totalAmount: 350.00,
    paymentStatus: 'Partially Paid',
    notes: 'Waiting for parts'
  }
];

// Function to fetch orders (simulated API call)
export const fetchOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

// Function to filter orders by status
export const filterOrdersByStatus = (orders, status) => {
  if (status === 'all') {
    return orders;
  }
  
  const statusMap = {
    'new': 'New placed',
    'ongoing': 'Ongoing',
    'completed': 'Completed',
    'handovered': 'Handovered',
    'dismissed': 'Dismissed',
    'issue': 'Request for any issues'
  };
  
  return orders.filter(order => order.status === statusMap[status]);
};

// Function to update order status (simulated API call)
export const updateOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedOrders = mockOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return order;
      });
      resolve(updatedOrders);
    }, 500);
  });
};

export const mockVehicles = [
  {
    id: 1,
    name: 'Luxury RV 2023',
    owner: 'John Doe',
    status: 'APPROVED',
    price: '$200/day',
    lastUpdated: '2024-03-15',
    type: 'RV',
    location: 'New York',
    reports: [
      {
        id: 1,
        reason: 'Overcharging',
        description: 'Charged more than listed price',
        reportedBy: 'Alice Smith',
        date: '2024-03-10',
        status: 'PENDING'
      },
      {
        id: 2,
        reason: 'Vehicle Condition',
        description: 'Vehicle was not as described',
        reportedBy: 'Bob Johnson',
        date: '2024-03-12',
        status: 'RESOLVED'
      }
    ]
  },
  {
    id: 2,
    name: 'Compact Camper 2024',
    owner: 'Jane Smith',
    status: 'PENDING',
    price: '$150/day',
    lastUpdated: '2024-03-14',
    type: 'Camper',
    location: 'Los Angeles'
  },
  {
    id: 3,
    name: 'Family RV 2023',
    owner: 'Mike Johnson',
    status: 'DRAFT',
    price: '$180/day',
    lastUpdated: '2024-03-13',
    type: 'RV',
    location: 'Chicago'
  },
  {
    id: 4,
    name: 'Luxury Motorhome',
    owner: 'Sarah Wilson',
    status: 'SUSPENDED',
    price: '$300/day',
    lastUpdated: '2024-03-11',
    type: 'Motorhome',
    location: 'Miami',
    reports: [
      {
        id: 3,
        reason: 'Scam',
        description: 'Owner asked for payment outside platform',
        reportedBy: 'Charlie Brown',
        date: '2024-03-09',
        status: 'PENDING'
      }
    ]
  },
  {
    id: 5,
    name: 'Budget Camper',
    owner: 'Tom Brown',
    status: 'REJECTED',
    price: '$100/day',
    lastUpdated: '2024-03-10',
    type: 'Camper',
    location: 'Seattle',
    rejectionReason: 'Incomplete documentation'
  },
  {
    id: 6,
    name: 'Premium RV',
    owner: 'Emma Davis',
    status: 'UNVERIFIED',
    price: '$250/day',
    lastUpdated: '2024-03-12',
    type: 'RV',
    location: 'Boston'
  }
];

export const mockChangeRequests = [
  {
    id: 1,
    vehicleId: 1,
    type: 'PRICE',
    oldValue: '$180/day',
    newValue: '$200/day',
    status: 'PENDING',
    requestedBy: 'John Doe',
    date: '2024-03-14'
  },
  {
    id: 2,
    vehicleId: 3,
    type: 'FACILITIES',
    oldValue: 'Basic amenities',
    newValue: 'Added WiFi and TV',
    status: 'PENDING',
    requestedBy: 'Mike Johnson',
    date: '2024-03-13'
  }
];

export const mockStats = {
  total: 150,
  pending: 25,
  approved: 100,
  reported: 5,
  suspended: 3,
  unverified: 12,
  rejected: 5
};

export const getVehicleStats = (vehicles) => {
  return {
    total: vehicles.length,
    pending: vehicles.filter(v => v.status === 'PENDING').length,
    approved: vehicles.filter(v => v.status === 'APPROVED').length,
    reported: vehicles.filter(v => v.reports && v.reports.length > 0).length,
    suspended: vehicles.filter(v => v.status === 'SUSPENDED').length,
    unverified: vehicles.filter(v => v.status === 'UNVERIFIED').length,
    rejected: vehicles.filter(v => v.status === 'REJECTED').length
  };
};

export const mockWithdrawals = [
  {
    id: 1,
    ownerName: 'John Doe',
    vehicleName: 'Luxury RV 2023',
    amount: 2500.00,
    status: 'PENDING',
    requestDate: '2024-03-15',
    settlementDate: '2024-03-10',
    paymentMethod: 'Bank Transfer',
    accountDetails: '****1234',
    notes: 'First withdrawal request'
  },
  {
    id: 2,
    ownerName: 'Jane Smith',
    vehicleName: 'Camper Van 2024',
    amount: 1800.00,
    status: 'PROCESSING',
    requestDate: '2024-03-14',
    settlementDate: '2024-03-09',
    paymentMethod: 'PayPal',
    accountDetails: 'jane.smith@email.com',
    notes: 'Regular monthly withdrawal'
  },
  {
    id: 3,
    ownerName: 'Mike Johnson',
    vehicleName: 'Travel Trailer 2023',
    amount: 3200.00,
    status: 'COMPLETED',
    requestDate: '2024-03-13',
    settlementDate: '2024-03-08',
    paymentMethod: 'Bank Transfer',
    accountDetails: '****5678',
    notes: 'Completed successfully'
  },
  {
    id: 4,
    ownerName: 'Sarah Wilson',
    vehicleName: 'Motorhome 2024',
    amount: 1500.00,
    status: 'REJECTED',
    requestDate: '2024-03-12',
    settlementDate: '2024-03-07',
    paymentMethod: 'PayPal',
    accountDetails: 'sarah.w@email.com',
    notes: 'Invalid account details'
  }
];

export const getWithdrawalStats = (withdrawals) => {
  return {
    total: withdrawals.length,
    pending: withdrawals.filter(w => w.status === 'PENDING').length,
    processing: withdrawals.filter(w => w.status === 'PROCESSING').length,
    completed: withdrawals.filter(w => w.status === 'COMPLETED').length,
    rejected: withdrawals.filter(w => w.status === 'REJECTED').length,
    totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0),
    pendingAmount: withdrawals
      .filter(w => w.status === 'PENDING')
      .reduce((sum, w) => sum + w.amount, 0)
  };
};

export const mockBlogs = [
  {
    id: 1,
    title: 'Top 10 Camping Destinations in 2024',
    description: 'Discover the most breathtaking camping spots that you must visit this year.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'data:image/jpeg;base64,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',
    category: 'CAMPING',
    status: 'PUBLISHED',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Essential Camping Gear for Beginners',
    description: 'A comprehensive guide to the must-have equipment for your first camping trip.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'data:image/jpeg;base64,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',
    category: 'TIPS',
    status: 'PUBLISHED',
    date: '2024-03-10'
  },
  {
    id: 3,
    title: 'Adventure Travel: Off the Beaten Path',
    description: 'Explore hidden gems and secret spots that most tourists never discover.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'data:image/jpeg;base64,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',
    category: 'ADVENTURE',
    status: 'DRAFT',
    date: '2024-03-05'
  }
];