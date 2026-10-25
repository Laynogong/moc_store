document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") return;

    const products = document.querySelectorAll(
        ".product-card, .arrival-item, .arrival-feature, .thumb-card"
    );

    products.forEach(product => {
        const priceText = product.dataset.price;

        if (!priceText) return;

        // 259.000₫ -> 259000
        const originalPrice = Number(
            priceText.replace(/\./g, "").replace("₫", "").trim()
        );

        const discountedPrice = Math.round(originalPrice * 0.9);

        // Tìm nơi hiển thị giá
        const priceElement = product.querySelector(
            ".p-price, .price"
        );

        if (priceElement) {
            priceElement.innerHTML = `
                <span style="
                    text-decoration: line-through;
                    opacity: 0.5;
                    margin-right: 8px;
                ">
                    ${originalPrice.toLocaleString("vi-VN")}₫
                </span>

                <strong>
                    ${discountedPrice.toLocaleString("vi-VN")}₫
                </strong>

                <span style="
                    font-size: 12px;
                    margin-left: 5px;
                ">
                    -10%
                </span>
            `;
        }

        // Quan trọng: cập nhật giá để khi thêm giỏ hàng
        // cũng sử dụng giá đã giảm
        product.dataset.price =
            discountedPrice.toLocaleString("vi-VN") + "₫";
    });
});