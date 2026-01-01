const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRscIuXHf9Y7IOsBAwR5kzo_1PQPSNHIHPpKdpSs3ffVzxg01dAPt4KuqhEDhkt47xbzz5ECK-4KgPB/pub?gid=0&single=true&output=csv";

Papa.parse(csvUrl, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;
    const container = document.getElementById("products");
    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerText = "Belum ada data CSV atau spreadsheet belum publish.";
      return;
    }

    data.forEach(row => {
      // Pastikan header tepat
      const nama = row["Nama Produk"] || "";
      const deskripsi = row["Deskripsi"] || "";
      const harga = row["Harga"] || "";
      const gambar = row["Gambar"] || "";
      const link = row["Link Pembelian"] || "";

      container.innerHTML += `
        <div class="product">
          <img src="${gambar}" alt="${nama}">
          <h3>${nama}</h3>
          <p>${deskripsi}</p>
          <p><strong>Rp${harga}</strong></p>
          <button onclick="window.open('${link}','_blank')">Beli Sekarang</button>
        </div>
      `;
    });
  },
  error: function(err) {
    document.getElementById("products").innerText = "Gagal memuat CSV.";
    console.error(err);
  }
});
