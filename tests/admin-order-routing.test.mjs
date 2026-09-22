import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const listPage = await readFile(new URL('../src/page-content/admin/AdminOrders.jsx', import.meta.url), 'utf8');
const detailPage = await readFile(new URL('../src/page-content/admin/AdminOrderDetail.jsx', import.meta.url), 'utf8');
const actions = await readFile(new URL('../src/actions/orders.js', import.meta.url), 'utf8');
const constants = await readFile(new URL('../src/lib/escrowConstants.js', import.meta.url), 'utf8');

test('admin order pages use route-aware status components and copy', () => {
  assert.match(listPage, /OrderStatusBadge/);
  assert.match(listPage, /isProtectedOrder\(o\) \? 'Protected Payment Status' : 'Order Status'/);
  assert.doesNotMatch(listPage, />Orders & Escrow</);

  assert.match(detailPage, /OrderStatusBadge/);
  assert.match(detailPage, /OrderTimeline/);
  assert.match(detailPage, /protectedOrder \? getEscrowCopy\(locale\) : getDirectOrderCopy\(locale\)/);
  assert.match(detailPage, /protectedOrder \? 'Protected Payment Management' : 'Order Management'/);
});

test('direct-order dispute copy never claims funds are frozen or released', () => {
  assert.match(detailPage, /protectedOrder \? '⚠ Dispute open — protected funds frozen' : '⚠ Dispute open — order under review'/);
  assert.match(detailPage, /dealerDirectOrder \? 'Close Case for Seller' : 'Close Case for Kariv'/);
  assert.match(detailPage, /The buyer paid the dealer directly\./);
  assert.match(detailPage, /Closing for the seller records no Kariv payout\./);
  assert.match(detailPage, /protectedOrder \? 'Protected funds released to dealer\. Transaction complete\.' : 'Order completed\.'/);
});

test('admin records completed refunds and protected payouts before resolving disputes', () => {
  assert.match(detailPage, /Completed refund or protected payout reference/);
  assert.match(detailPage, /Complete the refund or dealer payout first/);
  assert.match(detailPage, /Record Completed Refund/);
  assert.match(detailPage, /Record Dealer Refund & Resolve/);
  assert.match(detailPage, /financialReference\.trim\(\)\.length < 3/);
  assert.match(actions, /p_financial_reference: normalizedFinancialReference/);
  assert.match(actions, /Enter the completed refund or payout transaction reference/);
});

test('admin can reject submitted payment proof for correction or cancel the unpaid reservation', () => {
  assert.match(detailPage, /rejectPaymentProof as rejectPaymentProofAction/);
  assert.match(detailPage, /Reason if this proof must be rejected/);
  assert.match(detailPage, /Reject & Request Correction/);
  assert.match(detailPage, /Reject & Cancel Reservation/);
  assert.match(detailPage, /Proof rejected; buyer has 6 hours to upload a correction/);
  assert.match(detailPage, /Proof rejected; reservation cancelled/);
  assert.match(detailPage, /Reject this proof, cancel the unpaid order and release its reserved inventory/);

  assert.match(actions, /export async function rejectPaymentProof/);
  assert.match(actions, /reject_kariv_payment_proof/);
  assert.match(actions, /p_reason: normalizedReason/);
  assert.match(actions, /p_cancel_order: cancelOrder === true/);
  assert.match(actions, /This order no longer has a payment proof awaiting review/);
});

test('paid orders cannot be status-cancelled and shipping requires tracking', () => {
  assert.match(constants, /funds_secured: \['shipped'\]/);
  assert.match(constants, /verified: \['funds_released'\]/);
  assert.doesNotMatch(constants, /funds_secured: \[[^\]]*'cancelled'/);
  assert.doesNotMatch(constants, /verified: \[[^\]]*'cancelled'/);
  assert.match(actions, /Add a valid tracking number before marking this order as shipped/);
  assert.match(actions, /cancel_kariv_order_before_payment/);
  assert.match(detailPage, /Waiting for the assigned dealer to confirm availability and accept this order/);
  assert.match(detailPage, /Waiting for the dealer to confirm receipt/);
  assert.match(detailPage, /Waiting for the dealer to add tracking/);
});
