# 🚀 Greyreen Token DApp (Full-Stack ERC-20)

Bu proje, bir token sözleşmesini (ERC-20) yazmaktan, onu yerel bir blok zincirine dağıtmaya ve kullanıcı arayüzü (Frontend) ile etkileşim kurmaya kadar olan **uçtan uca (Full-Stack) bir Web3 uygulamasını** temsil eder.

## 🛠️ Proje Mimarisi

* **Sözleşme (Backend):** Foundry (Forge) ile yazılmış, OpenZeppelin'den miras alan güvenli ERC-20 Token sözleşmesi (`GreyreenToken.sol`).
* **Frontend (Arayüz):** React.js ile oluşturulmuş, MetaMask üzerinden cüzdan bağlantısı kuran Mint/Transfer arayüzü.
* **Web3 Etkileşimi:** Ethers.js kütüphanesi.
* **Lokal Ağ:** Foundry'nin `anvil` aracı (Localhost:8545).

## 🟢 İŞLEVSELLİK KANITI

Proje, hem Foundry testleri ile hem de canlı arayüzde kanıtlanmıştır:

1.  **Yerel Testler:** Token sözleşmesi, Ownable (Sahiplik) kuralları ve transfer mantığı **Solidity testleri** ile başarıyla doğrulanmıştır.
2.  **Canlı Mint:** Sözleşme sahibi (Owner) ile bağlanan arayüz, Token'ları Mint edebilmekte ve transfer edebilmektedir.

## 📦 Kurulum ve Çalıştırma

Bu projeyi yerel olarak çalıştırmak için iki ayrı Terminal sekmesi gerekir.

1.  **Klonlama ve Kurulum:**
    ```bash
    git clone [https://github.com/greyreen/GreyreenToken-Foundry.git](https://github.com/greyreen/GreyreenToken-Foundry.git)
    cd GreyreenToken-Foundry
    forge install # OpenZeppelin kütüphanesini indir
    cd frontend
    npm install # React ve Ethers.js kütüphanelerini kur
    ```

2.  **Terminal 1: Blok Zincirini Başlatma (Owner Hesabınızı Hazırlayın):**
    ```bash
    anvil # Test ağını başlatır
    ```

3.  **Terminal 2: Sözleşmeyi Dağıtma:**
    ```bash
    forge script script/DeployToken.s.sol --broadcast --rpc-url [http://127.0.0.1:8545](http://127.0.0.1:8545) --private-key [OWNER_PRIVATE_KEY]
    ```

4.  **Terminal 3: Frontend'i Başlatma:**
    ```bash
    cd frontend
    npm start
    ```
    Tarayıcınızda açılan arayüzü MetaMask ile bağlayın ve test edin.
---

#### 3. GitHub'a Yükleme

Terminal'de **`GreyreenToken_Foundry_Clean`** klasöründe olduğunuzdan emin olun ve bu komutları çalıştırın:

```bash
# 1. Tüm dosyaları (Frontend dahil) Git'e ekle
git add .

# 2. Değişiklikleri kaydet
git commit -m "feat: Add React Frontend DApp for Minting and Transfer"

# 3. GitHub'a yükle
git push origin main