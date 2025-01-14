export const ITEMS_PER_PAGE = 7;

export const COLUMN_WIDTHS = {
  userName: 180,
  emailId: 180,
  phoneNumber: 150,
  role: 120,
  joiningDate: 150,
  status: 100,
  delivered: 80,
  inprogress: 80
};

export const SEARCH_FIELDS = [
  { value: 'userName', label: 'Name' },
  { value: 'emailId', label: 'Email' },
  { value: 'phoneNumber', label: 'Phone' }
];

export const STATS_CONFIG = [
  {
    id: 'total_members',
    label: 'Total Members',
    icon: 'FiUsers',
    iconColor: 'text-cyan-600',
    trend: '+12% from last month',
    sortConfig: { field: 'userName', direction: 'asc' }
  },
  {
    id: 'active_members',
    label: 'Active Members',
    icon: 'FiCheckCircle',
    iconColor: 'text-green-600',
    trend: '+5% from last month',
    sortConfig: { field: 'status', direction: 'asc', filterValue: 'Active' }
  },
  {
    id: 'inactive_members',
    label: 'Inactive Members',
    icon: 'FiClock',
    iconColor: 'text-red-600',
    trend: '-2% from last month',
    sortConfig: { field: 'status', direction: 'desc', filterValue: 'Inactive' }
  },
  {
    id: 'total_delivered',
    label: 'Total Delivered',
    icon: 'FiTrendingUp',
    iconColor: 'text-blue-600',
    trend: '+8% from last month',
    sortConfig: { field: 'delivered', direction: 'desc' }
  }
]; 