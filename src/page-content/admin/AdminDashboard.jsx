import React, { useState, useEffect } from 'react';
import { dataClient } from '@/lib/dataClient';
import { Package, ShoppingCart, Users, Tag } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, customers: 0, brands: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [products, orders, customers, brands] = await Promise.all([
          dataClient.entities.Products.list('-created_date', 1),
          dataClient.entities.Orders.list('-created_date', 5),
          dataClient.entities.Customers.list('-created_date', 1),
          dataClient.entities.Brands.list('-created_date', 1)
        ]);
        setStats({ products: products.length, orders: orders.length, customers: customers.length, brands: brands.length });
        setRecentOrders(orders);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-display text-[#E5E5E5] font-light mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Package, label: 'Products', value: stats.products, color: 'text-blue-400' },
          { icon: ShoppingCart, label: 'Orders', value: stats.orders, color: 'text-green-400' },
          { icon: Users, label: 'Customers', value: stats.customers, color: 'text-purple-400' },
          { icon: Tag, label: 'Brands', value: stats.brands, color: 'text-[#C5A367]' }
        ].map((s, i) => (
          <div key={i} className="bg-[#111] border border-white/5 p-5">
            <s.icon size={18} className={`${s.color} mb-3`} />
            <p className="text-2xl font-display text-[#E5E5E5]">{s.value}</p>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#111] border border-white/5 p-5">
        <h2 className="text-sm text-[#E5E5E5] font-medium mb-4">Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-xs text-[#E5E5E5]">{order.customerName}</p>
                  <p className="text-[10px] text-[#8E8E93]">{order.customerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#E5E5E5]">{formatPrice(order.totalAmount)}</p>
                  <span className={`text-[9px] tracking-wide uppercase px-2 py-0.5 ${
                    order.orderStatus === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                    order.orderStatus === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#8E8E93]">No orders yet.</p>
        )}
      </div>
    </div>
  );
}