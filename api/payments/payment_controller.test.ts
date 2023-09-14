import { secure_pay_payments_c, secure_refund_payments_c, secure_payout_payments_c } from './payment_controller';
import { Order } from '../orders';
import Stripe from 'stripe';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';

// Mock the Stripe library
jest.mock('stripe');
const stripe = new Stripe('fake-stripe-key', { apiVersion: '2023-08-16' });

// Mock the Order model
const orderMock = mockDeep<Order>();

describe('Payment Controller', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockReset(orderMock);
    jest.resetAllMocks();
  });

  test('secure_pay_payments_c', async () => {
    // Mock necessary functions and objects
    const req = { params: { id: 'fake-id' }, body: { paymentMethod: { id: 'fake-payment-method-id' } } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    // Call secure_pay_payments_c with mock data
    await secure_pay_payments_c(req, res);

    // Assert the results
    expect(res.send).toHaveBeenCalled();
  });

  test('secure_refund_payments_c', async () => {
    // Mock necessary functions and objects
    const req = { params: { order_id: 'fake-order-id' }, body: { refundAmount: '100' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    // Call secure_refund_payments_c with mock data
    await secure_refund_payments_c(req, res);

    // Assert the results
    expect(res.send).toHaveBeenCalled();
  });

  test('secure_payout_payments_c', async () => {
    // Mock necessary functions and objects
    const req = { body: { stripe_connect_id: 'fake-stripe-connect-id', amount: '100', description: 'fake-description' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    // Call secure_payout_payments_c with mock data
    await secure_payout_payments_c(req, res);

    // Assert the results
    expect(res.send).toHaveBeenCalled();
  });
});
