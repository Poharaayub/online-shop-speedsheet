// Link spreadsheet publish
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRscIuXHf9Y7IOsBAwR5kzo_1PQPSNHIHPpKdpSs3ffVzxg01dAPt4KuqhEDhkt47xbzz5ECK-4KgPB/pubhtml";

// Fetch HTML dari Google Spreadsheet
fetch(sheetUrl)
.then(res => res.text())
.then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Ambil semua baris di table
    const rows = doc.querySelectorAll("table tbody tr");
    const container = document.getElementById("products");
    container.innerHTML = ""; // kosongkan dulu teks "memuat"

    rows.forEach(row => {
        const cols = row.querySelectorAll("td");
        if(cols.length >= 7) {

            const id = cols[0].innerText.trim();
            const nama = cols[1].innerText.trim();
            const kategori = cols[2].innerText.trim();
            const harga = cols[3].innerText.trim();
            const deskripsi = cols[4].innerText.trim();
            const gambar = cols[5].innerText.trim();
            const link = cols[6].innerText.trim();

            container.innerHTML += `
                <div class="product">
                    <img src="${gambar}" alt="${nama}">
                    <h3>${nama}</h3>
                    <p>${deskripsi}</p>
                    <p><strong>Rp${harga}</strong></p>
                    <button onclick="window.open('${link}','_blank')">Beli Sekarang</button>
                </div>
            `;
        }
    });
})
.catch(err => {
    document.getElementById("products").innerText = "Terjadi kesalahan saat memuat data.";
    console.error(err);
});
