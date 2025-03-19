export const ITEMS_PER_PAGE = 7;

export const COLUMN_WIDTHS = {
    userName: 130,
    emailId: 130,
    phoneNumber: 130,
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
        label: 'Total Staffs',
        icon: 'FiUsers',
        iconColor: 'text-cyan-600',
        trend: '+12% from last month',
        sortConfig: { field: 'userName', direction: 'asc' }
    },
    {
        id: 'active_members',
        label: 'Active Staffs',
        icon: 'FiCheckCircle',
        iconColor: 'text-green-600',
        sortConfig: { field: 'status', direction: 'asc', filterValue: 'Active' }
    },
    {
        id: 'inactive_members',
        label: 'Inactive Staffs',
        icon: 'FiClock',
        iconColor: 'text-red-600',
        sortConfig: { field: 'status', direction: 'desc', filterValue: 'Inactive' }
    },
    {
        id: 'total_delivered',
        label: 'Total Delivered',
        icon: 'FiTrendingUp',
        iconColor: 'text-blue-600',
        sortConfig: { field: 'delivered', direction: 'desc' }
    }
]; 