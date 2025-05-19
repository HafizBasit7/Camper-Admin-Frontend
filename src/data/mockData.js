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