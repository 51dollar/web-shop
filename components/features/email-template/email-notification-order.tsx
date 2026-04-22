import type { EmailTemplateProps } from "./type";

export function EmailNotificationOrder({
    orderId,
    items,
    totalAmount,
    fullName,
    address,
    paymentMethod,
}: EmailTemplateProps) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
            <h2>🧾 Order #{orderId}</h2>

            <p>
                Hello, <b>{fullName}</b> 👋
            </p>

            <p>Thank you for your order!</p>

            {/* PAYMENT */}
            <div style={{ marginTop: 20 }}>
                <h3>💳 Payment method</h3>
                <p>{paymentMethod}</p>
            </div>

            {/* DELIVERY */}
            <div style={{ marginTop: 20 }}>
                <h3>📦 Delivery</h3>
                <p>{address}</p>
            </div>

            {/* ITEMS */}
            <div style={{ marginTop: 20 }}>
                <h3>🛒 Items</h3>

                <table
                    width="100%"
                    style={{ borderCollapse: "collapse", marginTop: 10 }}
                >
                    <thead>
                        <tr>
                            <th align="left">Product</th>
                            <th align="left">Specs</th>
                            <th align="center">Qty</th>
                            <th align="right">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td style={{ padding: "8px 0" }}>
                                    {item.product.name}
                                </td>

                                <td style={{ color: "#666", fontSize: 12 }}>
                                    {item.color} / {item.storage}GB
                                </td>

                                <td align="center">{item.quantity}</td>

                                <td align="right">
                                    {item.price * item.quantity} Br
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TOTAL */}
            <div style={{ marginTop: 20 }}>
                <h3>💰 Total</h3>
                <p style={{ fontSize: 18, fontWeight: "bold" }}>
                    {totalAmount} Br
                </p>
            </div>

            {/* FOOTER */}
            <div style={{ marginTop: 30, fontSize: 12, color: "#888" }}>
                <p>
                    If you have any questions, just reply to this email.
                </p>
                <p>Unibody Store</p>
            </div>
        </div>
    );
}