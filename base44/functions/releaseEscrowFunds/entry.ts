import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ════════════════════════════════════════════════════════════════
// releaseEscrowFunds — Scheduled function
// Auto-releases escrow funds to dealer 14 days after buyer confirmed delivery.
// Finds orders in "verified" status where deliveryConfirmedAt is 14+ days old,
// transitions them to "funds_released", and marks the product as Sold.
// ════════════════════════════════════════════════════════════════

const HOLD_PERIOD_DAYS = 14;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Authenticate — must be called by the system (scheduled automation uses service role)
    const isAuthenticated = await base44.auth.isAuthenticated();
    if (!isAuthenticated) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const cutoff = new Date(now.getTime() - (HOLD_PERIOD_DAYS * 24 * 60 * 60 * 1000));

    // Find all orders in "verified" status
    const verifiedOrders = await base44.asServiceRole.entities.Orders.filter({ escrowStatus: 'verified' });

    const eligible = verifiedOrders.filter(o => {
      if (!o.deliveryConfirmedAt) return false;
      return new Date(o.deliveryConfirmedAt) <= cutoff;
    });

    let released = 0;
    let errors = 0;

    for (const order of eligible) {
      try {
        // Release funds to dealer
        await base44.asServiceRole.entities.Orders.update(order.id, {
          escrowStatus: 'funds_released',
          orderStatus: 'Delivered',
          paymentStatus: 'Paid',
          shippingStatus: 'Delivered'
        });

        // Mark product as Sold
        if (order.products && order.products[0] && order.products[0].productId) {
          await base44.asServiceRole.entities.Products.update(order.products[0].productId, { availability: 'Sold' });
        }

        // Notify buyer via email
        if (order.buyerEmail) {
          try {
            await base44.asServiceRole.integrations.Core.SendEmail({
              to: order.buyerEmail,
              subject: 'Escrow Funds Released — Transaction Complete',
              body: `Dear ${order.customerName},\n\nThe 14-day inspection period for your order ${order.escrowReference} has ended. Funds have been released to the dealer and your transaction is now complete.\n\nThank you for shopping with Kariv Glamour.\n\nBest regards,\nThe Kariv Glamour Team`
            });
          } catch (e) { /* email failure should not block fund release */ }
        }

        released++;
      } catch (e) {
        console.error('Failed to release funds for order ' + order.id + ':', e);
        errors++;
      }
    }

    return Response.json({
      status: 'success',
      checked: verifiedOrders.length,
      eligible: eligible.length,
      released,
      errors,
      cutoff: cutoff.toISOString()
    });
  } catch (error) {
    console.error('releaseEscrowFunds error:', error);
    return Response.json({ error: 'An error occurred' }, { status: 500 });
  }
});