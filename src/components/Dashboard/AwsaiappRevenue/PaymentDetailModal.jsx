import React, { useContext } from 'react';
import { Button, Modal } from "flowbite-react";
import Context from '../../../context/Context';

function PaymentDetailModal({ isOpen, onClose, payment, recurringValue }) {
    const { products } = useContext(Context); // Moved to the top
    if (!payment) return null; // Check for payment immediately after useContext

    console.log("Received Payment:", payment); // Log the received payment

    // Format date as MM/DD/YYYY
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    // Helper function to format currency
    const formatCurrency = (amount, currency) => {
        if (currency === "USD") return `$${amount.toFixed(2)}`;
        if (currency === "INR") return `₹${amount.toFixed(2)}`;
        return amount.toFixed(2);
    };

    // Calculate renewal date (1 month after payment date)
    const paymentDate = new Date(payment.paymentDate);
    const renewDate = new Date(paymentDate);
    renewDate.setMonth(renewDate.getMonth() + 1);

    // Determine payment gateway
    const gateway = payment.paymentMode === "offline"
        ? "Offline"
        : payment.currency === "USD"
            ? "PayPal"
            : "Razorpay";

    const nameProduct = (value) => {
        const product = products.find(product => product.productId === value);
        return product ? product.heading : null;
    }

    return (
        <Modal show={isOpen} onClose={onClose} size="4xl">
            <Modal.Header className="bg-[#30afbc] modalHeader">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-xl font-semibold text-white">Payment Details</h3>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-[#30afbc] mb-3">Institution Information</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Institution Id:</span>
                                <span className="text-gray-800">{payment.childInstitution || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Institution Type:</span>
                                <span className="text-gray-800">{payment.institutionType || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-[#30afbc] mb-3">Payer Information</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Name:</span>
                                <span className="text-gray-800">{payment.userDetails?.userName || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Mobile Number:</span>
                                <span className="text-gray-800">{payment.userDetails?.phoneNumber || 'N/A'}</span>
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-[#30afbc] mb-3">Payment Information</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Amount:</span>
                                <span className="text-gray-800 font-bold">
                                    {formatCurrency(payment.amount / 100, payment.currency)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Product:</span>
                                <span className="text-gray-800">{nameProduct(payment.productId)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Payment Type:</span>
                                <span className="text-gray-800">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${recurringValue ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                                        {recurringValue ? "Recurring" : "New"}
                                    </span>
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Payment Gateway:</span>
                                <span className="text-gray-800">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${gateway === "PayPal" ? "bg-blue-100 text-blue-800" :
                                            gateway === "Razorpay" ? "bg-purple-100 text-purple-800" :
                                                "bg-gray-100 text-gray-800"
                                        }`}>
                                        {gateway}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-[#30afbc] mb-3">Date Information</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Payment Date:</span>
                                <span className="text-gray-800">{formatDate(payment.paymentDate)}</span>
                            </div>
                            {recurringValue && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-medium">Renew Date:</span>
                                    <span className="text-gray-800">{formatDate(payment.renewDate)}</span>
                                </div>
                            )}
                            {recurringValue && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-medium">Last Payment Date:</span>
                                    <span className="text-gray-800">{formatDate(payment.lastPaymentDate)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end">
                <Button color="gray" onClick={onClose} className="modal">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PaymentDetailModal;
