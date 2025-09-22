// Data
const places = [
  { title: "🏯 Rajwada Palace", desc: "Historic royal palace in the heart of Indore." },
  { title: "🏰 Lal Bagh Palace", desc: "Royal heritage museum and garden." },
  { title: "🍢 Sarafa Bazaar", desc: "Famous evening food market. Opens after 7 PM." },
  { title: "🍜 Chhappan Dukaan", desc: "Foodie paradise with 56 shops." },
  { title: "🪞 Kanch Mandir", desc: "Beautiful Jain temple made of glass." }
];

const stays = [
  { title: "🏨 Radisson Blu", desc: "Luxury stay near the airport." },
  { title: "⭐ Sayaji Hotel", desc: "Premium 5-star hotel." },
  { title: "🛏 Hotel Tuli Inn", desc: "Mid-range, clean, and central." },
  { title: "💰 Budget Hotels", desc: "OYO, Treebo — affordable & reliable." }
];

// Load cards when page loads
window.onload = function() {
  const dest = document.getElementById("destinations");
  const hotel = document.getElementById("hotels");

  places.forEach(p => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = <><h3>${p.title}</h3><p>${p.desc}</p></>;
    dest.appendChild(div);
  });

  stays.forEach(h => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = <><h3>${h.title}</h3><p>${h.desc}</p></>;
    hotel.appendChild(div);
  });
};

// Expense Tracker
let expenses = [];
let first = true;

function addExpense() {
  const item = document.getElementById("item").value.trim();
  const amt = parseFloat(document.getElementById("amount").value);

  if (!item || isNaN(amt) || amt <= 0) {
    alert("Please enter valid item and amount!");
    return;
  }

  expenses.push({ item, amt });
  renderExpenses();
  updateTotal();

  if (first) {
    confetti({ particleCount: 100, spread: 180 });
    first = false;
  }

  document.getElementById("item").value = "";
  document.getElementById("amount").value = "";
}

function deleteExpense(i) {
  expenses.splice(i, 1);
  renderExpenses();
  updateTotal();
}

function renderExpenses() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (expenses.length === 0) {
    list.innerHTML = "<p style='text-align:center; color:#888;'>No expenses added.</p>";
    return;
  }

  expenses.forEach((exp, i) => {
    let div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `
      <span><strong>${exp.item}</strong>: ₹${exp.amt.toFixed(2)}</span>
      <button onclick="deleteExpense(${i})">🗑</button>
    `;
    list.appendChild(div);
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amt, 0);
  document.getElementById("total").innerText = 'Total:  ₹${total.toFixed(2)}';
}

function saveTrip() {
  if (expenses.length === 0) {
    alert("No expenses to save!");
    return;
  }
  const data = JSON.stringify(expenses, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_indore_trip.json";
  a.click();
}

function resetExpenses() {
  if (confirm("Clear all expenses?")) {
    expenses = [];
    renderExpenses();
    updateTotal();
  }
}

function toggle(el) {
  const item = el.parentElement;
  item.classList.toggle("active");
}