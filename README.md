# 🪙 Greyreen Token (GRT) - Güvenli ERC-20 Sözleşmesi

## 🚀 Proje Özeti

Bu proje, ERC-20 standardına tam uyumlu, basit, Mint ve Ownable (Sahiplik) yetenekleri olan bir kripto para birimi sözleşmesidir. Tüm proje, endüstri standardı **Foundry (Forge)** test çerçevesi kullanılarak geliştirilmiş ve test edilmiştir.

## 🛠️ Teknoloji Yığını

* **Çerçeve:** Foundry (Forge & Cast)
* **Sözleşme Dili:** Solidity (`^0.8.20`)
* **Kütüphane:** OpenZeppelin Contracts
* **Kanıt:** Testler **Solidity diliyle** yazılmış ve %100 başarılı olmuştur.

## 🟢 İşlevsellik Kanıtı (Testler Başarılı)

Projenin tüm temel mantığı (sahiplik, transfer ve Mint yetkisi) tam olarak doğrulanmıştır.

| Test Adı | Durum | Açıklama |
| :--- | :--- | :--- |
| `test_InitialSupplyAndOwnership` | PASSED | Başlangıç arzının ve sözleşme sahibinin doğruluğu. |
| `test_OnlyOwnerCanMint` | PASSED | Sadece sahibin yeni token basabildiği. |
| `test_Transfer` | PASSED | Token transferinin başarılı olduğu. |

## 📦 Kurulum ve Çalıştırma (Foundry)

```bash
# Projeyi klonla
git clone [https://github.com/greyreen/GreyreenToken-Foundry.git](https://github.com/greyreen/GreyreenToken-Foundry.git)
cd GreyreenToken-Foundry

# Kütüphaneleri kur (OpenZeppelin)
forge install

# Derleme
forge build

# Testleri Çalıştırma (Başarıyı gösterir)
forge test