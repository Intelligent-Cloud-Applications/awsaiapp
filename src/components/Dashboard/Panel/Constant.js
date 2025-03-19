
export const STATS_CONFIG = [
    {
        id: 'Pending',
        label: 'Institutions Pending',
        icon: 'FiClock',
        iconColor: 'text-red-600',
        sortConfig: { status: 'Pending' }
    },
    {
        id: 'Completed',
        label: 'Institutions Completed',
        icon: 'FiCheckCircle',
        iconColor: 'text-green-600',
        sortConfig: { status: 'Completed' }
    },
    {
        id: 'total_delivered',
        label: 'Total Delivered',
        icon: 'FiTrendingUp',
        iconColor: 'text-blue-600',
        sortConfig: { status: 'total_delivered' }
    }
];
