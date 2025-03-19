
export const STATS_CONFIG = [
    {
        id: 'total_delivered',
        label: 'Delivered',
        icon: 'FiCheckCircle',
        iconColor: 'text-green-600',
        sortConfig: { status: 'total_delivered' }
    },
    {
        id: 'Pending',
        label: 'Pending',
        icon: 'FiClock',
        iconColor: 'text-red-600',
        sortConfig: { status: 'Pending' }
    },
    {
        id: 'Completed',
        label: 'To be Delivered',
        icon: 'FiTrendingUp',
        iconColor: 'text-blue-600',
        sortConfig: { status: 'Completed' }
    }
];
