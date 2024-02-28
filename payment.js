function setAmountValue() {
  let total = totals();
  document.getElementById("amount").value = `₦${total.toFixed(2)}`;
  document.getElementById("money").value = `${total.toFixed(2)}`;
}
setAmountValue();

function generateRandomRef() {
  let random = Math.floor(Math.random() * 1000000);
  let timestamp = new Date().getTime();
  let reference = `REF_${random}_${timestamp}`;
  return reference;
}

var paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  payWithPaystack();
}, false);
function payWithPaystack() {
  var handler = PaystackPop.setup({
    key: "pk_test_3d3700a43de3dd9dcb87f041d882d4983f08b3df",
    email: document.getElementById("email").value,
    amount: document.getElementById("money").value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: "NGN", // Use GHS for Ghana Cedis or USD for US Dollars
    ref: generateRandomRef(), // Replace with a reference you generated
    callback: function (response) {
      //this happens after the payment is completed successfully
      var reference = response.reference;
      alert("Payment complete! Reference: " + reference);
      // Make an AJAX call to your server with the reference to verify the transaction
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
}
