interface Props {
    orderId: number;
    totalAmount: number;
    fullName: string;
    address: string;
    paymentMethod: string;
}

export function EmailNotificationOrder({
    orderId,
    totalAmount,
    fullName,
    address,
    paymentMethod,
}: Props) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: 20,
                maxWidth: 600,
                margin: "0 auto",
            }}
        >
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
                <h3>📦 Delivery address</h3>
                <p>{address}</p>
            </div>

            {/* TOTAL */}
            <div
                style={{
                    marginTop: 24,
                    padding: 16,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                }}
            >
                <h3 style={{ margin: 0 }}>💰 Total</h3>

                <p
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 8,
                    }}
                >
                    {totalAmount} Br
                </p>
            </div>

            {/* FOOTER */}
            <div
                style={{
                    marginTop: 30,
                    fontSize: 12,
                    color: "#888",
                }}
            >
                <p>If you have any questions, just reply to this email.</p>
                <p>Unibody Store</p>
            </div>
        </div>
    );
}