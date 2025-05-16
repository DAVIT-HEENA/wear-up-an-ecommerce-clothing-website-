function updateCartBadge() {
    var badge = document.getElementById("badge");
    var orderIdsRaw = localStorage.getItem('orderIds');
    var count = 0;
    try {
        var orderIds = JSON.parse(orderIdsRaw);
        if (Array.isArray(orderIds)) {
            count = orderIds.length;
        }
    } catch (e) {
        // If parsing fails, reset to empty array
        localStorage.setItem('orderIds', JSON.stringify([]));
        count = 0;
    }
    if (badge) badge.innerHTML = count;
}
// Make available globally
window.updateCartBadge = updateCartBadge; 