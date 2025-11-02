// frontend/src/App.js (Nihai Çalışan Kod)

import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

// Foundry'nin oluşturduğu ABI dosyasını import et (Path önemli!)
// Bu, abi dosyasını hardhat klasöründen doğru şekilde çekmeye çalışır.
import TOKEN_ABI from './GreyreenToken.json';

const ABI = TOKEN_ABI.abi;
// Dağıtımdan çıkan gerçek sözleşme adresi
const REAL_CONTRACT_ADDRESS = "0x5FbDB2315678afec80F2557932d20b7f832d93F642f64180aa3";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [status, setStatus] = useState("Cüzdanı Bağlayın");
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState("0");
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const [contractAddress, setContractAddress] = useState(REAL_CONTRACT_ADDRESS);

  const updateBalance = useCallback(async (contract, address) => {
    if (contract && address) {
      try {
        const rawBalance = await contract.balanceOf(address);
        // Bakiyeyi okunabilir bir formata çeviriyoruz (18 ondalık basamağa sahip olduğu için)
        const readableBalance = ethers.formatEther(rawBalance);
        setBalance(readableBalance);
      } catch (error) {
        console.error("Bakiye yüklenemedi:", error);
      }
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        
        const accounts = await newProvider.send("eth_requestAccounts", []);
        const currentAddress = accounts[0];

        const newSigner = await newProvider.getSigner();
        
        setSigner(newSigner);
        setWalletAddress(currentAddress);
        setStatus(`Bağlandı: ${currentAddress.substring(0, 6)}...`);

        // Sözleşme örneğini oluştur (Güncel adres ve signer ile)
        const contract = new ethers.Contract(REAL_CONTRACT_ADDRESS, ABI, newSigner);
        setTokenContract(contract);
        updateBalance(contract, currentAddress);

      } catch (error) {
        console.error("Cüzdan bağlantı hatası:", error);
        setStatus("Bağlantı Başarısız. MetaMask kurulu mu?");
      }
    } else {
      setStatus("MetaMask kurulu değil. Lütfen yükleyin.");
    }
  };

  // Yeni Token Basma (Mint) Fonksiyonu
  const handleMint = async () => {
    if (!tokenContract || !signer) return;
    setStatus("Mint işlemi başlatılıyor...");
    
    // Test için sabit bir miktar basıyoruz: 1000 GRT
    const mintAmount = ethers.parseUnits("1000", 18); 

    try {
      // Owner adresi ile mint çağrısı
      const tx = await tokenContract.mint(walletAddress, mintAmount);
      setStatus("İşlem onay bekliyor...");
      await tx.wait();
      
      setStatus("✅ MINT BAŞARILI! 1000 GRT hesabınıza eklendi.");
      updateBalance(tokenContract, walletAddress);

    } catch (error) {
      console.error("Mint Hatası:", error);
      // Foundry'de Ownable hataları genellikle 'revert' hatası olarak döner.
      setStatus("❌ MINT BAŞARISIZ! (Owner yetkisi gerekli)"); 
    }
  };
  
  // Token Transfer Fonksiyonu
  const handleTransfer = async () => {
    if (!tokenContract || !signer || !recipient || !transferAmount) return;
    setStatus("Transfer işlemi başlatılıyor...");
    
    try {
      // Transfer miktarını parse et
      const amountToSend = ethers.parseUnits(transferAmount, 18);
      
      // Transfer fonksiyonunu çağır
      const tx = await tokenContract.transfer(recipient, amountToSend);
      setStatus("İşlem onay bekliyor...");
      await tx.wait();
      
      setStatus(`✅ TRANSFER BAŞARILI! ${transferAmount} GRT gönderildi.`);
      updateBalance(tokenContract, walletAddress); 

    } catch (error) {
      console.error("Transfer Hatası:", error);
      setStatus("❌ TRANSFER BAŞARISIZ! (Yetersiz bakiye veya adres hatalı)");
    }
  };

  useEffect(() => {
    // Otomatik bağlantı denemesi
    connectWallet(); 
  }, [connectWallet]); // Bağlantı fonksiyonu bağımlılık olarak eklendi

  return (
    <div className="app-container">
      <h1>🪙 Greyreen Token DApp</h1>
      <p className="status-text">{status}</p>

      {/* Genel Bilgiler */}
      <div className="info-box">
        {walletAddress ? (
          <>
            <p><strong>Cüzdan:</strong> {walletAddress}</p>
            <p><strong>Bakiye:</strong> {balance} GRT</p>
          </>
        ) : (
          <button className="connect-button" onClick={connectWallet}>
            MetaMask Bağla
          </button>
        )}
      </div>

      {/* Token Üretme */}
      <div className="action-box">
        <h2>Token Üret (Mint)</h2>
        <button 
          className="mint-button" 
          onClick={handleMint} 
          disabled={!signer || status.includes("İşlem")}
        >
          1000 GRT Mint Et (Sadece Owner)
        </button>
      </div>

      {/* Token Transferi */}
      <div className="action-box">
        <h2>Token Transferi</h2>
        <input 
          type="text" 
          placeholder="Alıcı Adresi (0x...)" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Miktar (GRT)" 
          value={transferAmount} 
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button 
          className="transfer-button" 
          onClick={handleTransfer}
          disabled={!signer || !recipient || !transferAmount}
        >
          Transferi Onayla
        </button>
      </div>
      
      <p className="info-text small">Sözleşme Adresi: {contractAddress}</p>
    </div>
  );
}

export default App;