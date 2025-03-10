document.addEventListener("DOMContentLoaded", function () {
  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  const totalPrice = localStorage.getItem("totalPrice") || "0";
  const orderItemsTable = document.getElementById("order-items");

  // Clear existing table content
  orderItemsTable.innerHTML = "";

  // Add stored items to the bill
  orderItems.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price}</td>
      <td>₹${item.quantity * item.price}</td>
    `;
    orderItemsTable.appendChild(row);
  });

  // Update total price
  document.getElementById("total-price").innerText = `₹${totalPrice}`;

  // Calculate and update taxes
  const subtotal = parseFloat(totalPrice);
  const sgst = (subtotal * 0.09).toFixed(2);
  const cgst = (subtotal * 0.09).toFixed(2);
  document.getElementById("sgst").innerText = `₹${sgst}`;
  document.getElementById("cgst").innerText = `₹${cgst}`;

  // PDF Download Function
  document.getElementById("download-pdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Moonbrew Café", 70, 10);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Patia, Bhubaneswar", 75, 20);

    doc.text("Customer Name: " + document.getElementById("customer-name").innerText, 10, 30);
    doc.text("Phone No: " + document.getElementById("customer-phone").innerText, 10, 40);

    // Use autoTable for Proper Table Formatting
    let orderData = [];
    document.querySelectorAll("#order-items tr").forEach(row => {
      const columns = row.querySelectorAll("td");
      orderData.push([columns[0].innerText, columns[1].innerText, columns[2].innerText, columns[3].innerText]);
    });

    doc.autoTable({
      startY: 50,
      head: [["Item", "Qty", "Price", "Total"]],
      body: orderData
    });

    let yPos = doc.lastAutoTable.finalY + 10;
    doc.text("SGST (9%): ₹" + document.getElementById("sgst").innerText, 10, yPos);
    doc.text("CGST (9%): ₹" + document.getElementById("cgst").innerText, 10, yPos + 10);
    doc.text("Total Price: ₹" + document.getElementById("total-price").innerText, 10, yPos + 20);

    doc.save("Moonbrew_Cafe_Bill.pdf");
  });

  // SMS Sending with API (Twilio or another SMS Gateway)
  document.getElementById("send-sms").addEventListener("click", function () {
    const phoneNumber = document.getElementById("customer-phone").innerText;
    const totalAmount = document.getElementById("total-price").innerText;
    const message = `Moonbrew Café Bill: Total - ₹${totalAmount}`;

    fetch("https://your-sms-api.com/send", {  // Replace with your SMS API endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, message: message })
    })
    .then(response => response.json())
    .then(data => alert("SMS Sent Successfully"))
    .catch(error => alert("Failed to send SMS. Check API Key."));
  });

  // Online Payment Options
  document.getElementById("online-payment").addEventListener("click", function () {
    document.getElementById("online-payment-options").classList.remove("hidden");
  });

  document.getElementById("phonepe-payment").addEventListener("click", function () {
    alert("Redirecting to PhonePe...");
    // Add PhonePe payment integration logic here
  });

  document.getElementById("gpay-payment").addEventListener("click", function () {
    alert("Redirecting to GPay...");
    // Add GPay payment integration logic here
  });
});