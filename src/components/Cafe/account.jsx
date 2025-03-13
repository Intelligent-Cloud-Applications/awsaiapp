import { API } from 'aws-amplify';

// Add regex constants
// const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;

/**
 * Creates admin accounts for the institution
 * @param {Object} params Parameters for creating admin accounts
 * @param {string} params.institution Institution ID
 * @param {string} params.country Country code
 * @param {Object} params.admin1 First admin details
 * @param {Object} params.admin2 Second admin details
 * @returns {Promise} API response
 */
export const createAdminAccounts = async ({
    institution,
    country = 'default',
    admin1,
    admin2
}) => {
    try {
        // Validate required fields
        if (!institution) {
            throw new Error('Institution ID is required');
        }
        if (!admin1?.cognitoId || !admin1?.emailId || !admin1?.userName) {
            throw new Error('Admin1 cognitoId, emailId, and userName are required');
        }
        if (!admin2?.emailId || !admin2?.userName) {
            throw new Error('Admin2 emailId and userName are required');
        }

        // Make API call to create admin accounts
        const response = await API.put("clients", '/admin/web-create-clients', {
            body: {
                institution,
                country,
                admin1: {
                    cognitoId: admin1.cognitoId,
                    emailId: admin1.emailId,
                    phoneNumber: admin1.phoneNumber || '',
                    userName: admin1.userName
                },
                admin2: {
                    emailId: admin2.emailId,
                    phoneNumber: admin2.phoneNumber || '',
                    userName: admin2.userName
                }
            },
            requestContext: {
                identity: {
                    cognitoIdentityId: admin1.cognitoId
                }
            }
        });

        return response;
    } catch (error) {
        console.error('Error creating admin accounts:', error);
        throw new Error(error.message || 'Failed to create admin accounts');
    }
};

/**
 * Validates admin account data
 * @param {Object} admin Admin data to validate
 * @returns {Object} Validation result
 */
export const validateAdminData = (admin) => {
    const errors = {};
    
    if (!admin.emailId) {
        errors.emailId = 'Email is required';
    }
    if (!admin.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
    }
    if (!admin.firstName) {
        errors.firstName = 'First name is required';
    }
    if (!admin.lastName) {
        errors.lastName = 'Last name is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
