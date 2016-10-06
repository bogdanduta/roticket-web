export class BookingStep {
    orderNumber: number;
    className: string;
    displayName: string;
    href: string;
    name: string;

    static searchStep: BookingStep = { orderNumber: 1, className: 'fa-search', 
        displayName: 'Search', href: 'booking/search', name:'booking.search' };
    static selectStep: BookingStep = { orderNumber: 2, className: 'fa-list-ul', 
        displayName: 'Select', href: 'booking/select/outward', name: 'booking.select' };
    static ticketStep: BookingStep = { orderNumber: 3, className: 'fa-ticket', 
        displayName: 'Ticket', href: 'booking/ticket', name: 'booking.ticket' };
    static payStep: BookingStep = { orderNumber: 4, className: 'fa-credit-card', 
        displayName: 'Pay', href: 'booking/pay', name: 'booking.pay' };
    static bookStep: BookingStep = { orderNumber: 5, className: 'fa-check-square-o', 
        displayName: 'Book', href: 'booking/book', name: 'booking.book' }
    static confirmStep: BookingStep = { orderNumber: 6, className: 'fa-shield', 
        displayName: 'Confirm', href: 'booking/confirm', name: 'booking.confirm' };

    static bookingSteps: BookingStep[] = [
        BookingStep.searchStep,
        BookingStep.selectStep,
        BookingStep.ticketStep,
        BookingStep.payStep,
        BookingStep.bookStep,
        BookingStep.confirmStep,
    ];
}